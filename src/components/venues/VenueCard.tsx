import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CompareToggle } from './CompareToggle';
import { VenueQuickFacts } from './VenueQuickFacts';
import { TravelCard } from '../ui/card-7';
import { VenueItem } from '../../data/venuesData';
import { capacityValue } from '../../data/venuePlanning';
import { useApp } from '../../context/AppContext';

export interface VenueCardProps {
  venue: VenueItem;
  className?: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, className }) => {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useApp();
  const isLiked = isInWishlist(venue.id);

  // Extract clean category badge
  const categoryBadge =
    venue.organizationCategories?.find((c) =>
      ['Wedding', 'Resort', 'Banquet', 'Party', 'Hotel', 'Luxury'].some((k) =>
        c.toLowerCase().includes(k.toLowerCase())
      )
    ) || (venue.eventTypes?.[0] ?? 'Wedding');

  const cleanCategory =
    categoryBadge.replace(/venues?|halls?/gi, '').trim() || 'Wedding';

  const handleBookNow = () => {
    navigate(`/venues/${venue.slug}`);
  };

  const handleCallProperty = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${venue.phone}`;
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(venue.id);
      toast.success(`Removed ${venue.title} from shortlist`);
    } else {
      addToWishlist(venue.id);
      toast.success(`Added ${venue.title} to your shortlist!`);
    }
  };

  const formattedLocation = venue.locationArea
    ? `${venue.locationArea}, ${venue.city}`
    : venue.city;

  return (
    <article className={`min-w-0 ${className || ""}`}><TravelCard
      className="max-w-none"
      imageUrl={venue.imageUrl}
      imageAlt={venue.title}
      title={venue.title}
      location={formattedLocation}
      overview={venue.description}
      price={venue.perPlatePrice}
      pricePeriod="/ plate"
      pricePrefix="Starting"
      rating={venue.rating}
      reviewCount={
        venue.googleReviewCount
          ? venue.googleReviewCount.toLocaleString('en-IN')
          : undefined
      }
      capacity={capacityValue(venue) ? `Up to ${capacityValue(venue)} guests` : 'Layout on enquiry'}
      badge={cleanCategory}
      responseBadge={venue.responseTime || 'Within 24hr'}
      verified={venue.verified}
      ctaText="View Property"
      isLiked={isLiked}
      onBookNow={handleBookNow}
      onCallProperty={handleCallProperty}
      onToggleLike={handleToggleLike}
    /><div className="mt-3 rounded-2xl border border-[#DED8CE] bg-[#FAF8F5] p-4"><VenueQuickFacts venue={venue}/><div className="mt-4"><CompareToggle venue={venue}/></div></div></article>
  );
};

export default VenueCard;
