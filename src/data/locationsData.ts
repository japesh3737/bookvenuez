export interface LocationItem {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  popular?: boolean;
}

export const locationsData: LocationItem[] = [
  {
    id: 1,
    name: 'Mumbai',
    slug: 'mumbai',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/1/mumbai.jpg',
    popular: true,
  },
  {
    id: 9,
    name: 'Bangalore',
    slug: 'bangalore',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/9/Bangalorebookvenuezvenues.jpg',
    popular: true,
  },
  {
    id: 7,
    name: 'Pune',
    slug: 'pune',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/7/Pune.jpg.jpg',
    popular: true,
  },
  {
    id: 3,
    name: 'Goa',
    slug: 'goa',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/3/goa.jpg',
    popular: true,
  },
  {
    id: 8,
    name: 'Delhi NCR',
    slug: 'delhi-ncr',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/8/Delhi.jpg',
    popular: true,
  },
  {
    id: 11,
    name: 'Gurugram',
    slug: 'gurugram',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/11/Gurgaon.webp',
  },
  {
    id: 2,
    name: 'Lonavala',
    slug: 'lonavala',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/2/Lonavala.jpg',
  },
  {
    id: 6,
    name: 'Karjat',
    slug: 'karjat',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/6/karjatbookvenuez.jpg',
  },
  {
    id: 5,
    name: 'Igatpuri',
    slug: 'igatpuri',
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/assets.bookvenuez.com/MARKETPLACE/locations/5/KalsubaiPeakbookvenuezigatpuri.jpg',
  },
];
