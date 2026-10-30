import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Search, ArrowRight, ChevronDown, Columns3, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { bestVenueIds } from '../../data/venuePlanning';
import { comparisonGroups, researchedVenues } from '../../data/venueComparison';

export default function ComparisonBlock() {
  const {allVenues, compareList, setCompareVenues} = useApp();
  const selected = compareList.map(id=>allVenues.find(v=>v.id===id)).filter(Boolean);
  const lowest=bestVenueIds(selected,'price');
  const largest=bestVenueIds(selected,'capacity');
  const [slot,setSlot] = useState<number|null>(null);
  const [query,setQuery] = useState('');
  const [differences,setDifferences] = useState(false);
  const [guests,setGuests] = useState(200);
  const [closed,setClosed] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(()=>{ if(slot!==null) dialog.current?.showModal(); else dialog.current?.close(); },[slot]);
  const choose = (id:number) => {
    const ids=[...compareList]; ids[Math.min(slot ?? ids.length,ids.length)]=id;
    setCompareVenues(ids); setSlot(null); setQuery('');
  };
  const open = (index:number) => {setQuery('');setSlot(index);};
  const cell = 'border-b border-[#DED8CE] px-4 py-4 text-left align-top text-sm leading-relaxed';
  const candidates=allVenues.filter(v=>!compareList.includes(v.id)&&`${v.title} ${v.city} ${v.locationArea}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12 text-[#181D1A]">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full border border-[#DED8CE] bg-[#EFECE6] px-3 py-1 text-xs font-semibold text-[#1E4D3B]"><Columns3 size={14}/>Side by side</span>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold">Three places. One clear choice.</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">Add up to three venues. Compare the details that matter, from your food budget to the spaces your guests will enjoy.</p></div>
        <Link to="/search" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DED8CE] px-5 text-sm">Browse venues<ArrowRight size={16}/></Link>
      </div>
      <div className="mb-6 rounded-2xl border border-[#DED8CE] bg-[#EFECE6] p-4 text-sm leading-relaxed">
        <strong>Demo comparison.</strong> Official venue facts are linked in the table. Photos are illustrative. Prices and ratings are sample data. Linked airport distances and timings come from official sources; other travel figures are demo estimates, not live routes. Railway stations are suggested arrival options; confirm the closest station. Confirm quotes, policies and dates directly with each venue.
        <button type="button" onClick={()=>setCompareVenues([20,31,18])} className="mt-3 block min-h-11 rounded-full bg-[#1E4D3B] px-5 font-semibold text-white">Load researched example</button>
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold" aria-live="polite">{selected.length} of 3 venues selected</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">Guests<input aria-label="Event guest count" type="number" min="1" max="10000" value={guests} onChange={e=>setGuests(Math.max(1,Math.min(10000,Number(e.target.value)||1)))} className="w-24 rounded-lg border border-[#DED8CE] bg-white px-3 py-2"/></label>
          <label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={differences} disabled={selected.length<2} onChange={e=>setDifferences(e.target.checked)} className="accent-[#1E4D3B]"/>Show only differences</label>
          {selected.length>0&&<button type="button" onClick={()=>{setCompareVenues([]);setDifferences(false);}} className="min-h-11 text-[#1E4D3B] underline">Clear all</button>}
        </div>
      </div>
      <p className="mb-3 text-xs text-slate-500">Scroll inside the table to explore. Venue names and detail labels stay visible. Green highlights the lowest sample price and largest listed capacity among comparable entries; ties are included. Capacities depend on seating layout.</p>
      <div role="region" aria-label="Venue comparison table, scroll vertically for details and horizontally for venues" tabIndex={0} className="max-h-[76svh] overflow-auto overscroll-contain rounded-xl border border-[#DED8CE] bg-white shadow-sm">
        <table className="w-full min-w-[850px] table-fixed border-separate border-spacing-0">
          <caption className="sr-only">Compare up to three venues using descriptive features and sourced venue information</caption>
          <colgroup><col className="w-[150px]"/><col/><col/><col/></colgroup>
          <thead><tr>
            <th scope="col" className={`${cell} sticky left-0 top-0 z-40 bg-[#FAF8F5] font-semibold uppercase tracking-wider text-xs`}>Venue details</th>
            {[0,1,2].map(i=>{const v=selected[i]; return <th scope="col" key={i} className={`${cell} sticky top-0 z-30 ${i===1?'bg-[#F0F4F0]':'bg-white'}`}>
              {v?<div className="relative pr-5">
                <button type="button" aria-label={`Remove ${v.title}`} onClick={()=>setCompareVenues(compareList.filter(id=>id!==v.id))} className="absolute -right-2 -top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white shadow"><X size={16}/></button>
                <img src={v.id===20 ? "/images/stays/goa-cavelossim-beach.jpg" : v.imageUrl} alt={`Illustrative photo for ${v.title}`} loading="lazy" decoding="async" className="mb-2 h-14 w-20 rounded-lg object-cover sm:h-16"/>
                <h2 className="min-h-12 font-serif text-base font-semibold leading-snug">{v.title}</h2>
                <p className="mt-1 text-xs font-normal text-slate-500">{v.city}</p>
                <button type="button" onClick={()=>open(i)} className="mt-1 min-h-11 text-xs font-medium text-[#1E4D3B] underline">Change venue</button>
              </div>:<button type="button" onClick={()=>open(i)} className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#9AAE9E] bg-[#FAF8F5] text-[#1E4D3B]"><Plus size={25}/>Add venue {i+1}</button>}
            </th>})}
          </tr></thead>
          <tbody>
            {selected.length===0?<tr><td colSpan={4} className="p-10 text-center text-slate-600">Choose venues above, or load the researched example to explore the comparison.</td></tr>:comparisonGroups.map(group=>{
              const rows=group.rows.filter(row=>!differences||selected.length<2||new Set(selected.map(v=>row.value(v,guests))).size>1);
              return <React.Fragment key={group.title}><tr><th colSpan={4} className="border-y border-[#DED8CE] bg-[#EFECE6] text-left"><button type="button" aria-expanded={!closed.includes(group.title)} onClick={()=>setClosed(prev=>prev.includes(group.title)?prev.filter(s=>s!==group.title):[...prev,group.title])} className="flex min-h-12 w-full items-center gap-3 px-4 text-xs font-bold uppercase tracking-wider">{group.title}<ChevronDown size={16} className={closed.includes(group.title)?'-rotate-90':''}/></button></th></tr>
                {!closed.includes(group.title)&&(rows.length?rows.map(row=><tr key={row.label}>
                  <th scope="row" className={`${cell} sticky left-0 z-10 bg-[#FAF8F5] font-medium`}>{row.label}{row.demo&&<span className="mt-1 block text-[10px] font-normal uppercase tracking-wide text-[#9E4B32]">Demo estimate</span>}</th>
                  {[0,1,2].map(i=>{const v=selected[i];return <td key={i} className={`${cell} ${i===1?'bg-[#1E4D3B]/[0.04]':''}`}>{v?<>{row.metric&&(row.metric==='price'?lowest:largest).includes(v.id)&&<span className="mb-2 block w-fit rounded-full bg-[#1E4D3B] px-2.5 py-1 text-[10px] font-bold text-white">{row.metric==='price'?'Lowest sample price':'Largest listed capacity'}</span>}<span className={row.metric&&(row.metric==='price'?lowest:largest).includes(v.id)?'font-semibold text-[#1E4D3B]':''}>{row.value(v,guests)}</span>{(row.source?.(v)||(row.evidence&&researchedVenues[v.id]?.url))&&<a href={row.source?.(v)||researchedVenues[v.id]?.url} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-1 text-xs text-[#1E4D3B] underline">Official venue source<ExternalLink size={11}/></a>}</>:<span className="text-slate-400">Add a venue above</span>}</td>})}
                </tr>):<tr><td colSpan={4} className="p-4 text-sm text-slate-500">No differences in this section.</td></tr>)}
              </React.Fragment>
            })}
            {selected.length>0&&<tr><th scope="row" className={`${cell} sticky left-0 bg-[#FAF8F5]`}>Next steps</th>{[0,1,2].map(i=><td className={cell} key={i}>{selected[i]&&<div className="flex flex-col items-start gap-3"><Link to={`/venues/${selected[i].slug}`} className="font-semibold text-[#1E4D3B] underline">View property</Link><Link to={`/rfq?venue=${encodeURIComponent(selected[i].title)}`} className="rounded-full bg-[#1E4D3B] px-4 py-3 text-xs font-semibold text-white">Request quote</Link></div>}</td>)}</tr>}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-slate-500">Official facts checked 30 October 2026. Travel reference points differ by city; these distances are not measured from your location. Space capacity varies by seating layout and should be confirmed for your event.</p>
    </div>
    <dialog ref={dialog} onCancel={()=>setSlot(null)} onClick={e=>{if(e.target===e.currentTarget)setSlot(null);}} className="m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-2xl border border-[#DED8CE] bg-[#FAF8F5] p-0 text-[#181D1A] backdrop:bg-black/40">
      <div className="p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-serif text-xl font-semibold">Choose a venue</h2><button type="button" onClick={()=>setSlot(null)} aria-label="Close venue picker" className="grid h-11 w-11 place-items-center"><X size={20}/></button></div>
      <label className="flex items-center gap-2 rounded-xl border border-[#DED8CE] bg-white px-3"><Search size={18}/><input autoFocus aria-label="Search venues by name or city" placeholder="Search by venue, area or city" value={query} onChange={e=>setQuery(e.target.value)} className="min-h-12 w-full bg-transparent text-sm outline-none"/></label>
      <div className="mt-4 max-h-[55svh] overflow-y-auto">{candidates.length?candidates.map(v=><button key={v.id} type="button" onClick={()=>choose(v.id)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-[#EFECE6]"><img loading="lazy" decoding="async" src={v.imageUrl} alt="" className="h-14 w-20 rounded-lg object-cover"/><span className="min-w-0"><span className="block text-sm font-semibold">{v.title}</span><span className="text-xs text-slate-500">{v.city}</span></span><Plus className="ml-auto shrink-0" size={17}/></button>):<p className="py-6 text-sm text-slate-500">No matching venues. Try another name or city.</p>}</div>
      </div>
    </dialog>
  </div>;
}
