import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const LoveStorySection: React.FC = () => {
  const { story } = WEDDING_DATA;

  return (
    <section id="kisah" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#9A7B38] uppercase">
          Kisah Cinta Kami
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1816] mt-1 mb-3">
          Perjalanan Pertemuan Menuju Hari Bahagia
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-md mx-auto">
          Bagaimana takdir mempertemukan dua hati yang siap saling menyempurnakan ibadah seumur hidup
        </p>
      </div>

      {/* Featured Couple Attire Banner (Jas Hitam & Gaun Jilbab Putih Panjang) */}
      <div className="mb-12 bg-white/80 rounded-3xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-lg text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/assets/images/hanif1.jpg" className="w-37 h-37 sm:w-40 sm:h-40 object-cover rounded-2xl border-[3px] border-white shadow-xl shadow-amber-900/15" />
          <div className="flex flex-col items-center justify-center text-[#C5A059] px-1">
            <Heart className="w-6 h-6 fill-[#C5A059] text-[#C5A059] animate-pulse" />
            <span className="font-serif-luxury text-xs text-[#9A7B38] font-bold mt-1">2024 - 2029</span>
          </div>
          <img src="/assets/images/rina1.jpg" className="w-37 h-37 sm:w-40 sm:h-40 object-cover rounded-2xl border-[3px] border-white shadow-xl shadow-amber-900/15" />
        </div>
        <div className="max-w-lg">
          <span className="text-[11px] font-semibold tracking-wider text-[#9A7B38] uppercase">
            Potret Busana Pilihan
          </span>
          <h3 className="font-serif-luxury text-xl font-bold text-[#1A1816] mt-0.5 mb-2">
            Jas Hitam Modern & Gaun Pengantin Jilbab Putih Panjang
          </h3>
          <p className="text-xs text-[#6B6358] leading-relaxed">
            Menyatukan simbol ketegasan dan tanggung jawab seorang pria berbalut jas hitam elegan, dengan keanggunan dan kesucian seorang muslimah dalam balutan gaun jilbab putih panjang.
          </p>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5A059]/40 space-y-12 ml-4 sm:ml-8">
        {story.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#FAF8F5] border-2 border-[#C5A059] flex items-center justify-center shadow-md group-hover:scale-125 transition-transform duration-300">
              <span className="w-2 h-2 rounded-full bg-[#9A7B38]" />
            </div>

            {/* Content Card */}
            <div className="bg-white/85 backdrop-blur-xs rounded-2xl p-6 border border-[#C5A059]/30 shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-serif-luxury text-2xl font-bold text-[#A88132]">
                  {item.year}
                </span>
                {item.location && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#8C8275] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#C5A059]/20">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    {item.location}
                  </span>
                )}
              </div>

              <h4 className="font-serif-luxury text-lg font-bold text-[#1A1816] mb-2">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#555048] leading-relaxed mb-4">
                {item.story}
              </p>

              {/* Milestone Photo Preview */}
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-sm relative group/img">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3 text-white text-xs font-medium">
                  {item.title} — {item.year}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
