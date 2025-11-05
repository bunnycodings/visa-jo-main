import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/utils/mysql';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here';

export const dynamic = 'force-dynamic';

// Verify JWT token
function verifyToken(token: string | null): boolean {
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET all contact messages
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let sql = 'SELECT * FROM contact_messages';
    const params: any[] = [];

    if (status !== 'all') {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const messages = await query(sql, params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM contact_messages';
    const countParams: any[] = [];
    if (status !== 'all') {
      countSql += ' WHERE status = ?';
      countParams.push(status);
    }
    const [countResult] = await query(countSql, countParams);
    const total = countResult?.total || 0;

    return NextResponse.json({
      messages,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages', message: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update message status
export async function PATCH(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, admin_notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Message ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    let sql = 'UPDATE contact_messages SET status = ?';
    const params: any[] = [status];

    if (admin_notes !== undefined) {
      sql += ', admin_notes = ?';
      params.push(admin_notes);
    }

    if (status === 'read' || status === 'replied') {
      sql += ', read_at = NOW()';
    }

    sql += ' WHERE id = ?';
    params.push(id);

    await query(sql, params);

    return NextResponse.json({ success: true, message: 'Message updated successfully' });
  } catch (error: any) {
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to update message', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM contact_messages WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message', message: error.message },
      { status: 500 }
    );
  }
}

