import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsPrivacyPage: React.FC<{ type: 'terms' | 'privacy' }> = ({ type }) => {
  const isTerms = type === 'terms';

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
            {isTerms ? <FileText className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#071B45] tracking-tight">
            {isTerms ? 'Terms & Conditions' : 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Last Updated: January 2026 | Bookvenuez Marketplace
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-6 text-sm text-slate-600 leading-relaxed">
          {isTerms ? (
            <>
              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using Bookvenuez (the &quot;Platform&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Bookvenuez acts as an introductory discovery marketplace connecting venue planners with third-party venue owners and event service providers.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">2. Zero Platform Booking Fee</h2>
                <p>
                  Bookvenuez charges zero platform booking fees or service surcharges to prospective event planners. All financial arrangements, cancellation terms, and token deposits are transacted directly between the customer and the respective venue management.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">3. Quotations &amp; Availability</h2>
                <p>
                  Venue pricing, availability, and hall slot reservations displayed on the Platform are provided by venue partners. While Bookvenuez endeavors to maintain 100% verified listings, final binding availability is confirmed upon direct written contract with the venue partner.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">4. User Conduct</h2>
                <p>
                  Users agree not to submit fraudulent quotation requests, impersonate other individuals, or use automated scrapers on the directory. Bookvenuez reserves the right to terminate access to abusive users.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">1. Information We Collect</h2>
                <p>
                  When you submit a venue enquiry, Request for Quote (RFQ), or register a property on Bookvenuez, we collect contact details such as your name, mobile phone number, email address, and event specifications (dates, guest count, and catering preference).
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">2. How We Use Your Information</h2>
                <p>
                  Your information is utilized solely to facilitate venue quotations, send OTP security verification codes, and connect you with matching venue managers. We do not sell or monetize personal contact data to third-party telemarketers.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">3. Security &amp; Storage</h2>
                <p>
                  All customer communications and quotation data are encrypted in transit via Transport Layer Security (TLS 1.3). Media assets and listings are maintained securely on Amazon Web Services infrastructure in India.
                </p>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#071B45] mb-2">4. Your Data Rights</h2>
                <p>
                  You have the right to request deletion of your quotation history or partner account anytime by emailing support@bookvenuez.com.
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
