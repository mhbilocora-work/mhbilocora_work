/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { CORE_SERVICES } from '../data';
import { CareService } from '../types';

// Map icon name to Lucide Icon component
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('awake-staff'); // Pre-expand awake staff for safety

  const categories = [
    { label: 'All Services', id: 'all' },
    { label: 'Daily Care', id: 'daily-care' },
    { label: 'Safety & Monitoring', id: 'medical-safety' },
    { label: 'Dining & Comfort', id: 'hospitality' },
    { label: 'Community & Joy', id: 'community' },
  ];

  const filteredServices = useMemo(() => {
    return CORE_SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.fullDetails.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    if (expandedServiceId === id) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(id);
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            Our Certified Amenities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Exceptional Care Services
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-sans">
            Explore our tailored services designed to maintain independence while securing absolute safety and personal dignity.
          </p>
        </div>

        {/* Controls Layout */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-stone-50 p-4 rounded-2xl border border-stone-100 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-900 text-amber-50 shadow-md shadow-emerald-950/15'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-150'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
              <LucideIcons.Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="service-search-input"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-stone-400 hover:text-stone-600"
              >
                <LucideIcons.X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-stone-50 rounded-3xl border border-dashed border-stone-200" id="services-empty-state">
            <LucideIcons.Inbox className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 font-medium font-serif text-lg">No matching services found</p>
            <p className="text-stone-500 text-sm mt-1">Try adjusting your category filter or search query.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-xs font-semibold text-emerald-900 underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Services Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6" id="services-grid">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-gradient-to-br from-stone-50 to-amber-50/20 border-amber-200 shadow-md shadow-stone-950/5'
                    : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-900/[0.02]'
                }`}
              >
                <div>
                  {/* Top line with Icon & Expand trigger */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isExpanded ? 'bg-emerald-900 text-amber-50 shadow-md shadow-emerald-900/15' : 'bg-stone-50 text-emerald-900 border border-stone-150'
                    }`}>
                      <IconMapper name={service.iconName} className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md">
                      {service.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-serif text-xl font-bold text-stone-900 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mt-2 font-sans">
                    {service.description}
                  </p>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-stone-200/60 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300" id={`service-expanded-${service.id}`}>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-emerald-950 uppercase tracking-wider mb-1.5">Overview</h4>
                        <p className="text-stone-600 text-sm leading-relaxed font-sans">{service.fullDetails}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-emerald-950 uppercase tracking-wider mb-2">Key Service Features</h4>
                        <ul className="space-y-1.5 text-xs text-stone-600 font-sans pl-1">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <LucideIcons.Check className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Read More Button */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    id={`service-toggle-${service.id}`}
                    onClick={() => toggleExpand(service.id)}
                    className="text-xs font-semibold text-emerald-900 flex items-center gap-1 hover:text-emerald-850 group cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show Less Details' : 'Read Full Details'}</span>
                    <LucideIcons.ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-emerald-800' : 'group-hover:translate-y-0.5 text-stone-500'
                    }`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
