import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Check,
  Compass,
  User,
  Shield,
  Phone,
  Bookmark,
  Menu,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { SiteNavigation } from '../layout/Header';
import { TiltedGridHero } from '../ui/tilted-grid-hero';
import { useApp } from '../../context/AppContext';
import { AESTHETIC_INDIAN_HOTELS, POPULAR_DESTINATIONS } from '../../data/hotelsData';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { updateFilter } = useApp();

  // Search state
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);

  // Dropdown UI toggles
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [datesPopoverOpen, setDatesPopoverOpen] = useState(false);
  const [guestsPopoverOpen, setGuestsPopoverOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString('en-CA');
  const earliestCheckout = checkIn ? (() => {
    const date = new Date(`${checkIn}T12:00:00`);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('en-CA');
  })() : today;

  // Close search popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setDestDropdownOpen(false);
        setDatesPopoverOpen(false);
        setGuestsPopoverOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDestDropdownOpen(false);
        setDatesPopoverOpen(false);
        setGuestsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDestDropdownOpen(false);
    setDatesPopoverOpen(false);
    setGuestsPopoverOpen(false);

    updateFilter('city', destination === 'All Destinations in India' ? '' : destination.split(',')[0].trim());
    updateFilter('guestCount', `${guestsCount} Guests`);

    const params = new URLSearchParams();
    if (destination && destination !== 'All Destinations in India') {
      params.set('city', destination.split(',')[0].trim());
    }
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', `${guestsCount}`);
    params.set('rooms', `${roomsCount}`);

    navigate(`/search?${params.toString()}`);
  };

  const formattedDateRange = () => {
    if (!checkIn) return 'Select Dates';
    const d1 = new Date(checkIn);
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    if (!checkOut) return `${d1.toLocaleDateString('en-IN', opts)} — Check-out`;
    const d2 = new Date(checkOut);
    return `${d1.toLocaleDateString('en-IN', opts)} — ${d2.toLocaleDateString('en-IN', opts)}`;
  };

  return (
    <section className="relative w-full bg-[#FAF8F5] text-[#181D1A] flex flex-col justify-between selection:bg-[#1E4D3B]/20 selection:text-[#181D1A] font-sans">
      {/* ── Ambient Surface Depth Gradients ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,77,59,0.035),_transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(200,109,81,0.025),_transparent_60%)]"
      />

      {/* ── Top Navigation Bar: Sticky Translucent Ivory Header ── */}
      <div className="sticky top-0 z-[150]"><SiteNavigation /></div>

      {/* ── Top Hero Content: Asymmetric 2-Column Editorial Headline ── */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-3 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end">
          
          {/* Left Column (lg:col-span-7): Eyebrow & Editorial Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Unified Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DED8CE] bg-[#EFECE6] text-[#1E4D3B] text-xs font-semibold tracking-[0.1em] uppercase mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
              <span>Curated Boutique Hotels &amp; Retreats</span>
            </div>

            <h1 className="font-serif text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium tracking-tight text-[#181D1A] leading-[1.08]">
              Stay somewhere <br />
              <span className="italic font-normal text-[#1E4D3B]">
                unforgettable in India.
              </span>
            </h1>
          </div>

          {/* Right Column (lg:col-span-5): Description & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-end items-start text-left lg:pl-4">
            <p className="text-[15px] sm:text-[16px] text-[rgba(24,29,26,0.68)] leading-[1.6] max-w-lg mb-4 sm:mb-5 font-normal">
              From sun-drenched Portuguese pool villas in Goa and misty cliffside retreats across the Seven Sisters to royal lake palaces in Udaipur.
            </p>

            {/* Action Buttons Pair */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#1E4D3B] hover:bg-[#163A2C] active:bg-[#102B20] text-[#FAF8F5] font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all active:scale-95"
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>Explore Aesthetic Stays</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5 shrink-0" />
              </Link>

              <Link
                to="/rfq"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#181D1A] border border-[#DED8CE] font-medium text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-[#1E4D3B] shrink-0" />
                <span>Concierge Desk</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Middle Zone: Full-Viewport-Width Strip Container for the 16-slice concave curved drum ── */}
      <div id="featured-stays" className="w-full relative h-[240px] sm:h-[320px] lg:h-[380px] my-2 sm:my-4 overflow-hidden z-20">
        <TiltedGridHero
          images={AESTHETIC_INDIAN_HOTELS}
          tileHeight={58}
          aspectRatio={16 / 9}
          gap={10}
          axis={50}
          curve={68}
          fade={8}
          speed={6}
          className="w-full h-full"
        />
      </div>

      {/* ── Bottom Zone: Floating Booking Bar + Trust Indicators ── */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 w-full pb-6 sm:pb-8">
        
        <div ref={searchContainerRef} className="relative w-full">
          <form
            onSubmit={handleSearch}
            className="bg-white border border-[rgba(24,29,26,0.10)] rounded-2xl lg:rounded-full shadow-[0_16px_40px_rgba(24,29,26,0.06)] p-2 sm:p-2.5 flex flex-col lg:flex-row items-center gap-2 lg:gap-2.5 transition-all hover:border-[#1E4D3B]/35"
          >
            {/* Field 1: Destination / Stay Selector */}
            <div className="relative flex-1 w-full">
              <button
                type="button"
                aria-expanded={destDropdownOpen}
                onClick={() => {
                  setDestDropdownOpen(!destDropdownOpen);
                  setDatesPopoverOpen(false);
                  setGuestsPopoverOpen(false);
                }}
                className="w-full flex items-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl lg:rounded-full hover:bg-[#EFECE6]/50 transition text-left border border-transparent"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D3B] shrink-0 mr-3" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[rgba(24,29,26,0.52)]">
                    Destination / Stay
                  </span>
                  <span className="block text-xs sm:text-sm text-[#181D1A] truncate font-medium mt-0.5">
                    {destination || 'Goa, Udaipur, Meghalaya...'}
                  </span>
                </div>
              </button>

              {/* Destination Dropdown Menu */}
              {destDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-xl border border-[#DED8CE] p-2.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-[rgba(24,29,26,0.52)] tracking-wider">
                    Popular Curated Regions
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <button
                        key={dest.name}
                        type="button"
                        onClick={() => {
                          setDestination(dest.name);
                          setDestDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#EFECE6] transition flex flex-col"
                      >
                        <span className="font-semibold text-[#181D1A]">{dest.name}</span>
                        <span className="text-[11px] text-[rgba(24,29,26,0.68)]">{dest.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-[#DED8CE]" />

            {/* Field 2: Dates Selector */}
            <div className="relative flex-1 w-full">
              <button
                type="button"
                aria-expanded={datesPopoverOpen}
                onClick={() => {
                  setDatesPopoverOpen(!datesPopoverOpen);
                  setDestDropdownOpen(false);
                  setGuestsPopoverOpen(false);
                }}
                className="w-full flex items-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl lg:rounded-full hover:bg-[#EFECE6]/50 transition text-left border border-transparent"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D3B] shrink-0 mr-3" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[rgba(24,29,26,0.52)]">
                    Check-in — Check-out
                  </span>
                  <span className="block text-xs sm:text-sm text-[#181D1A] truncate font-medium mt-0.5">
                    {formattedDateRange()}
                  </span>
                </div>
              </button>

              {/* Dates Popover */}
              {datesPopoverOpen && (
                <div className="absolute left-0 sm:left-auto lg:left-0 top-full mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-xl border border-[#DED8CE] p-4 z-50 animate-in fade-in duration-150 space-y-3">
                  <div className="text-xs font-bold text-[#181D1A]">Select Travel Dates</div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-[rgba(24,29,26,0.52)] uppercase">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        aria-label="Check-in"
                        min={today}
                        onChange={(e) => { setCheckIn(e.target.value); if (checkOut && checkOut <= e.target.value) setCheckOut(''); }}
                        className="w-full mt-1 px-3 py-1.5 text-xs rounded-lg border border-[#DED8CE] bg-[#FAF8F5] text-[#181D1A] focus:outline-none focus:border-[#1E4D3B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[rgba(24,29,26,0.52)] uppercase">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        aria-label="Check-out"
                        min={earliestCheckout}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full mt-1 px-3 py-1.5 text-xs rounded-lg border border-[#DED8CE] bg-[#FAF8F5] text-[#181D1A] focus:outline-none focus:border-[#1E4D3B]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#DED8CE]">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckIn('');
                        setCheckOut('');
                      }}
                      className="text-[11px] text-[rgba(24,29,26,0.68)] hover:text-rose-600 font-medium"
                    >
                      Reset Dates
                    </button>
                    <button
                      type="button"
                      onClick={() => setDatesPopoverOpen(false)}
                      className="px-3 py-1 rounded-full bg-[#1E4D3B] text-[#FAF8F5] text-xs font-semibold hover:bg-[#163A2C]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-[#DED8CE]" />

            {/* Field 3: Guests & Rooms Selector */}
            <div className="relative flex-1 w-full">
              <button
                type="button"
                aria-expanded={guestsPopoverOpen}
                onClick={() => {
                  setGuestsPopoverOpen(!guestsPopoverOpen);
                  setDestDropdownOpen(false);
                  setDatesPopoverOpen(false);
                }}
                className="w-full flex items-center px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl lg:rounded-full hover:bg-[#EFECE6]/50 transition text-left border border-transparent"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E4D3B] shrink-0 mr-3" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[rgba(24,29,26,0.52)]">
                    Guests &amp; Rooms
                  </span>
                  <span className="block text-xs sm:text-sm text-[#181D1A] truncate font-medium mt-0.5">
                    {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}, {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}
                  </span>
                </div>
              </button>

              {/* Guests & Rooms Popover */}
              {guestsPopoverOpen && (
                <div className="absolute right-0 top-full mt-2 w-full sm:w-72 bg-white rounded-2xl shadow-xl border border-[#DED8CE] p-4 z-50 animate-in fade-in duration-150 space-y-3">
                  <div className="text-xs font-bold text-[#181D1A]">Configure Party Size</div>
                  
                  {/* Guests Stepper */}
                  <div className="flex items-center justify-between py-1.5">
                    <div>
                      <div className="text-xs font-semibold text-[#181D1A]">Total Guests</div>
                      <div className="text-[10px] text-[rgba(24,29,26,0.52)]">Adults &amp; Children</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease guests"
                        disabled={guestsCount === 1}
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="w-7 h-7 rounded-full border border-[#DED8CE] flex items-center justify-center text-[#181D1A] hover:bg-[#FAF8F5] transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#181D1A]">{guestsCount}</span>
                      <button
                        type="button"
                        aria-label="Increase guests"
                        disabled={guestsCount === 16}
                        onClick={() => setGuestsCount(Math.min(16, guestsCount + 1))}
                        className="w-7 h-7 rounded-full border border-[#DED8CE] flex items-center justify-center text-[#181D1A] hover:bg-[#FAF8F5] transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Rooms Stepper */}
                  <div className="flex items-center justify-between py-1.5 border-t border-[#DED8CE]">
                    <div>
                      <div className="text-xs font-semibold text-[#181D1A]">Number of Rooms</div>
                      <div className="text-[10px] text-[rgba(24,29,26,0.52)]">Suites / Villas</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease rooms"
                        disabled={roomsCount === 1}
                        onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                        className="w-7 h-7 rounded-full border border-[#DED8CE] flex items-center justify-center text-[#181D1A] hover:bg-[#FAF8F5] transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#181D1A]">{roomsCount}</span>
                      <button
                        type="button"
                        aria-label="Increase rooms"
                        disabled={roomsCount === 8}
                        onClick={() => setRoomsCount(Math.min(8, roomsCount + 1))}
                        className="w-7 h-7 rounded-full border border-[#DED8CE] flex items-center justify-center text-[#181D1A] hover:bg-[#FAF8F5] transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DED8CE] flex justify-end">
                    <button
                      type="button"
                      onClick={() => setGuestsPopoverOpen(false)}
                      className="px-4 py-1.5 rounded-full bg-[#1E4D3B] text-[#FAF8F5] text-xs font-semibold hover:bg-[#163A2C]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full lg:w-auto px-6 py-3 sm:py-3.5 rounded-xl lg:rounded-full bg-[#1E4D3B] hover:bg-[#163A2C] active:bg-[#102B20] text-[#FAF8F5] font-semibold text-xs sm:text-sm transition shadow-xs active:scale-95 flex items-center justify-center gap-2 shrink-0 group"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Search Stays</span>
            </button>
          </form>
        </div>

        {/* ── Trust Highlights ── */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-10 mt-4 sm:mt-5 text-[11px] sm:text-xs text-[rgba(24,29,26,0.68)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
            <span>Curated Aesthetic Properties</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Check className="w-3.5 h-3.5 text-[#1E4D3B] shrink-0" />
            <span>Zero Booking Convenience Fee</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Shield className="w-3.5 h-3.5 text-[#1E4D3B] shrink-0" />
            <span>Direct Hotelier Perks</span>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;

