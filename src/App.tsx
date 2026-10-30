import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { FloatingCompareBar } from './components/venues/FloatingCompareBar';
import { Footer } from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { VenueDetailPage } from './pages/VenueDetailPage';
import { ComparePage } from './pages/ComparePage';
import { WishlistPage } from './pages/WishlistPage';
import { RfqPage } from './pages/RfqPage';
import { ListPropertyPage } from './pages/ListPropertyPage';
import { LoginPage } from './pages/LoginPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FaqPage } from './pages/FaqPage';
import { TermsPrivacyPage } from './pages/TermsPrivacyPage';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/venues/:slug" element={<VenueDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/rfq" element={<RfqPage />} />
              <Route path="/list-property" element={<ListPropertyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/terms-and-conditions" element={<TermsPrivacyPage type="terms" />} />
              <Route path="/privacy-policy" element={<TermsPrivacyPage type="privacy" />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingCompareBar />
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
