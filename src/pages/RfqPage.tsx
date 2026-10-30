import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { locationsData } from '../data/locationsData';
import { eventTypesData } from '../data/categoriesData';

export const RfqPage: React.FC = () => {
  const [params] = useSearchParams();
  const selectedVenue = params.get('venue');
  const [step, setStep] = useState(1);

  // Form Fields
  const [eventType, setEventType] = useState('Wedding Reception');
  const [city, setCity] = useState('Mumbai');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('200');
  
  const [budget, setBudget] = useState('Rs. 2 Lakhs - 5 Lakhs');
  const [roomsNeeded, setRoomsNeeded] = useState('None');
  const [foodPref, setFoodPref] = useState('Veg & Non-Veg');
  const [notes, setNotes] = useState(selectedVenue ? `Venue enquiry: ${selectedVenue}` : '');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Demo Modal State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedVenue && <p className="mb-5 rounded-xl bg-[#EFECE6] p-4 text-sm text-[#1E4D3B]">Venue enquiry: <strong>{selectedVenue}</strong></p>}
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Venue Assistance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#071B45] tracking-tight">
            Request a Free Custom Venue Quote
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Tell us your celebration dates, guest count, and preferences. Our concierge will curate quotes from verified banquet halls within 1 hour.
          </p>
        </div>

        {/* Multi-Step Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
              1
            </span>
            <span>Event Basics</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
              2
            </span>
            <span>Budget &amp; Food</span>
          </div>
          <div className="w-8 sm:w-12 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-slate-400'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
              3
            </span>
            <span>Verify &amp; Submit</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10">
          
          {!submitted ? (
            <>
              {/* Step 1: Basics */}
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span>Event Type</span>
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="Wedding Reception">Wedding Reception</option>
                        <option value="Destination Wedding">Destination Wedding</option>
                        <option value="Pre-Wedding / Sangeet">Pre-Wedding / Sangeet</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Corporate Conference">Corporate Conference</option>
                        <option value="Exhibition / Expo">Exhibition / Expo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>Target City</span>
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {locationsData.map((loc) => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>Tentative Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span>Expected Guests</span>
                      </label>
                      <input
                        type="number"
                        min="20"
                        max="5000"
                        required
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                    >
                      <span>Proceed to Budget</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Budget & Requirements */}
              {step === 2 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-primary" />
                        <span>Estimated Venue Budget</span>
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Under Rs. 2 Lakhs">Under Rs. 2 Lakhs</option>
                        <option value="Rs. 2 Lakhs - 5 Lakhs">Rs. 2 Lakhs - 5 Lakhs</option>
                        <option value="Rs. 5 Lakhs - 10 Lakhs">Rs. 5 Lakhs - 10 Lakhs</option>
                        <option value="Rs. 10 Lakhs - 25 Lakhs">Rs. 10 Lakhs - 25 Lakhs</option>
                        <option value="Above Rs. 25 Lakhs">Above Rs. 25 Lakhs (Luxury)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Food / Catering Preference
                      </label>
                      <select
                        value={foodPref}
                        onChange={(e) => setFoodPref(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Veg & Non-Veg">Vegetarian &amp; Non-Vegetarian</option>
                        <option value="Pure Vegetarian">Pure Vegetarian Only</option>
                        <option value="Jain Options Required">Jain Friendly Menu</option>
                        <option value="Outside Catering Preferred">Looking to Bring Outside Caterer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Guest Accommodation Rooms
                      </label>
                      <select
                        value={roomsNeeded}
                        onChange={(e) => setRoomsNeeded(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="None">No Rooms (Day Event)</option>
                        <option value="1-5 Rooms">1 - 5 Rooms (Family)</option>
                        <option value="10-25 Rooms">10 - 25 Rooms</option>
                        <option value="50+ Rooms">50+ Rooms (Residential Wedding)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Special Requests or Preferences
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lawn with sea view, DJ allowed till late"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                    >
                      <span>Proceed to Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Contact & Demo OTP */}
              {step === 3 && (
                <div className="space-y-6">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-primary" />
                            <span>Your Full Name</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rohit Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            <span>Mobile Number</span>
                          </label>
                          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                            <span className="px-3 py-3 bg-slate-100 text-xs font-bold text-slate-600 border-r border-slate-200">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              placeholder="10-digit mobile"
                              maxLength={10}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                              className="w-full px-3 py-3 text-sm font-medium text-slate-800 bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-primary" />
                            <span>Email Address (for quote PDFs)</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. rohit@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Strict Privacy &amp; Anti-Spam Policy</span>
                        </div>
                        <p>We only share your quote specifications with vetted venue managers matching your exact date and budget.</p>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md transition-all"
                        >
                          Send Verification Code
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleFinalSubmit} className="max-w-md mx-auto text-center space-y-4 py-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        <Phone className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-[#071B45]">
                        Verify Your Mobile Number
                      </h3>
                      <p className="text-xs text-slate-500">
                        Enter the demo verification code sent to <strong>+91 {phone}</strong>
                      </p>

                      <div className="my-4">
                        <input
                          type="text"
                          required
                          placeholder="Enter 1234"
                          maxLength={4}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="w-48 mx-auto text-center tracking-widest text-2xl font-bold py-3 rounded-xl border-2 border-primary focus:outline-none"
                        />
                        <p className="text-[11px] text-slate-400 mt-2">
                          Demo Code: <strong>1234</strong>
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all"
                      >
                        Submit Request for Quote
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-[#071B45]">
                Quote Request Submitted Successfully!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>! Your requirements for <strong>{eventType}</strong> in <strong>{city}</strong> ({guests} guests) have been registered.
              </p>
              <div className="inline-block p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span>Reference Ticket: </span>
                <strong className="text-primary font-mono text-sm">#RFQ-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark transition-all"
                >
                  <span>Return to Homepage</span>
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
