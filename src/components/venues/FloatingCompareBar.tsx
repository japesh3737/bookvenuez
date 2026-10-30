import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Columns3, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function FloatingCompareBar() {
  const { compareList, allVenues, removeFromCompare, setCompareVenues } = useApp();
  const { pathname } = useLocation();
  const [pastIntro, setPastIntro] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const visible = compareList.length > 0 && pathname !== '/compare' && (pathname !== '/' || pastIntro);
  const selected = compareList.map(id => allVenues.find(v => v.id === id)).filter(Boolean);
  const transition = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 380, damping: 32, mass: .8 };

  useEffect(() => {
    const update = () => setPastIntro(window.scrollY >= window.innerHeight);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);
  useEffect(() => { setExpanded(false); }, [pathname, visible]);
  useEffect(() => {
    if (!expanded) return;
    const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setExpanded(false); };
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setExpanded(false); toggle.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [expanded]);

  return <>
    {visible && <div className="h-24" aria-hidden="true" />}
    <AnimatePresence>
      {visible && <motion.aside ref={root} key="compare-dock" aria-label="Selected venues for comparison"
        initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : .9 }} transition={transition}
        className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-[140] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2.5 sm:bottom-5 sm:right-6">
        <AnimatePresence initial={false}>
          {expanded && <motion.div id="compare-dock-selections" key="selections" initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : 8, scale: reduced ? 1 : .94 }} transition={transition}
            style={{ transformOrigin: 'bottom right' }} className="w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[#DED8CE] bg-[#FAF8F5] p-4 text-[#1E4D3B] shadow-[0_12px_48px_rgba(15,42,30,.18)]">
            <div className="mb-2 flex items-center justify-between gap-3"><h2 className="text-sm font-semibold">Your comparison <span className="font-normal text-slate-500">{selected.length}/3</span></h2><button type="button" aria-label="Minimize comparison" onClick={() => {setExpanded(false); toggle.current?.focus();}} className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#EFECE6]"><ChevronDown size={18}/></button></div>
            <ul className="max-h-[min(40svh,260px)] overflow-y-auto">{selected.map(v => <li key={v.id} className="flex items-center gap-3 border-b border-[#DED8CE]/60 py-2 last:border-0"><img src={v.imageUrl} alt="" loading="lazy" decoding="async" className="h-10 w-12 shrink-0 rounded-lg object-cover"/><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-semibold leading-snug">{v.title}</p><p className="mt-0.5 text-[10px] text-slate-500">{v.city}</p></div><button type="button" aria-label={`Remove ${v.title} from comparison bar`} onClick={() => removeFromCompare(v.id)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-[#EFECE6]"><X size={15}/></button></li>)}</ul>
            <div className="mt-3 flex items-center justify-between gap-3"><button type="button" onClick={() => setCompareVenues([])} className="min-h-11 text-xs text-slate-500 underline">Clear all</button>{selected.length >= 2 ? <Link to="/compare" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1E4D3B] px-4 text-xs font-semibold text-white">Compare {selected.length} venues<ArrowRight size={14}/></Link> : <p className="text-xs text-slate-500">Add one more to compare</p>}</div>
          </motion.div>}
        </AnimatePresence>
        <motion.div layout transition={transition} className="flex h-[52px] items-center gap-1 rounded-full border border-white/15 bg-[#173C2E] p-1 text-[#FAF8F5] shadow-[0_4px_24px_rgba(15,42,30,.22)]">
          <button ref={toggle} type="button" aria-label={expanded ? 'Hide selected venues' : 'Show selected venues'} aria-expanded={expanded} aria-controls={expanded ? 'compare-dock-selections' : undefined} onClick={() => setExpanded(value => !value)} className="flex h-11 items-center gap-2 rounded-full pl-3 pr-2 text-xs font-semibold"><Columns3 size={16}/><span>Compare</span><motion.span key={compareList.length} initial={{scale: reduced ? 1 : .65}} animate={{scale:1}} transition={transition} className="grid h-5 min-w-5 place-items-center rounded-full bg-white/15 px-1 text-[10px]" aria-live="polite">{compareList.length}</motion.span></button>
          {compareList.length >= 2 ? <Link to="/compare" aria-label={`Compare ${compareList.length} venues`} className="grid h-11 w-11 place-items-center rounded-full bg-[#FAF8F5] text-[#1E4D3B] transition-colors hover:bg-white"><ArrowRight size={18}/></Link> : <button type="button" aria-label={expanded ? 'Minimize comparison' : 'Expand comparison'} onClick={() => setExpanded(value => !value)} className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><motion.span animate={{rotate:expanded?0:180}} transition={transition}><ChevronDown size={18}/></motion.span></button>}
        </motion.div>
      </motion.aside>}
    </AnimatePresence>
  </>;
}
