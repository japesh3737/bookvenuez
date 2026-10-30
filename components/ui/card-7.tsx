"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";

export interface TravelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  price: number | string;
  pricePeriod?: string;
  pricePrefix?: string;
  currencySymbol?: string;
  rating?: number | string;
  reviewCount?: string | number;
  capacity?: string;
  badge?: string;
  responseBadge?: string;
  verified?: boolean;
  ctaText?: string;
  isLiked?: boolean;
  onBookNow: () => void;
  onCallProperty?: (e: React.MouseEvent) => void;
  onToggleLike?: (e: React.MouseEvent) => void;
}

const TravelCard = React.forwardRef<HTMLDivElement, TravelCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      price,
      pricePeriod = "/ plate",
      pricePrefix = "Starting",
      currencySymbol = "Rs.",
      rating,
      reviewCount,
      capacity,
      badge,
      responseBadge = "Within 24hr",
      verified = true,
      ctaText = "View Property",
      isLiked = false,
      onBookNow,
      onCallProperty,
      onToggleLike,
      ...props
    },
    ref
  ) => {
    const displayPrice = React.useMemo(() => {
      if (typeof price === "number") {
        return `${currencySymbol}${price.toLocaleString("en-IN")}.00`;
      }
      const trimmed = price ? String(price).trim() : "";
      if (!trimmed) return `${currencySymbol}450.00`;
      let cleaned = trimmed.replace(/\/\s*(plate|night|day|hr|hour)/gi, "").trim();
      if (
        cleaned.toLowerCase().startsWith("rs") ||
        cleaned.startsWith("₹") ||
        cleaned.toLowerCase().startsWith("starting")
      ) {
        cleaned = cleaned.replace(/^starting\s+/i, "");
      }
      if (!cleaned.toLowerCase().startsWith("rs") && !cleaned.startsWith("₹")) {
        cleaned = `${currencySymbol}${cleaned}`;
      }
      return cleaned;
    }, [price, currencySymbol]);

    return (
      <div
        ref={ref}
        onClick={onBookNow}
        /* Use isolated named group: group/card so only this single card reacts on hover */
        className={cn(
          "group/card relative h-[470px] w-full max-w-[360px] cursor-pointer overflow-hidden rounded-2xl border border-[#1C2421]/15 bg-[#1C2421] shadow-md select-none",
          "transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1.5",
          className
        )}
        {...props}
      >
        {/* Background Image: scales ONLY when this specific card is hovered */}
        <img
          src={imageUrl}
          alt={imageAlt || title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-108"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes("unsplash")) {
              target.src =
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80";
            }
          }}
        />

        {/* Multi-stop Editorial Gradient Scrim for deep readability */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(28, 36, 33, 0.98) 0%, rgba(28, 36, 33, 0.82) 36%, rgba(28, 36, 33, 0.40) 65%, rgba(28, 36, 33, 0.15) 100%)",
          }}
        />

        {/* Content Container */}
        <div className="relative flex h-full flex-col justify-between p-5 text-[#FAF7F2]">
          {/* Top Section: Verified Badge, Response Badge, Category Pill & Like Button */}
          <div className="flex items-start justify-between gap-2 z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              {logo ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#1E4D3B]/90 backdrop-blur-sm">
                  {logo}
                </div>
              ) : verified ? (
                <div
                  title="Verified BookVenuez Listing"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#1E4D3B] text-white shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#FAF7F2]" />
                </div>
              ) : null}

              {responseBadge && (
                <span className="rounded-full bg-[#1C2421]/80 px-2.5 py-1 font-sans text-[10px] font-medium tracking-wide text-[#FAF7F2] backdrop-blur-md border border-white/15">
                  {responseBadge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {badge && (
                <span className="rounded-full bg-[#F1ECE1] px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#1C2421] shadow-sm">
                  {badge}
                </span>
              )}
              {onToggleLike && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(e);
                  }}
                  aria-label={`Save ${title}`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#1C2421]/60 text-white backdrop-blur-md transition-colors hover:bg-[#C86D51] hover:border-[#C86D51]",
                    isLiked && "bg-[#C86D51] border-[#C86D51] text-white"
                  )}
                >
                  <Heart className={cn("h-3.5 w-3.5", isLiked && "fill-current text-white")} />
                </button>
              )}
            </div>
          </div>

          {/* Middle Section: Meta Info & Titles */}
          {/* Slides up slightly on desktop hover without pushing into the top badges */}
          <div className="space-y-2 z-10 transition-transform duration-500 ease-out md:group-hover/card:-translate-y-20">
            {/* Rating & Capacity Pill */}
            {(rating || capacity) && (
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#FAF7F2]/90">
                {rating && (
                  <span className="inline-flex items-center gap-1 rounded bg-[#FAF7F2]/15 px-2 py-0.5 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-[#C86D51] text-[#C86D51]" />
                    <span className="font-semibold text-white">{rating}</span>
                    {reviewCount && (
                      <span className="text-[#FAF7F2]/75 font-normal">({reviewCount})</span>
                    )}
                  </span>
                )}
                {capacity && (
                  <span className="inline-flex items-center gap-1 text-[#FAF7F2]/85">
                    <Users className="h-3 w-3 text-[#C86D51] shrink-0" />
                    <span>{capacity}</span>
                  </span>
                )}
              </div>
            )}

            {/* Property Title & Location */}
            <div>
              <h3 className="font-serif text-xl sm:text-[22px] font-semibold leading-snug text-white line-clamp-1">
                {title}
              </h3>
              {location && (
                <p className="mt-0.5 flex items-center gap-1 font-sans text-[11px] font-medium text-[#FAF7F2]/80 line-clamp-1">
                  <MapPin className="h-3 w-3 shrink-0 text-[#C86D51]" />
                  <span>{location}</span>
                </p>
              )}
            </div>

            {/* Overview: Visible at rest, smoothly fades out on desktop hover to make room for bottom actions */}
            <div className="pt-1 transition-opacity duration-300 md:group-hover/card:opacity-20">
              <h4 className="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#C86D51]">
                OVERVIEW
              </h4>
              <p className="mt-0.5 font-sans text-[11px] leading-relaxed text-[#FAF7F2]/80 line-clamp-2">
                {overview}
              </p>
            </div>
          </div>

          {/* Bottom Section: Always accessible on mobile; smooth slide-in on desktop hover */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-20 w-full p-5 pt-6 transition-all duration-400 ease-out",
              "bg-gradient-to-t from-[#1C2421] via-[#1C2421]/95 to-transparent",
              "opacity-100 md:translate-y-8 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100"
            )}
          >
            <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-3">
              {/* Pricing Block */}
              <div className="min-w-0 shrink">
                {pricePrefix && (
                  <span className="block font-sans text-[9px] font-semibold uppercase tracking-wider text-[#FAF7F2]/70 leading-none">
                    {pricePrefix}
                  </span>
                )}
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-white truncate">
                    {displayPrice}
                  </span>
                  {pricePeriod && (
                    <span className="font-sans text-[10px] text-[#FAF7F2]/75 shrink-0">
                      {pricePeriod}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: properly sized with explicit dimensions */}
              <div className="flex items-center gap-2 shrink-0">
                {onCallProperty && (
                  <Button
                    type="button"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCallProperty(e);
                    }}
                    aria-label={`Call ${title}`}
                    className="h-9 w-9 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-[#C86D51] hover:border-[#C86D51] transition-colors shrink-0"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNow();
                  }}
                  className="h-9 rounded-xl bg-[#1E4D3B] px-3.5 font-sans text-xs font-semibold text-white hover:bg-[#163A2C] border border-white/15 shadow-sm transition-colors whitespace-nowrap"
                >
                  {ctaText} <ArrowRight className="ml-1.5 h-3.5 w-3.5 shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TravelCard.displayName = "TravelCard";

export { TravelCard };
