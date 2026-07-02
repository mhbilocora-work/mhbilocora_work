/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Building, Mail, Phone, FileCheck, ClipboardList, CheckSquare, Search, Award, Star, ArrowRight } from 'lucide-react';
import { AgencyReferral } from '../types';
import { FACILITY_INFO } from '../data';

export default function ReferralSection() {
  // Form fields
  const [agencyName, setAgencyName] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [clientInitials, setClientInitials] = useState('');
  const [clientAge, setClientAge] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  // Selected care checkboxes
  const [careNeeds, setCareNeeds] = useState<string[]>([]);

  // List & tracking state
  const [referrals, setReferrals] = useState<AgencyReferral[]>([]);
  const [trackingQuery, setTrackingQuery] = useState('');
  const [searchedReferral, setSearchedReferral] = useState<AgencyReferral | null>(null);
  const [submittedReferral, setSubmittedReferral] = useState<AgencyReferral | null>(null);
  const [formError, setFormError] = useState('');
  const [trackerError, setTrackerError] = useState('');

  const careOptions = [
    "Overnight awake safety checkouts",
    "Bathing, dressing, & hygiene assistance",
    "Double-locked medication management",
    "Incontinence care assistance",
    "Memory support / Dementia guidance",
    "Home-cooked dietary meals",
    "Mobility & wheelchair transfer standby"
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('duke_care_referrals');
      if (stored) {
        setReferrals(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local agency referral data", e);
    }
  }, []);

  const handleCheckboxChange = (option: string) => {
    setCareNeeds((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName || !agentName || !agentEmail || !agentPhone || !clientInitials) {
      setFormError("Please complete all required fields to submit your referral.");
      return;
    }
    setFormError("");

    const trackingCode = `DC-REF-${Math.floor(100000 + Math.random() * 900000)}`;

    const newReferral: AgencyReferral = {
      id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      agencyName,
      agentName,
      agentEmail,
      agentPhone,
      clientInitials: clientInitials.toUpperCase().substring(0, 3),
      clientAge: clientAge ? parseInt(clientAge) : undefined,
      careNeeds,
      additionalDetails: additionalDetails || undefined,
      trackingId: trackingCode,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Received'
    };

    const updated = [newReferral, ...referrals];
    setReferrals(updated);
    localStorage.setItem('duke_care_referrals', JSON.stringify(updated));
    setSubmittedReferral(newReferral);

    // Clear Form Fields
    setAgencyName('');
    setAgentName('');
    setAgentEmail('');
    setAgentPhone('');
    setClientInitials('');
    setClientAge('');
    setAdditionalDetails('');
    setCareNeeds([]);
  };

  const handleTrackQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingQuery) return;
    
    const cleanQuery = trackingQuery.trim().toUpperCase();
    const found = referrals.find(
      (r) => r.trackingId.toUpperCase() === cleanQuery || r.id.toUpperCase() === cleanQuery
    );

    if (found) {
      setSearchedReferral(found);
      setTrackerError("");
    } else {
      setSearchedReferral(null);
      setTrackerError("Referral matching code not found in current browser history. Try a valid code or submit a new referral.");
    }
  };

  return (
    <section id="agency" className="py-20 lg:py-28 bg-stone-50 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            Agency Referrals &amp; Placement
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Professional Agency Partner Portal
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-sans">
            We partner with local placement specialists, social workers, and hospital discharge managers to coordinate rapid, compliance-approved placements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form submissions */}
          <div className="lg:col-span-7 space-y-6">
            
            {submittedReferral ? (
              /* Success layout */
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-md" id="referral-success-card">
                <div className="text-center pb-6 border-b border-stone-150">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Referral Document Logged!</h3>
                  <p className="text-sm text-stone-500 font-mono mt-1">
                    Agency Tracking Code: <span className="text-emerald-800 font-bold select-all">{submittedReferral.trackingId}</span>
                  </p>
                </div>

                <div className="py-6 space-y-4 text-sm text-stone-700 font-sans border-b border-stone-100">
                  <p className="text-stone-600">
                    Thank you, <strong className="text-stone-900">{submittedReferral.agentName}</strong>. We have securely received your referral details:
                  </p>
                  
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-150 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-mono text-stone-400 block">Agent Agency</span>
                      <span className="font-semibold text-stone-900">{submittedReferral.agencyName}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-stone-400 block">Client Initials / Age</span>
                      <span className="font-semibold text-stone-900">{submittedReferral.clientInitials} ({submittedReferral.clientAge || 'Age N/A'})</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-stone-400 block mb-1">Target Care Pillars Requested:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {submittedReferral.careNeeds.length > 0 ? (
                        submittedReferral.careNeeds.map((need, i) => (
                          <span key={i} className="bg-emerald-50 border border-emerald-100 text-emerald-900 text-[11px] px-2.5 py-1 rounded-md font-medium">
                            {need}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-stone-500 italic">No specific pillars selected (General Placement Evaluation)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-xs text-amber-950 flex gap-3">
                    <Award className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-900">What happens now?</span>
                      <p className="mt-1 leading-relaxed">
                        Administrator Imelda Scott has been automatically alerted to this inquiry. We will review clinical history, perform our initial Title 22 intake review, and contact you via your email (<span className="font-bold">{submittedReferral.agentEmail}</span>) within <span className="font-bold text-stone-900 underline">2 hours</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      id="btn-new-referral"
                      onClick={() => setSubmittedReferral(null)}
                      className="text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-5 py-2.5 rounded-full transition-colors"
                    >
                      Log Another Agency Client Referral
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Main Referral Logging Form */
              <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-900/5 border border-stone-100 space-y-6" id="referral-form">
                <div className="border-b border-stone-150 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <ClipboardList className="w-6 h-6 text-emerald-800" />
                    <span>Secure Client Referral Portal</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mt-1">
                    Strictly aligned with senior care regulations. Use client initials to protect general identity records in initial evaluations.
                  </p>
                </div>

                {formError && (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs font-sans text-rose-800 animate-in fade-in duration-200">
                    {formError}
                  </div>
                )}

                {/* Agency / Agent Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="ref-agency" className="text-xs font-mono font-bold text-stone-500 uppercase block">Your Agency / Organization *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="ref-agency"
                        required
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder="E.g., ElderCare Connections CA"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ref-agent" className="text-xs font-mono font-bold text-stone-500 uppercase block">Agent / Representative Name *</label>
                    <input
                      type="text"
                      id="ref-agent"
                      required
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="E.g., Sarah Jenkins, Placement Coordinator"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="ref-email" className="text-xs font-mono font-bold text-stone-500 uppercase block">Professional Email *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="ref-email"
                        required
                        value={agentEmail}
                        onChange={(e) => setAgentEmail(e.target.value)}
                        placeholder="jenkins@eldercareca.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ref-phone" className="text-xs font-mono font-bold text-stone-500 uppercase block">Direct Callback Phone *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="ref-phone"
                        required
                        value={agentPhone}
                        onChange={(e) => setAgentPhone(e.target.value)}
                        placeholder="(925) 555-4422"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Client HIPAA Safe Details */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                  <div className="space-y-1.5">
                    <label htmlFor="ref-initials" className="text-xs font-mono font-bold text-stone-500 uppercase block">Client Name Initials *</label>
                    <input
                      type="text"
                      id="ref-initials"
                      required
                      maxLength={3}
                      value={clientInitials}
                      onChange={(e) => setClientInitials(e.target.value)}
                      placeholder="E.g., MBS"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ref-age" className="text-xs font-mono font-bold text-stone-500 uppercase block">Client Age (Optional)</label>
                    <input
                      type="number"
                      id="ref-age"
                      min={55}
                      max={115}
                      value={clientAge}
                      onChange={(e) => setClientAge(e.target.value)}
                      placeholder="E.g., 82"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 font-sans"
                    />
                  </div>
                </div>

                {/* Core Assistance Requirements Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold text-stone-500 uppercase block">Required Care Characteristics (Check all that apply)</span>
                  <div className="grid sm:grid-cols-2 gap-2" id="care-needs-checklist">
                    {careOptions.map((option, idx) => {
                      const isChecked = careNeeds.includes(option);
                      return (
                        <button
                          key={idx}
                          type="button"
                          id={`care-opt-${idx}`}
                          onClick={() => handleCheckboxChange(option)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-800 text-emerald-950 font-medium'
                              : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <CheckSquare className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs leading-tight font-sans">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div className="space-y-1.5">
                  <label htmlFor="ref-notes" className="text-xs font-mono font-bold text-stone-500 uppercase block">Special Clinical / Transfer Directives</label>
                  <textarea
                    id="ref-notes"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Describe specific scheduling targets, active health metrics, or required assistance timelines..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 text-stone-850 leading-relaxed font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="referral-submit-btn"
                  className="w-full bg-emerald-900 hover:bg-emerald-850 text-amber-50 text-sm font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-transform flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <FileCheck className="w-4 h-4 text-amber-100" />
                  <span>Submit Secure Clinical Referral</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Benefits Checklist & Referral Tracker */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Referral Tracker Search */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5">
                <Search className="w-5 h-5 text-emerald-800" />
                <span>Referral Tracker Tool</span>
              </h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Enter an agency tracking code to retrieve processing stats, clinical checklist validation, or administrator appointment reviews instantly.
              </p>

              <form onSubmit={handleTrackQuery} className="flex gap-2">
                <input
                  type="text"
                  placeholder="DC-REF-XXXXXX"
                  value={trackingQuery}
                  onChange={(e) => setTrackingQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 text-stone-850 uppercase"
                />
                <button
                  type="submit"
                  id="btn-track-referral"
                  className="bg-emerald-900 hover:bg-emerald-850 text-amber-50 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Track
                </button>
              </form>

              {trackerError && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs font-sans text-rose-800 mt-3 animate-in fade-in duration-200">
                  {trackerError}
                </div>
              )}

              {searchedReferral ? (
                /* Referral Status Result Cards */
                <div className="bg-stone-50 border border-emerald-100 rounded-2xl p-4 text-xs font-sans mt-3 space-y-2.5 animate-in fade-in duration-200" id="tracker-result-success">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900">Client Initials: {searchedReferral.clientInitials}</span>
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
                      {searchedReferral.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-stone-600 font-mono text-[11px] leading-relaxed">
                    <p>Log ID: <span className="text-stone-900">{searchedReferral.id}</span></p>
                    <p>Agency: <span className="text-stone-900">{searchedReferral.agencyName}</span></p>
                    <p>Logged On: <span className="text-stone-900">{searchedReferral.timestamp}</span></p>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-500 italic">
                    *Assigned to Administrator Imelda Scott. Clinical intake vetting is in progress.
                  </div>
                </div>
              ) : trackingQuery && !trackerError && (
                <div className="text-xs text-rose-700 bg-rose-50/50 border border-rose-100 p-3 rounded-xl mt-3 animate-in fade-in duration-200" id="tracker-result-empty">
                  No tracking records found. Log your first placement inquiry to initialize the status pipeline.
                </div>
              )}
            </div>

            {/* Placement Agency Benefits Card */}
            <div className="bg-emerald-900 text-amber-50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md shadow-emerald-950/10">
              <h4 className="font-serif text-lg font-semibold text-white flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>Placement Partner Perks</span>
              </h4>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-850 flex items-center justify-center shrink-0 border border-emerald-700 font-bold text-amber-200">✓</div>
                  <div>
                    <span className="font-bold block text-white">Under 2-Hour Response Guarantee</span>
                    <span className="text-emerald-150 leading-relaxed block mt-0.5">We respond to clinical referral packets and diagnostic records with lighting speed.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-850 flex items-center justify-center shrink-0 border border-emerald-700 font-bold text-amber-200">✓</div>
                  <div>
                    <span className="font-bold block text-white">Same-Day Vetting &amp; Intake Admissions</span>
                    <span className="text-emerald-150 leading-relaxed block mt-0.5">Equipped to handle high-urgency hospital discharges and safe transfer logistics.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-850 flex items-center justify-center shrink-0 border border-emerald-700 font-bold text-amber-200">✓</div>
                  <div>
                    <span className="font-bold block text-white">100% California Title 22 Compliance</span>
                    <span className="text-emerald-150 leading-relaxed block mt-0.5">Full support for medical audits, LIC 602A physical assessments, and double-locked MAR protocols.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 text-[10px] text-emerald-200 font-mono flex justify-between items-center">
                <span>Placement hotline: 925-496-7515</span>
                <span>Licensed RCFE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
