import React from 'react';

interface CoupleAvatarProps {
  type: 'groom' | 'bride' | 'couple';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CoupleIllustration: React.FC<CoupleAvatarProps> = ({
  type,
  className = '',
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    xl: 'w-64 h-64 sm:w-72 sm:h-72',
  }[size];

  if (type === 'groom') {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#C5A059]/40 bg-gradient-to-b from-[#2A2A2A] to-[#121212] ${sizeClasses} ${className}`}>
        {/* Artistic Luxury Vector Illustration of Groom in Black Suit */}
        <svg viewBox="0 0 400 400" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1E1E" />
              <stop offset="50%" stopColor="#121212" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
            <linearGradient id="skinGradGroom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFDFC4" />
              <stop offset="100%" stopColor="#E8B595" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA8232" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Ambient Aura */}
          <radialGradient id="bgGlowGroom" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#3C3428" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#171512" stopOpacity="1" />
          </radialGradient>
          <rect width="400" height="400" fill="url(#bgGlowGroom)" />

          {/* Groom Neck & Body */}
          <g filter="url(#softGlow)">
            {/* White Shirt Collar & Chest */}
            <path d="M165 240 L235 240 L220 310 L180 310 Z" fill="#FFFFFF" />
            
            {/* Neck */}
            <path d="M175 190 L225 190 L225 245 L175 245 Z" fill="url(#skinGradGroom)" />

            {/* Black Tailored Suit (Jas Hitam Elegan) */}
            <path d="M100 400 L135 260 L175 250 L190 330 L160 400 Z" fill="url(#suitGrad)" />
            <path d="M300 400 L265 260 L225 250 L210 330 L240 400 Z" fill="url(#suitGrad)" />

            {/* Lapels (Kerah Jas Hitam) */}
            <path d="M135 260 L185 340 L195 340 L175 248 Z" fill="#242424" stroke="#333" strokeWidth="1" />
            <path d="M265 260 L215 340 L205 340 L225 248 Z" fill="#242424" stroke="#333" strokeWidth="1" />

            {/* Black Bowtie / Formal Tie */}
            <path d="M185 245 L215 245 L208 275 L192 275 Z" fill="#111111" stroke="#444" strokeWidth="1" />
            <circle cx="200" cy="246" r="5" fill="#222" />
            <polygon points="185,243 172,238 172,252 185,248" fill="#1A1A1A" />
            <polygon points="215,243 228,238 228,252 215,248" fill="#1A1A1A" />

            {/* Gold Lapel Pin / Boutonniere */}
            <path d="M160 280 L160 295" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <circle cx="160" cy="278" r="4" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <path d="M162 282 Q168 285 166 290" stroke="#859900" strokeWidth="1.5" fill="none" />

            {/* Head / Face */}
            {/* Jaw / Face outline matching Hanif */}
            <path d="M150 140 Q150 205 200 215 Q250 205 250 140 Q250 100 200 100 Q150 100 150 140 Z" fill="url(#skinGradGroom)" />
            
            {/* Ears */}
            <ellipse cx="148" cy="150" rx="8" ry="14" fill="#E8B595" />
            <ellipse cx="252" cy="150" rx="8" ry="14" fill="#E8B595" />

            {/* Hair (Neat stylish Indonesian groom haircut) */}
            <path d="M145 135 Q145 75 200 70 Q240 70 252 105 Q256 125 252 140 Q248 115 240 105 Q215 90 180 92 Q155 98 145 135 Z" fill="#1A1817" />
            <path d="M160 85 Q200 65 240 75 Q210 70 170 85 Z" fill="#2F2926" />

            {/* Eyebrows */}
            <path d="M165 138 Q180 134 190 138" stroke="#2B2118" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M210 138 Q220 134 235 138" stroke="#2B2118" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <ellipse cx="178" cy="149" rx="5" ry="3.5" fill="#241B15" />
            <circle cx="179" cy="148" r="1.2" fill="#FFFFFF" />
            <ellipse cx="222" cy="149" rx="5" ry="3.5" fill="#241B15" />
            <circle cx="223" cy="148" r="1.2" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M200 148 L200 170 Q196 173 194 172 Q200 176 206 172" stroke="#C99878" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Warm Friendly Smile */}
            <path d="M185 186 Q200 196 215 186" stroke="#9E4D3E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Luxury Badge Label */}
          <rect x="20" y="20" width="130" height="28" rx="6" fill="#1A1816" fillOpacity="0.85" stroke="#C5A059" strokeWidth="1" />
          <text x="85" y="38" textAnchor="middle" fill="#E8D5A3" fontSize="11" fontWeight="600" letterSpacing="1">JAS HITAM ELEGAN</text>
        </svg>
      </div>
    );
  }

  if (type === 'bride') {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#C5A059]/40 bg-gradient-to-b from-[#FFFDF9] to-[#EFE9DF] ${sizeClasses} ${className}`}>
        {/* Artistic Luxury Vector Illustration of Bride in White Hijab & White Gown */}
        <svg viewBox="0 0 400 400" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="hijabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F6F3EE" />
              <stop offset="100%" stopColor="#E7DFD3" />
            </linearGradient>
            <linearGradient id="veilSheer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FAF5EC" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="skinGradBride" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF0E6" />
              <stop offset="100%" stopColor="#FAD8C3" />
            </linearGradient>
            <radialGradient id="bgGlowBride" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFF9EE" />
              <stop offset="100%" stopColor="#EFE8DB" />
            </radialGradient>
          </defs>

          {/* Background Ambient Warm Radiance */}
          <rect width="400" height="400" fill="url(#bgGlowBride)" />

          {/* Outer Bridal Veil Flowing Sheer Fabric */}
          <path d="M120 120 Q80 200 70 400 L330 400 Q320 200 280 120 Z" fill="url(#veilSheer)" stroke="#FFF" strokeWidth="1" strokeDasharray="3 3" />

          {/* Long White Gown (Gaun Pengantin Putih Panjang & Renda) */}
          <path d="M110 400 L145 270 Q200 285 255 270 L290 400 Z" fill="#FFFFFF" stroke="#E3DAC9" strokeWidth="1.5" />
          
          {/* Gown Lace & Pearl Embroidery Details */}
          <path d="M165 280 Q200 295 235 280" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
          <path d="M155 310 Q200 325 245 310" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 3" fill="none" />
          <circle cx="200" cy="287" r="3" fill="#D4AF37" />
          <circle cx="185" cy="285" r="2.5" fill="#D4AF37" />
          <circle cx="215" cy="285" r="2.5" fill="#D4AF37" />
          <circle cx="200" cy="318" r="3" fill="#D4AF37" />

          {/* Hijab Inner & Neck Wrap (Jilbab Putih Syar'i Anggun) */}
          <path d="M155 210 Q200 255 245 210 L250 270 Q200 285 150 270 Z" fill="url(#hijabGrad)" stroke="#DFD7CB" strokeWidth="1" />

          {/* Bride Face */}
          <path d="M162 145 Q162 205 200 215 Q238 205 238 145 Q238 115 200 115 Q162 115 162 145 Z" fill="url(#skinGradBride)" />

          {/* Pristine White Hijab Framing the Face */}
          <path d="M140 130 Q140 70 200 70 Q260 70 260 130 Q260 215 238 225 Q200 235 162 225 Q140 215 140 130 Z" fill="none" stroke="#FFFFFF" strokeWidth="14" />
          <path d="M135 130 Q135 60 200 60 Q265 60 265 130 Q265 230 200 240 Q135 230 135 130 Z" fill="url(#hijabGrad)" stroke="#E0D6C8" strokeWidth="1" />
          
          {/* Re-render face area inside hijab */}
          <path d="M165 140 Q165 198 200 205 Q235 198 235 140 Q235 120 200 120 Q165 120 165 140 Z" fill="url(#skinGradBride)" />

          {/* Delicate Eyebrows */}
          <path d="M172 142 Q183 138 192 142" stroke="#4A3425" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M208 142 Q217 138 228 142" stroke="#4A3425" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Radiant Almond Eyes with Eyelashes */}
          <ellipse cx="182" cy="151" rx="4.8" ry="3.2" fill="#2E2018" />
          <circle cx="183" cy="150" r="1.2" fill="#FFFFFF" />
          <path d="M175 149 Q182 145 188 148" stroke="#1A1817" strokeWidth="1.5" fill="none" />

          <ellipse cx="218" cy="151" rx="4.8" ry="3.2" fill="#2E2018" />
          <circle cx="219" cy="150" r="1.2" fill="#FFFFFF" />
          <path d="M212 148 Q218 145 225 149" stroke="#1A1817" strokeWidth="1.5" fill="none" />

          {/* Soft Blush */}
          <ellipse cx="173" cy="162" rx="7" ry="4" fill="#FF8A8A" fillOpacity="0.25" />
          <ellipse cx="227" cy="162" rx="7" ry="4" fill="#FF8A8A" fillOpacity="0.25" />

          {/* Petite Nose */}
          <path d="M200 152 L200 168 Q197 170 196 169 Q200 172 204 169" stroke="#DBA485" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Sweet Coral Smile (Lips) */}
          <path d="M188 184 Q200 193 212 184" stroke="#D15045" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M189 184 Q200 181 211 184" stroke="#E6685D" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Bridal Crown / Pearl Tiara on Hijab */}
          <g filter="url(#softGlow)">
            <path d="M175 88 Q200 80 225 88" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <circle cx="200" cy="80" r="3.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.2" />
            <circle cx="188" cy="84" r="2.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="212" cy="84" r="2.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="178" cy="88" r="2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="222" cy="88" r="2" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
          </g>

          {/* White Rose Bouquet Details in Arms */}
          <g transform="translate(180, 340)">
            <circle cx="10" cy="0" r="12" fill="#FFFFFF" stroke="#E2D7C5" strokeWidth="1" />
            <circle cx="25" cy="-5" r="11" fill="#FFFDF8" stroke="#E2D7C5" strokeWidth="1" />
            <circle cx="35" cy="8" r="10" fill="#FFFFFF" stroke="#E2D7C5" strokeWidth="1" />
            <circle cx="15" cy="12" r="11" fill="#FFFBF2" stroke="#E2D7C5" strokeWidth="1" />
            <path d="M-5 25 Q20 35 45 25" stroke="#7A9A60" strokeWidth="3" fill="none" />
          </g>

          {/* Luxury Badge Label */}
          <rect x="20" y="20" width="150" height="28" rx="6" fill="#FAF7F2" fillOpacity="0.9" stroke="#C5A059" strokeWidth="1" />
          <text x="95" y="38" textAnchor="middle" fill="#8C6E26" fontSize="11" fontWeight="600" letterSpacing="1">GAUN JILBAB PUTIH</text>
        </svg>
      </div>
    );
  }

  // Combined Couple Portrait
  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A059]/40 bg-gradient-to-b from-[#1C1A17] to-[#121110] ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-center p-6 gap-6">
        <CoupleIllustration type="groom" size="md" />
        <div className="hidden sm:flex flex-col items-center justify-center text-[#D4AF37] my-auto">
          <span className="font-script text-4xl text-[#E8D5A3]">&</span>
          <div className="w-12 h-[1px] bg-[#C5A059]/50 my-2" />
        </div>
        <CoupleIllustration type="bride" size="md" />
      </div>
    </div>
  );
};
