import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X, type LucideIcon } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
export type NotchPosition = "top" | "bottom";

export interface NotchItemData {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
}

export interface NotchWingProps {
  position?: NotchPosition;
  className?: string;
}

export function NotchLeftWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-full size-2.5 md:size-4 overflow-visible select-none text-[#142F25] transition-colors duration-200 ",
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 0 20 C 11.046 20 20 11.046 20 0 H 21 V 21 H 0 Z"
            : "M 0 0 C 11.046 0 20 8.954 20 20 H 21 V -1 H 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchRightWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-full size-2.5 md:size-4 overflow-visible select-none text-[#142F25] transition-colors duration-200 ",
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 20 20 C 8.954 20 0 11.046 0 0 H -1 V 21 H 20 Z"
            : "M 20 0 C 8.954 0 0 8.954 0 20 H -1 V -1 H 20 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerLeftWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-0 size-2.5 md:size-4 overflow-visible select-none text-[#142F25] transition-colors duration-200 ",
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 0 20 H 20 C 8.954 20 0 11.046 0 0 V 20 Z"
            : "M 0 0 H 20 C 8.954 0 0 8.954 0 20 V 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerRightWing({
  position = "top",
  className,
}: NotchWingProps) {
  const isBottom = position === "bottom";

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-0 size-2.5 md:size-4 overflow-visible select-none text-[#142F25] transition-colors duration-200 ",
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 20 20 H 0 C 11.046 20 20 11.046 20 0 V 20 Z"
            : "M 20 0 H 0 C 11.046 0 20 8.954 20 20 V 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}


export interface NotchNavLink { id: string; label: string; href: string; icon: LucideIcon; badge?: string; active?: boolean }
export function NotchNav({ items, logo, rightContent, children, overlay = false }: {
  items: NotchNavLink[]; logo: ReactNode; rightContent: ReactNode; children: ReactNode; overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const location = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) setOpen(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); Array.from(root.current?.querySelectorAll<HTMLButtonElement>('button[aria-expanded]') ?? []).find(button => button.offsetParent !== null)?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  const menuButton = <button ref={trigger} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`notch-${id}`} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} className="flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-white hover:bg-white/10">{open ? <X size={16}/> : <Menu size={16}/>}Menu<ChevronDown size={13} className={open?'rotate-180':''}/></button>;
  return <header ref={root} className={cn('relative h-[72px] w-full border-t-[6px] border-[#142F25]', overlay ? 'bg-transparent' : 'bg-[#FAF8F5]')}>
    <div className="hidden xl:block">
      <div className="absolute left-0 top-0 z-50 flex h-[52px] items-center rounded-br-[24px] bg-[#142F25] px-7 text-white">{logo}<NotchRightWing/><NotchCornerLeftWing/></div>
      <nav aria-label="Main navigation" className="absolute left-1/2 top-0 z-50 flex h-[54px] -translate-x-1/2 items-center gap-1 rounded-b-[24px] bg-[#142F25] px-3 text-white">
        <NotchLeftWing/><NotchRightWing/>
        <LayoutGroup id={id}>{items.map(item => <Link key={item.id} to={item.href} aria-current={item.active ? 'page' : undefined} className={cn('relative inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors',item.active?'text-white':'text-[#c1cfc6] hover:text-white')}>
          {item.active && <motion.span layoutId="notch-active-pill" className="absolute inset-0 rounded-full bg-[#355346]" transition={reduced ? {duration:0} : {type:'spring',stiffness:400,damping:30}}/>}
          <item.icon size={15} className="relative shrink-0"/><span className="relative">{item.label}</span>{item.badge&&<span className="relative rounded-full bg-white/15 px-1.5 py-0.5 text-[10px]">{item.badge}</span>}
        </Link>)}</LayoutGroup>
        {menuButton}
      </nav>
      <div className="absolute right-0 top-0 z-50 flex h-[52px] items-center rounded-bl-[24px] bg-[#142F25] px-6 text-white">{rightContent}<NotchLeftWing/><NotchCornerRightWing/></div>
    </div>
    <div className="absolute left-1/2 top-0 z-50 flex w-[calc(100%_-_32px)] max-w-lg -translate-x-1/2 items-center justify-between gap-1 rounded-b-[24px] bg-[#142F25] px-3 py-1 text-white xl:hidden">
      <NotchLeftWing/><NotchRightWing/>{logo}<div className="flex items-center gap-1">{menuButton}{rightContent}</div>
    </div>
    {open && <div id={`notch-${id}`} className="absolute left-1/2 top-[62px] z-50 max-h-[calc(100svh_-_90px)] w-[calc(100%_-_32px)] max-w-4xl -translate-x-1/2 overflow-y-auto rounded-2xl border border-[#426352] bg-[#142F25] p-5 text-white shadow-2xl" onClick={e=>{ if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
      <nav aria-label="All pages" className="mb-5 grid grid-cols-2 gap-2 border-b border-white/15 pb-5 xl:hidden">{items.map(item=><Link key={item.id} to={item.href} aria-current={item.active?'page':undefined} className="flex min-h-11 items-center gap-2 rounded-xl bg-white/5 px-3 text-sm hover:bg-white/15"><item.icon size={16}/>{item.label}{item.badge&&<span className="ml-auto text-xs text-[#c1cfc6]">{item.badge}</span>}</Link>)}</nav>
      {children}
    </div>}
  </header>;
}
