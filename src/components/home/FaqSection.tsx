import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { homepageFaqs, FaqItem } from '../../data/faqsData';

export const FaqSection: React.FC<{ faqs?: FaqItem[] }> = ({ faqs = homepageFaqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#DED8CE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE6] text-[#1E4D3B] border border-[#DED8CE] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#181D1A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#181D1A]/70 mt-3 max-w-xl mx-auto">
            Everything you need to know about discovering, shortlisting, and reserving boutique venues and luxury stays.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#DED8CE] rounded-2xl overflow-hidden bg-white shadow-xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#FAF8F5]/80 transition-colors"
                >
                  <span className="text-sm sm:text-base font-serif font-semibold text-[#181D1A]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#181D1A]/70 shrink-0 transition-all duration-200 ${
                      isOpen ? 'rotate-180 bg-[#1E4D3B] text-[#FAF8F5]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#181D1A]/75 leading-relaxed border-t border-[#DED8CE]/60 bg-[#FAF8F5]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
