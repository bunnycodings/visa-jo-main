import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getConnectionPool } from '@/lib/utils/mysql';

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

// Increase body size limit for file uploads
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = (formData.get('category') as string) || 'visas';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB to avoid Next.js body size limits)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds 2MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB. Please compress the image before uploading.` },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    // Store image in database
    const pool = getConnectionPool();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const imageId = `img_${timestamp}_${random}`;

    try {
      // Insert image into database
      await pool.execute(
        'INSERT INTO uploaded_images (image_id, image_data, mime_type, category, created_at) VALUES (?, ?, ?, ?, NOW())',
        [imageId, base64Image, file.type, category]
      );
    } catch (dbError: any) {
      // If table doesn't exist, create it
      if (dbError.code === 'ER_NO_SUCH_TABLE') {
        await pool.execute(`
          CREATE TABLE IF NOT EXISTS uploaded_images (
            id INT AUTO_INCREMENT PRIMARY KEY,
            image_id VARCHAR(255) NOT NULL UNIQUE,
            image_data LONGTEXT NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            category VARCHAR(50) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_image_id (image_id),
            INDEX idx_category (category)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        
        // Retry insert
        await pool.execute(
          'INSERT INTO uploaded_images (image_id, image_data, mime_type, category, created_at) VALUES (?, ?, ?, ?, NOW())',
          [imageId, base64Image, file.type, category]
        );
      } else {
        throw dbError;
      }
    }

    // Return the image ID (we'll use this to fetch the image via API)
    return NextResponse.json({
      success: true,
      url: `/api/images/${imageId}`,
      imageId: imageId,
      message: 'File uploaded successfully',
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    
    // Provide more detailed error information
    const errorMessage = error.message || 'Unknown error occurred';
    const errorDetails = {
      error: 'Failed to upload file',
      message: errorMessage,
      code: error.code || 'UNKNOWN',
      // Don't expose file system paths in production
      ...(process.env.NODE_ENV === 'development' && {
        details: error.stack
      })
    };
    
    return NextResponse.json(
      errorDetails,
      { status: 500 }
    );
  }
}
