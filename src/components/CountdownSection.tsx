import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, ExternalLink, Check, Bell } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const CountdownSection: React.FC = () => {
  const { targetDate } = WEDDING_DATA;
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleDownloadIcs = () => {
    downloadIcsFile({
      title: 'Pernikahan Hanif & Rina',
      description: 'Pernikahan Suci Hanif Naufal Rafandi & Ikrinatus Sadiyah. Bertempat di Graha Sarana Harmoni / Kediaman Mempelai.',
      location: 'Jl. Melati Indah No. 12, Kebon Jeruk, Jakarta Barat (https://maps.app.goo.gl/roJYnbBnbUvhJ2dm7)',
      startDate: new Date('2026-10-24T08:00:00+07:00'),
      endDate: new Date('2026-10-24T17:00:00+07:00'),
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const googleCalendarUrl = createGoogleCalendarUrl({
    title: 'Pernikahan Hanif & Rina',
    description: 'Pernikahan Suci Hanif Naufal Rafandi & Ikrinatus Sadiyah. Bertempat di Graha Sarana Harmoni / Kediaman Mempelai.',
    location: 'Jl. Melati Indah No. 12, Kebon Jeruk, Jakarta Barat (https://maps.app.goo.gl/roJYnbBnbUvhJ2dm7)',
    startDate: new Date('2026-10-24T08:00:00+07:00'),
    endDate: new Date('2026-10-24T17:00:00+07:00'),
  });

  return (
    <section className="relative py-14 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <div className="bg-gradient-to-b from-[#1C1A17] to-[#121110] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#C5A059]/40 relative overflow-hidden">
        
        {/* Background ambient gold shine */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>MENGHITUNG HARI BAHAGIA</span>
          </div>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#F4E8C1] mb-2">
            Hitung Mundur Acara
          </h3>

          <p className="text-xs sm:text-sm text-[#A89E90] max-w-md mx-auto mb-8 font-light">
            Menuju akad nikah dan penyatuan dua insan dalam ikatan suci pernikahan
          </p>

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto mb-10">
            {[
              { label: 'HARI', value: timeLeft.days },
              { label: 'JAM', value: timeLeft.hours },
              { label: 'MENIT', value: timeLeft.minutes },
              { label: 'DETIK', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-lg"
              >
                <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-[#E8D5A3]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-wider text-[#9E9689] font-medium mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Sync Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Google Calendar */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] text-[#1A1816] font-medium text-xs tracking-wider hover:bg-[#EAE4D8] transition-all shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>SIMPAN KE GOOGLE CALENDAR</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            {/* iCalendar (.ics) for Apple/Outlook/Android */}
            <button
              onClick={handleDownloadIcs}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent border border-[#C5A059] text-[#E8D5A3] font-medium text-xs tracking-wider hover:bg-[#C5A059]/20 transition-all shadow-md active:scale-95"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">PENGINGAT DISIMPAN (.ICS)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#C5A059]" />
                  <span>SIMPAN KE HP / OUTLOOK (.ICS)</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-[#8C8275] mt-4 flex items-center justify-center gap-1.5">
            <Bell className="w-3 h-3 text-[#C5A059]" />
            <span>Pengingat otomatis akan muncul di kalender smartphone Anda 24 jam sebelum acara</span>
          </p>
        </div>
      </div>
    </section>
  );
};
