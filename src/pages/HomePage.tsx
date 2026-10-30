import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { LandingStoryScroll } from '../components/ui/story-scroll';
import { WildernessLanding } from '../components/ui/wilderness';
import { Hero } from '../components/home/Hero';
import { CityCarousel } from '../components/home/CityCarousel';
import { VenueCarousel } from '../components/home/VenueCarousel';
import { WhyBookWithUs } from '../components/home/WhyBookWithUs';
import { FaqSection } from '../components/home/FaqSection';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { allVenues } = useApp();

  // 1. Destination Wedding Properties
  const destinationVenues = allVenues.filter((v) =>
    v.sections?.includes('DESTINATION_WEDDING') || v.organizationCategories.includes('Destination wedding')
  );

  // 2. Best Match For You
  const bestMatchVenues = allVenues.filter((v) =>
    v.sections?.includes('BEST_MATCH') || v.rating >= 4.5
  );

  // 3. Trending Top Venues
  const trendingVenues = allVenues.filter((v) =>
    v.sections?.includes('TRENDING_TOP_VENUES') || v.googleReviewCount > 400
  );

  // 4. Party Venues
  const partyVenues = allVenues.filter((v) =>
    v.sections?.includes('PARTY_VENUES') || v.organizationCategories.includes('Party Venues')
  );

  // 5. Meeting Rooms
  const meetingRooms = allVenues.filter((v) =>
    v.sections?.includes('MEETING_ROOMS') || v.eventTypes.includes('Meeting Room') || v.organizationCategories.includes('Business Hotel')
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 2 & 3: Two-Column Hero with Collage & Floating Pill Search Bar */}
      <LandingStoryScroll landing={<WildernessLanding />}><Hero /></LandingStoryScroll>

      {/* 4. Explore by City Carousel */}
      <CityCarousel />

      {/* 5. Destination Wedding Properties */}
      <VenueCarousel
        title="Destination Wedding Properties"
        subtitle="Find luxury resorts and destination venues for your celebration"
        venues={destinationVenues}
      />

      {/* 6. Best Match For You */}
      <VenueCarousel
        title="Best Match For You"
        subtitle="Based on your recently viewed venues"
        venues={bestMatchVenues}
      />

      {/* 7. Remaining Original Discovery Sections */}
      <VenueCarousel
        title="Trending Top Venues"
        subtitle="Most enquired Top venues this week"
        venues={trendingVenues}
      />

      <VenueCarousel
        title="Party Venues"
        subtitle="Discover properties suited for parties, social events and private celebrations"
        venues={partyVenues}
      />

      <VenueCarousel
        title="Meeting Rooms"
        subtitle="Highlighted meeting rooms for corporate events, workshops and private gatherings"
        venues={meetingRooms}
      />

      {/* 8. Why Book With Us */}
      <WhyBookWithUs />

      {/* 9. Property Owner Promotion */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E4D3B] via-[#1A4233] to-[#122E23] p-8 sm:p-12 lg:p-14 text-[#FAF8F5] border border-[#DED8CE]/30 shadow-2xl">
            {/* Subtle decorative background glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#C86D51]/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#163A2C]/40 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 border border-white/20 text-xs font-semibold tracking-wider uppercase text-[#FAF8F5]">
                  <Building2 className="w-4 h-4 text-[#C86D51]" />
                  <span>Partner With Bookvenuez</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF8F5] leading-tight">
                  Are you a banquet hall or luxury stay owner?
                </h3>
                <p className="text-sm sm:text-base text-[#FAF8F5]/80 leading-relaxed font-normal">
                  Showcase your property to thousands of high-intent celebration planners across India. Receive pre-qualified inquiries directly with verified guest profiles and transparent terms.
                </p>
              </div>

              <Link
                to="/list-property"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-[12px] bg-[#FAF8F5] text-[#1E4D3B] hover:bg-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] shrink-0 active:scale-[0.98]"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-4 h-4 text-[#1E4D3B]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQs */}
      <FaqSection />

    </div>
  );
};
