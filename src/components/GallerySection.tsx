/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import SmartImage from './SmartImage';


interface GalleryItem {
  id: string;
  title: string;
  category: 'bedrooms' | 'common' | 'exterior';
  categoryLabel: string;
  description: string;
  features: string[];
  img: string;
  highlights: string;
}

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'bedrooms' | 'common' | 'exterior'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "g-front-exterior",
      title: "Front View & Accessible Entry",
      category: "exterior",
      categoryLabel: "Exterior",
      description: "Our front entrance features beautiful natural stone-accented siding, an eco-friendly solar-powered roofing system, and a spacious, concrete safety ramp.",
      features: [
        "ADA-compliant concrete front access ramp with sturdy, painted coral-pink metal safety railings",
        "Modern roof solar panel array on brown shingles supporting clean, sustainable home energy",
        "Welcoming beige exterior walls accented by custom stone veneer siding / wainscoting",
        "Spacious, flat concrete driveway leading to a white front door under an arched alcove entryway"
      ],
      img: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=85",
      highlights: "Fully wheelchair-accessible entry under a beautiful blue California sky."
    },
    {
      id: "g-back-exterior",
      title: "Rear Walkways & Patio",
      category: "exterior",
      categoryLabel: "Exterior",
      description: "The rear of our home features dual-exit glass doors, a secure level wrap-around porch with protective railings, and a quiet, level concrete backyard patio.",
      features: [
        "Double glass patio exit doors with a safety 'EXIT' indicator sign",
        "Continuous custom-fitted safety metal railings framing the rear walkway and porch",
        "Completely flat, seamless concrete backyard patio and walkway to prevent trip hazards",
        "Lush green tree canopy providing ambient shade, blue skies, and quiet privacy"
      ],
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      highlights: "Designed for safe wandering, emergency egress, and quiet, fresh-air relaxation."
    },
    {
      id: "g-living",
      title: "Cozy Family Living Room",
      category: "common",
      categoryLabel: "Common Area",
      description: "A bright, inviting space designed for social connection, television entertainment, and quiet reading.",
      features: [
        "Warm cherry wood flooring with high-end gloss finish",
        "Two classic wicker/rattan armchairs with matching cozy cushions",
        "Plush family-sized gray fabric sofa with soft colored floral and patterned throw pillows",
        "Sliding double-pane glass door with vertical privacy blinds leading directly to the backyard, and a wooden pass-through window bar to the kitchen",
        "Wall-mounted professional fire extinguisher near the archway for emergency compliance"
      ],
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
      highlights: "Direct access to our safe, level walkways and comfortable backyard seating."
    },
    {
      id: "g-kitchen",
      title: "Gourmet Home Kitchen",
      category: "common",
      categoryLabel: "Common Area",
      description: "A fully equipped kitchen where our team cooks fresh, customized dietary meals daily.",
      features: [
        "Rich custom-stained solid traditional wooden cabinetry with polished crown molding",
        "Polished dark speckled granite countertops with a clean, deep sink layout",
        "Modern energy-efficient stainless steel appliances including a professional gas range stove, built-in microwave, dishwasher, and French-door refrigerator",
        "Large window above the sink decorated with colorful glass bird ornaments, letting in soft natural light and tree views",
        "Speckled beige tile flooring designed for pristine hygiene, slip-resistance, and high durability"
      ],
      img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
      highlights: "Nutrition-focused home-cooked menu crafted under Administrator Imelda Scott's oversight."
    },
    {
      id: "g-dining",
      title: "Compliant Community Dining Room",
      category: "common",
      categoryLabel: "Common Area",
      description: "A warm, spacious area where residents enjoy delicious family-style meals and daily cognitive activities.",
      features: [
        "Rich dark wood dining table dressed with a citrus-patterned table runner",
        "6 comfortable high-back chocolate brown leather dining chairs",
        "Decorated with a charming white ceramic chicken tureen centerpiece and custom-framed orange ceramic vase wall art",
        "Features mandatory state licensing compliance and consumer advisory information boards (CDSS posters, Ombudsman, HIPAA)",
        "Easy-to-sanitize speckled beige tiled flooring designed for seamless cleaning and mobility support"
      ],
      img: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=85",
      highlights: "The vibrant heart of our community, hosting trivia games, music sessions, and celebrations."
    },
    {
      id: "g-private-mustard",
      title: "Deluxe Private Bedroom (Mustard Edition)",
      category: "bedrooms",
      categoryLabel: "Bedroom",
      description: "A peaceful private sanctuary meticulously styled with warm gloss wood floors and ambient bedside lamps.",
      features: [
        "Elegant twin-sized bed dressed in clean, warm camel-mustard linens",
        "Classic black powder-coated safety metal frame for durable support",
        "Matching dark wood nightstands with elegant bedside lamps and soft-glow shades",
        "Double-sliding white closet doors for convenient, organized resident wardrobe storage",
        "Comfortable and private room with pristine cherry-wood gloss flooring"
      ],
      img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
      highlights: "Includes 24-hour active bedside emergency response integration."
    },
    {
      id: "g-private-plaid",
      title: "Sunlit Private Bedroom (White & Plaid Edition)",
      category: "bedrooms",
      categoryLabel: "Bedroom",
      description: "A bright, welcoming bedroom featuring generous closet space, white vertical blinds, and classic home furniture.",
      features: [
        "Twin bed dressed in clean cream linens with a classic red-and-green plaid throw blanket at the foot",
        "Comfortable designer armchair upholstered in a vintage postmark-print fabric, accented with a vibrant yellow cushion",
        "Wide glass window with adjustable vertical privacy blinds letting in pleasant natural light",
        "Pristine cherry-wood flooring and dark nightstand styled with a elegant floral-pattern lamp"
      ],
      img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
      highlights: "Offers high privacy, ample storage, and comfortable reading corners."
    },
    {
      id: "g-companion-french",
      title: "Garden-Access Bedroom (French Door Edition)",
      category: "bedrooms",
      categoryLabel: "Bedroom",
      description: "A gorgeous, sunlit bedroom featuring glass double French doors with privacy drapes that lead directly outside to the patio.",
      features: [
        "Double French doors with quick egress handles leading directly to patio walkways",
        "Warm, rich glossy cherry-wood flooring with comforting cream-colored walls",
        "Comfortable upholstered tan reading armchair with a deep olive-green pillow",
        "Dark wood nightstand with a classic gold bedside lamp for cozy nighttime reading",
        "Barrier-free layout to easily accommodate mobility aids and walkers"
      ],
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
      highlights: "Perfect combination of comfortable private rest and direct fresh-air access."
    },
    {
      id: "g-bathroom-single",
      title: "Pristine Travertine Single Bathroom",
      category: "common",
      categoryLabel: "Bathroom",
      description: "A pristine bathroom featuring beautiful warm brown tiled walls, custom wood vanity cabinet, and white solid-surface countertop.",
      features: [
        "High-end floor-to-ceiling beige travertine marble tiling for a premium spa-like atmosphere",
        "Modern wall-mounted floating dark wood vanity with white solid-surface top and single rectangular undermount sink",
        "Large frameless vanity mirror reflecting the pristine beige-and-brown travertine walls",
        "Modern brushed-nickel faucet and clean, flat-entry threshold for senior safety"
      ],
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      highlights: "Deep-cleaned twice daily to ensure impeccable, fresh-smelling hygiene standards."
    },
    {
      id: "g-bathroom-double",
      title: "Accessible Travertine Double Bathroom",
      category: "common",
      categoryLabel: "Bathroom",
      description: "A spacious, spotless bathroom equipped with dual sinks, safety grab-bars, and a barrier-free shower with custom curtain.",
      features: [
        "Large double sink vanity with white shaker cabinets, brushed nickel handles, and dual rectangular undermount sinks",
        "Gorgeous, clean floor-to-ceiling travertine tile walls and durable slip-resistant safety floors",
        "ADA-compliant toilet and shower area styled with a green damask-patterned shower curtain",
        "Spacious wheel-in barrier-free layout equipped with strong stainless-steel safety grab-bars"
      ],
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85",
      highlights: "Full ADA compliance with reinforced senior safety features."
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => 
        prevIndex === 0 ? filteredItems.length - 1 : (prevIndex as number) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => 
        prevIndex === filteredItems.length - 1 ? 0 : (prevIndex as number) + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            Real Photo Tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Explore Our Warm Home Environment
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-sans">
            Take a virtual walkthrough of our actual Concord facility. We pride ourselves on an immaculate, fresh-smelling, and comfortable atmosphere.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-stone-200/60 rounded-2xl border border-stone-200/80 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-900 text-amber-50 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Photos
            </button>
            <button
              onClick={() => setActiveTab('exterior')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'exterior'
                  ? 'bg-emerald-900 text-amber-50 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Exterior &amp; Access Ramps
            </button>
            <button
              onClick={() => setActiveTab('bedrooms')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'bedrooms'
                  ? 'bg-emerald-900 text-amber-50 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bedrooms (6 Rooms)
            </button>
            <button
              onClick={() => setActiveTab('common')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'common'
                  ? 'bg-emerald-900 text-amber-50 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Common Areas &amp; Bathrooms
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              id={`gallery-card-${item.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Photo Frame */}
              <div 
                className="relative overflow-hidden aspect-video cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <SmartImage
                  itemId={item.id}
                  fallbackUrl={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <div className="bg-white/95 p-3 rounded-full text-stone-900 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-emerald-900/90 text-amber-50 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border border-emerald-800 font-semibold shadow">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Information Block */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Bullet Features */}
                <ul className="space-y-1.5 pt-2 border-t border-stone-100">
                  {item.features.slice(0, 2).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-[11px] text-stone-600 font-sans">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {item.features.length > 2 && (
                    <li className="text-[10px] font-mono text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1" onClick={() => setLightboxIndex(idx)}>
                      <span>+ See {item.features.length - 2} more features</span>
                    </li>
                  )}
                </ul>

                {/* Highlight banner */}
                <div className="bg-stone-50 border border-stone-150 rounded-xl p-3 text-[10px] text-stone-500 font-mono italic">
                  <strong>Home Advantage:</strong> {item.highlights}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Static Quality Guarantee Indicator */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-serif text-lg font-bold text-stone-900">100% Honest, Real Facility Photographs</h4>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Every photo displayed on our website shows our real Concord location. We do not hide behind misleading corporate marketing stock footage. Our house is always clean, beautifully lit, warm, and ready for your personalized tour.
            </p>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-stone-950/98 z-50 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
          id="gallery-lightbox"
        >
          {/* Top Bar with actions */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex justify-between items-center text-stone-300 z-10">
            <div className="font-mono text-xs text-stone-400">
              {lightboxIndex + 1} / {filteredItems.length} &bull; <span className="text-emerald-400 uppercase font-bold tracking-wider">{filteredItems[lightboxIndex].categoryLabel}</span>
            </div>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
              id="btn-lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Stage */}
          <div className="w-full max-w-5xl flex items-center justify-between gap-2 sm:gap-6 relative">
            
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="p-3 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer shrink-0 absolute left-0 sm:static z-25 bg-black/40"
              aria-label="Previous photo"
              id="btn-lightbox-prev"
            >
              <ChevronLeft className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

            {/* Core Image Slide */}
            <div 
              className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex-1 max-w-3xl flex flex-col mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video relative bg-stone-950">
                <SmartImage
                  itemId={filteredItems[lightboxIndex].id}
                  fallbackUrl={filteredItems[lightboxIndex].img}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-stone-900 text-stone-100 space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-stone-800 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  </div>
                </div>

                {/* Features Checklist inside Lightbox */}
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  {filteredItems[lightboxIndex].features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-stone-300 font-sans">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-stone-950/40 rounded-xl text-xs text-amber-200/90 leading-relaxed font-mono border border-amber-500/10">
                  <strong>Special Feature:</strong> {filteredItems[lightboxIndex].highlights}
                </div>
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="p-3 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer shrink-0 absolute right-0 sm:static z-25 bg-black/40"
              aria-label="Next photo"
              id="btn-lightbox-next"
            >
              <ChevronRight className="w-6 sm:w-8 h-6 sm:h-8" />
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
