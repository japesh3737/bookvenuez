import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** The story-scroll turn is limited to the opening pair and scrubs in both directions. */
export function LandingStoryScroll({ landing, children }: { landing: React.ReactNode; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const host = root.current;
    if (!host) return;
    const opening = host.querySelector<HTMLElement>('[data-story-opening]')!;
    const hero = host.querySelector<HTMLElement>('[data-story-hero]')!;
    const match = gsap.matchMedia();
    match.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 640px)' }, context => {
      if (!context.conditions?.motion) return;
      const pin = ScrollTrigger.create({
        trigger: opening, start: 'bottom bottom', end: 'bottom top',
        pin: true, pinSpacing: false, invalidateOnRefresh: true,
      });
      const turn = gsap.fromTo(hero, { rotation: context.conditions?.desktop ? 30 : 14, transformOrigin: 'bottom left' }, {
        rotation: 0, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: host, start: 'top top', end: () => `+=${opening.offsetHeight}`, scrub: true,
          invalidateOnRefresh: true,
          onToggle: self => { hero.style.willChange = self.isActive ? 'transform' : 'auto'; },
        },
      });
      return () => { pin.kill(); turn.scrollTrigger?.kill(); turn.kill(); gsap.set(hero, { clearProps: 'transform,transformOrigin,willChange' }); };
    });
    return () => match.revert();
  }, []);
  return <div ref={root} className="relative isolate w-full" style={{ overflowX: 'clip' }}>
    <div data-story-opening className="relative z-0">{landing}</div>
    <div id="discover" data-story-hero className="relative z-10 bg-[#FAF8F5]">{children}</div>
  </div>;
}
