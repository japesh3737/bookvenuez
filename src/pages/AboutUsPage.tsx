import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-[#fcfdfd] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#071B45] tracking-tight leading-tight">
            Find the Perfect Venue for Every Milestone
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Bookvenuez is India’s premier discovery platform connecting event planners, families, and couples with verified banquet halls, lawns, destination wedding properties, and meeting spaces.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-8 sm:p-12 mb-12 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-[#071B45]">Why We Built Bookvenuez</h2>
          <p>
            Planning an Indian wedding or corporate summit used to mean days of tedious phone calls, unverified broker promises, hidden pricing markups, and uncertain availability. We set out to change that.
          </p>
          <p>
            At Bookvenuez, we believe finding a venue should be as exciting as the celebration itself. We combine high-resolution photographic tours, real-time availability checks, honest per-plate pricing, and 24x7 expert concierge assistance into one seamless, transparent platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-center">
            <div className="p-4 rounded-2xl bg-slate-50">
              <span className="text-3xl font-black text-primary block mb-1">350+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Venues</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50">
              <span className="text-3xl font-black text-primary block mb-1">9 Cities</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Across India</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50">
              <span className="text-3xl font-black text-primary block mb-1">Zero</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Booking Fees</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-base text-[#071B45] mb-1.5">100% Verified Venues</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every hall, lawn, and resort is physically inspected to ensure photos, guest capacity, and amenities match reality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold text-base text-[#071B45] mb-1.5">Transparent Pricing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clear per-plate food rates, hourly venue rental packages, and honest policies with no unexpected surprises.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <HeartHandshake className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-base text-[#071B45] mb-1.5">24x7 Venue Concierge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our experienced specialists assist you from shortlisting to negotiation, arranging in-person site visits for free.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark transition-all"
          >
            <span>Explore Banquet Halls</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
