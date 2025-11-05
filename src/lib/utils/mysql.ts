import mysql from 'mysql2/promise';

// Build database configuration from environment variables
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'visa_consulting',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // Valid mysql2 connection timeout (in milliseconds)
  connectTimeout: 10000, // 10 seconds
};

// Log configuration (without password) for debugging in Vercel
if (process.env.VERCEL) {
  console.log('📊 Database Configuration Loaded:', {
    attemptingConnectionTo: {
      host: DB_CONFIG.host || '⚠️ NOT SET (will use localhost)',
      port: DB_CONFIG.port,
      database: DB_CONFIG.database || '⚠️ NOT SET',
      user: DB_CONFIG.user || '⚠️ NOT SET',
      hasPassword: !!DB_CONFIG.password ? '✓' : '✗',
    },
    environmentVariablesStatus: {
      DB_HOST: process.env.DB_HOST 
        ? `✓ Set (value: ${process.env.DB_HOST.substring(0, 20)}${process.env.DB_HOST.length > 20 ? '...' : ''})` 
        : '✗ NOT SET',
      DB_USER: process.env.DB_USER ? `✓ Set (${process.env.DB_USER})` : '✗ NOT SET',
      DB_PASSWORD: process.env.DB_PASSWORD ? '✓ Set' : '✗ NOT SET',
      DB_NAME: process.env.DB_NAME ? `✓ Set (${process.env.DB_NAME})` : '✗ NOT SET',
      DB_PORT: process.env.DB_PORT ? `✓ Set (${process.env.DB_PORT})` : 'Using default (3306)',
    }
  });
  
  // Warn if using defaults (means env vars not loaded)
  if (DB_CONFIG.host === 'localhost' || !process.env.DB_HOST) {
    console.warn('⚠️  WARNING: DB_HOST is not set! Using default localhost.');
    console.warn('   → This will fail on Vercel. Add DB_HOST in Vercel Settings → Environment Variables');
  }
}

// Create connection pool
let pool: mysql.Pool | null = null;

export function getConnectionPool(): mysql.Pool {
  if (!pool) {
    // Validate that we have required environment variables in production
    if (process.env.VERCEL && !process.env.DB_HOST) {
      console.error('❌ DB_HOST environment variable is missing in Vercel!');
    }
    if (process.env.VERCEL && !process.env.DB_USER) {
      console.error('❌ DB_USER environment variable is missing in Vercel!');
    }
    
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

export async function connectToDatabase(): Promise<mysql.Pool> {
  const connectionPool = getConnectionPool();
  
  // Test the connection
  try {
    const connection = await connectionPool.getConnection();
    connection.release();
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
  
  return connectionPool;
}

export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  try {
    const pool = getConnectionPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  } catch (error: any) {
    // During build time or if database is unavailable, return empty result
    if (
      error.code === 'ECONNREFUSED' || 
      error.code === 'ENOTFOUND' ||
      error.code === 'ETIMEDOUT' ||
      error.code === 'ECONNRESET' ||
      error.code === 'ER_ACCESS_DENIED_ERROR' ||
      error.code === 'ER_DBACCESS_DENIED_ERROR' ||
      error.message?.includes('connect')
    ) {
      const envCheck = {
        hasHost: !!process.env.DB_HOST,
        hasUser: !!process.env.DB_USER,
        hasPassword: !!process.env.DB_PASSWORD,
        hasDatabase: !!process.env.DB_NAME,
      };
      
      // Log detailed error with actual values (masked) for debugging
      if (process.env.VERCEL) {
        // Show actual values being used (masked for security)
        const maskedPassword = DB_CONFIG.password ? '*'.repeat(Math.min(DB_CONFIG.password.length, 8)) : 'NOT SET';
        
        console.error('❌ Database connection failed:', {
          errorCode: error.code,
          errorMessage: error.message,
          attemptingConnection: {
            host: DB_CONFIG.host || 'NOT SET (using default: localhost)',
            port: DB_CONFIG.port,
            database: DB_CONFIG.database || 'NOT SET',
            user: DB_CONFIG.user || 'NOT SET',
            password: maskedPassword,
          },
          environmentVariables: {
            DB_HOST: process.env.DB_HOST ? `✓ Set (${process.env.DB_HOST.length} chars)` : '✗ NOT SET',
            DB_USER: process.env.DB_USER ? `✓ Set (${process.env.DB_USER.length} chars)` : '✗ NOT SET',
            DB_PASSWORD: process.env.DB_PASSWORD ? `✓ Set (${process.env.DB_PASSWORD.length} chars)` : '✗ NOT SET',
            DB_NAME: process.env.DB_NAME ? `✓ Set (${process.env.DB_NAME})` : '✗ NOT SET',
            DB_PORT: process.env.DB_PORT ? `✓ Set (${process.env.DB_PORT})` : '✗ NOT SET (using 3306)',
          },
        });
        
        // Additional diagnostics
        if (error.code === 'ER_DBACCESS_DENIED_ERROR') {
          console.error('⚠️  DATABASE ACCESS DENIED:');
          console.error(`   User '${DB_CONFIG.user}' does not have access to database '${DB_CONFIG.database}'`);
          console.error('   Common causes:');
          console.error('   1. Wrong database name (on shared hosting, DB name often matches username)');
          console.error('   2. Database does not exist');
          console.error('   3. User does not have permissions for this database');
          console.error(`   💡 Solution: Update DB_NAME in Vercel to match your actual database name`);
          console.error(`   💡 For shared hosting, try: DB_NAME=${DB_CONFIG.user} (database name = username)`);
        } else if (DB_CONFIG.host === 'localhost' || DB_CONFIG.host === '127.0.0.1') {
          console.error('⚠️  CRITICAL: Connecting to localhost! This means DB_HOST env var is either:');
          console.error('   1. Not set in Vercel (check Settings → Environment Variables → Production)');
          console.error('   2. Set but empty/blank');
          console.error('   3. Not redeployed after adding the variable');
        } else if (!DB_CONFIG.host || DB_CONFIG.host.trim() === '') {
          console.error('⚠️  CRITICAL: DB_HOST is empty or blank!');
        } else {
          console.error('🔍 Connection info looks OK, but connection still failing. Possible causes:');
          console.error('   1. Database host is not accessible from Vercel (firewall/security groups)');
          console.error('   2. Database credentials are incorrect');
          console.error('   3. Database does not allow remote connections');
          console.error('   4. Database host DNS/network issue');
        }
      } else {
        // Only log detailed error in production/Vercel if env vars are missing
        if (!envCheck.hasHost || !envCheck.hasUser || !envCheck.hasPassword || !envCheck.hasDatabase) {
          console.error('Database connection failed - Missing environment variables:', envCheck);
        } else {
          console.warn('Database connection unavailable, returning empty result');
        }
      }
      return [];
    }
    throw error;
  }
}

export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  try {
    const rows = await query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    // During build time, database might not be available
    return null;
  }
}

export default connectToDatabase;

