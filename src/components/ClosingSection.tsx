import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const ClosingSection: React.FC = () => {
  const { groom, bride } = WEDDING_DATA;

  return (
    <footer className="relative pt-16 pb-24 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-16 h-[1px] bg-[#C5A059]/40" />
        <Heart className="w-4 h-4 text-[#C5A059] fill-[#C5A059]/20" />
        <div className="w-16 h-[1px] bg-[#C5A059]/40" />
      </div>

      <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-lg">
        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1816] mb-4">
          Ungkapan Terima Kasih
        </h3>

        <p className="text-xs sm:text-sm text-[#555048] leading-relaxed max-w-xl mx-auto mb-6">
          Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi langkah awal kehidupan rumah tangga kami.
        </p>

        <p className="text-xs text-[#8C8275] mb-8 font-serif-luxury italic">
          "Jazakumullahu khairan katsiran wa barakallahu fiikum"
        </p>

        {/* Signature Names */}
        <div className="mt-8 pt-6 border-t border-[#C5A059]/20">
          <p className="text-xs text-[#9E9689] uppercase tracking-widest font-semibold mb-2">
            Kami yang berbahagia,
          </p>
          <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1816] tracking-wide">
            {groom.name} <span className="font-script text-4xl text-[#C5A059] font-normal">&</span> {bride.name}
          </div>
          <p className="text-xs text-[#6B6358] mt-2">
            Beserta segenap keluarga besar kedua mempelai
          </p>
        </div>
      </div>

      <div className="mt-8 text-[11px] text-[#9E9689] flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Undangan Pernikahan Digital Elegan Minimalis • 2026</span>
      </div>
    </footer>
  );
};
