import React from 'react';
import { Users, Layers, Sparkles } from 'lucide-react';
import { VenueSpace } from '../../data/venuesData';

export const VenueSpaces: React.FC<{ spaces: VenueSpace[] }> = ({ spaces }) => {
  if (!spaces || spaces.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-[#071B45]">Available Venue Spaces</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {spaces.map((space, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-bold text-slate-800 text-base">{space.name}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {space.type}
                </span>
              </div>
              {space.seating && (
                <p className="text-xs text-slate-500 mb-2">{space.seating}</p>
              )}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <Users className="w-3.5 h-3.5 text-primary" />
                Up to {space.capacity} Guests
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Available
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
