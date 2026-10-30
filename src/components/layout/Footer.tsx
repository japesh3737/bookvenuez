import PushpinTearFooter from '../ui/pushpin-tear-footer';
export const Footer = () => <PushpinTearFooter
  className="bookvenuez-footer"
  brand="Bookvenuez."
  name="Your next chapter begins here"
  logo={<span className="font-serif text-xl font-semibold tracking-tight">Bookvenuez.</span>}
  logoHref="/"
  sheet="#1E4D3B" paper="#EFECE6" paperInk="#1E4D3B" sheetInk="#FAF8F5"
  height="min(900px, 100svh)" seed={23}
  email="support@bookvenuez.com" newsletter={null}
  status={{label:'Find a place for your story',href:'/search'}}
  mark="Curated places" timeZone="Asia/Kolkata" timeLabel="IST"
  socials={[{icon:'ig',label:'Instagram',href:'https://www.instagram.com/bookvenuez'},{icon:'linkedin',label:'LinkedIn',href:'https://www.linkedin.com/company/bookvenuez-com/'}]}
  columns={[
    {title:'Discover',links:[{label:'Wedding venues',href:'/search?category=Wedding+Venues'},{label:'Destination weddings',href:'/search?category=Destination+wedding'},{label:'Compare venues',href:'/compare'}],cta:{label:'Explore.',href:'/search'}},
    {title:'Plan with us',links:[{label:'About Bookvenuez',href:'/about-us'},{label:'List your property',href:'/list-property'},{label:'Contact us',href:'/contact-us'}],cta:{label:'Enquire.',href:'/rfq'}},
  ]}
  sideLinks={[{icon:'shield',label:'Privacy',href:'/privacy-policy'},{icon:'doc',label:'Terms',href:'/terms-and-conditions'}]}
  chat={{label:'Let’s plan',href:'/contact-us'}}
  copyright={`© ${new Date().getFullYear()} Bookvenuez`}
  credit="Some places become part of your story"
  handle={{label:'Help & FAQs',href:'/faq'}}
/>;
