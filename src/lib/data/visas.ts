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
    validity: '14 days single entry, valid for 60 days from date of issuance',
    fees: {
      consultation: 50,
      government: 150,
      total: 200
    },
    isActive: true,
    description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 14 days single entry visa allows a person to remain for 14 days in the emirates. The permission is valid for 60 days from the date of issuance.',
    notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy.'
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
    validity: '30 days multiple entry, valid for 60 days from date of issue',
    fees: {
      consultation: 70,
      government: 250,
      total: 320
    },
    isActive: true,
    description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 30 days multiple Entry Visa allows you to visit the UAE frequently and stay for up to 30 days. The visa will be valid for 60 days from the date of issue.',
    notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Embassy fees per person/duration may vary from one period to another, according to an official decision issued by the embassy. Our office fees may vary depending on the type of visa, country and any additional charges.'
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
    validity: '90 days multiple entry, valid for 60 days from date of issue',
    fees: {
      consultation: 100,
      government: 400,
      total: 500
    },
    isActive: true,
    description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 90 days multiple entry allows you to visit the UAE frequently and stay for up to 90 days in UAE. The visa will be valid for 60 days from the date of issue.',
    notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Embassy fees per person/duration may vary from one period to another, according to an official decision issued by the embassy. Our office fees may vary depending on the type of visa, country and any additional charges.'
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