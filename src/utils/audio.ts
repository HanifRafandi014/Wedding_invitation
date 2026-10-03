// Unified Wedding Audio System (Supports YouTube Background Audio, HTML5 MP3, and Web Audio Synthesizer)

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[\w-]{11}$/.test(url.trim())) {
    return url.trim();
  }
  return null;
}

export interface SongTrack {
  name: string;
  url: string;
  youtubeId?: string | null;
}

export const WEDDING_PLAYLIST: SongTrack[] = [
  {
    name: 'Janji Suci (Default)',
    url: 'https://youtu.be/p6Z6lCSV7A0?si=i8PaYz1phbe3zOah',
    youtubeId: 'p6Z6lCSV7A0',
  },
  {
    name: 'Lagu Pernikahan Kita',
    url: 'https://youtu.be/erN9iSWapGg?si=2T7ZQ6bcBS3WlBLh',
    youtubeId: 'erN9iSWapGg',
  },
  {
    name: 'Cintanya Aku',
    url: 'https://youtu.be/eAa32W5F51Y?si=TNqi7bedy2WgFbBT',
    youtubeId: 'eAa32W5F51Y',
  },
  {
    name: 'Sempurna',
    url: 'https://youtu.be/bx6IPdHxGlI?si=5IzN_yTPTTKwGJQv',
    youtubeId: 'bx6IPdHxGlI',
  },
  {
    name: 'Teman Bahagia',
    url: 'https://youtu.be/pnpvnp8lqXE?si=u5YOztVnJZTyO8z7',
    youtubeId: 'pnpvnp8lqXE',
  },
  {
    name: 'Acoustic Wedding Love Theme (Instrumental)',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-wedding-114258.mp3',
    youtubeId: null,
  },
];

type AudioSourceType = 'youtube' | 'html5' | 'synth';

class WeddingAudioPlayer {
  private isPlaying: boolean = false;
  private volume: number = 0.7;
  private currentTrack: SongTrack = WEDDING_PLAYLIST[0];
  private currentSource: AudioSourceType = 'youtube';

  // HTML5 audio
  private html5Audio: HTMLAudioElement | null = null;

  // Web Audio Synth Fallback
  private audioCtx: AudioContext | null = null;
  private synthTimerId: number | null = null;

  // YouTube player interface reference
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ytPlayer: any = null;
  private ytReady: boolean = false;
  private pendingPlay: boolean = false;

  private listeners: ((playing: boolean) => void)[] = [];

  constructor() {
    const ytId = extractYouTubeId(this.currentTrack.url);
    if (ytId) {
      this.currentSource = 'youtube';
      this.currentTrack.youtubeId = ytId;
    } else {
      this.currentSource = 'html5';
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public getCurrentTrack(): SongTrack {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentSource(): AudioSourceType {
    return this.currentSource;
  }

  // Bind YouTube Player instance created in component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public attachYouTubePlayer(player: any) {
    this.ytPlayer = player;
    this.ytReady = true;

    try {
      this.ytPlayer.setVolume(Math.round(this.volume * 100));
    } catch {
      // ignore
    }

    if (this.pendingPlay && this.currentSource === 'youtube') {
      this.pendingPlay = false;
      this.playYouTube();
    }
  }

  public onYouTubeStateChange(state: number) {
    // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
    if (state === 1) {
      this.isPlaying = true;
      this.notify();
    } else if (state === 2 || state === 0) {
      if (state === 0 && this.ytPlayer) {
        // Loop YouTube video
        try {
          this.ytPlayer.seekTo(0, true);
          this.ytPlayer.playVideo();
          return;
        } catch {
          // ignore
        }
      }
      this.isPlaying = false;
      this.notify();
    }
  }

  public onYouTubeError() {
    // If YouTube video embed is blocked by copyright/owner or unavailable,
    // seamlessly fallback to acoustic instrumental audio
    console.warn('YouTube embed restricted or unavailable, falling back to romantic audio stream');
    this.fallbackToInstrumental();
  }

  private fallbackToInstrumental() {
    this.pause();
    this.currentSource = 'html5';
    const fallbackUrl = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-wedding-114258.mp3';
    this.playHtml5(fallbackUrl);
  }

  public async play(): Promise<void> {
    if (this.currentSource === 'youtube') {
      if (this.ytReady && this.ytPlayer) {
        this.playYouTube();
      } else {
        this.pendingPlay = true;
      }
      return;
    }

    if (this.currentSource === 'html5') {
      await this.playHtml5(this.currentTrack.url);
      return;
    }

    this.playSynthMelody();
    this.isPlaying = true;
    this.notify();
  }

  private playYouTube() {
    if (!this.ytPlayer) return;
    try {
      this.ytPlayer.setVolume(Math.round(this.volume * 100));
      this.ytPlayer.playVideo();
      this.isPlaying = true;
      this.notify();
    } catch {
      // Fallback
      this.fallbackToInstrumental();
    }
  }

  private async playHtml5(url: string): Promise<void> {
    try {
      if (!this.html5Audio || this.html5Audio.src !== url) {
        if (this.html5Audio) {
          this.html5Audio.pause();
        }
        this.html5Audio = new Audio(url);
        this.html5Audio.loop = true;
      }
      this.html5Audio.volume = this.volume;
      await this.html5Audio.play();
      this.isPlaying = true;
      this.notify();
    } catch {
      // Fallback to web audio synth
      this.playSynthMelody();
      this.isPlaying = true;
      this.notify();
    }
  }

  public pause(): void {
    if (this.currentSource === 'youtube' && this.ytPlayer) {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // ignore
      }
    }

    if (this.html5Audio) {
      try {
        this.html5Audio.pause();
      } catch {
        // ignore
      }
    }

    if (this.synthTimerId !== null) {
      window.clearInterval(this.synthTimerId);
      this.synthTimerId = null;
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }

    this.isPlaying = false;
    this.pendingPlay = false;
    this.notify();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setTrack(title: string, url: string) {
    const wasPlaying = this.isPlaying;
    this.pause();

    const ytId = extractYouTubeId(url);
    if (ytId) {
      this.currentSource = 'youtube';
      this.currentTrack = {
        name: title,
        url,
        youtubeId: ytId,
      };

      if (this.ytReady && this.ytPlayer) {
        try {
          this.ytPlayer.loadVideoById({
            videoId: ytId,
            suggestedQuality: 'small',
          });
          if (wasPlaying) {
            this.ytPlayer.playVideo();
            this.isPlaying = true;
            this.notify();
          }
        } catch {
          // ignore
        }
      } else {
        this.pendingPlay = wasPlaying;
      }
    } else if (url.trim()) {
      // Standard MP3 / Audio Stream
      this.currentSource = 'html5';
      this.currentTrack = {
        name: title,
        url,
        youtubeId: null,
      };
      if (wasPlaying) {
        this.playHtml5(url);
      }
    } else {
      // Synthesizer
      this.currentSource = 'synth';
      this.currentTrack = {
        name: title || 'Gentle Wedding Harp & Strings Synth',
        url: '',
        youtubeId: null,
      };
      if (wasPlaying) {
        this.playSynthMelody();
        this.isPlaying = true;
        this.notify();
      }
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.html5Audio) {
      this.html5Audio.volume = this.volume;
    }
    if (this.ytPlayer) {
      try {
        this.ytPlayer.setVolume(Math.round(this.volume * 100));
      } catch {
        // ignore
      }
    }
  }

  // Web Audio Romantic Melody Generator (Canon in D / Wedding Acoustic Arpeggio)
  private playSynthMelody() {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [196.00, 246.94, 293.66, 392.00], // G major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [164.81, 196.00, 246.94, 329.63], // E minor
      [174.61, 220.00, 261.63, 349.23], // F major
      [261.63, 329.63, 392.00, 523.25], // C major
      [174.61, 220.00, 261.63, 349.23], // F major
      [196.00, 246.94, 293.66, 392.00], // G major
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNote = (freq: number) => {
      if (!this.audioCtx || this.audioCtx.state !== 'running') return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08 * this.volume, this.audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.3);
    };

    if (this.synthTimerId !== null) {
      window.clearInterval(this.synthTimerId);
    }

    this.synthTimerId = window.setInterval(() => {
      const currentChord = chords[chordIdx];
      const freq = currentChord[noteIdx];
      playNote(freq);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    }, 450);
  }
}

export const weddingAudio = new WeddingAudioPlayer();
