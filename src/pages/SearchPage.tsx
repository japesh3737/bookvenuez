import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Building2, 
  RotateCcw,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VenueCard } from '../components/venues/VenueCard';
import { FilterSidebar } from '../components/search/FilterSidebar';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { allVenues, searchFilters, updateFilter, resetFilters } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [searchTerm, setSearchTerm] = useState(searchFilters.searchTerm || '');

  // Synchronize URL parameters into filters on mount
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const eventParam = searchParams.get('eventType');
    const categoryParam = searchParams.get('category');
    const guestsParam = searchParams.get('guests');
    const ratingParam = searchParams.get('rating');
    const nameParam = searchParams.get('name');

    if (cityParam) updateFilter('city', cityParam);
    if (eventParam) updateFilter('eventType', eventParam);
    if (categoryParam) updateFilter('category', categoryParam);
    if (guestsParam) updateFilter('guestCount', guestsParam);
    if (ratingParam) updateFilter('rating', Number(ratingParam));
    if (nameParam) setSearchTerm(nameParam);
  }, []);

  // Filter logic
  const filteredVenues = useMemo(() => {
    let result = [...allVenues];

    // Filter by name/search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.locationArea.toLowerCase().includes(q) ||
          v.organizationCategories.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Filter by city
    if (searchFilters.city) {
      result = result.filter(
        (v) => v.city.toLowerCase() === searchFilters.city.toLowerCase()
      );
    }

    // Filter by event type
    if (searchFilters.eventType) {
      result = result.filter((v) =>
        v.eventTypes.some((et) => et.toLowerCase() === searchFilters.eventType.toLowerCase())
      );
    }

    // Filter by category
    if (searchFilters.category) {
      result = result.filter((v) =>
        v.organizationCategories.some((c) => c.toLowerCase() === searchFilters.category.toLowerCase())
      );
    }

    // Filter by guest capacity
    if (searchFilters.guestCount) {
      if (searchFilters.guestCount === '0-50') result = result.filter((v) => v.minGuests <= 50);
      else if (searchFilters.guestCount === '51-100') result = result.filter((v) => v.minGuests <= 100 && v.maxGuests >= 51);
      else if (searchFilters.guestCount === '101-300') result = result.filter((v) => v.minGuests <= 300 && v.maxGuests >= 101);
      else if (searchFilters.guestCount === '301-600') result = result.filter((v) => v.minGuests <= 600 && v.maxGuests >= 301);
      else if (searchFilters.guestCount === '601+') result = result.filter((v) => v.maxGuests >= 600);
    }

    // Filter by rating
    if (searchFilters.rating) {
      result = result.filter((v) => v.rating >= (searchFilters.rating || 0));
    }

    // Filter by food
    if (searchFilters.food) {
      result = result.filter((v) => v.foodOptions.includes(searchFilters.food as any));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.perPlatePriceNumeric - b.perPlatePriceNumeric);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.perPlatePriceNumeric - a.perPlatePriceNumeric);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allVenues, searchFilters, searchTerm, sortBy]);

  // Active filter chips list
  const activeChips = useMemo(() => {
    const list: { label: string; key: keyof typeof searchFilters }[] = [];
    if (searchFilters.city) list.push({ label: searchFilters.city, key: 'city' });
    if (searchFilters.eventType) list.push({ label: searchFilters.eventType, key: 'eventType' });
    if (searchFilters.category) list.push({ label: searchFilters.category, key: 'category' });
    if (searchFilters.guestCount) list.push({ label: `${searchFilters.guestCount} guests`, key: 'guestCount' });
    if (searchFilters.rating) list.push({ label: `${searchFilters.rating}+ Rating`, key: 'rating' });
    if (searchFilters.food) list.push({ label: searchFilters.food.replace('_', ' '), key: 'food' });
    return list;
  }, [searchFilters]);

  const removeChip = (key: keyof typeof searchFilters) => {
    updateFilter(key, key === 'rating' ? undefined : '');
  };

  const dynamicHeading = searchFilters.city
    ? `Banquet Halls & Venues in ${searchFilters.city}`
    : searchFilters.category
    ? `${searchFilters.category} across India`
    : 'Discover Verified Banquet Halls & Wedding Venues';

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Page Title (H1) */}
        <div className="mb-6">
          <nav className="text-xs text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600">Search Venues</span>
            {searchFilters.city && (
              <>
                <span>/</span>
                <span className="text-primary font-semibold">{searchFilters.city}</span>
              </>
            )}
          </nav>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071B45] tracking-tight">
            {dynamicHeading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare verified banquet halls, hotel lawns, and wedding spaces with transparent pricing.
          </p>
        </div>

        {/* Top Control Bar: Search input, Sort selector, Mobile Filter button */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search by Name input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by venue name or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Count, Sort dropdown, Mobile Filter toggle */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 text-xs sm:text-sm">
            <span className="text-slate-500 font-medium whitespace-nowrap">
              <strong>{filteredVenues.length}</strong> venues available
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white font-semibold text-xs shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeChips.length})</span>
            </button>
          </div>

        </div>

        {/* Active Filter Chips Bar */}
        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-xs text-slate-400 font-semibold">Active Filters:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
              >
                <span>{chip.label}</span>
                <button
                  onClick={() => removeChip(chip.key)}
                  className="hover:text-primary-dark"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs text-red-600 hover:underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterSidebar />
          </div>

          {/* Venues Grid */}
          <div className="lg:col-span-3">
            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            ) : (
              /* Friendly Empty State */
              <div className="bg-white rounded-2xl border border-slate-200/90 p-10 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#071B45]">
                  No Venues Match Your Current Filters
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try broadening your search by clearing specific capacity or food filters, or select a different city.
                </p>
                <div>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex justify-end">
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full overflow-y-auto p-4 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-[#071B45]">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
};
