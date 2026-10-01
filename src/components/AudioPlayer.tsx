import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3, Settings, Play, Pause, Upload, Check } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface AudioPlayerProps {
  autoPlayTriggered: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [activeSongName, setActiveSongName] = useState('Akustik Romantis (Wedding Theme)');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customLoaded, setCustomLoaded] = useState(false);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (autoPlayTriggered && !weddingAudio.getIsPlaying()) {
      weddingAudio.play().catch(() => {
        // Handled in audio player
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

  const handleSongSelect = (title: string, url: string) => {
    setActiveSongName(title);
    weddingAudio.setCustomAudioUrl(url);
    setShowSettings(false);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    weddingAudio.setCustomAudioUrl(customUrlInput.trim());
    setActiveSongName('Custom MP3 Track');
    setCustomLoaded(true);
    setTimeout(() => setCustomLoaded(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      weddingAudio.setCustomAudioUrl(url);
      setActiveSongName(file.name.replace(/\.[^/.]+$/, ""));
      setShowSettings(false);
    }
  };

  return (
    <>
      {/* Floating Vinyl Player Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Settings button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          title="Pengaturan Musik / Ganti Lagu"
          aria-label="Pengaturan Musik"
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-[#C5A059]/40 flex items-center justify-center text-[#2C2926] hover:text-[#A88132] hover:scale-105 transition-all"
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
          <div className="bg-[#FAF8F5] border border-[#C5A059]/30 rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#2C2926] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#A88132]" />
                <h3 className="font-serif-luxury text-xl font-bold">Lagu Latar Undangan</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-sm px-2.5 py-1 rounded-lg hover:bg-neutral-200/60 text-neutral-600"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Currently Playing Track */}
              <div className="p-3 bg-white rounded-xl border border-[#C5A059]/20 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="text-xs text-[#9E9689] uppercase tracking-wider font-semibold">Sedang Diputar</div>
                  <div className="text-sm font-medium text-[#2C2926] truncate">{activeSongName}</div>
                </div>
                <button
                  onClick={handleToggle}
                  className="p-2 rounded-full bg-[#C5A059]/15 text-[#A88132] hover:bg-[#C5A059]/30"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#6B6358]">
                  <span className="flex items-center gap-1.5">
                    {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    Volume Audio
                  </span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#C5A059] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Preset Track Selections */}
              <div className="space-y-2 pt-2 border-t border-[#C5A059]/20">
                <div className="text-xs font-semibold text-[#6B6358] uppercase tracking-wider">
                  Pilihan Lagu Romantis
                </div>
                <div className="space-y-1.5">
                  {[
                    {
                      name: 'Acoustic Wedding Love Theme (Default)',
                      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-wedding-114258.mp3'
                    },
                    {
                      name: 'Canon in D - Romantic Acoustic Piano',
                      url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c35272a818.mp3?filename=canon-in-d-major-romantic-10878.mp3'
                    },
                    {
                      name: 'Gentle Wedding Harp & Strings Synth',
                      url: '' // Will activate synth
                    }
                  ].map((song) => (
                    <button
                      key={song.name}
                      onClick={() => handleSongSelect(song.name, song.url)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between border transition-all ${
                        activeSongName === song.name
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#2C2926] font-semibold'
                          : 'bg-white hover:bg-neutral-50 border-neutral-200 text-[#6B6358]'
                      }`}
                    >
                      <span className="truncate pr-2">{song.name}</span>
                      {activeSongName === song.name && <Check className="w-3.5 h-3.5 text-[#A88132] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Local MP3 or Paste Asset URL */}
              <div className="pt-2 border-t border-[#C5A059]/20">
                <div className="text-xs font-semibold text-[#6B6358] mb-2 uppercase tracking-wider">
                  Ganti Dengan File Musik Sendiri (MP3)
                </div>
                <div className="flex gap-2 mb-2">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-neutral-50 border border-dashed border-[#C5A059] rounded-lg text-xs font-medium text-[#2C2926] transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#A88132]" />
                    <span>Upload Lagu MP3 Anda</span>
                    <input
                      type="file"
                      accept="audio/mp3,audio/wav,audio/mpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <form onSubmit={handleApplyCustomUrl} className="flex gap-1.5">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="Atau tempel URL file MP3 / asset..."
                    className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#C5A059] text-white text-xs font-medium rounded-lg hover:bg-[#A88132]"
                  >
                    {customLoaded ? 'Tersimpan!' : 'Terapkan'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
