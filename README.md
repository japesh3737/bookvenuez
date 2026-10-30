# Bookvenuez Frontend Replica

A faithful, standalone frontend-only replica of the **BookVenuez** website ([https://www.bookvenuez.com](https://www.bookvenuez.com)), recreated using **React + Vite**, **Tailwind CSS**, **React Router**, and **Lucide React**.

Built with clean, predictable semantic HTML and modular components for direct local experimentation, UI/UX refinement, and seamless HTML-to-Figma import compatibility.

---

## 🛠️ Technology Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3 (configured with exact BookVenuez design tokens)
- **Typography:** Inter (Sans) & Playfair Display (Serif) via Google Fonts
- **Navigation:** React Router 6 (SPA client-side routing)
- **Icons:** Lucide React
- **State Management:** React Context API + LocalStorage persistence (Wishlist, Compare, Search Filters, User session)

---

## 📂 Replicated Pages & Features

| Page | Route | Description & Features |
| :--- | :--- | :--- |
| **Homepage** | `/` | Hero section, eyebrow trust badge, interactive search bar, 5 venue carousels (Destination Weddings, Best Match, Trending Top, Party Venues, Meeting Rooms), "Why Book With Us" grid, partner onboarding banner, and FAQ accordion. |
| **Search & Discovery** | `/search` | Name search input, multi-faceted sidebar filters (City, Event Types, Guest Capacity, Rating, Food Policy, Categories), active filter chips, sort by Price/Rating, responsive mobile filter drawer, and empty state. |
| **Venue Details** | `/venues/:slug` | Interactive photo gallery with full-screen lightbox, venue header badges, ratings & review stats, available spaces breakdown, amenities grid with icons, Google Maps location card, sticky booking/quote widget, and venue FAQs. |
| **Compare Venues** | `/compare` | Side-by-side comparison matrix for up to 4 venues (Pricing, Capacity, Rating, Food Policy, Spaces, Amenities checklist). |
| **Shortlist / Wishlist** | `/wishlist` | Saved favorite venues grid with quick comparison and quote requests. |
| **Request for Quote (RFQ)** | `/rfq` | 3-step interactive quote generator (Event Basics, Budget & Preferences, Contact & simulated OTP verification). |
| **List Your Property** | `/list-property` | Venue partner value proposition landing page and partner onboarding application form. |
| **Authentication** | `/login` | Tabbed Log In and Sign Up screens with demo authentication state. |
| **About Us** | `/about-us` | Company story, trust metrics (350+ venues, 9 cities, 0 fees), and core values. |
| **Contact Support** | `/contact-us` | 24x7 phone, email, registered address, and interactive message inquiry form. |
| **FAQs** | `/faq` | Tabbed knowledge base across 4 categories (Booking & Enquiries, Pricing & Payments, Venue Partners, Support). |
| **Legal** | `/terms-and-conditions`, `/privacy-policy` | Formatted platform legal documents. |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation
Clone or navigate to the project directory:
```bash
cd c:\Users\ROHIT\Downloads\tourist
```

Install dependencies:
```bash
npm install
```

### Run Locally
Start the local Vite development server:
```bash
npm run dev
```

Open your browser and visit:
👉 **[http://localhost:3000](http://localhost:3000)**

### Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🎨 Design Tokens & Customization

The design system is centralized in `tailwind.config.js`:
- **Primary Brand Blue:** `#2354b0` (`primary`)
- **Primary Tint:** `#4f7bd8` (`primary.tint`)
- **Brand Navy:** `#071B45` (`navy.900`)
- **Border Radius:** `0.75rem` (12px base radius)
- **Shadows:** Custom `shadow-card`, `shadow-card-hover`, and `shadow-brand`

All mock venue records are separated into `src/data/venuesData.ts` and can be easily edited or extended without touching UI components.

---

## 📐 Figma Compatibility
The codebase uses standard semantic tags (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<h1>`-`<h3>`), flexbox, grid, and explicit CSS spacing tokens. This allows tools like **html-to-figma** or the **Figma to Code / Builder.io** plugin to cleanly convert rendered pages into native Figma frames with auto-layout and editable text layers.
