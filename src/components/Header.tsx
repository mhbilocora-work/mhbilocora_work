/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart, Shield, Calendar } from 'lucide-react';
import { FACILITY_INFO } from '../data';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About Us', id: 'about' },
    { label: 'Our Services', id: 'services' },
    { label: 'Resident Rooms', id: 'rooms' },
    { label: 'Photo Tour', id: 'gallery' },
    { label: 'Care Assessment', id: 'assessment' },
    { label: 'Agency Portal', id: 'agency' },
    { label: 'Contact Us', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 py-3'
          : 'bg-stone-50/60 backdrop-blur-sm py-4'
      }`}
    >
      {/* Top micro bar for Licensing and Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-xs text-stone-500 pb-2 border-b border-stone-100 mb-2 font-mono">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-800" />
            <span>Licensed RCFE Facility No. {FACILITY_INFO.licenseNo}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${FACILITY_INFO.homePhone.replace(/\D/g, '')}`} className="hover:text-emerald-800 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-800" />
              <span>Care Home: {FACILITY_INFO.homePhone}</span>
            </a>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <button
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-2 group text-left cursor-pointer"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform">
              <Heart className="w-5.5 h-5.5 text-amber-100 fill-amber-100/10" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900 block leading-none">
                {FACILITY_INFO.name}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase block mt-1">
                Residential Care Home
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-900'
                    : 'text-stone-600 hover:text-emerald-900 hover:bg-stone-100/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call-to-actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${FACILITY_INFO.homePhone.replace(/\D/g, '')}`}
              id="header-phone-btn"
              className="flex items-center gap-1.5 text-sm font-semibold text-emerald-900 hover:text-emerald-800 bg-emerald-50/50 px-4 py-2 rounded-full border border-emerald-100/80 transition-all hover:bg-emerald-50"
            >
              <Phone className="w-4 h-4 text-emerald-800 animate-pulse" />
              <span>{FACILITY_INFO.homePhone}</span>
            </a>
            <button
              id="header-book-btn"
              onClick={() => handleItemClick('assessment')}
              className="flex items-center gap-1.5 text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-850 px-4 py-2 rounded-full shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-amber-100" />
              <span>Book a Tour</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="mobile-menu-toggle"
            className="lg:hidden p-1.5 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[115px] bg-white border-b border-stone-200 shadow-xl py-4 px-4 z-40 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-stone-100">
              <a
                href={`tel:${FACILITY_INFO.homePhone.replace(/\D/g, '')}`}
                id="mobile-nav-phone"
                className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-900 bg-emerald-50 py-3 rounded-xl border border-emerald-100"
              >
                <Phone className="w-4 h-4" />
                <span>Call Home</span>
              </a>
              <button
                onClick={() => handleItemClick('assessment')}
                id="mobile-nav-tour"
                className="flex items-center justify-center gap-2 text-sm font-medium text-amber-50 bg-emerald-900 py-3 rounded-xl"
              >
                <Calendar className="w-4 h-4 text-amber-100" />
                <span>Book Tour</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
