/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, ShieldCheck, Heart, Award, MapPin, Building, PhoneCall, Star } from 'lucide-react';
import { FACILITY_INFO } from '../data';
import SmartImage from './SmartImage';

interface AboutSectionProps {
  onScheduleClick: () => void;
}

export default function AboutSection({ onScheduleClick }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-stone-50 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            Administrator's Welcome
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            A Letter of Promise to Families & Partners
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-sans">
            At Duke Care, we bridge professional senior care with the comforting warmth of a family home.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Elegant Letter Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-900/5 border border-stone-100 relative">
            {/* Top decorative element */}
            <div className="absolute top-0 left-10 w-20 h-1 bg-gradient-to-r from-emerald-800 to-amber-700 rounded-b-full"></div>
            
            <div className="flex justify-between items-start mb-8 border-b border-stone-100 pb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                  Letter from the Administrator
                </h3>
                <p className="text-sm text-stone-500 font-mono mt-1">
                  Duke Care Residential Care Facility (RCFE)
                </p>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  LICENSE NO: {FACILITY_INFO.licenseNo}
                </span>
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-5 text-stone-700 leading-relaxed font-sans text-base">
              <p className="italic font-serif text-stone-800 text-lg">
                Greetings and Warmest Welcome,
              </p>
              
              <p>
                My name is <strong className="text-stone-900 font-semibold">Imelda B. Scott</strong>, Licensee and Administrator of Duke Care, a licensed Residential Care Facility for the Elderly (RCFE) located in beautiful Concord, California.
              </p>
              
              <p>
                At Duke Care, we are committed to providing compassionate, personalized, and high-quality care in a warm, safe, and comfortable home environment. Our experienced caregivers and awake staff are dedicated to meeting the unique needs of each resident with professionalism, kindness, and respect.
              </p>
              
              <p className="font-medium text-emerald-950 bg-emerald-50/40 p-4 rounded-2xl border-l-4 border-emerald-800 italic">
                "Our mission is to help every resident maintain the highest possible level of independence, dignity, and quality of life while providing families with peace of mind, knowing their loved ones are receiving exceptional care."
              </p>
              
              <p>
                We would be deeply honored to partner with your placement agency or family in helping seniors find a safe, caring, and supportive place to call home. I would welcome the opportunity to meet with you, provide a personal tour of our facility, and discuss how Duke Care can best serve your clients or loved ones.
              </p>
              
              <p>
                Thank you for considering Duke Care as a trusted care partner. I look forward to building a lasting professional relationship with you.
              </p>
            </div>

            {/* Sign-off Block */}
            <div className="mt-8 pt-8 border-t border-stone-100 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
              <div className="flex items-center gap-4">
                {/* Circular Portrait in Signature */}
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-sm bg-stone-50 relative group/sign">
                  <SmartImage
                    itemId="administrator-imelda"
                    fallbackUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
                    alt="Imelda B. Scott portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-stone-500 font-mono">Sincerely yours,</p>
                  <div className="mt-1">
                    <p className="font-serif text-xl font-bold text-stone-900 tracking-tight">Imelda B. Scott</p>
                    <p className="text-xs text-stone-500 font-medium font-sans mt-0.5">Licensee &amp; Administrator, Duke Care</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 text-left sm:text-right font-mono text-xs text-stone-500">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>3105 Concord Blvd., Concord, CA</span>
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Cell: {FACILITY_INFO.phone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Bento Highlights */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bento Block 1: License & Credential Verification */}
            <div className="bg-emerald-900 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-lg shadow-emerald-950/20 relative overflow-hidden group">
              {/* Background accent */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-800/60 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-100/10 flex items-center justify-center text-amber-100 border border-amber-100/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">State of California Approved</span>
                  <h4 className="font-serif text-xl font-bold mt-1 text-white">Fully Licensed Facility</h4>
                  <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed font-sans">
                    Duke Care is certified as a Residential Care Facility for the Elderly (RCFE) under Facility License Number <span className="font-mono text-amber-200 font-semibold">{FACILITY_INFO.licenseNo}</span>. We maintain exemplary ratings with local licensing divisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Bento Block 2: Quick Specs Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-900/5 border border-stone-100 space-y-6">
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <span>Why Partner with Duke Care?</span>
              </h4>
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mt-0.5 shrink-0">
                    <Heart className="w-4 h-4 fill-rose-700/20" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Personalized</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">High staff ratio for direct care.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 mt-0.5 shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Awake Night Staff</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">Continuous night watch & support.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 mt-0.5 shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Cozy Setting</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">Real family home environment.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mt-0.5 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Total Safety</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">Security, MAR logging, and monitors.</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bento Block 3: Friendly Prompt */}
            <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-8 border border-amber-100 flex flex-col justify-between items-start gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Are you a placement agent or a seeking family?</h4>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed font-sans">
                  Imelda regularly hosts private tours and provides care assessments for prospective residents. We can rapidly evaluate medical paperwork and offer same-day admission pathways.
                </p>
              </div>
              <button
                id="about-schedule-btn"
                onClick={onScheduleClick}
                className="text-xs font-bold text-stone-900 bg-amber-100 hover:bg-amber-200 border border-amber-200/80 px-4 py-2.5 rounded-full transition-colors flex items-center gap-1"
              >
                <span>Schedule a Tour Now</span>
                <span className="text-lg">→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
