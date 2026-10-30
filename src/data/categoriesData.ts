export interface EventTypeItem {
  id: number;
  name: string;
  slug: string;
  iconName?: string;
}

export const eventTypesData: EventTypeItem[] = [
  { id: 1, name: 'Corporate', slug: 'corporate' },
  { id: 2, name: 'Social', slug: 'social' },
  { id: 3, name: 'Exhibition', slug: 'exhibition' },
  { id: 4, name: 'PSU/Government', slug: 'psu-government' },
  { id: 5, name: 'Meeting Room', slug: 'meeting-room' },
  { id: 6, name: 'Birthday venue', slug: 'birthday-venue' },
  { id: 7, name: 'Conference Hall', slug: 'conference-hall' },
  { id: 8, name: 'Swimming Pool Venue', slug: 'swimming-pool-venue' },
];

export const organizationCategoriesData: string[] = [
  'Party Venues',
  'Hotel Banquet Halls',
  'Wedding Venues',
  'Premium Property',
  'Destination wedding',
  'Luxury Resort',
  'Beach Resort',
  'Heritage Property',
  'MICE Friendly',
  'Business Hotel',
  'Pet Friendly',
  'Wellness Retreat',
];
