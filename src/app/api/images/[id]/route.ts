import { NextRequest, NextResponse } from 'next/server';
import { getConnectionPool } from '@/lib/utils/mysql';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id;

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 });
    }

    const pool = getConnectionPool();
    const [rows] = await pool.execute(
      'SELECT image_data, mime_type FROM uploaded_images WHERE image_id = ?',
      [imageId]
    ) as any[];

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const imageData = rows[0].image_data;
    const mimeType = rows[0].mime_type;

    // Convert base64 to buffer
    const buffer = Buffer.from(imageData, 'base64');

    // Return image with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

