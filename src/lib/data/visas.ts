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
    nameAr: 'تأشيرة الإمارات 14 يوم',
    country: 'uae',
    category: 'travel',
    requirements: [
      'A clear photo with a white background',
      'A 6 months validity clear passport scan or picture'
    ],
    requirementsAr: [
      'صورة واضحة بخلفية بيضاء',
      'نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر'
    ],
    processingTime: 'Up to 7 working days',
    processingTimeAr: 'حتى 7 أيام عمل',
    validity: '14 days single entry, valid for 60 days from date of issuance',
    validityAr: '14 يوم دخول واحد، صالحة لمدة 60 يومًا من تاريخ الإصدار',
    fees: {
      consultation: 50,
      government: 150,
      total: 200
    },
    isActive: true,
    description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain.',
    descriptionAr: 'تأشيرة دولة الإمارات العربية المتحدة صالحة في جميع أنحاء دولة الإمارات، وهي دبي، أبو ظبي، عجمان، الشارقة، الفجيرة، رأس الخيمة وأم القيوين.',
    notes: 'Firstly, After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Secondly, Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Dubai and neighboring emirates\' Visa Fees: Embassy fees per person/duration, may vary from one period to another, according to an official decision issued by the embassy. On the other hand, our office fees may vary depending on the type of visa, country and any additional charges.',
    notesAr: 'أولاً، بعد تقديم جميع المستندات المطلوبة، سنقوم بإرسال طلب تأشيرة الإمارات مباشرة إلى سفارة الإمارات في الأردن للمراجعة. ثانياً، قد تستغرق مدة المعالجة حتى 7 أيام عمل بدءًا من تاريخ تقديم جميع مستنداتك في السفارة. رسوم تأشيرة دبي والإمارات المجاورة: قد تختلف رسوم السفارة لكل شخص/المدة من فترة إلى أخرى، وفقًا لقرار رسمي صادر عن السفارة. من ناحية أخرى، قد تختلف رسوم مكتبنا اعتمادًا على نوع التأشيرة والبلد وأي رسوم إضافية.',
    mainRequirements: 'The essential requirements for The Embassy of The United Arab Emirates in Jordan to issue UAE visa: For the Emirates Embassy in Jordan to grant you a visa, you must meet the following conditions: 1-A clear photo with a white background. 2-A 6 months validity clear passport scan or picture.',
    mainRequirementsAr: 'المتطلبات الأساسية لسفارة دولة الإمارات العربية المتحدة في الأردن لإصدار تأشيرة الإمارات: لكي تمنحك سفارة الإمارات في الأردن تأشيرة، يجب أن تستوفي الشروط التالية: 1-صورة واضحة بخلفية بيضاء. 2-نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر.',
    visaTypes: ['14 Days Single Entry'],
    visaTypesAr: ['14 يوم دخول واحد']
  },
  {
    name: 'UAE 30 Days Visa',
    nameAr: 'تأشيرة الإمارات 30 يوم',
    country: 'uae',
    category: 'travel',
    requirements: [
      'A clear photo with a white background',
      'A 6 months validity clear passport scan or picture'
    ],
    requirementsAr: [
      'صورة واضحة بخلفية بيضاء',
      'نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر'
    ],
    processingTime: 'Up to 7 working days',
    processingTimeAr: 'حتى 7 أيام عمل',
    validity: '30 days multiple entry, valid for 60 days from date of issue',
    validityAr: '30 يوم دخول متعدد، صالحة لمدة 60 يومًا من تاريخ الإصدار',
    fees: {
      consultation: 70,
      government: 250,
      total: 320
    },
    isActive: true,
    description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 30 days multiple Entry Visa allows you to visit the UAE frequently and stay for up to 30 days. The visa will be valid for 60 days from the date of issue. Types of Emirates Visa: You can apply for a variety of visas. For example: 1) 14 days single entry visa allows a person to remain for 14 days in the emirates. The permission is valid for 60 days from the date of issuance. 2) 30 days multiple Entry Visa allows you to visit the UAE frequently and stay for up to 30 days. The visa will be valid for 60 days from the date of issue. 3) 90 days multiple entry: allows you to visit the UAE frequently and stay for up to day 90 days in UAE. The visa will be valid for 60 days from the date of issue.',
    descriptionAr: 'تأشيرة دولة الإمارات العربية المتحدة صالحة في جميع أنحاء دولة الإمارات، وهي دبي، أبو ظبي، عجمان، الشارقة، الفجيرة، رأس الخيمة وأم القيوين. تأشيرة 30 يوم دخول متعدد تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 30 يومًا. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار. أنواع تأشيرة الإمارات: يمكنك التقدم بطلب للحصول على مجموعة متنوعة من التأشيرات. على سبيل المثال: 1) تأشيرة 14 يوم دخول واحد تسمح للشخص بالبقاء لمدة 14 يومًا في الإمارات. الإذن صالح لمدة 60 يومًا من تاريخ الإصدار. 2) تأشيرة 30 يوم دخول متعدد تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 30 يومًا. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار. 3) 90 يوم دخول متعدد: تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 90 يومًا في دولة الإمارات. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار.',
    notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Embassy fees per person/duration may vary from one period to another, according to an official decision issued by the embassy. Our office fees may vary depending on the type of visa, country and any additional charges.',
    notesAr: 'بعد تقديم جميع المستندات المطلوبة، سنقوم بإرسال طلب تأشيرة الإمارات مباشرة إلى سفارة الإمارات في الأردن للمراجعة. قد تستغرق مدة المعالجة حتى 7 أيام عمل بدءًا من تاريخ تقديم جميع مستنداتك في السفارة. قد تختلف رسوم السفارة لكل شخص/المدة من فترة إلى أخرى، وفقًا لقرار رسمي صادر عن السفارة. قد تختلف رسوم مكتبنا اعتمادًا على نوع التأشيرة والبلد وأي رسوم إضافية.',
    mainRequirements: 'For the Emirates Embassy in Jordan to grant you a visa, you must meet the following conditions: 1-A clear photo with a white background. 2-A 6 months validity clear passport scan or picture.',
    mainRequirementsAr: 'لكي تمنحك سفارة الإمارات في الأردن تأشيرة، يجب أن تستوفي الشروط التالية: 1-صورة واضحة بخلفية بيضاء. 2-نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر.',
    visaTypes: ['30 Days Multiple Entry'],
    visaTypesAr: ['30 يوم دخول متعدد']
  },
  {
    name: 'UAE 90 Days Visa',
    nameAr: 'تأشيرة الإمارات 90 يوم',
    country: 'uae',
    category: 'travel',
    requirements: [
      'A clear photo with a white background',
      'A 6 months validity clear passport scan or picture'
    ],
    requirementsAr: [
      'صورة واضحة بخلفية بيضاء',
      'نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر'
    ],
    processingTime: 'Up to 7 working days',
    processingTimeAr: 'حتى 7 أيام عمل',
    validity: '90 days multiple entry, valid for 60 days from date of issue',
    validityAr: '90 يوم دخول متعدد، صالحة لمدة 60 يومًا من تاريخ الإصدار',
    fees: {
      consultation: 100,
      government: 400,
      total: 500
    },
    isActive: true,
    description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 90 days multiple entry allows you to visit the UAE frequently and stay for up to 90 days in UAE. The visa will be valid for 60 days from the date of issue.',
    descriptionAr: 'تأشيرة دولة الإمارات العربية المتحدة صالحة في جميع أنحاء دولة الإمارات، وهي دبي، أبو ظبي، عجمان، الشارقة، الفجيرة، رأس الخيمة وأم القيوين. 90 يوم دخول متعدد تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 90 يومًا في دولة الإمارات. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار.',
    notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Embassy fees per person/duration may vary from one period to another, according to an official decision issued by the embassy. Our office fees may vary depending on the type of visa, country and any additional charges.',
    notesAr: 'بعد تقديم جميع المستندات المطلوبة، سنقوم بإرسال طلب تأشيرة الإمارات مباشرة إلى سفارة الإمارات في الأردن للمراجعة. قد تستغرق مدة المعالجة حتى 7 أيام عمل بدءًا من تاريخ تقديم جميع مستنداتك في السفارة. قد تختلف رسوم السفارة لكل شخص/المدة من فترة إلى أخرى، وفقًا لقرار رسمي صادر عن السفارة. قد تختلف رسوم مكتبنا اعتمادًا على نوع التأشيرة والبلد وأي رسوم إضافية.',
    mainRequirements: 'For the Emirates Embassy in Jordan to grant you a visa, you must meet the following conditions: 1-A clear photo with a white background. 2-A 6 months validity clear passport scan or picture.',
    mainRequirementsAr: 'لكي تمنحك سفارة الإمارات في الأردن تأشيرة، يجب أن تستوفي الشروط التالية: 1-صورة واضحة بخلفية بيضاء. 2-نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر.',
    visaTypes: ['90 Days Multiple Entry'],
    visaTypesAr: ['90 يوم دخول متعدد']
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