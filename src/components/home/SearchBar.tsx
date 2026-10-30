import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, X } from 'lucide-react';
import { locationsData } from '../../data/locationsData';
import { useApp } from '../../context/AppContext';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { searchFilters, setSearchFilters } = useApp();

  const [locationValue, setLocationValue] = useState(searchFilters.city || '');
  const [dateValue, setDateValue] = useState('');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCityDropdownOpen(false);
        setDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters((prev) => ({
      ...prev,
      city: locationValue,
    }));

    const params = new URLSearchParams();
    if (locationValue) params.set('city', locationValue);
    if (dateValue) params.set('date', dateValue);

    navigate(`/search?${params.toString()}`);
  };

  const handleSelectCity = (cityName: string) => {
    setLocationValue(cityName);
    setCityDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto z-40">
      
      {/* Floating Pill Search Bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-full shadow-[0_12px_40px_-8px_rgba(15,23,42,0.12)] border border-slate-100/90 flex items-center p-2 pl-6 sm:pl-8 transition-shadow hover:shadow-[0_16px_50px_-8px_rgba(35,84,176,0.18)]"
      >
        {/* Left Field: Location / Property */}
        <div
          className="flex-1 cursor-pointer min-w-0 pr-2"
          onClick={() => {
            setCityDropdownOpen(!cityDropdownOpen);
            setDatePickerOpen(false);
          }}
        >
          <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-0.5">
            <span>LOCATION/PROPERTY</span>
            <span className="text-red-500 font-bold">*</span>
          </div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 truncate mt-0.5">
            {locationValue || <span className="text-slate-400">City or venue</span>}
          </div>
        </div>

        {/* Subtle Vertical Divider */}
        <div className="h-8 w-px bg-slate-200 mx-2 sm:mx-6 shrink-0" />

        {/* Right Field: When / Add Dates */}
        <div
          className="flex-1 cursor-pointer min-w-0 pr-2"
          onClick={() => {
            setDatePickerOpen(!datePickerOpen);
            setCityDropdownOpen(false);
          }}
        >
          <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800">
            WHEN
          </div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 truncate mt-0.5">
            {dateValue ? (
              new Date(dateValue).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            ) : (
              <span className="text-slate-400">Add dates</span>
            )}
          </div>
        </div>

        {/* Circular Blue Search Button */}
        <button
          type="submit"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/30 transition-all hover:scale-105 active:scale-95 ml-2"
          aria-label="Search venues"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </form>

      {/* City Dropdown Modal */}
      {cityDropdownOpen && (
        <div className="absolute left-4 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Popular Celebration Cities
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            <button
              type="button"
              onClick={() => handleSelectCity('')}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg flex items-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>All Cities in India</span>
            </button>
            {locationsData.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => handleSelectCity(loc.name)}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary rounded-lg flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{loc.name}</span>
                </div>
                {loc.popular && (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {datePickerOpen && (
        <div className="absolute right-4 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">Select Event Date</span>
            {dateValue && (
              <button
                type="button"
                onClick={() => setDateValue('')}
                className="text-[11px] text-red-500 font-semibold hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <input
            type="date"
            value={dateValue}
            onChange={(e) => {
              setDateValue(e.target.value);
              setDatePickerOpen(false);
            }}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}

    </div>
  );
};
