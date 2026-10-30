import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Headphones, 
  BadgePercent 
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'No Booking Fee',
    description: 'Browse, compare, and enquire without extra platform charges or hidden fees.',
  },
  {
    icon: Layers,
    title: 'Compare & Shortlist',
    description: 'Save favourites and compare up to 3 venues side by side before you decide.',
  },
  {
    icon: Zap,
    title: 'Fast Venue Response',
    description: 'Get verified quote updates and availability checks within 1 hour.',
  },
  {
    icon: CheckCircle2,
    title: 'Verified Listings',
    description: '100% physically inspected and verified banquet halls, hotels, and resorts.',
  },
  {
    icon: Clock,
    title: 'Quick Booking',
    description: 'Check availability and lock your preferred event date in simple steps.',
  },
  {
    icon: MapPin,
    title: 'Easy Access',
    description: 'Find nearby venues quickly with location-aware filters and Google Street View.',
  },
  {
    icon: Headphones,
    title: '24x7 Concierge',
    description: 'Dedicated wedding and corporate venue specialists to guide your journey.',
  },
  {
    icon: BadgePercent,
    title: 'Best Price Guarantee',
    description: 'Get direct partner pricing, exclusive discounts, and complimentary perks.',
  },
];

export const WhyBookWithUs: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#EFECE6] border-b border-[#DED8CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#DED8CE] bg-[#FAF8F5] text-[#1E4D3B] text-xs font-semibold tracking-[0.1em] uppercase mb-3">
            <span>Why Choose Bookvenuez</span>
          </div>
          <h2 className="font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold text-[#181D1A] tracking-[-0.015em] leading-[1.2]">
            Designed for Stress-Free Celebrations
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[rgba(24,29,26,0.68)] leading-[1.6] mt-2">
            We make booking event spaces transparent, fast, and completely hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#DED8CE] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-start group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFECE6] text-[#1E4D3B] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#1E4D3B] group-hover:text-[#FAF8F5] transition-all shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-[#181D1A] mb-1.5 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-[13.5px] text-[rgba(24,29,26,0.68)] leading-[1.5]">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyBookWithUs;
