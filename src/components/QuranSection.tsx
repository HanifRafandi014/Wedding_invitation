import React from 'react';
import { BookOpen } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const QuranSection: React.FC = () => {
  const { quranVerse } = WEDDING_DATA;

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      {/* Decorative Floral Top Flourish */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-[1px] bg-[#C5A059]/40" />
        <BookOpen className="w-5 h-5 text-[#C5A059]" />
        <div className="w-12 h-[1px] bg-[#C5A059]/40" />
      </div>

      <div className="relative bg-white/70 backdrop-blur-xs border border-[#C5A059]/30 rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* Subtle Corner Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/60" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/60" />

        {/* Bismillah */}
        <div className="font-arabic text-2xl sm:text-3xl text-[#1A1816] mb-6 leading-relaxed">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Arabic Verse */}
        <p className="font-arabic text-xl sm:text-2xl text-[#2C2926] leading-[2.2] text-center mb-6 dir-rtl">
          {quranVerse.arabic}
        </p>

        {/* Latin Transliteration */}
        <p className="text-xs sm:text-sm text-[#8C8275] italic leading-relaxed mb-4 max-w-xl mx-auto font-serif-luxury">
          "{quranVerse.latin}"
        </p>

        {/* Indonesian Translation */}
        <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed max-w-2xl mx-auto font-normal">
          {quranVerse.translation}
        </p>

        {/* Surah Reference */}
        <div className="mt-6 pt-4 border-t border-[#C5A059]/20 inline-block">
          <span className="font-serif-luxury text-sm font-semibold tracking-wider text-[#A88132]">
            — {quranVerse.surah} —
          </span>
        </div>
      </div>
    </section>
  );
};
