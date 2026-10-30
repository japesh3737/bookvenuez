import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react';
import { allCategorizedFaqs, FaqItem } from '../data/faqsData';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const categories = Object.keys(allCategorizedFaqs);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(allCategorizedFaqs[categories[0]][0]?.id || null);

  const toggle = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const currentFaqs = allCategorizedFaqs[activeCategory] || [];

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help &amp; Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#071B45] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Find immediate answers on booking banquet halls, pricing transparency, catering guidelines, and partner onboarding.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenFaqId(allCategorizedFaqs[cat][0]?.id || null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 mb-12 space-y-3">
          {currentFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#071B45]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-primary/10 text-primary' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="bg-[#EFECE6] border border-[#DED8CE] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#181D1A]">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-[#181D1A]/70 mt-1">
              Our 24x7 venue concierge is ready to assist you anytime.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919920350444"
              className="px-5 py-2.5 rounded-xl bg-[#1E4D3B] text-[#FAF8F5] font-semibold text-xs shadow-md hover:bg-[#163A2C] transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 99203 50444</span>
            </a>
            <Link
              to="/contact-us"
              className="px-5 py-2.5 rounded-xl bg-white border border-[#DED8CE] text-[#181D1A] font-semibold text-xs hover:bg-[#FAF8F5] transition-all"
            >
              Message Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
