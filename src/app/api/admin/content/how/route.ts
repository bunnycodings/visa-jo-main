import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, upsertSiteContent } from '@/lib/utils/db-helpers';
import { HowItWorksContent, defaultHowItWorksContent } from '@/types/models/SiteContent';
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

    const doc = await getSiteContent<HowItWorksContent>('how');
    const content = doc || defaultHowItWorksContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Admin how content GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decoded = verifyAdmin(request);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await request.json();

    const steps = Array.isArray(payload.steps) ? payload.steps.slice(0, 5) : defaultHowItWorksContent.steps;

    const update: HowItWorksContent = {
      title: payload.title ?? defaultHowItWorksContent.title,
      steps,
      isActive: payload.isActive ?? true,
      updatedAt: new Date(),
    };

    await upsertSiteContent('how', update);

    return NextResponse.json(update);
  } catch (error) {
    console.error('Admin how content PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

