import React, { useState, useEffect } from 'react';
import { HeroCover } from './components/HeroCover';
import { QuranSection } from './components/QuranSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { EventScheduleSection } from './components/EventScheduleSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { DigitalEnvelopeSection } from './components/DigitalEnvelopeSection';
import { WishesPopupSection } from './components/WishesPopupSection';
import { ClosingSection } from './components/ClosingSection';
import { AudioPlayer } from './components/AudioPlayer';
import { FallingPetals } from './components/FallingPetals';
import { BottomNavBar } from './components/BottomNavBar';
import { Share2, Smartphone, Monitor, Check } from 'lucide-react';
import { WEDDING_DATA } from './data/weddingData';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [deviceFrameMode, setDeviceFrameMode] = useState(false); // phone frame on desktop toggle
  const [copiedLink, setCopiedLink] = useState(false);

  // Parse guest name from URL query parameter e.g. ?to=Bapak+Ahmad
  const [guestName, setGuestName] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('to') || params.get('u') || params.get('guest');
      return name ? decodeURIComponent(name) : 'Tamu Undangan';
    } catch {
      return 'Tamu Undangan';
    }
  });

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setAutoPlayAudio(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('to', guestName);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2C2926] relative flex flex-col items-center">
      {/* Background Ambience */}
      <div className="fixed inset-0 paper-texture opacity-70 pointer-events-none" />

      {/* Opening Envelope / Hero Screen */}
      <HeroCover
        isOpen={isOpen}
        onOpenInvitation={handleOpenInvitation}
        guestName={guestName}
        onUpdateGuestName={setGuestName}
      />

      {/* Desktop Mode Controls Bar (Visible on desktop for testing layout & sharing) */}
      <div className="hidden lg:flex fixed top-4 right-4 z-30 items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 shadow-lg text-xs">
        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
            deviceFrameMode ? 'bg-[#1A1816] text-[#F4E8C1]' : 'text-[#6B6358] hover:text-[#1A1816]'
          }`}
        >
          {deviceFrameMode ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          <span>{deviceFrameMode ? 'Tampilan HP' : 'Tampilan Penuh'}</span>
        </button>

        <button
          onClick={handleShareLink}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C5A059]/30 text-[#2C2926] hover:bg-[#1A1816] hover:text-white transition-colors"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />}
          <span>{copiedLink ? 'Link Tersalin!' : 'Bagi Undangan'}</span>
        </button>
      </div>

      {/* Main Content Container (Mobile-first responsive frame or wide fluid) */}
      <div
        className={`w-full relative transition-all duration-300 ${
          deviceFrameMode
            ? 'max-w-md my-8 shadow-2xl rounded-[40px] overflow-hidden border-8 border-[#2C2926] bg-[#FAF8F5]'
            : 'max-w-5xl'
        }`}
      >
        {/* Top Hero Banner in Invitation */}
        <header id="top" className="pt-20 pb-12 px-4 sm:px-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#9A7B38] mb-3">
            <span>UNDANGAN DIGITAL PERNIKAHAN</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-medium text-[#1A1816] tracking-wide mb-3">
            {WEDDING_DATA.bride.name}{' '}
            <span className="font-script text-4xl sm:text-6xl md:text-7xl text-[#C5A059] font-normal">
              &
            </span>{' '}
            {WEDDING_DATA.groom.name}
          </h1>

          <p className="font-serif-luxury text-sm sm:text-base tracking-[0.25em] text-[#6B6358] uppercase mb-4">
            Sabtu, 17 November 2029 • Pasuruan, Jawa Timur
          </p>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-6" />

          <p className="text-xs text-[#8C8275] max-w-sm mx-auto italic">
            "Dan Kami jadikan kamu berpasang-pasangan untuk saling melengkapi dan menyempurnakan ibadah"
          </p>
        </header>

        {/* 1. Ayat Al-Qur'an tentang Pernikahan */}
        <QuranSection />

        {/* 2. Profil Mempelai (Jas Hitam & Gaun Jilbab Putih) */}
        <CoupleSection />

        {/* 3. Hitung Mundur & Sinkronisasi Kalender */}
        <CountdownSection />

        {/* 4. Jadwal Acara (Akad & Resepsi) & Peta Interaktif */}
        <EventScheduleSection />

        {/* 5. Kisah Perjalanan Pertemuan Pasangan */}
        <LoveStorySection />

        {/* 6. Galeri Foto Prewedding & Detail */}
        <GallerySection />

        {/* 7. Amplop Digital & Rekening Transfer Online */}
        <DigitalEnvelopeSection />

        {/* 8. Kartu Ucapan Tamu & Pesan Popup Langsung */}
        <WishesPopupSection guestName={guestName} />

        {/* 9. Penutup & Ungkapan Terima Kasih */}
        <ClosingSection />
      </div>

      {/* Floating Audio Controller */}
      <AudioPlayer autoPlayTriggered={autoPlayAudio} />

      {/* Falling Flower Petals Animation Toggle */}
      <FallingPetals />

      {/* Bottom Navigation Bar */}
      {isOpen && (
        <BottomNavBar onNavClick={handleNavClick} activeSection={activeSection} />
      )}
    </div>
  );
}
