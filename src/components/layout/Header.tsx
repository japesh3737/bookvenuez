import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Columns3, Bookmark, CircleHelp, User, LogOut, ArrowUpRight } from 'lucide-react';
import { NotchNav } from '../ui/adaptive-notch-navigation-bar';
import { useApp } from '../../context/AppContext';
import { locationsData } from '../../data/locationsData';
import { eventTypesData, organizationCategoriesData } from '../../data/categoriesData';

export function SiteNavigation({overlay=false}:{overlay?:boolean}) {
  const {pathname} = useLocation();
  const {wishlist,compareList,user,logout} = useApp();
  const items = [
    {id:'explore',label:'Explore',href:'/search',icon:Compass,active:pathname.startsWith('/search')||pathname.startsWith('/venues/')},
    {id:'compare',label:'Compare',href:'/compare',icon:Columns3,badge:compareList.length?String(compareList.length):undefined,active:pathname==='/compare'},
    {id:'saved',label:'Saved',href:'/wishlist',icon:Bookmark,badge:wishlist.length?String(wishlist.length):undefined,active:pathname==='/wishlist'},
    {id:'help',label:'Help',href:'/faq',icon:CircleHelp,active:pathname==='/faq'||pathname==='/contact-us'},
  ];
  return <NotchNav overlay={overlay} items={items}
    logo={<Link to="/" aria-label="Bookvenuez home" className="inline-flex min-h-11 shrink-0 items-center text-base font-semibold tracking-tight text-white sm:text-lg">Bookvenuez<span className="ml-0.5 text-[#dfae85]">.</span></Link>}
    rightContent={<div className="flex items-center gap-3"><Link to="/list-property" className="hidden min-h-11 items-center gap-1 text-xs font-medium text-white hover:text-[#dfae85] xl:inline-flex">List property<ArrowUpRight size={13}/></Link><Link to="/login" aria-label={user ? 'Your account' : 'Sign in'} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><User size={17}/></Link></div>}>
    <div className="grid gap-6 sm:grid-cols-3">
      <div><h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#a8c2af]">Destinations</h2><div className="grid gap-1">{locationsData.map(city=><Link key={city.id} to={`/search?city=${encodeURIComponent(city.name)}`} className="rounded-lg px-2 py-2 text-sm hover:bg-white/10">{city.name}</Link>)}</div></div>
      <div><h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#a8c2af]">Your occasion</h2><div className="grid gap-1">{eventTypesData.map(event=><Link key={event.id} to={`/search?eventType=${encodeURIComponent(event.name)}`} className="rounded-lg px-2 py-2 text-sm hover:bg-white/10">{event.name}</Link>)}</div></div>
      <div><h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#a8c2af]">Discover more</h2><div className="grid gap-1">{organizationCategoriesData.slice(0,4).map(category=><Link key={category} to={`/search?category=${encodeURIComponent(category)}`} className="rounded-lg px-2 py-2 text-sm hover:bg-white/10">{category}</Link>)}<Link to="/about-us" className="px-2 py-2 text-sm hover:bg-white/10">Our story</Link><Link to="/contact-us" className="px-2 py-2 text-sm hover:bg-white/10">Contact concierge</Link><Link to="/list-property" className="px-2 py-2 text-sm hover:bg-white/10">List your property</Link>{user&&<button type="button" onClick={logout} className="flex min-h-11 items-center gap-2 px-2 text-left text-sm"><LogOut size={14}/>Sign out</button>}</div></div>
    </div>
  </NotchNav>;
}
export const Header: React.FC = () => {
  const {pathname} = useLocation();
  return pathname==='/'?null:<div className="sticky top-0 z-[150]"><SiteNavigation/></div>;
};
