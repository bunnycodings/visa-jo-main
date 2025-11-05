import { query, getConnectionPool } from './mysql';
import bcrypt from 'bcryptjs';
import { defaultHeroContent, defaultWhyChooseUsContent, defaultPopularDestinationsContent, defaultHowItWorksContent, defaultAboutContent, defaultContactContent, defaultServicesContent } from '@/types/models/SiteContent';

let initializationInProgress = false;
let initializationComplete = false;

/**
 * Auto-initialize database with default data if missing
 * This runs automatically on first API call if data is missing
 */
export async function autoInitializeDatabase(): Promise<void> {
  // Prevent concurrent initialization
  if (initializationInProgress) {
    return;
  }

  if (initializationComplete) {
    return;
  }

  initializationInProgress = true;

  try {
    const pool = getConnectionPool();
    
    // Test connection first - if it fails, skip initialization (likely build time or missing config)
    try {
      const connection = await pool.getConnection();
      connection.release();
    } catch (connError: any) {
      // Check if it's a connection error (build time, missing env vars, or unreachable DB)
      if (
        connError.code === 'ECONNREFUSED' || 
        connError.code === 'ENOTFOUND' ||
        connError.code === 'ETIMEDOUT' ||
        connError.code === 'ER_ACCESS_DENIED_ERROR' ||
        connError.message?.includes('connect')
      ) {
        // Only log if in production (Vercel) and we have some env vars configured
        // This prevents spam during build time
        if (process.env.VERCEL && (process.env.DB_HOST || process.env.DB_USER)) {
          const envStatus = {
            DB_HOST: process.env.DB_HOST ? '✓' : '✗',
            DB_USER: process.env.DB_USER ? '✓' : '✗',
            DB_PASSWORD: process.env.DB_PASSWORD ? '✓' : '✗',
            DB_NAME: process.env.DB_NAME ? '✓' : '✗',
          };
          console.error('Database connection failed in Vercel. Environment check:', envStatus);
          console.error('Error:', connError.code, connError.message);
        } else {
          console.warn('Database connection unavailable during initialization, skipping...');
        }
        return;
      }
      throw connError;
    }
    
    // Check if admin user exists
    const [users] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE role = ?', ['admin']);
    const userCount = (users as any[])[0]?.count || 0;

    if (userCount === 0) {
      console.log('🔧 Auto-initializing: Creating admin user...');
      const email = 'admin@visaconsulting.com';
      const plainPassword = 'visajoadmin123';
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      await pool.execute(
        `INSERT INTO users (email, password, name, role, permissions, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          email,
          hashedPassword,
          'Admin User',
          'admin',
          JSON.stringify(['read', 'write', 'delete', 'admin']),
          1
        ]
      );
      console.log(`✅ Admin user created - Email: ${email}, Password: ${plainPassword}`);
      console.log('⚠️  Please change the password after first login!');
    }

    // Check and initialize site content
    await initializeSiteContent('hero', defaultHeroContent);
    await initializeSiteContent('why', defaultWhyChooseUsContent);
    await initializeSiteContent('popular', defaultPopularDestinationsContent);
    await initializeSiteContent('how', defaultHowItWorksContent);
    await initializeSiteContent('about', defaultAboutContent);
    await initializeSiteContent('contact', defaultContactContent);
    await initializeSiteContent('services', defaultServicesContent);

    // Initialize default visas (check for each individually to avoid duplicates)
    console.log('🔧 Auto-initializing: Checking and creating default visas...');
    await initializeDefaultVisas();

    initializationComplete = true;
    console.log('✅ Database auto-initialization complete');
  } catch (error) {
    console.error('❌ Auto-initialization error:', error);
    // Don't throw - allow app to continue even if initialization fails
  } finally {
    initializationInProgress = false;
  }
}

async function initializeSiteContent(key: string, defaultContent: any): Promise<void> {
  const pool = getConnectionPool();
  const [existing] = await pool.execute(
    'SELECT content_key FROM site_content WHERE content_key = ?',
    [key]
  );

  if ((existing as any[]).length === 0) {
    console.log(`🔧 Auto-initializing: Creating ${key} content...`);
    await pool.execute(
      `INSERT INTO site_content (content_key, content_data, is_active, updated_at)
       VALUES (?, ?, 1, NOW())`,
      [key, JSON.stringify(defaultContent)]
    );
  }
}

async function initializeDefaultVisas(): Promise<void> {
  const pool = getConnectionPool();

  const defaultVisas = [
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
      fees: { consultation: 50, government: 150, total: 200 },
      description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain.',
      descriptionAr: 'تأشيرة دولة الإمارات العربية المتحدة صالحة في جميع أنحاء دولة الإمارات، وهي دبي، أبو ظبي، عجمان، الشارقة، الفجيرة، رأس الخيمة وأم القيوين.',
      notes: 'Firstly, After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Secondly, Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Dubai and neighboring emirates\' Visa Fees: Embassy fees per person/duration, may vary from one period to another, according to an official decision issued by the embassy. On the other hand, our office fees may vary depending on the type of visa, country and any additional charges.',
      notesAr: 'أولاً، بعد تقديم جميع المستندات المطلوبة، سنقوم بإرسال طلب تأشيرة الإمارات مباشرة إلى سفارة الإمارات في الأردن للمراجعة. ثانياً، قد تستغرق مدة المعالجة حتى 7 أيام عمل بدءًا من تاريخ تقديم جميع مستنداتك في السفارة. رسوم تأشيرة دبي والإمارات المجاورة: قد تختلف رسوم السفارة لكل شخص/المدة من فترة إلى أخرى، وفقًا لقرار رسمي صادر عن السفارة. من ناحية أخرى، قد تختلف رسوم مكتبنا اعتمادًا على نوع التأشيرة والبلد وأي رسوم إضافية.',
      mainRequirements: 'The essential requirements for The Embassy of The United Arab Emirates in Jordan to issue UAE visa: For the Emirates Embassy in Jordan to grant you a visa, you must meet the following conditions: 1-A clear photo with a white background. 2-A 6 months validity clear passport scan or picture.',
      mainRequirementsAr: 'المتطلبات الأساسية لسفارة دولة الإمارات العربية المتحدة في الأردن لإصدار تأشيرة الإمارات: لكي تمنحك سفارة الإمارات في الأردن تأشيرة، يجب أن تستوفي الشروط التالية: 1-صورة واضحة بخلفية بيضاء. 2-نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر.',
      visaTypes: ['14 Days Single Entry'],
      visaTypesAr: ['14 يوم دخول واحد'],
      isActive: true
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
      fees: { consultation: 70, government: 250, total: 320 },
      description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 30 days multiple Entry Visa allows you to visit the UAE frequently and stay for up to 30 days. The visa will be valid for 60 days from the date of issue. Types of Emirates Visa: You can apply for a variety of visas. For example: 1) 14 days single entry visa allows a person to remain for 14 days in the emirates. The permission is valid for 60 days from the date of issuance. 2) 30 days multiple Entry Visa allows you to visit the UAE frequently and stay for up to 30 days. The visa will be valid for 60 days from the date of issue. 3) 90 days multiple entry: allows you to visit the UAE frequently and stay for up to day 90 days in UAE. The visa will be valid for 60 days from the date of issue.',
      descriptionAr: 'تأشيرة دولة الإمارات العربية المتحدة صالحة في جميع أنحاء دولة الإمارات، وهي دبي، أبو ظبي، عجمان، الشارقة، الفجيرة، رأس الخيمة وأم القيوين. تأشيرة 30 يوم دخول متعدد تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 30 يومًا. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار. أنواع تأشيرة الإمارات: يمكنك التقدم بطلب للحصول على مجموعة متنوعة من التأشيرات. على سبيل المثال: 1) تأشيرة 14 يوم دخول واحد تسمح للشخص بالبقاء لمدة 14 يومًا في الإمارات. الإذن صالح لمدة 60 يومًا من تاريخ الإصدار. 2) تأشيرة 30 يوم دخول متعدد تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 30 يومًا. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار. 3) 90 يوم دخول متعدد: تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 90 يومًا في دولة الإمارات. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار.',
      notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Embassy fees per person/duration may vary from one period to another, according to an official decision issued by the embassy. Our office fees may vary depending on the type of visa, country and any additional charges.',
      notesAr: 'بعد تقديم جميع المستندات المطلوبة، سنقوم بإرسال طلب تأشيرة الإمارات مباشرة إلى سفارة الإمارات في الأردن للمراجعة. قد تستغرق مدة المعالجة حتى 7 أيام عمل بدءًا من تاريخ تقديم جميع مستنداتك في السفارة. قد تختلف رسوم السفارة لكل شخص/المدة من فترة إلى أخرى، وفقًا لقرار رسمي صادر عن السفارة. قد تختلف رسوم مكتبنا اعتمادًا على نوع التأشيرة والبلد وأي رسوم إضافية.',
      mainRequirements: 'For the Emirates Embassy in Jordan to grant you a visa, you must meet the following conditions: 1-A clear photo with a white background. 2-A 6 months validity clear passport scan or picture.',
      mainRequirementsAr: 'لكي تمنحك سفارة الإمارات في الأردن تأشيرة، يجب أن تستوفي الشروط التالية: 1-صورة واضحة بخلفية بيضاء. 2-نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر.',
      visaTypes: ['30 Days Multiple Entry'],
      visaTypesAr: ['30 يوم دخول متعدد'],
      isActive: true
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
      fees: { consultation: 100, government: 400, total: 500 },
      description: 'United Arab Emirates Visa is Valid across all UAE, namely Dubai, Abu Dhabi, Ajman, Sharjah, Fujairah, Ras Al Khaimah and Umm Al Quwain. 90 days multiple entry allows you to visit the UAE frequently and stay for up to 90 days in UAE. The visa will be valid for 60 days from the date of issue.',
      descriptionAr: 'تأشيرة دولة الإمارات العربية المتحدة صالحة في جميع أنحاء دولة الإمارات، وهي دبي، أبو ظبي، عجمان، الشارقة، الفجيرة، رأس الخيمة وأم القيوين. 90 يوم دخول متعدد تسمح لك بزيارة دولة الإمارات بشكل متكرر والبقاء لمدة تصل إلى 90 يومًا في دولة الإمارات. ستكون التأشيرة صالحة لمدة 60 يومًا من تاريخ الإصدار.',
      notes: 'After providing all of the needed documents, we will directly send your UAE Visa application for the UAE Embassy in Jordan for viewing. Processing time might take up to 7 working days starting from the date of submitting all your documents at the embassy. Embassy fees per person/duration may vary from one period to another, according to an official decision issued by the embassy. Our office fees may vary depending on the type of visa, country and any additional charges.',
      notesAr: 'بعد تقديم جميع المستندات المطلوبة، سنقوم بإرسال طلب تأشيرة الإمارات مباشرة إلى سفارة الإمارات في الأردن للمراجعة. قد تستغرق مدة المعالجة حتى 7 أيام عمل بدءًا من تاريخ تقديم جميع مستنداتك في السفارة. قد تختلف رسوم السفارة لكل شخص/المدة من فترة إلى أخرى، وفقًا لقرار رسمي صادر عن السفارة. قد تختلف رسوم مكتبنا اعتمادًا على نوع التأشيرة والبلد وأي رسوم إضافية.',
      mainRequirements: 'For the Emirates Embassy in Jordan to grant you a visa, you must meet the following conditions: 1-A clear photo with a white background. 2-A 6 months validity clear passport scan or picture.',
      mainRequirementsAr: 'لكي تمنحك سفارة الإمارات في الأردن تأشيرة، يجب أن تستوفي الشروط التالية: 1-صورة واضحة بخلفية بيضاء. 2-نسخة واضحة من جواز السفر أو صورة سارية لمدة 6 أشهر.',
      visaTypes: ['90 Days Multiple Entry'],
      visaTypesAr: ['90 يوم دخول متعدد'],
      isActive: true
    },
    {
      name: 'Germany Schengen Visa',
      country: 'germany',
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
      fees: { consultation: 60, government: 80, total: 140 },
      description: 'Short-stay Schengen visa for Germany for tourism or business.',
      notes: 'Processing times may vary during peak seasons.',
      isActive: true
    },
    {
      name: 'France Schengen Visa',
      country: 'france',
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
      fees: { consultation: 60, government: 80, total: 140 },
      description: 'Short-stay Schengen visa for France for tourism or business.',
      notes: 'Processing times may vary during peak seasons.',
      isActive: true
    },
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
      fees: { consultation: 50, government: 160, total: 210 },
      description: 'Short-term tourist visa for leisure travel in the United States.',
      notes: 'Interview may be required depending on consulate policies.',
      isActive: true
    },
    {
      name: 'Visitor Visa',
      country: 'uk',
      category: 'travel',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application form',
        'Proof of accommodation',
        'Return flight ticket',
        'Bank statements for the last 6 months'
      ],
      processingTime: '10-15 business days',
      validity: '1 year',
      fees: { consultation: 75, government: 230, total: 305 },
      description: 'Short-term visitor visa for the United Kingdom.',
      notes: 'Multiple entry may be available depending on consular decision.',
      isActive: true
    },
    {
      name: 'Australia Tourist Visa',
      country: 'australia',
      category: 'travel',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application form',
        'Proof of accommodation',
        'Return flight ticket',
        'Bank statements for the last 3 months',
        'Health insurance'
      ],
      processingTime: '10-15 business days',
      validity: '12 months',
      fees: { consultation: 85, government: 145, total: 230 },
      description: 'Tourist visa for leisure travel to Australia.',
      notes: 'May require health check depending on country of origin.',
      isActive: true
    },
    {
      name: 'Austria Schengen Visa',
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
      fees: { consultation: 60, government: 80, total: 140 },
      description: 'Short-stay Schengen visa for Austria.',
      notes: 'Valid for all Schengen Area countries.',
      isActive: true
    },
    {
      name: 'Canada Visitor Visa',
      country: 'canada',
      category: 'travel',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application',
        'Proof of accommodation',
        'Return flight ticket',
        'Bank statements for last 6 months',
        'Employment letter or proof of ties to home country'
      ],
      processingTime: '15-20 business days',
      validity: 'Up to 6 months',
      fees: { consultation: 80, government: 185, total: 265 },
      description: 'Visitor visa for tourism or visiting family in Canada.',
      notes: 'Strong financial proof required. Interview may be needed.',
      isActive: true
    },
    {
      name: 'India Tourist Visa',
      country: 'india',
      category: 'travel',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application form',
        'Proof of accommodation',
        'Return flight ticket',
        'Bank statements for last 3 months',
        'Yellow fever vaccination certificate (if required)'
      ],
      processingTime: '7-10 business days',
      validity: '60 days',
      fees: { consultation: 45, government: 75, total: 120 },
      description: 'Tourist visa for leisure travel to India.',
      notes: 'Visa on Arrival also available at major airports.',
      isActive: true
    },
    {
      name: 'Italy Schengen Visa',
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
      fees: { consultation: 60, government: 80, total: 140 },
      description: 'Short-stay Schengen visa for Italy.',
      notes: 'Embassy appointments must be booked in advance.',
      isActive: true
    },
    {
      name: 'Netherlands Schengen Visa',
      country: 'netherlands',
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
      fees: { consultation: 60, government: 80, total: 140 },
      description: 'Short-stay Schengen visa for Netherlands.',
      notes: 'Valid for entire Schengen Area.',
      isActive: true
    },
    {
      name: 'Spain Schengen Visa',
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
      fees: { consultation: 60, government: 80, total: 140 },
      description: 'Short-stay Schengen visa for Spain.',
      notes: 'Processing may be faster during off-season periods.',
      isActive: true
    }
  ];

  for (const visa of defaultVisas) {
    try {
      // Check if visa already exists
      const [existing] = await pool.execute(
        'SELECT name FROM visas WHERE name = ?',
        [visa.name]
      );

      if ((existing as any[]).length === 0) {
        console.log(`  ✓ Creating visa: ${visa.name}`);
        await pool.execute(
          `INSERT INTO visas (
            name, name_ar, country, category, requirements, requirements_ar,
            processing_time, processing_time_ar, validity, validity_ar,
            fees, description, description_ar, notes, notes_ar,
            main_requirements, main_requirements_ar,
            visa_types, visa_types_ar, is_active, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            visa.name,
            (visa as any).nameAr || null,
            visa.country,
            visa.category,
            JSON.stringify(visa.requirements),
            (visa as any).requirementsAr ? JSON.stringify((visa as any).requirementsAr) : null,
            visa.processingTime,
            (visa as any).processingTimeAr || null,
            visa.validity,
            (visa as any).validityAr || null,
            JSON.stringify(visa.fees),
            visa.description || null,
            (visa as any).descriptionAr || null,
            visa.notes || null,
            (visa as any).notesAr || null,
            (visa as any).mainRequirements || null,
            (visa as any).mainRequirementsAr || null,
            (visa as any).visaTypes ? JSON.stringify((visa as any).visaTypes) : null,
            (visa as any).visaTypesAr ? JSON.stringify((visa as any).visaTypesAr) : null,
            visa.isActive ? 1 : 0
          ]
        );
      } else {
        console.log(`  ⊘ Visa already exists: ${visa.name} (skipping)`);
        // Update existing visa if it's missing Arabic fields (for ALL visas)
        if ((visa as any).nameAr) {
          const [existingVisa] = await pool.execute(
            'SELECT name_ar FROM visas WHERE name = ?',
            [visa.name]
          );
          const existingVisaData = (existingVisa as any[])[0];
          if (!existingVisaData?.name_ar) {
            console.log(`  ↻ Updating missing Arabic fields for: ${visa.name}`);
            await pool.execute(
              `UPDATE visas SET 
                name_ar = ?,
                requirements_ar = ?,
                processing_time_ar = ?,
                validity_ar = ?,
                description_ar = ?,
                notes_ar = ?,
                main_requirements = ?,
                main_requirements_ar = ?,
                visa_types_ar = ?,
                updated_at = NOW()
              WHERE name = ?`,
              [
                (visa as any).nameAr || null,
                (visa as any).requirementsAr ? JSON.stringify((visa as any).requirementsAr) : null,
                (visa as any).processingTimeAr || null,
                (visa as any).validityAr || null,
                (visa as any).descriptionAr || null,
                (visa as any).notesAr || null,
                (visa as any).mainRequirements || null,
                (visa as any).mainRequirementsAr || null,
                (visa as any).visaTypesAr ? JSON.stringify((visa as any).visaTypesAr) : null,
                visa.name
              ]
            );
          }
        }
      }
    } catch (error: any) {
      // Skip duplicate entries (might happen in race conditions)
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(`  ⊘ Duplicate visa skipped: ${visa.name}`);
      } else {
        console.error(`  ✗ Error creating visa ${visa.name}:`, error.message);
        // Continue with other visas even if one fails
      }
    }
  }
}

