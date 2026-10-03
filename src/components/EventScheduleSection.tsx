import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Copy, Check, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const EventScheduleSection: React.FC = () => {
  const { events } = WEDDING_DATA;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAddress = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="acara" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#9A7B38] uppercase">
          Waktu & Lokasi
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1816] mt-1 mb-3">
          Rangkaian Acara Pernikahan
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-md mx-auto">
          InsyaAllah rangkaian acara suci kami akan diselenggarakan pada:
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {events.map((evt, idx) => (
          <div
            key={idx}
            className="bg-white/85 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:border-[#C5A059] transition-all duration-300"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 text-xs font-semibold text-[#9A7B38]">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                {idx === 0 ? 'AKAD NIKAH & LAMARAN' : 'RESEPSI PERNIKAHAN'}
              </span>
              <span className="text-[11px] text-[#9E9689] font-medium">
                {idx === 0 ? 'Sesi Khidmat' : 'Sesi Ramah Tamah'}
              </span>
            </div>

            {/* Event Title */}
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1816] mb-4">
              {evt.title}
            </h3>

            {/* Event Details */}
            <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-[#4A453E]">
              {/* Day & Date */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8C8275] uppercase tracking-wider font-semibold">Hari & Tanggal</div>
                  <div className="font-medium text-[#1A1816]">{evt.dateStr}</div>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8C8275] uppercase tracking-wider font-semibold">Pukul</div>
                  <div className="font-medium text-[#1A1816]">{evt.timeStr}</div>
                </div>
              </div>

              {/* Venue & Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#8C8275] uppercase tracking-wider font-semibold">Kediaman & Lokasi</div>
                  <div className="font-semibold text-[#1A1816]">{evt.venue}</div>
                  <div className="text-[#6B6358] mt-0.5 leading-relaxed">{evt.address}</div>
                </div>
              </div>
            </div>

            {/* Note */}
            {evt.note && (
              <p className="text-[11px] text-[#8C8275] italic bg-[#FAF8F5] p-3 rounded-xl border border-[#C5A059]/20 mb-6">
                {evt.note}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-[#C5A059]/20">
              <a
                href={evt.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1816] text-[#F4E8C1] text-xs font-medium hover:bg-[#2C2926] transition-all shadow-md active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Buka Google Maps</span>
              </a>

              <button
                onClick={() => handleCopyAddress(`${evt.venue}, ${evt.address}`, idx)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/40 text-xs font-medium text-[#2C2926] hover:bg-neutral-100 transition-all"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A88132]" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Map Embed Card */}
      <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="font-serif-luxury text-xl font-bold text-[#1A1816]">
              Peta Lokasi Interaktif
            </h4>
            <p className="text-xs text-[#6B6358]">
              Jl. Gatot Subroto, Gg 2, RT 001/RW 002, Kelurahan Petahunan, Kecamatan Gadingrejo, Kota Pasuruan
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/xArezLUQkuNvaXF47"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1816] text-[#D4AF37] text-xs font-medium hover:bg-[#2C2926] transition-all shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Petunjuk Arah Google Maps</span>
          </a>
        </div>

        {/* Embedded Map Canvas / Iframe */}
        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#C5A059]/30 relative bg-[#EAE5DD]">
          <iframe
            title="Lokasi Pernikahan Rina & Hanif"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.3680141745726!2d112.8811512!3d-7.6435156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzgnMzYuNyJTIDExMsKwNTMnMDEuNCJF!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter contrast-105"
          />
          
          {/* Overlay Tag */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-[#C5A059]/30 text-xs font-semibold text-[#1A1816] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Kediaman Rina</span>
          </div>
        </div>
      </div>
    </section>
  );
};
