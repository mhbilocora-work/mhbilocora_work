/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Clock, Heart, Send, Check } from 'lucide-react';
import { FACILITY_INFO } from '../data';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill out your name, email, and message.");
      return;
    }
    setError('');

    const newMessage = {
      id: `MSG-${Date.now()}`,
      name,
      email,
      phone,
      message,
      timestamp: new Date().toLocaleString()
    };

    try {
      const stored = localStorage.getItem('duke_care_messages');
      const messages = stored ? JSON.parse(stored) : [];
      localStorage.setItem('duke_care_messages', JSON.stringify([newMessage, ...messages]));
    } catch (e) {
      console.error("Failed to store contact message", e);
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <footer id="contact" className="bg-stone-900 text-stone-100 pt-20 pb-12 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Contact info and License Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-emerald-850 flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-100 fill-amber-100/10" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                {FACILITY_INFO.name}
              </span>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed font-sans">
              Our small-group, luxury residential senior care environment promotes peace of mind, high dignity, and exceptional daily support.
            </p>

            {/* Structured Info Card */}
            <div className="bg-stone-850 rounded-2xl p-5 border border-stone-800 space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">Facility Location</span>
                  <p className="text-stone-200 mt-0.5 leading-relaxed font-sans">{FACILITY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">Care Home Intake Phone</span>
                  <a href={`tel:${FACILITY_INFO.homePhone.replace(/\D/g, '')}`} className="text-stone-200 font-bold hover:text-emerald-400 transition-colors block mt-0.5">
                    {FACILITY_INFO.homePhone}
                  </a>
                  <span className="text-stone-500 uppercase block text-[10px] mt-2">Administrator Cell</span>
                  <a href={`tel:${FACILITY_INFO.phone.replace(/\D/g, '')}`} className="text-stone-200 hover:text-emerald-400 transition-colors block mt-0.5">
                    {FACILITY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-stone-800">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">State Licensing ID</span>
                  <p className="text-amber-200 font-bold mt-0.5">RCFE License No. {FACILITY_INFO.licenseNo}</p>
                  <p className="text-[10px] text-stone-500 mt-1 font-sans">Licensed and regulated by California Community Care Licensing Division.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Message form */}
          <div className="lg:col-span-4 bg-stone-850 p-6 sm:p-8 rounded-3xl border border-stone-800">
            {submitted ? (
              <div className="text-center py-10 space-y-3" id="contact-success-card">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-900">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Message Logged!</h4>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  Your general inquiry has been successfully transmitted to Imelda Scott. She will respond to your provided contact details shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[11px] font-bold text-emerald-400 hover:underline mt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-form">
                <h4 className="font-serif text-lg font-bold text-white border-b border-stone-800 pb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>Send a General Message</span>
                </h4>

                {error && (
                  <div className="bg-rose-950/80 border border-rose-900 rounded-xl p-3 text-[11px] text-rose-200 animate-in fade-in duration-200">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-stone-500 uppercase block">Your Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-stone-100"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-stone-500 uppercase block">Your Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g., name@domain.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-stone-100"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-phone" className="text-[10px] font-mono font-bold text-stone-500 uppercase block">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="E.g., (925) 555-0100"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-stone-100"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-msg" className="text-[10px] font-mono font-bold text-stone-500 uppercase block">Message / Inquiry *</label>
                  <textarea
                    id="contact-msg"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    rows={3}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-stone-100 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full bg-emerald-850 hover:bg-emerald-800 text-amber-50 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Secure Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Beautiful neighborhood vector map illustration */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Bespoke Location Map</span>
            </h4>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              Located on <strong>Concord Boulevard</strong> near Camino Diablo and Lodato Drive, in Concord, CA.
            </p>

            {/* Custom Vector neighborhood Map Drawing */}
            <div className="bg-stone-950 aspect-video sm:aspect-square lg:aspect-video rounded-3xl p-4 border border-stone-800 relative overflow-hidden flex flex-col justify-between" id="neighborhood-vector-map">
              {/* Grid map lines drawing */}
              <div className="absolute inset-0 opacity-20">
                {/* Horizontal Road - Concord Blvd */}
                <div className="absolute h-6 bg-stone-600 top-1/2 left-0 right-0 transform -translate-y-1/2"></div>
                {/* Cross street 1 - Camino Diablo */}
                <div className="absolute w-6 bg-stone-600 top-0 bottom-0 left-1/4"></div>
                {/* Cross street 2 - Lodato Dr */}
                <div className="absolute w-6 bg-stone-600 top-0 bottom-0 right-1/4"></div>
                
                {/* Grids and lawns */}
                <div className="absolute top-2 left-2 right-2 h-1/3 border border-stone-700 rounded-lg bg-emerald-950/20"></div>
                <div className="absolute bottom-2 left-2 right-2 h-1/3 border border-stone-700 rounded-lg bg-emerald-950/20"></div>
              </div>

              {/* Street labels */}
              <div className="relative z-10 flex justify-between items-center text-[9px] font-mono font-bold text-stone-500 uppercase">
                <span className="transform -rotate-90 origin-left mt-10">Camino Diablo</span>
                <span className="absolute left-[35%] top-[55%] text-stone-400">Concord Blvd</span>
                <span className="transform rotate-90 origin-right mt-10 mr-1.5">Lodato Dr</span>
              </div>

              {/* Glowing Duke Care House Indicator Icon */}
              <div className="absolute left-[58%] top-[40%] z-20 group cursor-default">
                {/* Radar effect */}
                <div className="absolute -inset-1.5 bg-emerald-500 rounded-full animate-ping opacity-60"></div>
                <div className="w-7 h-7 bg-emerald-800 rounded-full flex items-center justify-center border-2 border-amber-300 relative text-amber-100 shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-amber-300/10 text-amber-200" />
                </div>
                {/* Tooltip badge */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-[9px] font-mono text-stone-900 px-1.5 py-0.5 rounded shadow border border-amber-200 font-bold whitespace-nowrap opacity-90">
                  Duke Care Home
                </div>
              </div>

              {/* Map Footer metrics */}
              <div className="relative z-10 flex justify-between items-end text-[9px] font-mono text-stone-500">
                <span>Map Scale: 1 in = 100 yds</span>
                <span className="text-amber-200">3105 Concord Blvd.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Core copyright footer block */}
        <div className="mt-16 pt-8 border-t border-stone-850 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs text-stone-500 font-sans">
          <div>
            <p>© {new Date().getFullYear()} Duke Care Facility. All rights reserved.</p>
            <p className="mt-1">Licensed in the State of California COMMUNITY CARE LICENSING (RCFE) #79201662</p>
          </div>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-stone-300 transition-colors">Privacy Principles</a>
            <span>•</span>
            <a href="#services" className="hover:text-stone-300 transition-colors">Licensing Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
