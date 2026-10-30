import { planning } from './venuePlanning';
import { VenueItem } from './venuesData';
export type ComparisonRow = { label: string; value: (venue: VenueItem, guests: number) => string; evidence?: boolean; demo?: boolean; source?: (venue: VenueItem) => string | undefined; metric?: "price" | "capacity" };
export type ComparisonGroup = { title: string; rows: ComparisonRow[] };
export const researchedVenues: Record<number, {url:string; capacity:string; spaces:string; food:string; facilities:string; stay:string; airport:string; km:number; minutes:number}> = {
  20: {url:'https://www.marriott.com/en-us/hotels/goimc-goa-marriott-resort-and-spa/events/', capacity:'Grand Ballroom: up to 400 banquet guests; lawns: 200 banquet guests', spaces:'10 event rooms; ballroom, meeting rooms and outdoor lawns', food:'Custom event menus and wedding planning offered', facilities:'Conference Wi-Fi; poolside and beach celebration options', stay:'Hotel accommodation; confirm room block and rates',airport:'Goa Dabolim Airport (GOI)',km:30,minutes:55},
  31: {url:'https://www.novotelmumbaiinternationalairport.com/meetings-events/',capacity:'Conference spaces for 8–700 guests; layout dependent',spaces:'Summit pillarless hall: 5,122 sq ft; rooftop and smaller meeting spaces',food:'Custom catering and in-house event management',facilities:'Conference technology; meeting and social-event spaces',stay:'Hotel rooms and suites; confirm room block and rates',airport:'Mumbai Airport, Terminal 2 (BOM)',km:3,minutes:15},
  18: {url:'https://www.thetamarindtree.in/about-us/',capacity:'Event capacity unconfirmed; food and kitchen areas described for 1,000 guests (excluded from capacity ranking)',spaces:'Courtyards, gardens, Bandstand, pond and enclosed Rangastala',food:'Two large kitchen areas and food counters; catering terms on enquiry',facilities:'Bride/groom suites; heritage villa and garden spaces',stay:'Villa and suites offered; confirm current accommodation capacity',airport:'Bengaluru Airport (BLR)',km:58,minutes:110},
};
const facts = (v:VenueItem) => researchedVenues[v.id];
const money = (n:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const comparisonGroups: ComparisonGroup[] = [
  {title:'At a glance',rows:[
    {label:'Location',value:v=>[v.locationArea,v.city].filter(Boolean).join(', ')},
    {label:'Venue style',value:v=>v.organizationCategories.join(', ')},
    {label:'Guest capacity',metric:'capacity',value:v=>facts(v)?.capacity || `${v.maxBookingCapacity} · demo listing`,evidence:true},
    {label:'Rating & reviews',value:v=>`${v.rating}/5 · ${v.googleReviewCount.toLocaleString('en-IN')} reviews (demo, not a live review feed)`,demo:true},
    {label:'Event types',value:v=>v.eventTypes.join(', ')},
  ]},
  {title:'Price & event budget',rows:[
    {label:'Starting catering rate',metric:'price',value:v=>`${money(v.perPlatePriceNumeric)} per guest · illustrative starting rate`,demo:true},
    {label:'Food subtotal for your guests',value:(v,g)=>`${money(v.perPlatePriceNumeric*g)} for ${g} guests · catering only`,demo:true},
    {label:'Hall hire & minimum spend',value:()=> 'Not published here — request an itemised venue quote'},
    {label:'Taxes & extras',value:()=> 'Excluded from subtotal: tax, venue hire, décor, rooms, transport and service fees'},
    {label:'Deposit & cancellation',value:()=> 'Confirm payment schedule, refund terms and date-change policy with venue'},
  ]},
  {title:'Getting there & timings',rows:[
    {label:'Airport',value:v=>planning[v.id]?.airport || 'Confirm nearest airport'},
    {label:'Airport distance',value:v=>{const p=planning[v.id];return p?`${p.km} km · ${p.source?'published airport distance':'demo planning estimate'}`:'Confirm with venue';},source:v=>planning[v.id]?.source},
    {label:'Airport transfer time',value:v=>planning[v.id]?`~${planning[v.id].minutes} minutes by road · traffic dependent`:'Confirm route',demo:true},
    {label:'Rail arrival option',value:v=>planning[v.id]?`${planning[v.id].rail} · suggested arrival station; confirm closest station with venue`:'Confirm closest railway station'},
    {label:'Station distance & drive',value:v=>planning[v.id]?`~${planning[v.id].railKm} km · ~${planning[v.id].railMinutes} min by road`:'Confirm route',demo:true},
    {label:'Hotel / enquiry timings',value:v=>planning[v.id]?.timing || 'Confirm with venue',source:v=>planning[v.id]?.source},
    {label:'Event slots & music cutoff',value:()=> 'Morning/evening slots, setup access, overtime fees and music cutoff: confirm with venue'},
    {label:'Parking & transfers',value:()=> 'Confirm parking capacity, valet charges and airport shuttle availability'},
  ]},
  {title:'Spaces, stays & facilities',rows:[
    {label:'Event spaces',value:v=>facts(v)?.spaces || v.spaces.map(s=>`${s.name}: ${s.capacity} guests (${s.type})`).join('; '),evidence:true},
    {label:'Facilities & services',value:v=>facts(v)?.facilities || `${v.amenitiesList.join(', ')} · demo listing`,evidence:true},
    {label:'Accommodation',value:v=>facts(v)?.stay || 'Room inventory and room-block rates available on enquiry',evidence:true},
    {label:'Accessibility',value:()=> 'Confirm step-free access, lifts, accessible toilets and guest support'},
    {label:'Power & weather backup',value:()=> 'Confirm generator capacity and indoor backup for outdoor functions'},
  ]},
  {title:'Food, policies & booking',rows:[
    {label:'Catering arrangements',value:v=>facts(v)?.food || 'Confirm in-house catering and outside-vendor charges',evidence:true},
    {label:'Dietary requests',value:()=> 'Ask about vegetarian, Jain, allergy-aware menus and separate preparation'},
    {label:'Décor, alcohol & music',value:()=> 'Confirm approved vendors, corkage, licences and music cutoff'},
    {label:'Event duration & availability',value:()=> 'Date and time slot on enquiry; no live availability connected'},
    {label:'Contact & site visit',value:()=> 'Use Request quote to confirm details and arrange a property visit'},
  ]},
];

