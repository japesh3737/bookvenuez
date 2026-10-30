import { VenueItem } from '../../data/venuesData';
import { money, planning } from '../../data/venuePlanning';
export function VenueQuickFacts({venue}:{venue:VenueItem}) {
  const p=planning[venue.id];
  return <div className="text-sm leading-relaxed text-[#37483F]">
    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2"><strong className="text-lg text-[#1E4D3B]">{money(venue.perPlatePriceNumeric)}<span className="text-xs font-normal"> / guest</span></strong><span className="text-[11px] text-[#8A4A30]">Sample catering rate</span></div>
    {p&&<dl className="grid gap-2 text-xs"><div><dt className="font-semibold">Airport</dt><dd>{p.airport} · {p.km} km · ~{p.minutes} min</dd></div><div><dt className="font-semibold">Rail arrival option</dt><dd>{p.rail} · ~{p.railKm} km · ~{p.railMinutes} min</dd></div><div><dt className="font-semibold">Timings</dt><dd>{p.timing}</dd></div></dl>}
    <div className="mt-3 flex flex-wrap gap-1.5">{venue.amenitiesList.slice(0,3).map(item=><span key={item} className="rounded-full bg-[#E8EDE7] px-2 py-1 text-[10px]">{item}</span>)}</div>
    <p className="mt-3 text-[10px] text-slate-500">Facilities and unlinked travel figures are demo data. Confirm closest station and event timings.{p?.source&&<> <a className="underline" href={p.source} target="_blank" rel="noreferrer">Official timing & airport details</a></>}</p>
  </div>;
}
