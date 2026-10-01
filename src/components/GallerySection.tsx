import React, { useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Upload, Plus } from 'lucide-react';
import { WEDDING_DATA, GalleryItem } from '../data/weddingData';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(WEDDING_DATA.gallery);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      const newItem: GalleryItem = {
        id: `custom-${Date.now()}`,
        url: newUrl,
        caption: file.name.replace(/\.[^/.]+$/, ""),
        category: 'prewedding',
      };
      setItems([newItem, ...items]);
    }
  };

  return (
    <section id="galeri" className="relative py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#9A7B38] uppercase">
          Kenangan Abadi
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1A1816] mt-1 mb-3">
          Galeri Foto Prewedding & Momen Bahagia
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-md mx-auto">
          Setiap momen adalah goresan rasa syukur yang kami abadikan dalam bingkai cinta
        </p>

        {/* Filter Controls (Segmented buttons) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'Semua Momen' },
            { id: 'prewedding', label: 'Prewedding' },
            { id: 'engagement', label: 'Lamaran' },
            { id: 'details', label: 'Detail & Bunga' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#1A1816] text-[#F4E8C1] shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#6B6358] border border-[#C5A059]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Add Photo Button */}
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-xs font-medium text-[#A88132] border border-[#C5A059] hover:bg-[#FAF8F5] transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Foto Asset</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative h-48 sm:h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-[#C5A059]/30"
          >
            <img
              src={item.url}
              alt={item.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                {item.category}
              </span>
              <p className="font-serif-luxury text-sm font-semibold line-clamp-1">
                {item.caption}
              </p>
            </div>
            
            <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup Galeri"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo Card in Lightbox */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[75vh]">
              <img
                src={filteredItems[selectedPhotoIndex].url}
                alt={filteredItems[selectedPhotoIndex].caption}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="font-serif-luxury text-lg font-medium text-[#F4E8C1]">
                {filteredItems[selectedPhotoIndex].caption}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {selectedPhotoIndex + 1} dari {filteredItems.length} foto
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
