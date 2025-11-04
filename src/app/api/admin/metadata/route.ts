import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { defaultPageMetadata } from '@/types/models/SiteContent';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here';

async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded && decoded.role === 'admin' ? decoded : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    // Try to fetch from database, fallback to defaults
    let metadata;
    try {
      metadata = await getSiteContent('page-metadata', locale);
    } catch {
      metadata = null;
    }

    if (!metadata) {
      // Return default metadata
      return NextResponse.json(Object.values(defaultPageMetadata));
    }

    return NextResponse.json(metadata.content || Object.values(defaultPageMetadata));
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pageMetadata = await request.json();

    if (!pageMetadata.page || !pageMetadata.title || !pageMetadata.description) {
      return NextResponse.json(
        { error: 'Missing required fields: page, title, description' },
        { status: 400 }
      );
    }

    // Determine locale from referer header or default to English
    const referer = request.headers.get('referer') || '';
    const locale = referer.includes('/ar/admin/') ? 'ar' : 'en';

    // Fetch existing metadata
    let existingMetadata = await getSiteContent('page-metadata', locale);
    if (!existingMetadata) {
      existingMetadata = {
        key: 'page-metadata',
        content: Object.values(defaultPageMetadata),
        updatedAt: new Date(),
      };
    }

    // Update the specific page metadata
    const content = Array.isArray(existingMetadata.content)
      ? existingMetadata.content
      : Object.values(existingMetadata.content || {});

    const updatedContent = content.map((page: any) =>
      page.page === pageMetadata.page ? pageMetadata : page
    );

    // If page not found, add it
    if (!updatedContent.find((p: any) => p.page === pageMetadata.page)) {
      updatedContent.push(pageMetadata);
    }

    await upsertSiteContent('page-metadata', {
      content: updatedContent,
      updatedAt: new Date(),
    }, locale);

    return NextResponse.json(pageMetadata);
  } catch (error) {
    console.error('Error updating metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
