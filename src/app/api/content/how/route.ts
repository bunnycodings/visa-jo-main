import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/utils/db-helpers';
import { autoInitializeDatabase } from '@/lib/utils/auto-init';
import { HowItWorksContent, defaultHowItWorksContent } from '@/types/models/SiteContent';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    // Auto-initialize database if needed
    await autoInitializeDatabase();

    const doc = await getSiteContent<HowItWorksContent>('how');
    let content = doc || defaultHowItWorksContent;
    
    // Ensure at least 5 steps are returned by padding with default steps
    if (content.steps && content.steps.length < 5) {
      const defaultSteps = defaultHowItWorksContent.steps;
      while (content.steps.length < defaultSteps.length) {
        content.steps.push(defaultSteps[content.steps.length]);
      }
    } else if (!content.steps) {
      content.steps = defaultHowItWorksContent.steps;
    }
    
    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Public how content GET error:', error);
    return NextResponse.json(defaultHowItWorksContent, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}

