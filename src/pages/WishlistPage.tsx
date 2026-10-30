import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Building2, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VenueCard } from '../components/venues/VenueCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, allVenues, setCompareVenues } = useApp();

  const savedVenues = allVenues.filter((v) => wishlist.includes(v.id));

  const handleCompareAll = () => {
    setCompareVenues(savedVenues.slice(0, 3).map(v => v.id));
  };

  if (savedVenues.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071B45] mb-2">
          Your Shortlist is Empty
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Save banquet halls and resorts while browsing by clicking the bookmark icon on any venue card to review them later.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark transition-all"
        >
          <span>Explore Venues</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold mb-2">
              <Bookmark className="w-3.5 h-3.5 fill-rose-600" />
              <span>Saved Properties</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071B45] tracking-tight">
              My Shortlist ({savedVenues.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your saved venues stored locally for quick comparison and direct quotes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCompareAll}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary/5 text-xs font-bold transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Compare Shortlist</span>
            </button>

            <Link
              to="/rfq"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark text-xs font-bold shadow-md transition-all"
            >
              <span>Get Group Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Saved Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>

      </div>
    </div>
  );
};
