export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const homepageFaqs: FaqItem[] = [
  {
    id: '1',
    question: 'How can I find the right venue for my event?',
    answer: 'Use our smart search filter by selecting your city, event type, guest count, and specific venue category. You can explore detailed photos, pricing, amenities, and compare multiple venues side-by-side.',
    category: 'Booking & Enquiries'
  },
  {
    id: '2',
    question: 'What types of events can I book through Bookvenuez?',
    answer: 'You can discover and book venues for weddings, receptions, pre-wedding festivities, birthday parties, corporate conferences, product launches, exhibitions, social get-togethers, and private gatherings.',
    category: 'Events'
  },
  {
    id: '3',
    question: 'How can I check venue availability and pricing?',
    answer: 'Each venue page features a real-time availability checker and pricing estimator. Choose your event date, preferred time slot (Morning, Evening, Full Day, or Custom), and submit a request to get quick quotes directly from venue managers.',
    category: 'Pricing & Payments'
  },
  {
    id: '4',
    question: 'Can I compare venues before submitting an enquiry?',
    answer: 'Yes! Click the "Compare" icon on any venue card to add it to your comparison tray. You can evaluate up to 4 venues side-by-side on guest capacity, per-plate pricing, rental costs, parking, and included amenities.',
    category: 'Booking & Enquiries'
  },
  {
    id: '5',
    question: 'What happens after I submit a venue enquiry?',
    answer: 'Once you submit a Request for Quote (RFQ), our verified venue managers and dedicated 24x7 venue concierge will reach out via call or WhatsApp within 1 hour with tailored availability and pricing details.',
    category: 'Support'
  },
];

export const allCategorizedFaqs: Record<string, FaqItem[]> = {
  'Booking & Enquiries': [
    {
      id: 'b1',
      question: 'How does the venue booking process work?',
      answer: 'Browse verified venues, check live availability, submit an enquiry or RFQ, schedule an in-person or virtual site visit, and confirm your reservation with transparent milestone pricing.'
    },
    {
      id: 'b2',
      question: 'Are there any platform booking fees for customers?',
      answer: 'No. Bookvenuez is 100% free for users. You pay the venue directly with no extra markups or hidden booking charges.'
    },
    {
      id: 'b3',
      question: 'Can I request a custom package with decor and catering?',
      answer: 'Absolutely. Many of our listed hotels and banquet halls offer comprehensive all-inclusive packages covering in-house catering, themed decoration, audiovisual equipment, and bridal suites.'
    },
    {
      id: 'b4',
      question: 'How soon will the venue partner respond to my enquiry?',
      answer: 'Over 85% of our venue partners respond within 1 hour. You will also receive an instant confirmation on SMS and WhatsApp.'
    },
    {
      id: 'b5',
      question: 'Can I schedule a site inspection before finalizing?',
      answer: 'Yes, you can schedule an assisted venue visit at your convenient date and time with our concierge team.'
    }
  ],
  'Pricing & Payments': [
    {
      id: 'p1',
      question: 'What does "per plate price" mean?',
      answer: 'The per plate price represents the catering cost per attending guest for vegetarian or non-vegetarian multi-course buffet meals, typically inclusive of standard setup and service staff.'
    },
    {
      id: 'p2',
      question: 'What payment methods are supported for venue deposits?',
      answer: 'Venues accept UPI, credit/debit cards, net banking, and direct bank transfers.'
    },
    {
      id: 'p3',
      question: 'Are taxes (GST) included in the displayed rates?',
      answer: 'Government GST (typically 18% on venue hall hire and 5% or 18% on catering) is calculated at final quotation depending on chosen services.'
    },
    {
      id: 'p4',
      question: 'Is there a Best Price Guarantee?',
      answer: 'Yes! We negotiate exclusive partner rates and guaranteed slot reservations with our venue network across India.'
    }
  ],
  'For Venue Partners': [
    {
      id: 'v1',
      question: 'How can I list my banquet hall or property on Bookvenuez?',
      answer: 'Click "List Your Property" in the top navigation, enter your property details, verify your business email & phone number, and our partner onboarding team will activate your profile within 24 hours.'
    },
    {
      id: 'v2',
      question: 'What benefits do venue owners get?',
      answer: 'Verified property badge, high-intent lead delivery directly to your CRM/phone, calendar management tools on manage.bookvenuez.com, and marketing exposure across 1,000+ city search queries.'
    },
    {
      id: 'v3',
      question: 'Can I manage multiple halls and banquet spaces under one listing?',
      answer: 'Yes. You can configure individual capacities, floor plans, and pricing for multiple halls, lawns, conference rooms, and poolside areas under a single venue profile.'
    }
  ],
  'Support & Cancellations': [
    {
      id: 's1',
      question: 'What is the standard cancellation and refund policy?',
      answer: 'Each venue maintains its individual policy regarding advance token amounts and date transfers. Full details are transparently displayed on each venue detail page.'
    },
    {
      id: 's2',
      question: 'How can I reach Bookvenuez customer support?',
      answer: 'You can contact our support team 24x7 at +91 99203 50444 or email us at support@bookvenuez.com.'
    }
  ]
};
