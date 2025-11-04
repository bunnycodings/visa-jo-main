import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { WhyChooseUsContent, defaultWhyChooseUsContent } from '@/types/models/SiteContent';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here';

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded?.role !== 'admin') return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyAdmin(request);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    const doc = await getSiteContent<WhyChooseUsContent>('why', locale);
    const content = doc || defaultWhyChooseUsContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Admin why content GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyAdmin(request);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    const payload = await request.json();

    // Allow any number of features (no limit)
    const features = Array.isArray(payload.features) && payload.features.length > 0
      ? payload.features
      : defaultWhyChooseUsContent.features;

    const update: WhyChooseUsContent = {
      badgeText: payload.badgeText ?? defaultWhyChooseUsContent.badgeText,
      title: payload.title ?? defaultWhyChooseUsContent.title,
      subtitle: payload.subtitle ?? defaultWhyChooseUsContent.subtitle,
      features,
      isActive: payload.isActive ?? true,
      updatedAt: new Date(),
    };

    await upsertSiteContent('why', update, locale);

    return NextResponse.json(update);
  } catch (error) {
    console.error('Admin why content PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

