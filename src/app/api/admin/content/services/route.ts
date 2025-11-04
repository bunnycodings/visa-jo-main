import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { ServicesContent, defaultServicesContent } from '@/types/models/SiteContent';
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

    const doc = await getSiteContent<ServicesContent>('services', locale);
    const content = doc || defaultServicesContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Admin services content GET error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    const payload: ServicesContent = await request.json();

    if (!payload.title || !payload.items) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (payload.items.length > 12) {
      return NextResponse.json({ error: 'Too many services (max 12)' }, { status: 400 });
    }
    for (const item of payload.items) {
      if ((item.features || []).length > 10) {
        return NextResponse.json({ error: 'Too many features per service (max 10)' }, { status: 400 });
      }
    }

    const update: ServicesContent = {
      ...defaultServicesContent,
      ...payload,
      updatedAt: new Date(),
      isActive: payload.isActive ?? true,
    };

    await upsertSiteContent('services', update);

    return NextResponse.json(update);
  } catch (error) {
    console.error('Admin services content PUT error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

