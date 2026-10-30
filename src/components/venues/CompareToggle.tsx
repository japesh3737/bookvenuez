import { Check, Columns3 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../context/AppContext';
import { VenueItem } from '../../data/venuesData';
export function CompareToggle({venue}:{venue:VenueItem}) {
  const {compareList,isInCompare,addToCompare,removeFromCompare}=useApp();
  const active=isInCompare(venue.id);
  return <button type="button" aria-label={`${active?'Remove from':'Add to'} compare: ${venue.title}`} aria-pressed={active} onClick={e=>{
    e.stopPropagation();
    if(active) removeFromCompare(venue.id);
    else if(compareList.length>=3) toast.info('Three venues selected. Remove one from the comparison bar to add another.');
    else addToCompare(venue.id);
  }} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold ${active?'border-[#1E4D3B] bg-[#1E4D3B] text-white':'border-[#9AAE9E] bg-white text-[#1E4D3B] hover:bg-[#F0F4F0]'}`}>{active?<Check size={16}/>:<Columns3 size={16}/>} {active?'Added to compare':'Add to compare'}</button>;
}
