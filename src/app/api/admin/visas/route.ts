import { NextRequest, NextResponse } from 'next/server';
import {
  getAllVisas,
  getVisaByName,
  createVisa,
  updateVisaByName,
  deleteVisaByName,
} from '@/lib/utils/db-helpers';
import { autoInitializeDatabase } from '@/lib/utils/auto-init';
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

// GET all visas
export async function GET(request: NextRequest) {
  try {
    // Auto-initialize database if needed
    await autoInitializeDatabase();

    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const visas = await getAllVisas();
    return NextResponse.json(visas);
  } catch (error) {
    console.error('Error fetching visas:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new visa
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newVisa: VisaType = await request.json();

    // Validate required fields
    if (!newVisa.name || !newVisa.country || !newVisa.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if visa with same name exists
    const existing = await getVisaByName(newVisa.name);
    if (existing) {
      return NextResponse.json(
        { error: 'Visa with this name already exists' },
        { status: 400 }
      );
    }

    const id = await createVisa(newVisa);
    return NextResponse.json({ ...newVisa, id }, { status: 201 });
  } catch (error) {
    console.error('Error creating visa:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT update visa
export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedVisa: VisaType & { originalName?: string } = await request.json();
    const { originalName, ...visaData } = updatedVisa;

    if (!originalName) {
      return NextResponse.json(
        { error: 'originalName is required' },
        { status: 400 }
      );
    }

    const success = await updateVisaByName(originalName, visaData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to update visa' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating visa:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE visa
export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'Name parameter is required' },
        { status: 400 }
      );
    }

    const success = await deleteVisaByName(name);
    if (!success) {
      return NextResponse.json({ error: 'Visa not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting visa:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

