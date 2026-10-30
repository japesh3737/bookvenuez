import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { locationsData } from '../data/locationsData';

export const ListPropertyPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: '',
    category: 'Hotel Banquet Halls',
    city: 'Mumbai',
    contactName: '',
    phone: '',
    email: '',
    capacity: '500',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
            <Building2 className="w-4 h-4" />
            <span>Venue Partner Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#071B45] tracking-tight leading-tight">
            Grow Your Venue Business with Bookvenuez
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
            Connect directly with couples, families, and corporate organizers searching for banquet halls and resorts in your city.
          </p>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#071B45] mb-1">Direct Inquiries</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-time phone and WhatsApp verified inquiries sent straight to your venue sales team.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#071B45] mb-1">Zero Commission</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No commission cuts on customer payments. You maintain full ownership of client negotiations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#071B45] mb-1">Partner Portal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage slot availability, hall pricing, photo albums, and leads through manage.bookvenuez.com.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#071B45] mb-1">Verified Partner Badge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gain customer trust with certified badges and prominent placement on city category pages.
            </p>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#071B45]">Register Your Property</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your basic venue details below. Our partner onboarding team will verify your listing within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Property / Banquet Hall Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Grand Palace Banquets"
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Property Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="Hotel Banquet Halls">Hotel Banquet Halls</option>
                    <option value="Wedding Venues">Wedding Venues</option>
                    <option value="Party Venues">Party Venues</option>
                    <option value="Luxury Resort">Luxury Resort</option>
                    <option value="Destination wedding">Destination Wedding</option>
                    <option value="Business Hotel">Business Hotel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                  >
                    {locationsData.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kulkarni"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                    <span className="px-3 py-3 bg-slate-100 text-xs font-bold text-slate-600 border-r border-slate-200">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-3 py-3 text-sm font-semibold text-slate-800 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sales@yourvenue.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Partner Listing Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-[#071B45]">
                Listing Application Received!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.contactName}</strong>. Our partner relations manager will call you at <strong>+91 {formData.phone}</strong> to verify <strong>{formData.propertyName}</strong> and set up your manager dashboard credentials.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Submit Another Property
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
