/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Heart, Shield, Award, Sparkles, Star, ChevronRight, Bed, Clock, Users, FlameKindling } from 'lucide-react';
import { FACILITY_INFO } from './data';
import SmartImage from './components/SmartImage';

// Modular Components
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import RoomsSection from './components/RoomsSection';
import GallerySection from './components/GallerySection';
import AssessmentSection from './components/AssessmentSection';
import TourSection from './components/TourSection';
import ReferralSection from './components/ReferralSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preFilledTourNotes, setPreFilledTourNotes] = useState('');

  // Auto scroll logic helper
  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let targetId = sectionId;
    if (sectionId === 'rooms') {
      targetId = 'rooms-detail';
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Assessment prefill listener
  const handleSetAssessmentNotes = (notes: string) => {
    setPreFilledTourNotes(notes);
    handleScrollToSection('rooms'); // Scrolls to scheduler section
  };

  const handleSelectRoomForTour = (roomName: string) => {
    setPreFilledTourNotes(`Interested in learning more about the layout of: ${roomName}.`);
    handleScrollToSection('rooms');
  };

  // Monitor viewport scroll to highlight active navigation link
  useEffect(() => {
    const handleScrollMonitor = () => {
      const scrollPos = window.scrollY + 180;
      
      const sections = ['hero', 'about', 'services', 'rooms-detail', 'gallery', 'assessment', 'agency', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === 'rooms-detail' ? 'rooms' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollMonitor);
    return () => window.removeEventListener('scroll', handleScrollMonitor);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 overflow-x-hidden antialiased">
      
      {/* Navigation Header */}
      <Header onNavigate={handleScrollToSection} activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 sm:pt-40 pb-20 lg:pb-28 bg-gradient-to-b from-stone-100 via-stone-50 to-white relative overflow-hidden"
      >
        {/* Abstract design vector gradients for ambient luxury feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-900/10 px-3.5 py-1.5 rounded-full border border-emerald-900/20 text-emerald-900 font-mono text-xs font-semibold animate-fade-in">
                <Shield className="w-3.5 h-3.5 text-emerald-800" />
                <span>RCFE License No. {FACILITY_INFO.licenseNo}</span>
              </div>

              {/* Catchy headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Providing Compassionate, <br />
                  <span className="text-emerald-900 italic">Nutritious</span> &amp; Safe Care
                </h1>
                <p className="text-lg text-stone-600 font-sans max-w-2xl leading-relaxed">
                  Welcome to <strong className="text-stone-950 font-semibold">{FACILITY_INFO.name}</strong>, a licensed boutique Residential Care Facility for the Elderly (RCFE) in Concord, California. We coordinate awake supervision, home-cooked food diets, and daily physical support to treat residents like our own family.
                </p>
              </div>

              {/* Core Pillars Grid */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5 text-emerald-900" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">24/7 Awake Staff</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Continuous night safety supervision.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4.5 h-4.5 text-emerald-900" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">Fresh &amp; Clean</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Ambient clean home environment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Users className="w-4.5 h-4.5 text-emerald-900" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">Boutique Setting</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">High staff-to-resident ratio.</p>
                  </div>
                </div>
              </div>

              {/* Action triggers */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-book-btn"
                  onClick={() => handleScrollToSection('rooms')}
                  className="bg-emerald-900 hover:bg-emerald-850 text-amber-50 text-sm font-bold px-6 py-3.5 rounded-full shadow-lg shadow-emerald-950/10 hover:shadow-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Schedule In-Person Tour</span>
                  <ChevronRight className="w-4 h-4 text-amber-100" />
                </button>
                <button
                  id="hero-assess-btn"
                  onClick={() => handleScrollToSection('assessment')}
                  className="bg-white hover:bg-stone-50 text-stone-850 border border-stone-200 text-sm font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Evaluate Care Fitting</span>
                  <span className="text-stone-400">→</span>
                </button>
              </div>

            </div>

            {/* Right Column: Meet Our Administrator (With custom Photo Uploader) */}
            <div className="lg:col-span-5 animate-fade-in">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-900/5 border border-stone-100 flex flex-col">
                
                {/* Image Container with SmartImage */}
                <div className="h-72 sm:h-80 relative bg-stone-100">
                  <SmartImage
                    itemId="administrator-imelda"
                    fallbackUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
                    alt="Imelda B. Scott, Duke Care Licensee and Administrator"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-4 relative">
                  {/* Decorative quote mark */}
                  <div className="absolute top-6 right-8 text-6xl font-serif text-stone-100 select-none pointer-events-none">“</div>

                  <div className="inline-flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100/60 text-amber-900 font-mono text-[10px] font-bold uppercase tracking-wider">
                    Licensee &amp; Administrator
                  </div>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic font-serif">
                    "Our commitment is to care deeply, respect fully, and support every resident like family."
                  </p>

                  <div className="pt-4 border-t border-stone-100 flex justify-between items-end">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">Imelda B. Scott</h3>
                      <p className="text-xs text-stone-500 font-medium">Licensee &amp; Administrator, Duke Care</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/60 font-semibold uppercase tracking-wider">
                      On-Site Leader
                    </span>
                  </div>
                </div>

                {/* Brand New Announcement Bar */}
                <div className="bg-stone-50 border-t border-stone-150 px-6 py-4 flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">✨</span>
                  <div className="text-xs text-stone-600 leading-relaxed font-sans">
                    <strong className="text-stone-800 font-semibold block mb-0.5">A Brand New Premier Care Home</strong>
                    Duke Care is newly opened and welcoming our first residents! Schedule an in-person tour today to explore our pristine rooms and premium layout.
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us section (featuring Imelda Scott's letter and license status) */}
      <AboutSection onScheduleClick={() => handleScrollToSection('rooms')} />

      {/* Services and Amenities Accordion/Grid */}
      <ServicesSection />

      {/* Cozy Bedrooms Showcase */}
      <RoomsSection onSelectRoomForTour={handleSelectRoomForTour} />

      {/* Interactive Photo Tour Gallery */}
      <GallerySection />

      {/* Care assessment tool */}
      <AssessmentSection onScheduleWithNotes={handleSetAssessmentNotes} />

      {/* Tour scheduling form container */}
      <TourSection initialNotes={preFilledTourNotes} onClearInitialNotes={() => setPreFilledTourNotes('')} />

      {/* Placement agency partner portal */}
      <ReferralSection />

      {/* Footer and message center */}
      <Footer />

    </div>
  );
}
