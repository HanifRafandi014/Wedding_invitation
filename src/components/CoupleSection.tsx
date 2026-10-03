import React, { useState } from 'react';
import { Heart, Instagram, Sparkles, Image, Palette } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
export const getImg = (name: string) => `${import.meta.env.BASE_URL}assets/images/${name}`;

export const CoupleSection: React.FC = () => {
  const { groom, bride } = WEDDING_DATA;
  const [viewMode, setViewMode] = useState<'illustration' | 'photo'>('illustration');
  const [groomPhoto, setGroomPhoto] = useState(groom.photoUrl);
  const [bridePhoto, setBridePhoto] = useState(bride.photoUrl);

  const handleCustomGroomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGroomPhoto(URL.createObjectURL(file));
      setViewMode('photo');
    }
  };

  const handleCustomBrideUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBridePhoto(URL.createObjectURL(file));
      setViewMode('photo');
    }
  };

  return (
    <section id="mempelai" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#9A7B38] uppercase">
          Pasangan Mempelai
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1816] mt-1 mb-3">
          Mempelai Pria & Wanita
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-md mx-auto">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan putra-putri kami:
        </p>

        {/* View Mode Switcher (Sesuai request pakaian jas & gaun jilbab putih) */}
        <div className="mt-4 inline-flex items-center gap-1 p-1 bg-white/80 rounded-full border border-[#C5A059]/40 shadow-xs">
          <button
            onClick={() => setViewMode('illustration')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === 'illustration'
                ? 'bg-[#1A1816] text-[#F4E8C1] shadow-xs'
                : 'text-[#6B6358] hover:text-[#1A1816]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Jas & Gaun Jilbab Putih</span>
          </button>
          <button
            onClick={() => setViewMode('photo')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === 'photo'
                ? 'bg-[#1A1816] text-[#F4E8C1] shadow-xs'
                : 'text-[#6B6358] hover:text-[#1A1816]'
            }`}
          >
            <Image className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Foto Prewedding</span>
          </button>
        </div>
      </div>

      {/* Couple Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative items-center">
        
        {/* GROOM CARD */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-lg text-center flex flex-col items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A059]/15 to-transparent rounded-bl-full pointer-events-none" />

          {/* Groom Visual */}
          <div className="relative mb-6">
            {viewMode === 'illustration' ? (
              <div className="transition-transform duration-300 group-hover:scale-102">
                <img src={getImg('hanif2.jpg')} className="w-55 h-55 sm:w-60 sm:h-60 object-cover rounded-2xl border-[3px] border-white shadow-xl shadow-amber-900/15" />
              </div>
            ) : (
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-xl border-2 border-[#C5A059]/50 relative group/photo">
                <img
                  src={groomPhoto}
                  alt={groom.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            
            {/* Tagline Attire */}
            <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-[#1A1816] text-[#F4E8C1] rounded-full text-[10px] tracking-wider uppercase font-medium border border-[#C5A059]/40">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Jas Hitam Formal Modern</span>
            </div>
          </div>

          {/* Groom Names & Parents */}
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1816] mb-1">
            {groom.fullName}
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#9A7B38] font-semibold mb-3">
            - Calon Mempelai Pria -
          </p>

          <p className="text-xs text-[#555048] mb-2 leading-relaxed max-w-sm">
            {groom.parents}
          </p>
          <p className="text-xs text-[#8C8275] italic mb-5 leading-relaxed max-w-sm">
            "{groom.bio}"
          </p>

          {/* Instagram Button */}
          <a
            href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 text-xs font-medium text-[#2C2926] hover:bg-[#1A1816] hover:text-white transition-all shadow-xs"
          >
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>{groom.instagram}</span>
          </a>
        </div>

        {/* BRIDE CARD */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-lg text-center flex flex-col items-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#C5A059]/15 to-transparent rounded-br-full pointer-events-none" />

          {/* Bride Visual */}
          <div className="relative mb-6">
            {viewMode === 'illustration' ? (
              <div className="transition-transform duration-300 group-hover:scale-102">
                <img src={getImg('rina2.jpg')} className="w-55 h-55 sm:w-60 sm:h-60 object-cover rounded-2xl border-[3px] border-white shadow-xl shadow-amber-900/15" />
              </div>
            ) : (
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-xl border-2 border-[#C5A059]/50 relative group/photo">
                <img
                  src={bridePhoto}
                  alt={bride.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Tagline Attire */}
            <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-[#FAF7F2] text-[#8C6E26] rounded-full text-[10px] tracking-wider uppercase font-medium border border-[#C5A059]/40">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Gaun Pengantin Jilbab Putih</span>
            </div>
          </div>

          {/* Bride Names & Parents */}
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1816] mb-1">
            {bride.fullName}
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#9A7B38] font-semibold mb-3">
            - Calon Mempelai Wanita -
          </p>

          <p className="text-xs text-[#555048] mb-2 leading-relaxed max-w-sm">
            {bride.parents}
          </p>
          <p className="text-xs text-[#8C8275] italic mb-5 leading-relaxed max-w-sm">
            "{bride.bio}"
          </p>

          {/* Instagram Button */}
          <a
            href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 text-xs font-medium text-[#2C2926] hover:bg-[#1A1816] hover:text-white transition-all shadow-xs"
          >
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>{bride.instagram}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
