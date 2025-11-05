import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/utils/mysql';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert contact message into database
    const sql = `
      INSERT INTO contact_messages (name, email, phone, subject, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'new', NOW())
    `;

    await query(sql, [name, email || null, phone || null, subject || null, message]);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully. We will get back to you soon!' 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit message',
        message: error.message || 'An error occurred while submitting your message. Please try again later.'
      },
      { status: 500 }
    );
  }
}

