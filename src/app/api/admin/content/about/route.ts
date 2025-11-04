import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { AboutContent, defaultAboutContent } from '@/types/models/SiteContent';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    const doc = await getSiteContent<AboutContent>('about', locale);
    const content = doc || defaultAboutContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Admin about content GET error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    const payload: AboutContent = await request.json();

    // Basic validation
    if (!payload.title || !payload.intro || !payload.story) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (payload.whyItems && payload.whyItems.length > 8) {
      return NextResponse.json({ error: 'Too many Why items (max 8)' }, { status: 400 });
    }

    const update: AboutContent = {
      ...defaultAboutContent,
      ...payload,
      updatedAt: new Date(),
      isActive: payload.isActive ?? true,
    };

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    await upsertSiteContent('about', update, locale);

    return NextResponse.json(update);
  } catch (error) {
    console.error('Admin about content PUT error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

