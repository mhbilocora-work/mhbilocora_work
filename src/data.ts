/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CareService, CareAssessmentQuestion, Testimonial } from './types';

export const FACILITY_INFO = {
  name: "Duke Care",
  licensee: "Imelda B. Scott",
  role: "Licensee & Administrator",
  licenseNo: "79201662",
  address: "3105 Concord Blvd., Concord, CA 94519",
  phone: "208-590-3334",
  homePhone: "925-496-7515",
  email: "imelda.scott@dukecarehome.com", // Professional fallback
  locationDescription: "Located in a serene residential neighborhood of Concord, California, our facility provides a peaceful, accessible home environment with gorgeous outdoor yards and close proximity to local medical services.",
};

export const CORE_SERVICES: CareService[] = [
  {
    id: "awake-staff",
    title: "24-Hour Awake Staff",
    description: "Our dedicated caregivers are awake and active throughout the night, offering families supreme confidence and responsive care whenever a resident needs assistance.",
    fullDetails: "At Duke Care, we prioritize safety and rapid response. Our night staff does not sleep on shift; they are fully awake, performing regular safety checks, helping with late-night bathroom transfers, and handling any emergency situations instantly.",
    benefits: [
      "Immediate assistance for midnight transfers or toilet routines",
      "Regular wellness and positioning checks during the night",
      "Immediate response to emergency calls with awake on-site supervision",
      "True peace of mind for families knowing overnight safety is active 24/7"
    ],
    iconName: "ShieldAlert",
    category: "medical-safety"
  },
  {
    id: "compassionate-caregivers",
    title: "Experienced Caregivers",
    description: "Highly trained professionals who treat each resident with deep personal respect, dignity, and warmth, fostering genuine trust and comforting companionship.",
    fullDetails: "Our caregivers are hand-selected for their clinical excellence and soft-hearted empathy. They receive continuous education on dementia support, fall prevention, transfer safety, and infection control, ensuring your loved one receives skilled, respectful care.",
    benefits: [
      "Trained in positive redirection and senior behavioral support",
      "Consistent, familiar faces to help build trustworthy personal bonds",
      "Supportive and empathetic interaction focusing on residents' strengths",
      "Professional standard conforming to California RCFE Title 22 guidelines"
    ],
    iconName: "Heart",
    category: "daily-care"
  },
  {
    id: "home-cooked-meals",
    title: "Delicious, Nutritious Meals",
    description: "Delicious, fresh, home-cooked meals prepared daily, customized to fit individual dietary requirements and specific medical prescriptions.",
    fullDetails: "Meals are a focal point of joy and health at Duke Care. We cook from scratch using fresh ingredients, designing colorful and appetizing menus that supply optimal nutrition. We gladly adjust recipes for low-sodium, diabetic, pureed, or vegetarian diets.",
    benefits: [
      "Three wholesome meals per day plus fresh, healthy snacks",
      "Special dietary management (diabetic, renal, mechanical soft, pureed)",
      "Hydration monitoring program throughout the day",
      "Family-style dining that encourages social connection and laughter"
    ],
    iconName: "Utensils",
    category: "hospitality"
  },
  {
    id: "adl-assistance",
    title: "Activities of Daily Living (ADL)",
    description: "Personalized assistance with bathing, dressing, grooming, hygiene, and safe mobility, supporting residents' physical independence and styling preferences.",
    fullDetails: "We assist with the intimate tasks of daily living while maintaining maximum resident dignity. Our caregivers are experts in 'assistive care'—helping only where needed so residents retain their range of motion, muscle strength, and feelings of autonomy.",
    benefits: [
      "Dignified assistance with showers, sponge baths, and personal hygiene",
      "Support with morning and evening dressing and styling preferences",
      "Transfer assistance using safe, biomechanical techniques",
      "Incontinence care managed with absolute discretion and skin-health focus"
    ],
    iconName: "Accessibility",
    category: "daily-care"
  },
  {
    id: "medication-management",
    title: "Medication Management",
    description: "Rigorous monitoring and assistance with medication schedules to prevent missed doses, errors, or harmful drug interactions.",
    fullDetails: "Under the supervision of Imelda Scott, our facility maintains a secure, double-locked medication system. Every dose is cataloged and logged in individual Medication Administration Records (MAR) to guarantee accuracy and conform strictly with California licensing regulations.",
    benefits: [
      "Timely administration of all prescribed drugs, vitamins, and supplements",
      "Reorder coordination with local pharmacies to ensure uninterrupted supply",
      "Careful monitoring for potential side-effects or behavioral changes",
      "Liaison with primary physicians and specialists for dose adjustments"
    ],
    iconName: "Pills",
    category: "medical-safety"
  },
  {
    id: "fresh-environment",
    title: "Clean & Fresh-Smelling Home",
    description: "A meticulously cleaned, sanitary home smelling fresh and inviting, beautifully adorned with fresh white roses in ceramic vases and warm ambient lighting.",
    fullDetails: "Many care facilities struggle with ambient odor, but Duke Care maintains an exemplary standard. We implement daily deep-cleaning routines, professional laundry management, and state-of-the-art air sanitization. Our common areas are thoughtfully decorated with fresh floral arrangements like white roses on dark wood credenzas, custom-framed nature artwork, and warm-glow accent lamps to create a luxurious, scent-free, and truly welcoming home environment.",
    benefits: [
      "Daily thorough housekeeping of private bedrooms and shared living areas",
      "Professional-grade laundry services for clothing and bed linens",
      "Continuous deep sanitization of high-touch surfaces",
      "An open, bright, and airy home structure that is proud to host visitors"
    ],
    iconName: "Sparkles",
    category: "hospitality"
  },
  {
    id: "companionship-activities",
    title: "Meaningful Companionship",
    description: "Daily structured activities, memory games, and social sessions in our premium living areas featuring plush forest-green armchairs and cozy reading corners.",
    fullDetails: "Boredom and isolation are major risks for seniors. We counter this by fostering an interactive, lively community. Residents can relax in our luxurious, supportive forest-green upholstered armchairs, enjoy fresh coffee or herbal teas served in our signature forest-green Duke Care mugs, solve puzzles, or join guided cognitive exercises, gentle stretching, and music sessions.",
    benefits: [
      "Engaging trivia, cognitive exercises, and card games to boost brain health",
      "Gentle stretching and range-of-motion physical exercises",
      "Birthday celebrations, seasonal holiday parties, and family gatherings",
      "Quiet, peaceful outdoor garden seating for natural therapeutic relaxation"
    ],
    iconName: "Users",
    category: "community"
  },
  {
    id: "family-atmosphere",
    title: "Family-Centered Atmosphere",
    description: "A small-group residential environment featuring custom cherry-wood furniture, cozy seating, and professional, warm oversight by Imelda Scott.",
    fullDetails: "Large institutional nursing facilities can feel cold, mechanical, and overwhelming. As a micro-residential care home, Duke Care offers the ultimate family feel. Under the active on-site leadership of Administrator Imelda Scott, our living space is outfitted with rich cherry-wood tables, elegant sideboards, fresh flowers, and comfortable seating designed to feel warm, high-end, and perfectly cozy.",
    benefits: [
      "High staff-to-resident ratio enabling tailored personal attention",
      "Open door policy for families and visiting loved ones",
      "Warm shared living room, dining area, and spacious sunny backyard",
      "A culture of love, dignity, and sincere respect for senior wisdom"
    ],
    iconName: "Home",
    category: "community"
  }
];

export const ASSESSMENT_QUESTIONS: CareAssessmentQuestion[] = [
  {
    id: "adl-needs",
    category: "Activities of Daily Living (ADL)",
    questionText: "What level of assistance does your loved one need for daily tasks like dressing, bathing, and moving around?",
    options: [
      {
        label: "Independent / Minimal Support",
        description: "Can bathe, dress, and walk safely on their own, but needs a watchful eye or gentle standby assistance.",
        scoreValue: 1,
        requiresADLAssistance: false
      },
      {
        label: "Moderate Assistance Needed",
        description: "Needs direct help with bathing, fastening clothes, rising from chairs, or steadying while walking.",
        scoreValue: 3,
        requiresADLAssistance: true
      },
      {
        label: "Full Assistive Care",
        description: "Requires complete, hands-on assistance for transfers, total bathing support, grooming, and clothing changes.",
        scoreValue: 5,
        requiresADLAssistance: true
      }
    ]
  },
  {
    id: "medication-needs",
    category: "Medication & Health Monitoring",
    questionText: "How does your loved one manage their medical prescriptions and medication schedules?",
    options: [
      {
        label: "Self-Sufficient with Reminders",
        description: "Maintains good awareness but benefits from standard verbal reminders to take their pills at scheduled times.",
        scoreValue: 1
      },
      {
        label: "Full Management & Distribution Required",
        description: "Needs complete supervision, pill counting, locked storage, and hand-delivered doses to avoid dosage errors.",
        scoreValue: 3
      },
      {
        label: "Complex Health Monitoring",
        description: "Takes numerous prescriptions, requires blood sugar monitoring, vitals tracking, or specialized dosage safety checks.",
        scoreValue: 5
      }
    ]
  },
  {
    id: "overnight-supervision",
    category: "Overnight Safety Needs",
    questionText: "What are your loved one's sleep patterns and overnight assistance requirements?",
    options: [
      {
        label: "Sleeps Soundly Through the Night",
        description: "Usually sleeps through the night without waking, requiring only standard safety monitoring and a peaceful room.",
        scoreValue: 1,
        requiresAwakeStaff: false
      },
      {
        label: "Occasional Night Waking or Bathroom Trips",
        description: "Wakes up once or twice, needing assistance to reach the bathroom safely or guidance back to bed to prevent falls.",
        scoreValue: 3,
        requiresAwakeStaff: true
      },
      {
        label: "Frequent Waking / Sleep Reversal / Wander Risk",
        description: "Has restless sleep patterns, tends to wander, exhibits sundowning behavior, or needs high-frequency medical repositioning.",
        scoreValue: 5,
        requiresAwakeStaff: true
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Robert L.",
    relation: "Son of Resident",
    quote: "Finding Duke Care was an absolute godsend for our family. The 24-hour awake staff means we never worry about Mom falling at night. Imelda and her team treat her like their own mother. The home always smells beautifully clean, and the meals are fresh and delicious. We finally have total peace of mind.",
    date: "May 2026"
  },
  {
    id: "t2",
    author: "Sarah M.",
    relation: "Seniors Placement Specialist",
    quote: "As a professional placement agent, I am incredibly selective about the facilities I recommend. Duke Care is consistently at the top of my list in Concord. Imelda Scott is an outstanding administrator who genuinely cares about compliance, cleanliness, and resident dignity. My clients placed here are flourishing.",
    date: "March 2026"
  },
  {
    id: "t3",
    author: "Elena G.",
    relation: "Daughter of Resident",
    quote: "Duke Care is truly a home, not an institution. Dad loves the home-cooked meals and sitting in the sunny backyard garden. The caregivers are patient, respectful, and so gentle with his memory issues. I cannot thank Imelda enough for the exceptional care and warm dignity they provide every single day.",
    date: "June 2026"
  }
];

export const TOUR_SLOTS = [
  "09:30 AM", "10:30 AM", "11:30 AM", "01:30 PM", "02:30 PM", "03:30 PM", "04:30 PM"
];

export const RESIDENTIAL_ROOMS = [
  {
    id: "room-private",
    name: "Deluxe Private Bedroom",
    description: "A peaceful private sanctuary styled with rich, glossy cherry-wood floors, warm beige walls, and generous closet space with double-sliding white doors. Dressed in clean, warm camel-mustard linens on a sturdy black metal headboard bed, and completed by classic dark wood nightstands with elegant bedside lamps.",
    features: ["Glossy cherry-wood flooring", "Cozy twin bed with warm mustard comforter", "Dual dark wood nightstands & reading lamps", "Spacious white double-sliding closet doors"],
    amenity: "Ideal for residents who cherish complete quiet and beautiful, traditional bedroom furnishings within our warm home.",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-companion",
    name: "Garden-Access Companion Bedroom",
    description: "A gorgeous, highly accessible room featuring beautiful glass French doors with elegant drapes that open directly onto our level backyard patio walkways. Outfitted with rich cherry-wood flooring, a cozy twin bed, a comfortable tan accent armchair with an olive-green pillow, and a dark nightstand with a gold reading lamp.",
    features: ["Direct backyard patio French door access", "Warm glossy cherry-wood flooring & cream walls", "Cozy tan upholstered accent armchair & gold lamp", "Seamless layout for walkers and mobility support"],
    amenity: "Perfect for residents who appreciate direct access to fresh garden air, or enjoy peaceful bird watching from their reading chair.",
    img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
  }
];
