import { VenueItem } from './venuesData';

// Unverified routes are deliberately labelled as demo planning estimates in every view.
export const planning: Record<number, {airport: string; km: number; minutes: number; rail: string; railKm: number; railMinutes: number; timing: string; source?: string}> = {
  13: {airport:'Mumbai Airport (BOM)',km:25,minutes:65,rail:'Vashi',railKm:2,railMinutes:10,timing:'Event slots and music cutoff: confirm with venue'},
  30: {airport:'Mumbai Airport (BOM)',km:36,minutes:80,rail:'Kharghar',railKm:4,railMinutes:15,timing:'Event slots and music cutoff: confirm with venue'},
  31: {airport:'Mumbai Airport, international terminal (BOM)',km:1.5,minutes:15,rail:'Andheri',railKm:5,railMinutes:25,timing:'Hotel check-in 3 pm · check-out noon; event slots on enquiry',source:'https://all.accor.com/hotel/B4C0/index.en.shtml'},
  24: {airport:'Mumbai Airport (BOM)',km:90,minutes:150,rail:'Palghar',railKm:50,railMinutes:90,timing:'Check-in, checkout and event slots: confirm with venue'},
  14: {airport:'Mumbai Airport (BOM)',km:8,minutes:35,rail:'Kanjurmarg',railKm:4,railMinutes:20,timing:'Check-in, checkout and event slots: confirm with venue'},
  18: {airport:'Bengaluru Airport (BLR)',km:47,minutes:110,rail:'KSR Bengaluru',railKm:18,railMinutes:55,timing:'Enquiry hours 9:30 am–5:30 pm daily; event slots on enquiry',source:'https://www.thetamarindtree.in/contact-us/'},
  19: {airport:'Pune Airport (PNQ)',km:24,minutes:65,rail:'Pune Junction',railKm:20,railMinutes:50,timing:'Check-in, checkout and event slots: confirm with venue'},
  20: {airport:'Goa Dabolim Airport (GOI)',km:30,minutes:55,rail:'Karmali',railKm:18,railMinutes:35,timing:'Hotel check-in 3 pm · check-out noon; event slots on enquiry',source:'https://www.marriott.com/hotels/travel/goimc-goa-marriott-resort-and-spa/'},
};
export const money = (n: number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const capacityValue = (v: VenueItem): number | undefined => v.id===18 ? undefined : v.id===20 ? 400 : v.id===31 ? 700 : v.maxGuests;
export function bestVenueIds(venues: VenueItem[], metric: 'price'|'capacity'): number[] {
  const entries=venues.map(v=>({id:v.id,value:metric==='price'?v.perPlatePriceNumeric:capacityValue(v)})).filter((v):v is {id:number;value:number}=>typeof v.value==='number'&&Number.isFinite(v.value)&&v.value>0);
  if(entries.length<2) return [];
  const best=metric==='price'?Math.min(...entries.map(v=>v.value)):Math.max(...entries.map(v=>v.value));
  return entries.filter(v=>v.value===best).map(v=>v.id);
}
