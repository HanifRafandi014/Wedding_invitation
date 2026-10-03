import React, { useState } from 'react';
import { CreditCard, Copy, Check, Gift, QrCode, X, Heart, Building2, Smartphone } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const DigitalEnvelopeSection: React.FC = () => {
  const { bankAccounts, physicalGiftAddress } = WEDDING_DATA;
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${physicalGiftAddress.receiver} (${physicalGiftAddress.phone}) - ${physicalGiftAddress.address}`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="amplop" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#9A7B38] uppercase">
          Tanda Kasih
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1816] mt-1 mb-3">
          Amplop Digital & Kado Pernikahan
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-md mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda hendak memberi tanda kasih, kami menyediakan transfer online dan alamat kado fisik:
        </p>
      </div>

      {/* Bank & E-Wallet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {bankAccounts.map((acc, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#C5A059]/40 shadow-lg flex flex-col justify-between hover:shadow-xl hover:border-[#C5A059] transition-all relative overflow-hidden"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {acc.bankName.includes('Shopee') ? (
                    <Smartphone className="w-5 h-5 text-[#EE4D2D]" />
                  ) : (
                    <Building2 className="w-5 h-5 text-[#9A7B38]" />
                  )}
                  <span className="font-serif-luxury text-lg font-bold text-[#1A1816]">
                    {acc.bankName}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-neutral-100 text-[#6B6358] tracking-wider">
                  {acc.logo}
                </span>
              </div>

              {/* Account Number */}
              <div className="my-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#C5A059]/20">
                <div className="text-[10px] uppercase tracking-wider text-[#9E9689] font-medium">
                  Nomor Rekening / Virtual:
                </div>
                <div className="font-mono text-base sm:text-lg font-bold text-[#1A1816] tracking-wider my-0.5">
                  {acc.accountNumber}
                </div>
                <div className="text-xs text-[#6B6358]">
                  a.n. <span className="font-semibold text-[#2C2926]">{acc.holderName}</span>
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1816] text-[#F4E8C1] text-xs font-medium hover:bg-[#2C2926] active:scale-95 transition-all shadow-xs"
            >
              {copiedAccount === acc.bankName ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Nomor Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* QRIS & Physical Gift Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* QRIS Card */}
        <div className="bg-white/85 rounded-2xl p-6 border border-[#C5A059]/30 shadow-md flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#9A7B38] font-bold text-sm mb-1">
              <QrCode className="w-4 h-4" />
              <span>QRIS Semua Pembayaran</span>
            </div>
            <p className="text-xs text-[#6B6358] max-w-xs">
              Bisa di-scan dari BCA, Mandiri, BRI, BNI, GoPay, OVO, ShopeePay, dan DANA
            </p>
          </div>
          <button
            onClick={() => setShowQrisModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059] text-xs font-semibold text-[#1A1816] hover:bg-[#1A1816] hover:text-[#F4E8C1] transition-all shadow-xs shrink-0"
          >
            Buka QRIS
          </button>
        </div>

        {/* Physical Gift Card */}
        <div className="bg-white/85 rounded-2xl p-6 border border-[#C5A059]/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#9A7B38] font-bold text-sm mb-1">
              <Gift className="w-4 h-4" />
              <span>Kirim Kado Fisik</span>
            </div>
            <p className="text-xs text-[#2C2926] font-medium">
              {physicalGiftAddress.receiver} ({physicalGiftAddress.phone})
            </p>
            <p className="text-xs text-[#6B6358] mt-0.5 line-clamp-2">
              {physicalGiftAddress.address}
            </p>
          </div>
          <button
            onClick={handleCopyAddress}
            className="mt-3 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/40 text-xs font-medium text-[#2C2926] hover:bg-neutral-100 transition-all"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Alamat Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#A88132]" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* QRIS Modal */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-[#C5A059]/40 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-[#9A7B38] mb-2 uppercase">
              <QrCode className="w-4 h-4" />
              <span>QRIS RESMI NASIONAL</span>
            </div>

            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1816] mb-1">
              Rina & Hanif Wedding
            </h3>
            <p className="text-xs text-[#8C8275] mb-4">
              NMID: ID1020038892182 - Standar QRIS Indonesia
            </p>

            {/* QR Code Graphic */}
            <div className="p-4 bg-white rounded-2xl border-2 border-[#C5A059]/40 shadow-inner flex flex-col items-center justify-center mb-4">
              {/* SVG QR Code Simulation */}
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                {/* QR Pattern */}
                <rect width="200" height="200" fill="#FFFFFF" />
                {/* 3 Main Corners */}
                <rect x="20" y="20" width="50" height="50" fill="#1A1816" rx="4" />
                <rect x="27" y="27" width="36" height="36" fill="#FFFFFF" rx="2" />
                <rect x="35" y="35" width="20" height="20" fill="#1A1816" rx="2" />

                <rect x="130" y="20" width="50" height="50" fill="#1A1816" rx="4" />
                <rect x="137" y="27" width="36" height="36" fill="#FFFFFF" rx="2" />
                <rect x="145" y="35" width="20" height="20" fill="#1A1816" rx="2" />

                <rect x="20" y="130" width="50" height="50" fill="#1A1816" rx="4" />
                <rect x="27" y="137" width="36" height="36" fill="#FFFFFF" rx="2" />
                <rect x="35" y="145" width="20" height="20" fill="#1A1816" rx="2" />

                {/* Simulated Data Pattern Squares */}
                <g fill="#2C2926">
                  <rect x="80" y="25" width="10" height="10" />
                  <rect x="100" y="25" width="15" height="10" />
                  <rect x="85" y="45" width="12" height="12" />
                  <rect x="105" y="45" width="10" height="10" />

                  <rect x="25" y="80" width="10" height="15" />
                  <rect x="45" y="85" width="15" height="10" />
                  <rect x="75" y="75" width="50" height="50" rx="8" fill="#F4E8C1" />
                  <circle cx="100" cy="100" r="16" fill="#C5A059" />
                  
                  <rect x="135" y="80" width="10" height="10" />
                  <rect x="155" y="85" width="15" height="15" />
                  <rect x="140" y="105" width="25" height="10" />

                  <rect x="80" y="135" width="15" height="10" />
                  <rect x="105" y="140" width="10" height="15" />
                  <rect x="85" y="160" width="20" height="10" />
                  
                  <rect x="130" y="130" width="15" height="15" />
                  <rect x="155" y="135" width="20" height="10" />
                  <rect x="140" y="160" width="30" height="15" />
                </g>
                <text x="100" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">QRIS</text>
              </svg>
            </div>

            <p className="text-[11px] text-[#6B6358] mb-4">
              Dapat discan langsung lewat aplikasi m-banking atau e-wallet apa saja
            </p>

            <button
              onClick={() => setShowQrisModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#1A1816] text-[#F4E8C1] text-xs font-semibold hover:bg-[#2C2926]"
            >
              Tutup QRIS
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
