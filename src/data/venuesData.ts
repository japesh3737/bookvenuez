export interface VenueSpace {
  name: string;
  capacity: number;
  type: string;
  seating?: string;
}

export interface VenueItem {
  id: number;
  title: string;
  slug: string;
  city: string;
  locationArea: string;
  address: string;
  rating: number;
  googleReviewCount: number;
  starRating: number;
  perPlatePrice: string;
  perPlatePriceNumeric: number;
  hourlyPricing?: string | null;
  maxBookingCapacity: string;
  minGuests: number;
  maxGuests: number;
  responseTime: string;
  verified: boolean;
  featured?: boolean;
  sections?: ('DESTINATION_WEDDING' | 'BEST_MATCH' | 'TRENDING_TOP_VENUES' | 'PARTY_VENUES' | 'MEETING_ROOMS')[];
  organizationCategories: string[];
  eventTypes: string[];
  foodOptions: ('veg_only' | 'veg_non_veg' | 'jain' | 'outside_catering')[];
  amenitiesList: string[];
  description: string;
  phone: string;
  imageUrl: string;
  imageUrls: string[];
  spaces: VenueSpace[];
  faqs?: { question: string; answer: string }[];
}

export const venuesData: VenueItem[] = [
  {
    id: 13,
    title: 'Ashoka banquets',
    slug: 'ashoka-banquets',
    city: 'Mumbai',
    locationArea: 'Sector 15A, Vashi, Navi Mumbai',
    address: 'Ashoka Banquet, Sector 15A, Plot No. 61C, behind Gujarati Bhavan, Juhu Nagar, Vashi, Navi Mumbai, Maharashtra 400703',
    rating: 4.8,
    googleReviewCount: 438,
    starRating: 2,
    perPlatePrice: 'Starting Rs.450.00 / plate',
    perPlatePriceNumeric: 450,
    hourlyPricing: null,
    maxBookingCapacity: '50 - 500 Guests',
    minGuests: 50,
    maxGuests: 500,
    responseTime: 'Within 1 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING', 'BEST_MATCH'],
    organizationCategories: ['Hotel Banquet Halls', 'Wedding Venues', 'Premium Property', 'Destination wedding'],
    eventTypes: ['Social', 'Corporate', 'Birthday venue'],
    foodOptions: ['veg_only', 'jain'],
    amenitiesList: [
      'Valet Parking',
      'Air Conditioning',
      'In-house Decor',
      'EV Charging',
      'Bridal Room',
      'Vegetarian Only',
      'Jain Food',
      'Changing Room',
      'Washrooms',
      'Generator Backup'
    ],
    description: 'Ashoka Banquet Hall is a premier, contemporary indoor wedding and celebration venue located in Sector 15A, Vashi, Navi Mumbai, positioned near PKC Hospital. Known for its elegant interiors and modern aesthetic.',
    phone: '+919920350444',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/organizations/13/banners/3-cropped.png',
    imageUrls: [
      'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/organizations/13/banners/3-cropped.png',
      'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/organizations/13/banners/4-cropped.png',
      'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/organizations/13/banners/1-cropped.png',
      'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/organizations/13/banners/2-cropped.png',
      'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/organizations/13/banners/5-cropped.png'
    ],
    spaces: [
      { name: 'Grand Hall 1', capacity: 350, type: 'Indoor AC' },
      { name: 'Celebration Hall 2', capacity: 150, type: 'Indoor AC' }
    ]
  },
  {
    id: 30,
    title: 'Royal Garden Lawns and banquet',
    slug: 'royal-garden-lawns-and-banquet',
    city: 'Mumbai',
    locationArea: 'Kharghar, Navi Mumbai',
    address: 'Plot No. 12, Sector 19, Kharghar, Navi Mumbai, Maharashtra 410210',
    rating: 4.1,
    googleReviewCount: 192,
    starRating: 3,
    perPlatePrice: 'Starting Rs.499.00 - Rs.599.00 / plate',
    perPlatePriceNumeric: 499,
    hourlyPricing: null,
    maxBookingCapacity: '50 - 500 Guests',
    minGuests: 50,
    maxGuests: 500,
    responseTime: 'Within 2 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING', 'BEST_MATCH'],
    organizationCategories: ['Wedding Venues', 'Party Venues', 'Hotel Banquet Halls'],
    eventTypes: ['Social', 'Wedding Reception'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Lawn', 'Air Conditioning', 'In-house Decor', 'Stage', 'Generator Backup'],
    description: 'Royal Garden Lawns & Royal Banquet is a highly sought-after, premium event venue located in Navi Mumbai featuring manicured open lawns and grand banquet spaces.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
    ],
    spaces: [
      { name: 'Open Celebration Lawn', capacity: 350, type: 'Outdoor Lawn' },
      { name: 'Royal AC Hall', capacity: 150, type: 'Indoor AC' }
    ]
  },
  {
    id: 31,
    title: 'Novotel Mumbai International Airport',
    slug: 'novotel-mumbai-international-airport',
    city: 'Mumbai',
    locationArea: 'Andheri East, Mumbai',
    address: 'CTS 1359, Next to Airport Metro Station, Andheri Kurla Rd, Mumbai 400059',
    rating: 4.7,
    googleReviewCount: 8156,
    starRating: 5,
    perPlatePrice: 'Starting Rs.500.00 - Rs.4,000.00 / plate',
    perPlatePriceNumeric: 500,
    hourlyPricing: null,
    maxBookingCapacity: '50 - 500 Guests',
    minGuests: 50,
    maxGuests: 500,
    responseTime: 'Within 1 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING', 'BEST_MATCH'],
    organizationCategories: ['Hotel Banquet Halls', 'Wedding Venues', 'Luxury Resort', 'Business Hotel', 'MICE Friendly'],
    eventTypes: ['Corporate', 'Social', 'Conference Hall'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Air Conditioning', 'Swimming Pool', 'Wi-Fi', 'Bar Available', 'AV Setup'],
    description: 'Host Exceptional Events at Novotel Mumbai International Airport. Novotel Mumbai International Airport offers modern luxury banquet halls and corporate boardrooms.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ],
    spaces: [
      { name: 'Grand Ballroom', capacity: 350, type: 'Indoor AC' },
      { name: 'Summit Room', capacity: 150, type: 'Indoor AC' }
    ]
  },
  {
    id: 24,
    title: 'Anchaviyo Resort Palghar',
    slug: 'anchaviyo-resort-palghar',
    city: 'Mumbai',
    locationArea: 'Wada, Palghar, Maharashtra',
    address: 'Kharivali, Wada, Palghar, Maharashtra 421303',
    rating: 4.2,
    googleReviewCount: 3085,
    starRating: 5,
    perPlatePrice: 'Starting Rs.2,000.00 / plate',
    perPlatePriceNumeric: 2000,
    hourlyPricing: null,
    maxBookingCapacity: '50 - 1000 Guests',
    minGuests: 50,
    maxGuests: 1000,
    responseTime: 'Within 1 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING', 'BEST_MATCH'],
    organizationCategories: ['Luxury Resort', 'Destination wedding', 'Pet Friendly', 'Wellness Retreat'],
    eventTypes: ['Social', 'Destination wedding'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Riverfront', 'Pet Friendly', 'Pool', 'Nature Trails', 'Bridal Villa'],
    description: 'Anchaviyo Resort in Wada, Palghar, is a luxury riverside destination wedding property spread across lush acres with tree houses, chalets, and river-facing amphitheaters.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    spaces: [
      { name: 'Riverfront Lawn', capacity: 700, type: 'Open Air' },
      { name: 'Glasshouse AC Banquet', capacity: 300, type: 'Indoor AC' }
    ]
  },
  {
    id: 14,
    title: 'Meluha The Fern Mumbai, Powai',
    slug: 'meluha-the-fern-mumbai-powai',
    city: 'Mumbai',
    locationArea: 'Powai, Mumbai',
    address: 'Central Ave, Hiranandani Gardens, Panchkutir Ganesh Nagar, Powai, Mumbai, Maharashtra 400076',
    rating: 4.7,
    googleReviewCount: 1250,
    starRating: 5,
    perPlatePrice: 'Starting Rs.1,800.00 / plate',
    perPlatePriceNumeric: 1800,
    hourlyPricing: null,
    maxBookingCapacity: '100 - 800 Guests',
    minGuests: 100,
    maxGuests: 800,
    responseTime: 'Within 1 h...',
    verified: true,
    featured: true,
    sections: ['BEST_MATCH', 'TRENDING_TOP_VENUES'],
    organizationCategories: ['Hotel Banquet Halls', 'Wedding Venues', 'Luxury Resort', 'Business Hotel'],
    eventTypes: ['Corporate', 'Social', 'Conference Hall'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Swimming Pool', 'Wi-Fi', 'Air Conditioning', 'In-house Decor'],
    description: 'Meluha The Fern is a 5-star eco-sensitive luxury hotel nestled in Hiranandani Gardens, Powai. Offers exquisite banquet spaces and poolside decks.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'],
    spaces: [{ name: 'Imperial Ballroom', capacity: 500, type: 'Indoor AC' }]
  },
  {
    id: 18,
    title: 'The Tamarind Tree, Bangalore',
    slug: 'the-tamarind-tree-bangalore',
    city: 'Bangalore',
    locationArea: 'Kanakapura Road, Bangalore',
    address: '88, Kanakapura Rd, Avalahalli, Anjanapura, Bengaluru, Karnataka 560062',
    rating: 4.9,
    googleReviewCount: 640,
    starRating: 5,
    perPlatePrice: 'Starting Rs.2,200.00 / plate',
    perPlatePriceNumeric: 2200,
    hourlyPricing: null,
    maxBookingCapacity: '200 - 1200 Guests',
    minGuests: 200,
    maxGuests: 1200,
    responseTime: 'Within 1 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING'],
    organizationCategories: ['Destination wedding', 'Heritage Property', 'Wedding Venues'],
    eventTypes: ['Social', 'Corporate'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Bridal Room', 'Air Conditioning', 'In-house Decor', 'Courtyard'],
    description: 'Set amidst antique pavilions, historic tamarind groves, and open-air natural ponds in Bangalore.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
    spaces: [{ name: 'Pond Pavilion', capacity: 800, type: 'Open Air' }]
  },
  {
    id: 19,
    title: 'The Orchid Hotel Pune, Hinjewadi',
    slug: 'the-orchid-hotel-pune',
    city: 'Pune',
    locationArea: 'Hinjewadi, Pune',
    address: 'Adjacent to Balewadi Sports Complex, Hinjewadi, Pune, Maharashtra 411045',
    rating: 4.7,
    googleReviewCount: 890,
    starRating: 5,
    perPlatePrice: 'Starting Rs.1,450.00 / plate',
    perPlatePriceNumeric: 1450,
    hourlyPricing: null,
    maxBookingCapacity: '150 - 1500 Guests',
    minGuests: 150,
    maxGuests: 1500,
    responseTime: 'Within 2 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING', 'BEST_MATCH'],
    organizationCategories: ['Wedding Venues', 'Luxury Resort', 'Destination wedding'],
    eventTypes: ['Social', 'Corporate'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Swimming Pool', 'Air Conditioning', 'In-house Decor'],
    description: 'An iconic 5-star eco-hotel in Pune offering a majestic combination of manicured lawns and grand halls.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'],
    spaces: [{ name: 'Crystal Lawn', capacity: 1000, type: 'Outdoor Lawn' }]
  },
  {
    id: 20,
    title: 'Goa Marriott Resort & Spa, Miramar',
    slug: 'goa-marriott-resort-spa-miramar',
    city: 'Goa',
    locationArea: 'Miramar Beach, Panaji',
    address: 'Miramar Beach, Panaji, Goa 403001',
    rating: 4.9,
    googleReviewCount: 2100,
    starRating: 5,
    perPlatePrice: 'Starting Rs.2,800.00 / plate',
    perPlatePriceNumeric: 2800,
    hourlyPricing: null,
    maxBookingCapacity: '100 - 1200 Guests',
    minGuests: 100,
    maxGuests: 1200,
    responseTime: 'Within 1 h...',
    verified: true,
    featured: true,
    sections: ['DESTINATION_WEDDING'],
    organizationCategories: ['Beach Resort', 'Destination wedding', 'Luxury Resort'],
    eventTypes: ['Social', 'Corporate'],
    foodOptions: ['veg_only', 'veg_non_veg', 'jain'],
    amenitiesList: ['Valet Parking', 'Beachfront', 'Infinity Pool', 'In-house Decor'],
    description: 'Perched on the edge of Miramar Beach overlooking the Arabian Sea in Goa.',
    phone: '+919920350444',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    imageUrls: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'],
    spaces: [{ name: 'Sunset Beachfront Lawn', capacity: 700, type: 'Beach Lawn' }]
  }
];
