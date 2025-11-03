import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
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

    // Generate unique filename with proper extension handling
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const originalName = file.name || 'image';
    const ext = originalName.includes('.') 
      ? originalName.split('.').pop()?.toLowerCase() || 'jpg'
      : file.type.includes('jpeg') ? 'jpg' 
      : file.type.includes('png') ? 'png'
      : file.type.includes('webp') ? 'webp'
      : file.type.includes('gif') ? 'gif'
      : 'jpg';
    const filename = `${timestamp}-${random}.${ext}`;

    // Ensure public directory exists first
    const publicDir = join(process.cwd(), 'public');
    try {
      await mkdir(publicDir, { recursive: true });
    } catch (err: any) {
      // Directory might already exist, that's okay
      if (err.code !== 'EEXIST') {
        console.error('Error creating public directory:', err);
      }
    }

    // Ensure uploads directory exists
    const uploadsDir = join(publicDir, 'uploads', category);
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err: any) {
      // Directory might already exist, that's okay
      if (err.code !== 'EEXIST') {
        console.error('Error creating uploads directory:', err);
        throw new Error(`Failed to create uploads directory: ${err.message}`);
      }
    }

    // Write file to disk
    const filepath = join(uploadsDir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Return the public path
    const publicPath = `/uploads/${category}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicPath,
      filename: filename,
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
