import React, { useState } from 'react';
import { Calendar, Clock, Users, BedDouble, CheckCircle2, Phone, X, ShieldCheck } from 'lucide-react';
import { VenueItem } from '../../data/venuesData';

interface BookingWidgetProps {
  venue: VenueItem;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ venue }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Evening');
  const [guestCount, setGuestCount] = useState('250');
  const [roomsCount, setRoomsCount] = useState(0);
  const [eventType, setEventType] = useState('Wedding Reception');

  // Demo Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const slots = [
    { id: 'Morning', label: 'Morning', time: '8:00 AM - 2:00 PM' },
    { id: 'Evening', label: 'Evening', time: '4:00 PM - 11:00 PM' },
    { id: 'Full Day', label: 'Full day', time: '12:00 AM - 11:00 PM' },
    { id: 'Custom', label: 'Custom', time: 'Flexible' },
  ];

  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const resetModal = () => {
    setModalOpen(false);
    setOtpSent(false);
    setIsSuccess(false);
    setOtpCode('');
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sticky top-24">
        
        {/* Pricing Header */}
        <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Pricing starts at</span>
            <span className="text-2xl font-black text-[#071B45]">{venue.perPlatePrice}</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
            {venue.responseTime}
          </span>
        </div>

        <form onSubmit={handleOpenModal} className="mt-5 space-y-4">
          
          {/* Select Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Event Date</span>
            </label>
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Time Slot</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSlot(s.id)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    selectedSlot === s.id
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-semibold">{s.label}</div>
                  <div className="text-[10px] text-slate-400">{s.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
            >
              <option value="Wedding Reception">Wedding Reception</option>
              <option value="Engagement / Sangeet">Engagement / Sangeet</option>
              <option value="Birthday Celebration">Birthday Celebration</option>
              <option value="Corporate Seminar">Corporate Seminar</option>
              <option value="Anniversary Party">Anniversary Party</option>
            </select>
          </div>

          {/* Guest Count & Rooms */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>Guests</span>
              </label>
              <input
                type="number"
                min="10"
                max={venue.maxGuests || 2000}
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-primary" />
                <span>Add Rooms</span>
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setRoomsCount(Math.max(0, roomsCount - 1))}
                  className="w-6 h-6 rounded bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-bold text-slate-800">{roomsCount}</span>
                <button
                  type="button"
                  onClick={() => setRoomsCount(roomsCount + 1)}
                  className="w-6 h-6 rounded bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Primary Check Availability / Quote Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md shadow-primary/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Availability &amp; Get Quote</span>
          </button>

          {/* Trust Guarantees */}
          <div className="pt-2 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Free quote without obligation to book</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Direct venue manager contact within 1 hour</span>
            </div>
          </div>

        </form>
      </div>

      {/* Demo Modal for Availability & Quote Verification */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              type="button"
              onClick={resetModal}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <>
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                    Direct Venue Quote
                  </span>
                  <h3 className="text-lg font-bold text-[#071B45]">
                    Enquire for {venue.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Slot: {selectedSlot} | Date: {selectedDate || 'Upcoming'} | {guestCount} Guests
                  </p>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number (for OTP verification)
                      </label>
                      <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                        <span className="px-3 py-2.5 bg-slate-100 text-xs font-bold text-slate-600 border-r border-slate-200">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="Enter 10-digit mobile"
                          maxLength={10}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          className="flex-1 px-3 py-2.5 text-sm text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#EFECE6]/70 border border-[#DED8CE] text-[11px] text-[#1E4D3B]">
                      <strong>Demo Notice:</strong> This is a frontend demo replica. No real SMS charges or customer tracking will occur.
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md shadow-primary/20 transition-all"
                    >
                      Send Verification Code
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Enter 4-Digit Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 1234"
                        maxLength={4}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-widest text-lg font-bold py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      <p className="text-[11px] text-slate-400 mt-1 text-center">
                        Code sent to +91 {phoneNumber} (Demo code: <strong>1234</strong>)
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
                    >
                      Confirm &amp; Check Availability
                    </button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#071B45]">
                  Enquiry Request Dispatched!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your availability enquiry for <strong>{venue.title}</strong> has been received with Reference ID <strong>#BV-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
