import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUserLastLogin } from '@/lib/utils/db-helpers';
import { autoInitializeDatabase } from '@/lib/utils/auto-init';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here';

export async function POST(request: NextRequest) {
  try {
    // Auto-initialize database if needed
    await autoInitializeDatabase();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    let user;
    try {
      user = await getUserByEmail(email.toLowerCase());
    } catch (dbError: any) {
      console.error('Database error during login:', dbError);
      // Check if it's a database connection issue
      if (dbError.code === 'ECONNREFUSED' || dbError.code === 'ENOTFOUND' || dbError.code === 'ER_ACCESS_DENIED_ERROR') {
        return NextResponse.json(
          { error: 'Database connection failed. Please check your database configuration.' },
          { status: 500 }
        );
      }
      throw dbError;
    }

    if (!user) {
      console.warn(`Login attempt with non-existent email: ${email}`);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.warn(`Invalid password attempt for email: ${email}`);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    if (user.id) {
      await updateUserLastLogin(user.id);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

