import React, { useState } from 'react';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface VenueGalleryProps {
  images: string[];
  title: string;
}

export const VenueGallery: React.FC<VenueGalleryProps> = ({ images, title }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Grid: 1 large on left, 4 smaller in 2x2 grid on right */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-100 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-[16/9] md:aspect-[21/9]">
          
          {/* Main Hero Photo */}
          <div
            className="md:col-span-2 relative h-full cursor-pointer overflow-hidden group"
            onClick={() => {
              setActiveIdx(0);
              setModalOpen(true);
            }}
          >
            <img
              src={displayImages[0]}
              alt={`${title} main`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Sub Photos */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {displayImages.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer overflow-hidden group h-full"
                onClick={() => {
                  setActiveIdx(i + 1);
                  setModalOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`${title} photo ${i + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

        </div>

        {/* View All Photos Button */}
        <button
          type="button"
          onClick={() => {
            setActiveIdx(0);
            setModalOpen(true);
          }}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm flex items-center gap-2 transition-all hover:scale-105"
        >
          <Images className="w-4 h-4 text-primary" />
          <span>View all {displayImages.length} photos</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image & Controls */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 w-12 h-12 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={displayImages[activeIdx]}
              alt={`${title} enlarged`}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 w-12 h-12 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Counter */}
            <div className="absolute -bottom-10 text-white/80 text-xs font-semibold">
              {activeIdx + 1} of {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
