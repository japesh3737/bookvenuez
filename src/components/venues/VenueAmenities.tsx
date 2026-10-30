import React from 'react';
import { 
  Car, 
  Wind, 
  Sparkles, 
  Zap, 
  Heart, 
  UtensilsCrossed, 
  Wifi, 
  Wine, 
  Waves, 
  ShieldAlert, 
  Power,
  Tv,
  Check
} from 'lucide-react';

interface VenueAmenitiesProps {
  amenities: string[];
}

export const VenueAmenities: React.FC<VenueAmenitiesProps> = ({ amenities }) => {
  const getIcon = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes('parking') || l.includes('valet')) return Car;
    if (l.includes('air') || l.includes('ac')) return Wind;
    if (l.includes('decor')) return Sparkles;
    if (l.includes('ev charging')) return Zap;
    if (l.includes('bridal') || l.includes('changing')) return Heart;
    if (l.includes('catering') || l.includes('food') || l.includes('cuisine')) return UtensilsCrossed;
    if (l.includes('wi-fi') || l.includes('wifi')) return Wifi;
    if (l.includes('bar') || l.includes('alcohol')) return Wine;
    if (l.includes('pool')) return Waves;
    if (l.includes('generator') || l.includes('backup')) return Power;
    if (l.includes('av') || l.includes('projector') || l.includes('dj')) return Tv;
    return Check;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#071B45]">Amenities &amp; Services</h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          {amenities.length} features included
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {amenities.map((item, idx) => {
          const Icon = getIcon(item);
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
