/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bed, ArrowRight, ShieldCheck, HelpCircle, Compass, Trees, Check } from 'lucide-react';
import { RESIDENTIAL_ROOMS } from '../data';
import SmartImage from './SmartImage';


interface RoomsSectionProps {
  onSelectRoomForTour: (roomName: string) => void;
}

export default function RoomsSection({ onSelectRoomForTour }: RoomsSectionProps) {
  const [activeRoomId, setActiveRoomId] = useState(RESIDENTIAL_ROOMS[0].id);

  const activeRoom = RESIDENTIAL_ROOMS.find((r) => r.id === activeRoomId) || RESIDENTIAL_ROOMS[0];

  const generalAmenities = [
    "Central high-efficiency heating and air filtration (safe environment)",
    "Individually controlled emergency call buttons and safety pull-cords",
    "Spacious built-in wooden closets and double-dresser storage",
    "Large double-pane soundproof windows overlooking the manicured gardens",
    "Comes fully furnished or empty to accommodate personal family pieces",
    "Daily laundry, sheet washing, and thorough bedroom dust cleaning"
  ];

  return (
    <section id="rooms-detail" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            Private &amp; Shared Options
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Cozy Residential Accommodations
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-sans">
            Our bedrooms are designed for quiet rest, extreme cleanliness, and total comfort. Feel free to bring personal family furniture to make it feel like home!
          </p>
        </div>

        {/* Layout Stats Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center shadow-sm">
            <span className="block text-3xl font-serif font-bold text-emerald-950">6</span>
            <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mt-1 block">Cozy Bedrooms</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center shadow-sm">
            <span className="block text-3xl font-serif font-bold text-emerald-950">3</span>
            <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mt-1 block">Accessible Bathrooms</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center shadow-sm">
            <span className="block text-3xl font-serif font-bold text-emerald-950">100%</span>
            <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mt-1 block">ADA Level Access</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center shadow-sm">
            <span className="block text-3xl font-serif font-bold text-emerald-950">24/7</span>
            <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mt-1 block">Awake Night Care</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Room Switcher & Text details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Room Selector Tabs */}
            <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200/60">
              {RESIDENTIAL_ROOMS.map((room) => {
                const isSelected = activeRoomId === room.id;
                return (
                  <button
                    key={room.id}
                    id={`room-tab-${room.id}`}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-emerald-950 shadow shadow-stone-300'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Bed className="w-4 h-4 text-emerald-800" />
                    <span>{room.name.split(' ')[1]} Option</span> {/* Private or Companion */}
                  </button>
                );
              })}
            </div>

            {/* Selected Room Details */}
            <div className="space-y-4 animate-in fade-in duration-300" id={`room-details-${activeRoom.id}`}>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {activeRoom.name}
              </h3>
              <p className="text-stone-600 leading-relaxed font-sans text-base">
                {activeRoom.description}
              </p>

              {/* Bullet features */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {activeRoom.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-700 font-sans">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Amenity tag */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 flex items-start gap-3 mt-4 text-xs">
                <Compass className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-stone-700 leading-relaxed font-sans">
                  <strong>Room Placement Advice:</strong> {activeRoom.amenity}
                </div>
              </div>

              {/* CTA button to request this room */}
              <div className="pt-6">
                <button
                  id={`btn-select-room-${activeRoom.id}`}
                  onClick={() => onSelectRoomForTour(activeRoom.name)}
                  className="bg-emerald-900 hover:bg-emerald-850 text-amber-50 px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Tour for {activeRoom.name.split(' ')[1]} Layout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual illustration panel and general specs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visual Frame */}
            <div className="bg-stone-50 rounded-3xl p-4 border border-stone-200 shadow-sm relative overflow-hidden group">
              <SmartImage
                itemId={activeRoom.id}
                fallbackUrl={activeRoom.img}
                alt={activeRoom.name}
                className="w-full aspect-video sm:aspect-4/3 rounded-2xl object-cover shadow-inner group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm border border-amber-200 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-amber-900 tracking-wider shadow">
                Fresh &amp; Clean Guarantee
              </div>
            </div>

            {/* General Room features checklist block */}
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Trees className="w-5 h-5 text-emerald-800" />
                <span>Shared Bedroom Standards</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-600 font-sans">
                {generalAmenities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
