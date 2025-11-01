import { NextRequest, NextResponse } from 'next/server';
import { getVisaByName, updateVisaByName, deleteVisaByName } from '@/lib/utils/db-helpers';
import { VisaType } from '@/types/models/VisaApplication';
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

// GET a specific visa by name
export async function GET(request: NextRequest, context: { params: Promise<{ name: string }> }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const visaName = decodeURIComponent(params.name);

    const visa = await getVisaByName(visaName);
    
    if (!visa) {
      return NextResponse.json({ error: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json(visa);
  } catch (error) {
    console.error('Error fetching visa:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update a specific visa by name
export async function PUT(request: NextRequest, context: { params: Promise<{ name: string }> }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const visaName = decodeURIComponent(params.name);
    const updatedVisa: VisaType = await request.json();

    const success = await updateVisaByName(visaName, updatedVisa);

    if (!success) {
      return NextResponse.json({ error: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating visa:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a specific visa by name
export async function DELETE(request: NextRequest, context: { params: Promise<{ name: string }> }) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const visaName = decodeURIComponent(params.name);

    const success = await deleteVisaByName(visaName);

    if (!success) {
      return NextResponse.json({ error: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting visa:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}