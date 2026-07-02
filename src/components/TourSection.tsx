/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, User, Mail, ChevronRight, Check, Trash2, Printer, Compass, Sparkles } from 'lucide-react';
import { TOUR_SLOTS, FACILITY_INFO } from '../data';
import { TourBooking } from '../types';

interface TourSectionProps {
  initialNotes?: string;
  onClearInitialNotes?: () => void;
}

export default function TourSection({ initialNotes = '', onClearInitialNotes }: TourSectionProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TOUR_SLOTS[0]);
  const [relationship, setRelationship] = useState<'Self' | 'Child' | 'Spouse' | 'Relative' | 'Professional Care Placement Agent' | 'Other'>('Child');
  const [urgency, setUrgency] = useState<'Immediate' | 'Within 1 Month' | 'Just Browsing / Future'>('Within 1 Month');
  const [notes, setNotes] = useState('');
  const [errorText, setErrorText] = useState('');

  // App State
  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [activeConfirmationId, setActiveConfirmationId] = useState<string | null>(null);

  // Load existing bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('duke_care_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local bookings data", e);
    }
  }, []);

  // Update notes if prefilled from assessment
  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
      // Scroll to this section nicely
      const element = document.getElementById('rooms'); // Or just scroll to scheduling box
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialNotes]);

  // Set minimum date to today (prevent past dates)
  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !date) {
      setErrorText("Please fill in all required fields to schedule your tour.");
      return;
    }
    setErrorText("");

    const newBooking: TourBooking = {
      id: `DC-TOUR-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      phone,
      date,
      timeSlot,
      relationship,
      urgency,
      notes: notes || undefined,
      timestamp: new Date().toLocaleString(),
      status: 'Confirmed'
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('duke_care_bookings', JSON.stringify(updatedBookings));
    setActiveConfirmationId(newBooking.id);

    // Reset Form Fields
    setFullName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTimeSlot(TOUR_SLOTS[0]);
    setRelationship('Child');
    setUrgency('Within 1 Month');
    setNotes('');
    if (onClearInitialNotes) onClearInitialNotes();
  };

  const handleCancelBooking = (id: string) => {
    const filtered = bookings.filter((b) => b.id !== id);
    setBookings(filtered);
    localStorage.setItem('duke_care_bookings', JSON.stringify(filtered));
    if (activeConfirmationId === id) {
      setActiveConfirmationId(null);
    }
  };

  const activeBooking = bookings.find((b) => b.id === activeConfirmationId);

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            In-Person or Virtual
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Schedule a Facility Tour
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-sans">
            Come meet Imelda Scott, smell our fresh home environment, inspect bedrooms, and discuss medical assessment processes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Booking Form or Confirmation Voucher */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/80">
            
            {activeBooking ? (
              /* Tour voucher layout */
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-md relative" id="tour-voucher">
                <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-emerald-900 text-amber-50 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase shadow">
                  Approved Pass
                </div>

                <div className="text-center pb-6 border-b border-dashed border-stone-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-950 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">Your Tour is Confirmed!</h3>
                  <p className="text-xs text-stone-500 font-mono mt-1">Tour Voucher Ref: <span className="text-emerald-800 font-bold">{activeBooking.id}</span></p>
                </div>

                <div className="py-6 space-y-4 text-sm text-stone-700 font-sans border-b border-dashed border-stone-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-mono text-stone-400 uppercase block">Resident Representative</span>
                      <span className="font-bold text-stone-900 mt-0.5 block">{activeBooking.fullName}</span>
                      <span className="text-xs text-stone-500 block">{activeBooking.relationship}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-stone-400 uppercase block">Urgency Timeline</span>
                      <span className="font-semibold text-amber-800 mt-0.5 block">{activeBooking.urgency}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-stone-400 uppercase block">Scheduled Date</span>
                        <span className="font-bold text-stone-900">{new Date(activeBooking.date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono text-stone-400 uppercase block">Meeting Time</span>
                        <span className="font-bold text-stone-900">{activeBooking.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {activeBooking.notes && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-600 mt-4 leading-relaxed font-mono">
                      <strong>Assessment Notes:</strong> {activeBooking.notes}
                    </div>
                  )}
                </div>

                <div className="pt-6 space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-950 flex gap-2.5">
                    <Compass className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <strong>What to expect next:</strong> Administrator Imelda Scott will call your number <span className="font-bold font-mono text-stone-900">({activeBooking.phone})</span> shortly to conduct a brief preliminary intake questionnaire.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-between pt-2">
                    <button
                      id="btn-print-tour"
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 border border-stone-200 px-4 py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Tour Voucher</span>
                    </button>
                    <button
                      id="btn-new-tour"
                      onClick={() => setActiveConfirmationId(null)}
                      className="text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <span>Schedule Another Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Main scheduling form */
              <form onSubmit={handleBookTour} className="space-y-6" id="tour-form">
                <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-200 pb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-emerald-800" />
                  <span>Choose Your Preferred Slot</span>
                </h3>

                {errorText && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs font-sans text-rose-800 animate-in fade-in duration-200">
                    {errorText}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="tour-fullname" className="text-xs font-mono font-bold text-stone-500 uppercase block">Your Full Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="tour-fullname"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Johnathan Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="tour-phone" className="text-xs font-mono font-bold text-stone-500 uppercase block">Contact Phone *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="tour-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(925) 555-0123"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="tour-email" className="text-xs font-mono font-bold text-stone-500 uppercase block">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="tour-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
                      />
                    </div>
                  </div>

                  {/* Date field */}
                  <div className="space-y-1.5">
                    <label htmlFor="tour-date" className="text-xs font-mono font-bold text-stone-500 uppercase block">Select Visit Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        id="tour-date"
                        required
                        min={getMinDate()}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Relationship dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="tour-relationship" className="text-xs font-mono font-bold text-stone-500 uppercase block">Your Relationship to Resident</label>
                    <select
                      id="tour-relationship"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
                    >
                      <option value="Child">Son / Daughter</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Relative">Other Relative</option>
                      <option value="Professional Care Placement Agent">Placement Specialist / Placement Agent</option>
                      <option value="Self">Self (Prospective Resident)</option>
                      <option value="Other">Other Contact</option>
                    </select>
                  </div>

                  {/* Urgency dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="tour-urgency" className="text-xs font-mono font-bold text-stone-500 uppercase block">Urgency Timeline</label>
                    <select
                      id="tour-urgency"
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
                    >
                      <option value="Immediate">Immediate / Emergency Placement</option>
                      <option value="Within 1 Month">Placement Within 30 Days</option>
                      <option value="Just Browsing / Future">Browsing / Preparing for Future</option>
                    </select>
                  </div>
                </div>

                {/* Time Slots Radio Group */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-stone-500 uppercase block">Select Meeting Time *</span>
                  <div className="flex flex-wrap gap-2">
                    {TOUR_SLOTS.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          id={`timeslot-${slot.replace(/[:\s]/g, '-')}`}
                          onClick={() => setTimeSlot(slot)}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-emerald-900 text-amber-50 shadow shadow-emerald-950/15 font-semibold'
                              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Notes */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="tour-notes" className="text-xs font-mono font-bold text-stone-500 uppercase block">Tell us about care requirements (Optional)</label>
                    {notes && (
                      <button
                        type="button"
                        onClick={() => setNotes('')}
                        className="text-[10px] font-semibold text-rose-700 hover:underline"
                      >
                        Clear prefilled info
                      </button>
                    )}
                  </div>
                  <textarea
                    id="tour-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., mobility issues, sundowning, specific diets, medications administered..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 leading-relaxed font-sans"
                  />
                </div>

                <button
                  type="submit"
                  id="tour-submit-btn"
                  className="w-full bg-emerald-900 hover:bg-emerald-850 text-amber-50 text-sm font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-transform flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-amber-100" />
                  <span>Request Tour Appointment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Active Bookings Dashboard or Credentials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Booking Dashboard (Stored in localStorage) */}
            {bookings.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6" id="bookings-history-dashboard">
                <div className="flex justify-between items-center border-b border-stone-150 pb-3">
                  <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-800 animate-spin-slow" />
                    <span>Your Scheduled Tours ({bookings.length})</span>
                  </h4>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                  {bookings.map((b) => (
                    <div key={b.id} id={`history-card-${b.id}`} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs font-sans relative hover:border-emerald-200 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-mono text-[10px] text-emerald-800 font-bold block">{b.id}</span>
                          <span className="font-bold text-stone-800 text-sm block mt-0.5">{b.fullName}</span>
                          <span className="text-stone-500 block mt-0.5 font-mono">{new Date(b.date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at {b.timeSlot}</span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setActiveConfirmationId(b.id)}
                            className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-1 rounded hover:bg-emerald-100"
                            id={`btn-view-${b.id}`}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-[10px] font-bold text-rose-700 bg-rose-50 p-1 rounded hover:bg-rose-100"
                            id={`btn-cancel-${b.id}`}
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* State Licensing & Quality Standards Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
              
              <h4 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-amber-200 shrink-0" />
                <span>Licensing &amp; Compliance</span>
              </h4>

              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-700 text-amber-100">✓</div>
                  <div>
                    <h5 className="text-xs font-bold text-white">California Title 22 Compliant</h5>
                    <p className="text-[11px] text-emerald-150 leading-relaxed font-sans mt-0.5">Licensed by the California Department of Social Services (CDSS) for high-quality residential care for the elderly.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-700 text-amber-100">✓</div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Full Accessibility &amp; Fire Safety</h5>
                    <p className="text-[11px] text-emerald-150 leading-relaxed font-sans mt-0.5">Equipped with level entry safety ramps, secure metal safety railings, direct fire extinguisher placement, and immediate dual-egress exits.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-700 text-amber-100">✓</div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Certified On-Site Administrator</h5>
                    <p className="text-[11px] text-emerald-150 leading-relaxed font-sans mt-0.5">Imelda B. Scott directs daily healthcare coordination, individualized diet plans, and medication safety logs.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-800 flex justify-between items-center font-mono text-[11px] text-emerald-200">
                <span>Facility License: {FACILITY_INFO.licenseNo}</span>
                <span className="text-amber-200">RCFE Certified</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
