import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Layers, 
  Clock, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  ArrowLeft,
  Building2,
  Utensils
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VenueGallery } from '../components/venues/VenueGallery';
import { VenueSpaces } from '../components/venues/VenueSpaces';
import { VenueAmenities } from '../components/venues/VenueAmenities';
import { BookingWidget } from '../components/venues/BookingWidget';
import { FaqSection } from '../components/home/FaqSection';

export const VenueDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { allVenues, isInWishlist, addToWishlist, removeFromWishlist, isInCompare, addToCompare, removeFromCompare } = useApp();

  const [copied, setCopied] = useState(false);

  const venue = allVenues.find((v) => v.slug === slug);

  if (!venue) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#071B45] mb-2">Venue Not Found</h1>
        <p className="text-slate-500 text-sm mb-6">
          The requested venue profile does not exist or may have been renamed.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Venues</span>
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(venue.id);
  const isCompared = isInCompare(venue.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/search" className="hover:text-primary transition-colors">Venues</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/search?city=${encodeURIComponent(venue.city)}`} className="hover:text-primary transition-colors">
            {venue.city}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-semibold truncate max-w-[200px] sm:max-w-none">
            {venue.title}
          </span>
        </nav>

        {/* Top Venue Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                {venue.starRating} Star Property
              </span>
              {venue.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Partner
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                <Clock className="w-3 h-3 text-slate-400" />
                Response {venue.responseTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071B45] tracking-tight">
              {venue.title}
            </h1>

            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 mt-2 flex-wrap">
              <div className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{venue.address}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 text-white text-xs font-bold">
                  <Star className="w-3 h-3 fill-white" />
                  <span>{venue.rating.toFixed(1)}</span>
                </div>
                <span className="font-semibold text-slate-700">
                  ({venue.googleReviewCount} Google reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Share, Compare, Shortlist */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => isCompared ? removeFromCompare(venue.id) : addToCompare(venue.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all ${
                isCompared
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => isFavorited ? removeFromWishlist(venue.id) : addToWishlist(venue.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all ${
                isFavorited
                  ? 'border-rose-500 bg-rose-500 text-white shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-white' : ''}`} />
              <span>{isFavorited ? 'Saved' : 'Shortlist'}</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="mb-8">
          <VenueGallery images={venue.imageUrls} title={venue.title} />
        </div>

        {/* 2-Column Content Layout: Left Details + Right Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Details, Spaces, Amenities, FAQs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stat Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Capacity</span>
                <span className="text-sm font-extrabold text-[#071B45]">{venue.maxBookingCapacity}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Starts At</span>
                <span className="text-sm font-extrabold text-primary">{venue.perPlatePrice}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Food Policy</span>
                <span className="text-sm font-extrabold text-[#071B45]">
                  {venue.foodOptions.includes('veg_only') ? 'Pure Veg / Jain' : 'Veg & Non-Veg'}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Response</span>
                <span className="text-sm font-extrabold text-emerald-600">{venue.responseTime}</span>
              </div>
            </div>

            {/* About Venue Section */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
              <h2 className="text-xl font-bold text-[#071B45] mb-3">About {venue.title}</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {venue.description}
              </p>
            </div>

            {/* Available Spaces */}
            <VenueSpaces spaces={venue.spaces} />

            {/* Amenities Grid */}
            <VenueAmenities amenities={venue.amenitiesList} />

            {/* Location & Map Section */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-[#071B45]">Location &amp; Accessibility</h2>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-slate-700">
                  <strong>Address:</strong> {venue.address}
                </div>
              </div>
              <div className="relative aspect-[21/9] rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center text-slate-400">
                <div className="text-center space-y-1">
                  <MapPin className="w-8 h-8 text-primary/60 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">Google Maps &amp; Street View Experience</p>
                  <p className="text-[11px] text-slate-400">{venue.locationArea}, {venue.city}</p>
                </div>
              </div>
            </div>

            {/* Venue Specific FAQs */}
            {venue.faqs && venue.faqs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
                <h2 className="text-xl font-bold text-[#071B45] mb-4">Venue FAQs</h2>
                <div className="space-y-3">
                  {venue.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h3 className="font-bold text-sm text-slate-800 mb-1">{faq.question}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Booking / Availability Widget */}
          <div className="lg:col-span-1">
            <BookingWidget venue={venue} />
          </div>

        </div>

      </div>
    </div>
  );
};
