import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Phone, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { VenueItem } from '../../data/venuesData';
import { CompareToggle } from '../venues/CompareToggle';
import { VenueQuickFacts } from '../venues/VenueQuickFacts';
import { HeroCarousel } from '../ui/hero-carousel';
import { useApp } from '../../context/AppContext';

interface VenueCarouselProps {
  title: string;
  subtitle: string;
  venues: VenueItem[];
  viewAllLink?: string;
}

export const VenueCarousel: React.FC<VenueCarouselProps> = ({ title, subtitle, venues }) => {
  const [index, setIndex] = useState(0);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useApp();
  if (!venues?.length) return null;
  const activeIndex = Math.min(index, venues.length - 1);
  const venue = venues[activeIndex];
  const saved = isInWishlist(venue.id);
  const items = venues.map(item => ({
    id: item.id,
    title: item.title,
    image: item.imageUrl,
    credit: item.locationArea ? `${item.locationArea}, ${item.city}` : item.city,
    meta: [`${item.rating} ★`, item.maxBookingCapacity, item.perPlatePrice],
    accent: '#1E4D3B',
  }));

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-[#DED8CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#DED8CE] bg-[#EFECE6] text-[#1E4D3B] text-xs font-semibold tracking-[0.1em] uppercase mb-2">
            <span>Curated Collection</span>
          </div>
          <h2 className="font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold text-[#181D1A] tracking-[-0.015em] leading-[1.2]">{title}</h2>
          <p className="text-[15px] sm:text-[16px] text-[rgba(24,29,26,0.68)] leading-[1.6] mt-1 font-normal">{subtitle}</p>
        </div>
        <div className="overflow-hidden border border-[#DED8CE] bg-[#EFECE6]">
          <HeroCarousel items={items} index={activeIndex} onIndexChange={setIndex} ariaLabel={title} className="h-[540px] sm:h-[480px] bg-[#EFECE6]" />
          <div className="border-t border-[#DED8CE] p-4 sm:px-6"><VenueQuickFacts venue={venue}/></div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6">
            <div className="flex gap-2">
              <button type="button" aria-label={`${saved ? 'Remove' : 'Save'} ${venue.title}${saved ? ' from shortlist' : ''}`} aria-pressed={saved} onClick={() => {
                if (saved) removeFromWishlist(venue.id); else addToWishlist(venue.id);
                toast.success(`${saved ? 'Removed from' : 'Added to'} your shortlist`);
              }} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DED8CE] px-4 text-sm text-[#1E4D3B] hover:bg-[#EFECE6]">
                <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Shortlist'}
              </button>
              <a href={`tel:${venue.phone}`} aria-label={`Call ${venue.title}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DED8CE] px-4 text-sm text-[#1E4D3B] hover:bg-[#EFECE6]"><Phone size={16} />Call</a>
            </div>
            <CompareToggle venue={venue}/>
            <Link to={`/venues/${venue.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1E4D3B] px-5 text-sm font-semibold text-white hover:bg-[#163A2C]">View Property<ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default VenueCarousel;
