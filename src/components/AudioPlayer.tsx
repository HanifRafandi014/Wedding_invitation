import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Settings, Play, Pause, Upload, Check, Youtube } from 'lucide-react';
import { weddingAudio, WEDDING_PLAYLIST, extractYouTubeId, SongTrack } from '../utils/audio';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(weddingAudio.getVolume());
  const [activeTrack, setActiveTrack] = useState<SongTrack>(weddingAudio.getCurrentTrack());
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customLoadedMsg, setCustomLoadedMsg] = useState('');
  const ytInitializedRef = useRef(false);

  // Initialize YouTube IFrame API
  useEffect(() => {
    const initPlayer = () => {
      if (ytInitializedRef.current || !window.YT || !window.YT.Player) return;
      ytInitializedRef.current = true;

      const initialId = activeTrack.youtubeId || 'p6Z6lCSV7A0';

      try {
        new window.YT.Player('wedding-youtube-iframe-player', {
          height: '1',
          width: '1',
          videoId: initialId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: initialId,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              weddingAudio.attachYouTubePlayer(event.target);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              weddingAudio.onYouTubeStateChange(event.data);
            },
            onError: () => {
              weddingAudio.onYouTubeError();
            },
          },
        });
      } catch (err) {
        console.warn('Could not initialize YouTube Player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load YouTube IFrame API Script
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }
  }, [activeTrack.youtubeId]);

  // Subscribe to audio state
  useEffect(() => {
    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
      setActiveTrack(weddingAudio.getCurrentTrack());
    });
    return unsub;
  }, []);

  // Handle Autoplay upon "Buka Undangan" click
  useEffect(() => {
    if (autoPlayTriggered && !weddingAudio.getIsPlaying()) {
      weddingAudio.play().catch(() => {
        // Handled in audio utility
      });
    }
  }, [autoPlayTriggered]);

  const handleToggle = () => {
    weddingAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    weddingAudio.setVolume(val);
  };

  const handleSongSelect = (track: SongTrack) => {
    weddingAudio.setTrack(track.name, track.url);
    setActiveTrack(weddingAudio.getCurrentTrack());
    setShowSettings(false);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const url = customUrlInput.trim();
    if (!url) return;

    const ytId = extractYouTubeId(url);
    const title = ytId ? 'Lagu YouTube Kustom' : 'Lagu Audio Kustom (MP3)';

    weddingAudio.setTrack(title, url);
    setActiveTrack(weddingAudio.getCurrentTrack());
    setCustomLoadedMsg(ytId ? 'Link YouTube Berhasil Dipasang!' : 'URL Audio Dipasang!');
    setTimeout(() => setCustomLoadedMsg(''), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const title = file.name.replace(/\.[^/.]+$/, '');
      weddingAudio.setTrack(title, url);
      setActiveTrack(weddingAudio.getCurrentTrack());
      setShowSettings(false);
    }
  };

  const isCurrentYouTube = Boolean(activeTrack.youtubeId || extractYouTubeId(activeTrack.url));

  return (
    <>
      {/* Hidden YouTube Audio IFrame Host */}
      <div
        aria-hidden="true"
        className="fixed -top-[9999px] -left-[9999px] w-1 h-1 overflow-hidden pointer-events-none opacity-0"
      >
        <div id="wedding-youtube-iframe-player" />
      </div>

      {/* Floating Vinyl Player Widget (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Settings button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          title="Pengaturan Lagu / Pilih Musik"
          aria-label="Pengaturan Musik"
          className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-[#C5A059]/40 flex items-center justify-center text-[#2C2926] hover:text-[#A88132] hover:scale-105 transition-all"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Main Play/Pause Vinyl Button */}
        <button
          onClick={handleToggle}
          aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          className={`relative group w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-2 border-[#C5A059] transition-transform duration-300 active:scale-95 ${
            isPlaying ? 'bg-[#1C1A17] text-[#D4AF37]' : 'bg-[#FAF8F5] text-[#6B6358]'
          }`}
        >
          {/* Animated Vinyl Disc */}
          <Disc3
            className={`w-9 h-9 transition-transform ${
              isPlaying ? 'animate-spin-slow text-[#D4AF37]' : 'text-[#8C8275]'
            }`}
          />

          {/* Center Play/Pause indicator icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isPlaying ? (
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-white/50 animate-pulse" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5 opacity-80" />
            )}
          </div>

          {/* Sound wave rings when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/50 animate-ping pointer-events-none opacity-40" />
          )}
        </button>
      </div>

      {/* Music Settings Modal / Drawer */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#C5A059]/30 rounded-3xl w-full max-w-md p-6 shadow-2xl text-[#2C2926] animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#A88132]" />
                <h3 className="font-serif-luxury text-xl font-bold">Lagu Latar Undangan</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-neutral-200/70 text-neutral-600 transition-colors"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Currently Playing Track */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#C5A059]/30 shadow-xs flex items-center justify-between">
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] text-[#9E9689] uppercase tracking-wider font-bold">
                      Sedang Diputar:
                    </span>
                    {isCurrentYouTube ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 bg-red-100 text-red-700 rounded-sm">
                        <Youtube className="w-3 h-3 text-red-600" />
                        YouTube Audio
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-sm">
                        MP3 Audio
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-[#1A1816] truncate">
                    {activeTrack.name}
                  </div>
                </div>
                <button
                  onClick={handleToggle}
                  className="p-2.5 rounded-full bg-[#1A1816] text-[#F4E8C1] hover:bg-[#2C2926] transition-all shadow-xs shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-[#C5A059]/20">
                <div className="flex items-center justify-between text-xs text-[#6B6358]">
                  <span className="flex items-center gap-1.5 font-medium">
                    {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    Volume Audio
                  </span>
                  <span className="font-semibold text-[#1A1816]">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#C5A059] h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Preset Track Selections with YouTube Links */}
              <div className="space-y-2 pt-2 border-t border-[#C5A059]/20">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#6B6358] uppercase tracking-wider">
                    Daftar Lagu Pernikahan
                  </div>
                  <span className="text-[10px] text-[#9A7B38] font-medium flex items-center gap-1">
                    <Youtube className="w-3 h-3 text-red-500" />
                    Putar Otomatis
                  </span>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {WEDDING_PLAYLIST.map((song) => {
                    const isSelected = activeTrack.name === song.name;
                    const isYt = Boolean(song.youtubeId);

                    return (
                      <button
                        key={song.name}
                        onClick={() => handleSongSelect(song)}
                        className={`w-full text-left px-3.5 py-2.5 text-xs rounded-xl flex items-center justify-between border transition-all ${
                          isSelected
                            ? 'bg-[#1A1816] text-[#F4E8C1] border-[#1A1816] shadow-xs'
                            : 'bg-white hover:bg-neutral-50 border-neutral-200/80 text-[#2C2926]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isYt ? (
                            <Youtube className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-red-400' : 'text-red-500'}`} />
                          ) : (
                            <Music className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-[#A88132]'}`} />
                          )}
                          <span className="truncate font-medium">{song.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paste Any YouTube URL or MP3 Link */}
              <div className="pt-2 border-t border-[#C5A059]/20">
                <div className="text-xs font-bold text-[#6B6358] mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>Tempel Link YouTube / MP3 Lainnya:</span>
                </div>
                <form onSubmit={handleApplyCustomUrl} className="flex gap-1.5">
                  <input
                    type="text"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="Contoh: https://youtu.be/... atau link .mp3"
                    className="flex-1 text-xs px-3 py-2 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-[#C5A059] text-[#1A1816]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#1A1816] text-[#F4E8C1] text-xs font-semibold rounded-xl hover:bg-[#2C2926] shrink-0 transition-colors"
                  >
                    Putar
                  </button>
                </form>
                {customLoadedMsg && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{customLoadedMsg}</span>
                  </p>
                )}
              </div>

              {/* Upload Local MP3 Option */}
              <div className="pt-2 border-t border-[#C5A059]/20">
                <label className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-neutral-50 border border-dashed border-[#C5A059] rounded-xl text-xs font-medium text-[#2C2926] transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#A88132]" />
                  <span>Upload File MP3 Sendiri</span>
                  <input
                    type="file"
                    accept="audio/mp3,audio/wav,audio/mpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
