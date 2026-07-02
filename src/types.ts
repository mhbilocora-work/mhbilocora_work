/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CareService {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  benefits: string[];
  iconName: string;
  category: 'daily-care' | 'medical-safety' | 'hospitality' | 'community';
}

export interface TourBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes?: string;
  relationship: 'Self' | 'Child' | 'Spouse' | 'Relative' | 'Professional Care Placement Agent' | 'Other';
  urgency: 'Immediate' | 'Within 1 Month' | 'Just Browsing / Future';
  timestamp: string;
  status: 'Confirmed' | 'Pending Review';
}

export interface AgencyReferral {
  id: string;
  agencyName: string;
  agentName: string;
  agentEmail: string;
  agentPhone: string;
  clientInitials: string; // To maintain HIPAA privacy in general contact form
  clientAge?: number;
  careNeeds: string[];
  additionalDetails?: string;
  trackingId: string;
  timestamp: string;
  status: 'Received' | 'Assigned to Imelda Scott';
}

export interface CareAssessmentQuestion {
  id: string;
  category: string;
  questionText: string;
  options: {
    label: string;
    description: string;
    scoreValue: number;
    requiresAwakeStaff?: boolean;
    requiresADLAssistance?: boolean;
  }[];
}

export interface Testimonial {
  id: string;
  author: string;
  relation: string;
  quote: string;
  date: string;
}
