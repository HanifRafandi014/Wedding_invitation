import React, { useState, useEffect } from 'react';
import { MailOpen, Heart, Calendar, Sparkles, Edit3, Check } from 'lucide-react';

interface HeroCoverProps {
  onOpenInvitation: () => void;
  isOpen: boolean;
  guestName: string;
  onUpdateGuestName: (newName: string) => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  onOpenInvitation,
  isOpen,
  guestName,
  onUpdateGuestName,
}) => {
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [tempName, setTempName] = useState(guestName);

  useEffect(() => {
    setTempName(guestName);
  }, [guestName]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateGuestName(tempName.trim());
    }
    setIsEditingGuest(false);
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-[#FAF8F5] transition-all duration-1000 ease-in-out ${
        isOpen
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Decor & Soft Textures */}
      <div className="absolute inset-0 paper-texture opacity-60 pointer-events-none" />
      
      {/* Ambient Radial Golden Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#EFE4CF]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#EFE4CF]/40 blur-3xl pointer-events-none" />

      {/* Decorative Floral Outline Elements */}
      <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-[#C5A059]/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-[#C5A059]/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-[#C5A059]/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-[#C5A059]/40 pointer-events-none" />

      {/* Main Cover Card */}
      <div className="relative z-10 w-full max-w-md mx-4 p-8 text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#C5A059]/30 flex flex-col items-center">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#9A7B38] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>WALIMATUL 'URS</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </div>

        {/* Small Visual Couple Icon (Jas Hitam & Gaun Jilbab Putih) */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center">
            <img src="/assets/images/cover.jpg" alt="Cover" className="w-50 h-50 sm:w-55 sm:h-55 object-cover rounded-2xl border-[3px] border-white ring-2 ring-amber-400/70 shadow-xl shadow-amber-900/15" />
          </div>
        </div>

        <p className="font-serif-luxury text-sm tracking-[0.25em] text-[#6B6358] uppercase mb-1">
          The Wedding of
        </p>

        {/* Bride & Groom Couple Names */}
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-semibold text-[#1A1816] tracking-wide mb-2">
          Rina <span className="font-script text-4xl sm:text-5xl text-[#C5A059] font-normal">&</span> Hanif
        </h1>

        {/* Date Info */}
        <div className="flex items-center gap-2 text-xs text-[#8C8275] tracking-wider mb-6">
          <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>SABTU, 17 NOVEMBER 2029</span>
        </div>

        {/* Divider Ornament */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mb-6" />

        {/* Guest Recipient Box */}
        <div className="w-full bg-[#FAF8F5] rounded-2xl p-4 border border-[#C5A059]/30 mb-6 shadow-xs">
          <p className="text-[11px] uppercase tracking-wider text-[#9E9689] font-medium mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>

          {isEditingGuest ? (
            <form onSubmit={handleSaveName} className="flex items-center justify-center gap-1.5 mt-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                className="text-sm font-semibold text-center text-[#1A1816] bg-white border border-[#C5A059] rounded-lg px-2.5 py-1 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 bg-[#C5A059] text-white rounded-lg hover:bg-[#9A7B38]"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1816] capitalize">
                {guestName}
              </h3>
              <button
                onClick={() => setIsEditingGuest(true)}
                title="Ubah nama tamu"
                className="text-[#9E9689] hover:text-[#C5A059] transition-colors p-1"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
          )}

          <p className="text-[11px] text-[#8C8275] mt-1.5 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Buka Undangan Button */}
        <button
          onClick={onOpenInvitation}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1A1816] text-[#F4E8C1] shadow-xl hover:bg-[#2C2926] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-medium text-sm tracking-wider border border-[#C5A059]/50 animate-pulse-subtle"
        >
          <MailOpen className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
          <span>BUKA UNDANGAN</span>
          <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] opacity-80" />
        </button>

        <p className="text-[10px] text-[#9E9689] mt-4 tracking-wider">
          Sentuh tombol untuk membuka dan memutar musik romantis
        </p>
      </div>
    </div>
  );
};
