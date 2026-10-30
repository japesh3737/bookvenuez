import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParallaxLayer {
  src: string;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width: string;
}

interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  className?: string;
}

const defaultLayers: ParallaxLayer[] = [
  {
    src: '/images/landing/layer-0-desktop.webp',
    alt: 'background',
    speedX: 0.03,
    speedY: 0.038,
    speedZ: 0,
    rotation: 0,
    distance: -200,
    zIndex: 1,
    initialTop: 'calc(50% - 50px)',
    initialLeft: 'calc(50% + 0px)',
    width: '3200px',
  },
  {
    src: '/images/landing/layer-1-desktop.webp',
    alt: 'fog-7',
    speedX: 0.27,
    speedY: 0.32,
    speedZ: 0,
    rotation: 0,
    distance: 850,
    zIndex: 2,
    initialTop: 'calc(50% - 100px)',
    initialLeft: 'calc(50% + 300px)',
    width: '1900px',
  },
  {
    src: '/images/landing/layer-2-desktop.webp',
    alt: 'mountain-10',
    speedX: 0.095,
    speedY: 0.005,
    speedZ: 0,
    rotation: 0,
    distance: 1110,
    zIndex: 3,
    initialTop: 'calc(50% + 169px)',
    initialLeft: 'calc(50% + 330px)',
    width: '1200px',
  },
  {
    src: '/images/landing/layer-3-desktop.webp',
    alt: 'fog-6',
    speedX: 0.25,
    speedY: 0.28,
    speedZ: 0,
    rotation: 0,
    distance: 1400,
    zIndex: 4,
    initialTop: 'calc(50% + 285px)',
    initialLeft: 'calc(50%)',
    width: '2200px',
    className: 'opacity-30',
  },
  {
    src: '/images/landing/layer-4-desktop.webp',
    alt: 'mountain-9',
    speedX: 0.125,
    speedY: 0.155,
    speedZ: 0.15,
    rotation: 0.02,
    distance: 1700,
    zIndex: 51,
    initialTop: 'calc(50% + 313px)',
    initialLeft: 'calc(50% - 557px)',
    width: '670px',
  },
  {
    src: '/images/landing/layer-5-desktop.webp',
    alt: 'fog-5',
    speedX: 0.16,
    speedY: 0.105,
    speedZ: 0,
    rotation: 0,
    distance: 1900,
    zIndex: 7,
    initialTop: 'calc(50% + 360px)',
    initialLeft: 'calc(50% + 40px)',
    width: '650px',
  },
  {
    src: '/images/landing/layer-6-desktop.webp',
    alt: 'mountain-7',
    speedX: 0.1,
    speedY: 0.1,
    speedZ: 0,
    rotation: 0.09,
    distance: 2000,
    zIndex: 19,
    initialTop: 'calc(50% + 223px)',
    initialLeft: 'calc(50% + 495px)',
    width: '738px',
  },
  {
    src: '/images/landing/layer-7-desktop.webp',
    alt: 'mountain-6',
    speedX: 0.065,
    speedY: 0.05,
    speedZ: 0.05,
    rotation: 0.12,
    distance: 2300,
    zIndex: 18,
    initialTop: 'calc(50% + 120px)',
    initialLeft: 'calc(50% + 590px)',
    width: '408px',
  },
  {
    src: '/images/landing/layer-8-desktop.webp',
    alt: 'fog-4',
    speedX: 0.135,
    speedY: 0.1,
    speedZ: 0,
    rotation: 0,
    distance: 2400,
    zIndex: 11,
    initialTop: 'calc(50% + 223px)',
    initialLeft: 'calc(50% + 460px)',
    width: '590px',
    className: 'opacity-50',
  },
  {
    src: '/images/landing/layer-9-desktop.webp',
    alt: 'mountain-5',
    speedX: 0.08,
    speedY: 0.05,
    speedZ: 0.13,
    rotation: 0.1,
    distance: 2550,
    zIndex: 12,
    initialTop: 'calc(50% + 320px)',
    initialLeft: 'calc(50% + 230px)',
    width: '725px',
  },
  {
    src: '/images/landing/layer-10-desktop.webp',
    alt: 'fog-3',
    speedX: 0.11,
    speedY: 0.018,
    speedZ: 0,
    rotation: 0,
    distance: 2800,
    zIndex: 113,
    initialTop: 'calc(50% + 210px)',
    initialLeft: 'calc(50% + 5px)',
    width: '1600px',
  },
  {
    src: '/images/landing/layer-11-desktop.webp',
    alt: 'mountain-4',
    speedX: 0.059,
    speedY: 0.024,
    speedZ: 0.35,
    rotation: 0.14,
    distance: 3200,
    zIndex: 15,
    initialTop: 'calc(50% + 196px)',
    initialLeft: 'calc(50% - 698px)',
    width: '1100px',
  },
  {
    src: '/images/landing/layer-12-desktop.webp',
    alt: 'mountain-3',
    speedX: 0.04,
    speedY: 0.018,
    speedZ: 0.32,
    rotation: 0.05,
    distance: 3400,
    zIndex: 20,
    initialTop: 'calc(50% - 20px)',
    initialLeft: 'calc(50% + 750px)',
    width: '630px',
  },
  {
    src: '/images/landing/layer-13-desktop.webp',
    alt: 'fog-2',
    speedX: 0.15,
    speedY: 0.0115,
    speedZ: 0,
    rotation: 0,
    distance: 3600,
    zIndex: 16,
    initialTop: 'calc(50% - 20px)',
    initialLeft: 'calc(50% + 698px)',
    width: '1100px',
  },
  {
    src: '/images/landing/layer-14-desktop.webp',
    alt: 'mountain-2',
    speedX: 0.0235,
    speedY: 0.013,
    speedZ: 0.42,
    rotation: 0.15,
    distance: 3800,
    zIndex: 17,
    initialTop: 'calc(50% + 256px)',
    initialLeft: 'calc(50% + 528px)',
    width: '800px',
  },
  {
    src: '/images/landing/layer-15-desktop.webp',
    alt: 'mountain-1',
    speedX: 0.027,
    speedY: 0.018,
    speedZ: 0.53,
    rotation: 0.2,
    distance: 4000,
    zIndex: 18,
    initialTop: 'calc(50% + 196px)',
    initialLeft: 'calc(50% - 728px)',
    width: '1100px',
  },
  {
    src: '/images/landing/layer-16-desktop.webp',
    alt: 'fog-1',
    speedX: 0.12,
    speedY: 0.01,
    speedZ: 0,
    rotation: 0,
    distance: 4200,
    zIndex: 21,
    initialTop: 'calc(100% - 355px)',
    initialLeft: 'calc(50% + 100px)',
    width: '1900px',
    className: 'opacity-50',
  },
];

export const WildernessLanding: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLImageElement | null)[]>([]);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!root.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setMobile(entry.contentRect.width < 640);
      setScale(Math.max(entry.contentRect.width / 1600, entry.contentRect.height / 900));
    });
    observer.observe(root.current);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => { reduced.current = motion.matches; };
    updateMotion();
    motion.addEventListener('change', updateMotion);
    return () => { observer.disconnect(); motion.removeEventListener('change', updateMotion); cancelAnimationFrame(frame.current); };
  }, []);

  const move = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reduced.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / scale;
    const y = (event.clientY - rect.top - rect.height / 2) / scale;
    pointer.current = { x, y };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
    frame.current = 0;
    const { x, y } = pointer.current;
    layers.current.forEach((image, index) => {
      if (!image) return;
      const layer = defaultLayers[index];
      image.style.transform = `translate(calc(-50% + ${-x * layer.speedX * 0.35}px), calc(-50% + ${y * layer.speedY * 0.35}px)) rotateY(${x / 800 * layer.rotation * 7}deg)`;
    });
    });
  };
  const reset = () => { cancelAnimationFrame(frame.current); frame.current = 0; layers.current.forEach(image => { if (image) image.style.transform = 'translate(-50%, -50%)'; }); };

  return (
    <section ref={root} onPointerMove={move} onPointerLeave={reset} aria-labelledby="landing-title" className="relative isolate h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#758c83] text-white">
      <div ref={scene} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[1600px]" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {defaultLayers.map((layer, index) => mobile && [1,3,5,8,10,13].includes(index) ? null : <img key={layer.src} ref={el => { layers.current[index] = el; }} src={mobile ? layer.src.replace("-desktop", "-mobile") : layer.src} decoding="async" alt="" draggable={false} className={cn('absolute max-w-none transition-transform duration-500 ease-out motion-reduce:transition-none', layer.className)} style={{width: layer.width, top: layer.initialTop, left: layer.initialLeft, zIndex: layer.zIndex, transform: 'translate(-50%, -50%)'}} />)}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[115] bg-gradient-to-b from-[#10291f]/35 via-[#10291f]/10 to-[#10291f]/65" />
      <div className="absolute inset-x-0 top-[30%] z-[120] mx-auto max-w-6xl px-5 text-center sm:top-[27%]" style={{textShadow:'0 2px 24px rgba(5,25,17,.4)'}}>
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[.28em] sm:text-xs">Curated stays. Unforgettable stories.</p>
        <h1 id="landing-title" className="font-serif text-[clamp(3.3rem,12vw,10rem)] font-semibold leading-[1] tracking-[-.05em]">Bookvenuez</h1>
        <p className="mx-auto mt-7 max-w-xl font-serif text-lg leading-relaxed sm:mt-8 sm:text-2xl">
          Some places are worth the journey.<br />
          <span className="italic">Others become part of your story.</span>
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-10 z-[130] flex flex-col items-center gap-5 px-5 sm:bottom-12">
        <a href="#discover" onClick={event => {
          const target = document.getElementById('discover');
          if (!target) return;
          event.preventDefault();
          // offsetTop stays stable while the hero is rotating into view.
          const top = target.offsetTop + (target.offsetParent as HTMLElement).getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: reduced.current ? 'auto' : 'smooth' });
        }} className="inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-[#FAF8F5] px-7 text-sm font-semibold text-[#1E4D3B] shadow-lg transition hover:bg-white">Explore stays<ArrowDown size={16} /></a>
        <span className="text-[10px] uppercase tracking-[.22em] text-white/85">Your next chapter begins here</span>
      </div>
    </section>
  );
};
export default WildernessLanding;


