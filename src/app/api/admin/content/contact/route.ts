import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { ContactContent, defaultContactContent } from '@/types/models/SiteContent';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    const doc = await getSiteContent<ContactContent>('contact');
    const content = doc || defaultContactContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Admin contact content GET error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    const payload: ContactContent = await request.json();

    if (!payload.title || !payload.subtitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (payload.contactInfo && payload.contactInfo.length > 8) {
      return NextResponse.json({ error: 'Too many contact info items (max 8)' }, { status: 400 });
    }

    const update: ContactContent = {
      ...defaultContactContent,
      ...payload,
      updatedAt: new Date(),
      isActive: payload.isActive ?? true,
    };

    await upsertSiteContent('contact', update);

    return NextResponse.json(update);
  } catch (error) {
    console.error('Admin contact content PUT error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

