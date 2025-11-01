import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import jwt from 'jsonwebtoken';
import { HeroContent, defaultHeroContent } from '@/types/models/SiteContent';

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
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const doc = await getSiteContent<HeroContent>('hero');
  const hero = doc || defaultHeroContent;
  return NextResponse.json(hero);
}

export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<HeroContent>;
  if (!body.title || !body.subtitle || !body.ctaText || !body.ctaHref) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const payload: HeroContent = {
    bannerText: body.bannerText ?? defaultHeroContent.bannerText,
    title: body.title,
    subtitle: body.subtitle,
    ctaText: body.ctaText,
    ctaHref: body.ctaHref,
    backgroundImage: body.backgroundImage,
    isActive: body.isActive ?? true,
    updatedAt: new Date(),
  };

  await upsertSiteContent('hero', payload);

  return NextResponse.json(payload);
}

