import { VisaType } from '../../types/models/VisaApplication';

// Shared in-memory store for demo purposes
let visaDatabase: VisaType[] = [
  {
    name: 'Tourist Visa',
    country: 'us',
    category: 'travel',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Proof of accommodation',
      'Return flight ticket',
      'Bank statements for the last 3 months'
    ],
    processingTime: '5-7 business days',
    validity: '6 months',
    fees: {
      consultation: 50,
      government: 160,
      total: 210
    },
    isActive: true,
    description: 'Short-term tourist visa for leisure travel in the United States.',
    notes: 'Interview may be required depending on consulate policies.'
  },
  {
    name: 'Business Visa',
    country: 'uk',
    category: 'travel',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed visa application form',
      'Invitation letter from UK company',
      'Business cover letter',
      'Bank statements for the last 6 months'
    ],
    processingTime: '10-15 business days',
    validity: '1 year',
    fees: {
      consultation: 75,
      government: 230,
      total: 305
    },
    isActive: true,
    description: 'Business-related short-term visit visa for the United Kingdom.',
    notes: 'Multiple entry may be available depending on consular decision.'
  },
  // Schengen visas
  {
    name: 'Schengen Visa',
    country: 'austria',
    category: 'schengen',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed Schengen application form',
      'Recent passport-sized photographs',
      'Proof of accommodation and travel itinerary',
      'Travel insurance covering EUR 30,000',
      'Bank statements for the last 3-6 months'
    ],
    processingTime: '10-15 business days',
    validity: 'Up to 90 days',
    fees: {
      consultation: 60,
      government: 80,
      total: 140
    },
    isActive: true,
    description: 'Short-stay Schengen visa for Austria for tourism or business.',
    notes: 'Processing times may vary during peak seasons.'
  },
  {
    name: 'Schengen Visa',
    country: 'italy',
    category: 'schengen',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed Schengen application form',
      'Recent passport-sized photographs',
      'Proof of accommodation and travel itinerary',
      'Travel insurance covering EUR 30,000',
      'Bank statements for the last 3-6 months'
    ],
    processingTime: '10-15 business days',
    validity: 'Up to 90 days',
    fees: {
      consultation: 60,
      government: 80,
      total: 140
    },
    isActive: true,
    description: 'Short-stay Schengen visa for Italy for tourism or business.',
    notes: 'Ensure all documents are translated if required by the consulate.'
  },
  {
    name: 'Schengen Visa',
    country: 'spain',
    category: 'schengen',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed Schengen application form',
      'Recent passport-sized photographs',
      'Proof of accommodation and travel itinerary',
      'Travel insurance covering EUR 30,000',
      'Bank statements for the last 3-6 months'
    ],
    processingTime: '10-15 business days',
    validity: 'Up to 90 days',
    fees: {
      consultation: 60,
      government: 80,
      total: 140
    },
    isActive: true,
    description: 'Short-stay Schengen visa for Spain for tourism or business.',
    notes: 'Book consulate appointment early to avoid delays.'
  },
  // UAE Visas
  {
    name: 'UAE 14 Days Visa',
    country: 'uae',
    category: 'travel',
    requirements: [
      'A clear photo with a white background',
      'A 6 months validity clear passport scan or picture'
    ],
    processingTime: 'Up to 7 working days',
    validity: '14 days single entry',
    fees: {
      consultation: 50,
      government: 150,
      total: 200
    },
    isActive: true,
    description: 'Short-term single entry visa for UAE valid for 14 days.',
    notes: 'Processing time varies. Application must include clear documents for faster processing.'
  },
  {
    name: 'UAE 30 Days Visa',
    country: 'uae',
    category: 'travel',
    requirements: [
      'A clear photo with a white background',
      'A 6 months validity clear passport scan or picture'
    ],
    processingTime: 'Up to 7 working days',
    validity: '30 days multiple entry',
    fees: {
      consultation: 70,
      government: 250,
      total: 320
    },
    isActive: true,
    description: '30-day multiple entry visa for UAE with flexible travel options.',
    notes: 'Allows multiple entries within the 30-day validity period. Processing time may vary during peak seasons.'
  },
  {
    name: 'UAE 90 Days Visa',
    country: 'uae',
    category: 'travel',
    requirements: [
      'A clear photo with a white background',
      'A 6 months validity clear passport scan or picture'
    ],
    processingTime: 'Up to 7 working days',
    validity: '90 days multiple entry',
    fees: {
      consultation: 100,
      government: 400,
      total: 500
    },
    isActive: true,
    description: 'Long-term multiple entry visa for UAE valid for 90 days.',
    notes: 'Ideal for extended stays and multiple visits. Fee varies based on visa type.'
  }
];

export function getAllVisas(): VisaType[] {
  return visaDatabase;
}

export function getVisaByName(name: string): VisaType | undefined {
  return visaDatabase.find(v => v.name === name);
}

export function createVisa(visa: VisaType): VisaType {
  visaDatabase.push(visa);
  return visa;
}

export function updateVisa(name: string, updated: VisaType): VisaType | undefined {
  const index = visaDatabase.findIndex(v => v.name === name);
  if (index === -1) return undefined;
  visaDatabase[index] = updated;
  return visaDatabase[index];
}

export function deleteVisa(name: string): boolean {
  const index = visaDatabase.findIndex(v => v.name === name);
  if (index === -1) return false;
  visaDatabase.splice(index, 1);
  return true;
}