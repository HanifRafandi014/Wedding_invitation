// Romantic Wedding Melody Synthesizer using Web Audio API
// This guarantees romantic background music works seamlessly in any environment without external asset 404s!

class WeddingAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private listeners: ((playing: boolean) => void)[] = [];
  private volume: number = 0.6;

  constructor() {
    // Optional external MP3 stream
    try {
      this.customAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-wedding-114258.mp3');
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
    } catch {
      // Audio element not supported or blocked
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  public async play(): Promise<void> {
    if (this.isPlaying) return;

    // Try HTML5 audio first
    if (this.customAudio) {
      try {
        await this.customAudio.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch {
        // Fallback to Web Audio synthesizer
      }
    }

    // Web Audio Synthesizer fallback
    this.playSynthMelody();
    this.isPlaying = true;
    this.notify();
  }

  public pause(): void {
    if (!this.isPlaying) return;
    if (this.customAudio) {
      try {
        this.customAudio.pause();
      } catch {
        // Ignore
      }
    }
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }
    this.isPlaying = false;
    this.notify();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setCustomAudioUrl(url: string) {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    if (wasPlaying) {
      this.play();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  // Web Audio Romantic Melody Generator (Canon in D / Wedding Acoustic Arpeggio)
  private playSynthMelody() {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

      // Soft gentle attack & gentle romantic decay
      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08 * this.volume, this.audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.3);
    };

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    this.timerId = window.setInterval(() => {
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
