import React, { useState, useEffect } from 'react';
import { Flower2 } from 'lucide-react';

export const FallingPetals: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    // Generate 18 floating petal elements with random positions
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 8,
      duration: 7 + Math.random() * 8,
      size: 10 + Math.random() * 12,
    }));
    setPetals(items);
  }, []);

  return (
    <>
      {/* Toggle button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setEnabled(!enabled)}
          title={enabled ? 'Matikan Kelopak Bunga' : 'Nyalakan Kelopak Bunga'}
          aria-label="Animasi Bunga"
          className={`w-10 h-10 rounded-full shadow-lg border border-[#C5A059]/40 flex items-center justify-center transition-all ${
            enabled
              ? 'bg-[#1A1816] text-[#D4AF37]'
              : 'bg-white/80 text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Flower2 className="w-4 h-4" />
        </button>
      </div>

      {/* Falling animation container */}
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {petals.map((p) => (
            <div
              key={p.id}
              className="absolute text-[#D4AF37]/50"
              style={{
                left: `${p.left}%`,
                top: '-20px',
                animation: `float-petal ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
                fontSize: `${p.size}px`,
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}
    </>
  );
};
