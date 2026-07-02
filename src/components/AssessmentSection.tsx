/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data';
import { CheckCircle, AlertCircle, FileText, ChevronRight, RotateCcw, Calendar, ShieldCheck, Clipboard } from 'lucide-react';

interface AssessmentSectionProps {
  onScheduleWithNotes: (notes: string) => void;
}

export default function AssessmentSection({ onScheduleWithNotes }: AssessmentSectionProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isComplete = Object.keys(answers).length === ASSESSMENT_QUESTIONS.length;

  const totalScore: number = (Object.values(answers) as number[]).reduce((sum, val) => sum + val, 0);

  const generateReportSummary = () => {
    let summaryText = `DUKE CARE ASSESSMENT REPORT\n`;
    summaryText += `==========================\n`;
    summaryText += `Date Generated: ${new Date().toLocaleDateString()}\n`;
    summaryText += `Facility License No: 79201662\n\n`;
    
    ASSESSMENT_QUESTIONS.forEach((q) => {
      const selectedScore = answers[q.id];
      const selectedOption = q.options.find((opt) => opt.scoreValue === selectedScore);
      summaryText += `- ${q.category}:\n  Choice: ${selectedOption?.label}\n  Details: ${selectedOption?.description}\n\n`;
    });

    summaryText += `Result Score: ${totalScore} out of 15\n`;
    summaryText += `Care Level Profile: ${
      totalScore <= 5 ? 'Light Standby Care' : totalScore <= 10 ? 'Moderate Assistance' : 'Premium Awake & Heavy ADL Support'
    }\n\n`;
    summaryText += `Duke Care Response:\n`;
    if ((answers['overnight-supervision'] || 0) >= 3 || totalScore >= 8) {
      summaryText += `- 24-Hour Awake Staff Recommended: Our active overnight team perfectly coordinates with nightly bathroom visits or sundowners to prevent falls.\n`;
    }
    if ((answers['adl-needs'] || 0) >= 3) {
      summaryText += `- Personalized ADL Support: Our experienced caregivers are equipped to offer elegant, dignified assistance with bathing, dressing, and hygiene.\n`;
    }
    if ((answers['medication-needs'] || 0) >= 3) {
      summaryText += `- MAR Compliance & Double-Locked Security: Imelda Scott directly supervises medication administration logs.\n`;
    }
    return summaryText;
  };

  const handleCopyReport = () => {
    const report = generateReportSummary();
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const handlePreFillTour = () => {
    const reportText = `Pre-filled Care Assessment Profile (Score ${totalScore}/15): ` + 
      ASSESSMENT_QUESTIONS.map((q) => {
        const opt = q.options.find(o => o.scoreValue === answers[q.id]);
        return `${q.category}: ${opt?.label}`;
      }).join('; ');
    
    onScheduleWithNotes(reportText);
  };

  return (
    <section id="assessment" className="py-20 lg:py-28 bg-stone-50 border-y border-stone-200/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/60 inline-block mb-3">
            Interactive Helper
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Care Needs Assessment Tool
          </h2>
          <p className="mt-3 text-base text-stone-600 font-sans">
            Is Duke Care the right fit? Placement agencies and families can inventory needs here to generate a tailored accommodation proposal immediately.
          </p>
        </div>

        {/* Assessment Card Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-900/5 border border-stone-100">
          
          {!showResult ? (
            <div className="space-y-8">
              <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
                <FileText className="w-5.5 h-5.5 text-emerald-800" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  Step-by-Step Care Evaluation
                </h3>
              </div>

              <div className="space-y-8">
                {ASSESSMENT_QUESTIONS.map((q) => (
                  <div key={q.id} className="space-y-3" id={`question-block-${q.id}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-100 px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                    </div>
                    <p className="font-serif text-base sm:text-lg font-medium text-stone-850 leading-snug">
                      {q.questionText}
                    </p>

                    <div className="grid sm:grid-cols-3 gap-3 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = answers[q.id] === opt.scoreValue;
                        return (
                          <button
                            key={opt.scoreValue}
                            id={`option-${q.id}-${opt.scoreValue}`}
                            onClick={() => handleSelectOption(q.id, opt.scoreValue)}
                            className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
                              isSelected
                                ? 'bg-emerald-50/80 border-emerald-800 ring-2 ring-emerald-800/15'
                                : 'bg-stone-50/50 hover:bg-stone-50 border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div>
                              <span className={`text-sm font-semibold block transition-colors ${
                                isSelected ? 'text-emerald-950' : 'text-stone-800'
                              }`}>
                                {opt.label}
                              </span>
                              <span className="text-xs text-stone-500 block leading-relaxed mt-1.5 font-sans">
                                {opt.description}
                              </span>
                            </div>
                            <div className="flex justify-end mt-4">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-stone-300 bg-white'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit triggers */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <p className="text-xs text-stone-500 font-sans">
                  *This evaluation maintains resident privacy. No identifying information is transmitted or stored outside your browser.
                </p>
                <button
                  id="assessment-submit-btn"
                  onClick={() => setShowResult(true)}
                  disabled={!isComplete}
                  className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all self-end sm:self-auto ${
                    isComplete
                      ? 'bg-emerald-900 hover:bg-emerald-850 text-amber-50 shadow-md shadow-emerald-950/10 hover:shadow-lg cursor-pointer'
                      : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                  }`}
                >
                  <span>Analyze Care Fit</span>
                  <ChevronRight className="w-4 h-4 text-amber-100" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Presentation */
            <div className="space-y-8 animate-in fade-in duration-300" id="assessment-results-block">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-stone-100 pb-6 gap-4">
                <div>
                  <span className="text-xs font-mono tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                    Evaluation Complete
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                    Duke Care Match Summary
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    id="btn-copy-assessment"
                    onClick={handleCopyReport}
                    className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied Report!' : 'Copy Summary'}</span>
                  </button>
                  <button
                    id="btn-reset-assessment"
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-700 hover:bg-stone-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                
                {/* Result analysis summary left */}
                <div className="md:col-span-7 space-y-6">
                  
                  {/* Category Fit Breakdown */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">Category Accommodations</h4>
                    
                    {/* Check ADL */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-900 font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-stone-900 font-serif">ADL &amp; Daily Assistance Profile</h5>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans">
                          {answers['adl-needs'] >= 3 
                            ? "Highly suited. Our skilled caregivers are specifically trained in private, graceful assistance for dressing, bath transfers, and personalized skin/hygiene checks."
                            : "Easily Accommodated. Standby safety guidance is fully available during any self-styling, bathing, or walking routines."
                          }
                        </p>
                      </div>
                    </div>

                    {/* Check Meds */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-900 font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-stone-900 font-serif">Medication Management Profile</h5>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans">
                          {answers['medication-needs'] >= 3
                            ? "Complete compliance support active. Administered in state-certified, double-locked vaults logged into individual MAR files, directly supervised by licensee Imelda Scott."
                            : "Perfect match. Standby safety reminders and physician coordination guarantee medications are taken safely and reordered on schedule."
                          }
                        </p>
                      </div>
                    </div>

                    {/* Check Overnight */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-900 font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-stone-900 font-serif">Overnight Safety Profile</h5>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans">
                          {answers['overnight-supervision'] >= 3
                            ? "24-Hour Awake Staff Recommended! Our night team does not sleep on shift. They provide critical supervision, fall prevention during late-night waking, and security against wandering."
                            : "Accommodated. Continuous overnight monitoring and security features secure a tranquil, rest-conducive sleeping environment."
                          }
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Recommendation summary card right */}
                <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800/20 rounded-full blur-xl"></div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5.5 h-5.5 text-amber-300" />
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">Proposal Blueprint</span>
                  </div>

                  <h4 className="font-serif text-2xl font-bold text-white tracking-tight">
                    Duke Care Fit Score: {totalScore} / 15
                  </h4>

                  <p className="text-xs text-emerald-100/90 leading-relaxed font-sans mt-3">
                    Based on these responses, we classify this profile as:
                  </p>
                  
                  <div className="bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-3 mt-2">
                    <span className="text-sm font-bold block text-amber-200">
                      {totalScore <= 5 
                        ? 'Standard Board & Care Standby' 
                        : totalScore <= 10 
                          ? 'Moderate Personalized Assistance' 
                          : 'Premium Awake & Comprehensive Support'
                      }
                    </span>
                    <span className="text-[10px] font-mono text-emerald-200 block mt-0.5">
                      Perfect match for our facility setup.
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-emerald-850 space-y-4">
                    <p className="text-xs text-emerald-100/95 font-sans leading-relaxed">
                      We would love to present these evaluation results directly to Licensee Imelda Scott. She can verify placement and discuss care plans.
                    </p>
                    <button
                      id="btn-assessment-link-tour"
                      onClick={handlePreFillTour}
                      className="w-full bg-amber-100 hover:bg-amber-200 text-emerald-950 text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-emerald-950" />
                      <span>Book Tour with this Profile</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
