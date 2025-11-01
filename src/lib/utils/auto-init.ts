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
      country: 'uae',
      category: 'travel',
      requirements: [
        'A clear photo with a white background',
        'A 6 months validity clear passport scan or picture'
      ],
      processingTime: 'Up to 7 working days',
      validity: '14 days single entry',
      fees: { consultation: 50, government: 150, total: 200 },
      description: 'Short-term single entry visa for UAE valid for 14 days.',
      notes: 'Processing time varies. Application must include clear documents for faster processing.',
      isActive: true
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
      fees: { consultation: 70, government: 250, total: 320 },
      description: '30-day multiple entry visa for UAE with flexible travel options.',
      notes: 'Allows multiple entries within the 30-day validity period.',
      isActive: true
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
      fees: { consultation: 100, government: 400, total: 500 },
      description: 'Long-term multiple entry visa for UAE valid for 90 days.',
      notes: 'Ideal for extended stays and multiple visits.',
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
          `INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            visa.name,
            visa.country,
            visa.category,
            JSON.stringify(visa.requirements),
            visa.processingTime,
            visa.validity,
            JSON.stringify(visa.fees),
            visa.description || null,
            visa.notes || null,
            visa.isActive ? 1 : 0
          ]
        );
      } else {
        console.log(`  ⊘ Visa already exists: ${visa.name} (skipping)`);
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

