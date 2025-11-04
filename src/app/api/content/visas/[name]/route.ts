import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/utils/db-helpers';
import { autoInitializeDatabase } from '@/lib/utils/auto-init';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    await autoInitializeDatabase();
    
    const { name } = await context.params;
    const visaName = decodeURIComponent(name);
    const locale = request.nextUrl.searchParams.get('locale') || 'en';
    
    // Try to get Arabic translation from site_content
    if (locale === 'ar') {
      const contentKey = `visa_${visaName.replace(/\s+/g, '_').toLowerCase()}`;
      const translation = await getSiteContent<any>(contentKey);
      
      if (translation && translation.ar) {
        return NextResponse.json(translation.ar, {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        });
      }
    }
    
    // Return empty object if no translation found
    return NextResponse.json({}, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching visa translation:', error);
    return NextResponse.json({}, { status: 200 });
  }
}

