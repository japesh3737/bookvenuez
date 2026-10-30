import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  Sparkles, 
  Users, 
  Star, 
  Layers, 
  Utensils 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { locationsData } from '../../data/locationsData';
import { eventTypesData, organizationCategoriesData } from '../../data/categoriesData';

interface FilterSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '', onCloseMobile }) => {
  const { searchFilters, updateFilter, resetFilters } = useApp();

  const guestBrackets = [
    { label: '0-50 guests', value: '0-50' },
    { label: '51-100 guests', value: '51-100' },
    { label: '101-300 guests', value: '101-300' },
    { label: '301-600 guests', value: '301-600' },
    { label: '601+ guests', value: '601+' },
  ];

  const ratings = [
    { label: '4+ Google rating', value: 4 },
    { label: '4.5+ Google rating', value: 4.5 },
  ];

  const starRatings = [1, 2, 3, 4, 5];

  const foodOptions = [
    { label: 'Veg Only', value: 'veg_only' },
    { label: 'Veg & Non-Veg', value: 'veg_non_veg' },
    { label: 'Jain Food', value: 'jain' },
    { label: 'Outside Catering Allowed', value: 'outside_catering' },
  ];

  return (
    <aside className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="text-base font-bold text-[#071B45]">Filter Venues</h2>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      <div className="space-y-6 text-sm">
        
        {/* City Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Location</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => updateFilter('city', '')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                !searchFilters.city
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Cities
            </button>
            {locationsData.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => updateFilter('city', searchFilters.city === loc.name ? '' : loc.name)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  searchFilters.city === loc.name
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Event Type */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Event Type</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {eventTypesData.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => updateFilter('eventType', searchFilters.eventType === ev.name ? '' : ev.name)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  searchFilters.eventType === ev.name
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {ev.name}
              </button>
            ))}
          </div>
        </div>

        {/* Capacity / Guests */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>Guest Capacity</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {guestBrackets.map((gb) => (
              <button
                key={gb.value}
                type="button"
                onClick={() => updateFilter('guestCount', searchFilters.guestCount === gb.value ? '' : gb.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  searchFilters.guestCount === gb.value
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {gb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Venue Type / Category */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Venue Category</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {organizationCategoriesData.map((cat, i) => (
              <button
                key={i}
                type="button"
                onClick={() => updateFilter('category', searchFilters.category === cat ? '' : cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  searchFilters.category === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Customer Rating</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ratings.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => updateFilter('rating', searchFilters.rating === r.value ? undefined : r.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  searchFilters.rating === r.value
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Food */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-primary" />
            <span>Dietary &amp; Food Policy</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {foodOptions.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => updateFilter('food', searchFilters.food === f.value ? '' : f.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  searchFilters.food === f.value
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {onCloseMobile && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="w-full mt-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm lg:hidden"
        >
          Apply Filters
        </button>
      )}

    </aside>
  );
};
