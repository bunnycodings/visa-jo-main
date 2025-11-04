import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { PopularDestinationsContent, defaultPopularDestinationsContent } from '@/types/models/SiteContent';
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

    const doc = await getSiteContent<PopularDestinationsContent>('popular', locale);
    const content = doc || defaultPopularDestinationsContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Admin popular content GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyAdmin(request);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await request.json();

    const items = Array.isArray(payload.items) ? payload.items.slice(0, 12) : defaultPopularDestinationsContent.items;

    const update: PopularDestinationsContent = {
      title: payload.title ?? defaultPopularDestinationsContent.title,
      items,
      isActive: payload.isActive ?? true,
      updatedAt: new Date(),
    };

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    await upsertSiteContent('popular', update, locale);

    return NextResponse.json(update);
  } catch (error) {
    console.error('Admin popular content PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

