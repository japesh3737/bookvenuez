import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveHorizontal } from 'lucide-react';
import PolaroidLineCarousel, { type Slide } from '../ui/polaroid-line-carousel';
import { locationsData } from '../../data/locationsData';

// Keep the existing destination names and search filters; assets are local so
// the city photographs don't depend on a third-party image host at runtime.
const cityDetails: Record<string, { image: string; caption: string; alt: string }> = {
  mumbai: { image: 'mumbai', caption: 'Seafront celebrations & iconic city stays.', alt: 'The Taj Mahal Palace on Mumbai’s waterfront at sunset' },
  bangalore: { image: 'bangalore', caption: 'Garden-city charm & elegant urban venues.', alt: 'Vidhana Soudha in Bangalore' },
  pune: { image: 'pune', caption: 'City celebrations with the hills close by.', alt: 'Pune’s cityscape surrounded by green hills' },
  goa: { image: 'goa', caption: 'Palm-lined shores & sunset celebrations.', alt: 'Palm trees along a sandy beach in Goa at sunset' },
  'delhi-ncr': { image: 'delhi', caption: 'Grand occasions in the heart of the capital.', alt: 'India Gate in New Delhi at dusk' },
  gurugram: { image: 'gurugram', caption: 'Contemporary spaces & skyline views.', alt: 'Modern towers in DLF Cyber City, Gurugram' },
  lonavala: { image: 'lonavala', caption: 'Hillside escapes for unforgettable gatherings.', alt: 'An open-air celebration venue overlooking Lonavala’s hills' },
  karjat: { image: 'karjat', caption: 'Green valleys & intimate countryside retreats.', alt: 'Lush green hills and a waterfall near Karjat' },
  igatpuri: { image: 'igatpuri', caption: 'Mountain air & celebrations above the everyday.', alt: 'Golden morning light across the mountains near Igatpuri' },
};
const citySlides: Slide[] = locationsData.map((city) => ({
  image: `/images/cities/${cityDetails[city.slug].image}.webp`,
  title: city.name,
  caption: cityDetails[city.slug].caption,
  alt: cityDetails[city.slug].alt,
}));

export const CityCarousel: React.FC = () => {
  const [active, setActive] = useState(3);
  const city = locationsData[active];

  return (
    <section aria-labelledby="explore-cities-heading" className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-[#DED8CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#DED8CE] bg-[#EFECE6] text-[#1E4D3B] text-xs font-semibold tracking-[0.1em] uppercase mb-2">
            <span>Celebration Destinations</span>
          </div>
          <h2 id="explore-cities-heading" className="font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold text-[#181D1A] tracking-[-0.015em] leading-[1.2]">
            Explore by city
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[rgba(24,29,26,0.68)] leading-[1.6] mt-1 font-normal">
            Discover venues in India&apos;s most popular celebration destinations.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#DED8CE] bg-[#EFECE6]">
          <PolaroidLineCarousel
            slides={citySlides}
            initialIndex={3}
            height="clamp(470px, 48vw, 590px)"
            cardWidth={300}
            sag={34}
            swing={0.65}
            autoplay={0}
            string="#9C907D"
            background="#EFECE6"
            ink="#1E4D3B"
            onChange={setActive}
            ariaLabel="Explore Indian cities — drag photos or use the left and right arrow keys"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-5 sm:px-8 border-t border-[#DED8CE] bg-[#FAF8F5]">
            <p className="inline-flex items-center gap-2 text-xs text-[rgba(24,29,26,0.68)]">
              <MoveHorizontal className="w-4 h-4 text-[#9E4B32]" aria-hidden="true" />
              Drag a little. Discover somewhere new.
            </p>
            <Link reloadDocument to={`/search?city=${encodeURIComponent(city.name)}`} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#1E4D3B] px-5 py-3 text-sm font-semibold text-[#FAF8F5] hover:bg-[#163A2C] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D3B]">
              Explore {city.name}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityCarousel;
