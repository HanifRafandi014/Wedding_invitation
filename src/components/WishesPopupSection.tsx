import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Sparkles, CheckCircle2, User, MapPin, Heart, X } from 'lucide-react';
import { WEDDING_DATA, GuestWish } from '../data/weddingData';

interface WishesPopupSectionProps {
  guestName: string;
}

export const WishesPopupSection: React.FC<WishesPopupSectionProps> = ({ guestName }) => {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guest_wishes');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return WEDDING_DATA.initialWishes;
  });

  const [nameInput, setNameInput] = useState(guestName || '');
  const [cityInput, setCityInput] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [messageInput, setMessageInput] = useState('');
  
  // Real-time animated popup card for newly submitted wish
  const [activePopupWish, setActivePopupWish] = useState<GuestWish | null>(null);

  useEffect(() => {
    if (guestName && !nameInput) {
      setNameInput(guestName);
    }
  }, [guestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !messageInput.trim()) return;

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: nameInput.trim(),
      attendance,
      message: messageInput.trim(),
      createdAt: 'Baru saja',
      city: cityInput.trim() || 'Tamu Undangan',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    // Trigger instant popup message on screen as requested!
    setActivePopupWish(newWish);
    setMessageInput('');
  };

  const handleSelectPreset = (text: string) => {
    setMessageInput(prev => (prev ? `${prev} ${text}` : text));
  };

  return (
    <section id="ucapan" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#9A7B38] uppercase">
          Doa & Restu
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1816] mt-1 mb-3">
          Kartu Ucapan & Konfirmasi Kehadiran (RSVP)
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-md mx-auto">
          Tuliskan doa tulus dan pesan manis Anda. Ucapan Anda akan langsung tampil di layar sebagai pesan popup!
        </p>
      </div>

      {/* Grid: Form & Live Wish Feed */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (5 cols) */}
        <div className="md:col-span-5 bg-white/90 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-[#C5A059]/40 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#C5A059]/20">
            <MessageSquareHeart className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1816]">
              Kirim Doa Restu
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-xs font-semibold text-[#555048] mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Contoh: Rian Pratama & Rekan"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl focus:outline-none focus:border-[#C5A059] text-[#1A1816]"
                />
                <User className="w-3.5 h-3.5 text-[#9E9689] absolute right-3 top-3" />
              </div>
            </div>

            {/* City / Relationship */}
            <div>
              <label className="block text-xs font-semibold text-[#555048] mb-1">
                Kota Asal / Hubungan
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Contoh: Jakarta / Sahabat Kuliah"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl focus:outline-none focus:border-[#C5A059] text-[#1A1816]"
                />
                <MapPin className="w-3.5 h-3.5 text-[#9E9689] absolute right-3 top-3" />
              </div>
            </div>

            {/* Attendance Status */}
            <div>
              <label className="block text-xs font-semibold text-[#555048] mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hadir', label: 'Hadir' },
                  { id: 'ragu', label: 'Masih Ragu' },
                  { id: 'tidak_hadir', label: 'Berhalangan' },
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setAttendance(opt.id as 'hadir' | 'ragu' | 'tidak_hadir')}
                    className={`py-2 px-1 text-[11px] font-medium rounded-xl border text-center transition-all ${
                      attendance === opt.id
                        ? 'bg-[#1A1816] text-[#F4E8C1] border-[#1A1816] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#C5A059]/30 text-[#6B6358] hover:bg-neutral-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Templates */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#9E9689] font-semibold mb-1">
                Templat Doa Cepat:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Barakallahu lakuma wa jama\'a bainakuma fii khair',
                  'Selamat menempuh hidup baru!',
                  'Semoga sakinah mawaddah warahmah',
                ].map((txt, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleSelectPreset(txt)}
                    className="text-[10px] px-2 py-1 bg-[#FAF8F5] hover:bg-[#F4E8C1]/40 border border-[#C5A059]/30 rounded-lg text-[#6B6358] text-left transition-colors"
                  >
                    + {txt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Box */}
            <div>
              <label className="block text-xs font-semibold text-[#555048] mb-1">
                Ucapan & Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Tuliskan ucapan dan untaian doa terbaik untuk kedua mempelai..."
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl focus:outline-none focus:border-[#C5A059] text-[#1A1816] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1A1816] text-[#F4E8C1] text-xs font-semibold hover:bg-[#2C2926] shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Kirimkan Ucapan (Muncul Langsung)</span>
            </button>
          </form>
        </div>

        {/* Live Wishes Feed (7 cols) */}
        <div className="md:col-span-7 bg-white/70 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-[#C5A059]/30 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C5A059]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif-luxury text-lg font-bold text-[#1A1816]">
                Untaian Doa Tamu Undangan
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#9A7B38] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#C5A059]/30">
              {wishes.length} Doa
            </span>
          </div>

          {/* Wishes List (Scrollable) */}
          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#C5A059]/25 shadow-xs hover:border-[#C5A059]/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury font-bold text-sm text-[#1A1816]">
                      {item.name}
                    </span>
                    {item.city && (
                      <span className="text-[10px] text-[#9E9689] italic">
                        ({item.city})
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.attendance === 'hadir'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.attendance === 'ragu'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {item.attendance === 'hadir'
                      ? '✓ Hadir'
                      : item.attendance === 'ragu'
                      ? '? Ragu'
                      : '✕ Berhalangan'}
                  </span>
                </div>

                <p className="text-xs text-[#4A453E] leading-relaxed">
                  {item.message}
                </p>

                <div className="mt-2 text-[10px] text-[#9E9689] flex items-center justify-between">
                  <span>{item.createdAt}</span>
                  <Heart className="w-3 h-3 text-[#D4AF37]/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP MODAL NOTIFICATION (Kartu Ucapan Muncul Langsung di Layar untuk Tamu) */}
      {activePopupWish && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-[#C5A059] relative animate-in fade-in zoom-in-95 duration-300 text-center">
            
            {/* Close Button */}
            <button
              onClick={() => setActivePopupWish(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sparkle Badge */}
            <div className="w-14 h-14 rounded-full bg-[#1A1816] text-[#D4AF37] border-2 border-[#C5A059] flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-[11px] font-bold tracking-[0.2em] text-[#9A7B38] uppercase">
              PESAN POPUP UNTUK TAMU
            </span>

            <h3 className="font-serif-luxury text-2xl font-bold text-[#1A1816] mt-1 mb-2">
              Jazakumullahu Khairan!
            </h3>

            <p className="text-xs text-[#6B6358] mb-5">
              Terima kasih atas doa dan ucapan hangat dari <span className="font-bold text-[#1A1816]">{activePopupWish.name}</span>
            </p>

            {/* The Wish Card Display */}
            <div className="p-4 bg-white rounded-2xl border border-[#C5A059]/40 shadow-inner mb-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-luxury font-bold text-sm text-[#1A1816]">
                  {activePopupWish.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {activePopupWish.attendance === 'hadir' ? 'Akan Hadir' : 'Konfirmasi Terkirim'}
                </span>
              </div>
              <p className="text-xs text-[#2C2926] leading-relaxed italic">
                "{activePopupWish.message}"
              </p>
            </div>

            <button
              onClick={() => setActivePopupWish(null)}
              className="w-full py-3 rounded-full bg-[#1A1816] text-[#F4E8C1] text-xs font-semibold tracking-wider hover:bg-[#2C2926] transition-all shadow-md"
            >
              TUTUP POPUP UCAPAN
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
