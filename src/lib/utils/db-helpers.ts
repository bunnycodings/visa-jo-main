import { query, queryOne, getConnectionPool } from './mysql';
import { UserRow, AdminUser } from '@/types/models/User';
import { VisaRow, VisaType } from '@/types/models/VisaApplication';
import type {
  HeroContent,
  AboutContent,
  ContactContent,
  ServicesContent,
  WhyChooseUsContent,
  PopularDestinationsContent,
  HowItWorksContent,
} from '@/types/models/SiteContent';

// User helpers
export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const row = await queryOne<UserRow>(
    'SELECT * FROM users WHERE email = ? AND role = ? AND is_active = 1',
    [email.toLowerCase(), 'admin']
  );

  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    role: 'admin',
    permissions: row.permissions ? JSON.parse(row.permissions) : [],
    isActive: Boolean(row.is_active),
    lastLogin: row.last_login,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getUserById(id: number): Promise<AdminUser | null> {
  const row = await queryOne<UserRow>(
    'SELECT * FROM users WHERE id = ? AND role = ?',
    [id, 'admin']
  );

  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    role: 'admin',
    permissions: row.permissions ? JSON.parse(row.permissions) : [],
    isActive: Boolean(row.is_active),
    lastLogin: row.last_login,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function updateUserLastLogin(userId: number): Promise<void> {
  await query('UPDATE users SET last_login = NOW() WHERE id = ?', [userId]);
}

export async function updateUserPassword(userId: number, hashedPassword: string): Promise<void> {
  await query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [
    hashedPassword,
    userId,
  ]);
}

// Visa helpers
export async function getAllVisas(): Promise<VisaType[]> {
  const rows = await query<VisaRow>(
    'SELECT * FROM visas WHERE is_active = 1 ORDER BY name ASC'
  );

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    category: row.category,
    requirements: JSON.parse(row.requirements),
    processingTime: row.processing_time,
    validity: row.validity,
    fees: JSON.parse(row.fees),
    description: row.description,
    notes: row.notes,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function getVisaByName(name: string): Promise<VisaType | null> {
  const row = await queryOne<VisaRow>('SELECT * FROM visas WHERE name = ?', [name]);

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    country: row.country,
    category: row.category,
    requirements: JSON.parse(row.requirements),
    processingTime: row.processing_time,
    validity: row.validity,
    fees: JSON.parse(row.fees),
    description: row.description,
    notes: row.notes,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getVisasByCountry(country: string): Promise<VisaType[]> {
  const rows = await query<VisaRow>(
    'SELECT * FROM visas WHERE country = ? AND is_active = 1 ORDER BY name ASC',
    [country]
  );

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    category: row.category,
    requirements: JSON.parse(row.requirements),
    processingTime: row.processing_time,
    validity: row.validity,
    fees: JSON.parse(row.fees),
    description: row.description,
    notes: row.notes,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function createVisa(visa: VisaType): Promise<number> {
  const pool = getConnectionPool();
  const [result]: any = await pool.execute(
    `INSERT INTO visas (name, country, category, requirements, processing_time, validity, fees, description, notes, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      visa.name,
      visa.country,
      visa.category,
      JSON.stringify(visa.requirements),
      visa.processingTime,
      visa.validity,
      JSON.stringify(visa.fees),
      visa.description || null,
      visa.notes || null,
      visa.isActive ? 1 : 0,
    ]
  );

  return result.insertId;
}

export async function updateVisaByName(originalName: string, visa: Partial<VisaType>): Promise<boolean> {
  const updates: string[] = [];
  const values: any[] = [];

  if (visa.name) {
    updates.push('name = ?');
    values.push(visa.name);
  }
  if (visa.country) {
    updates.push('country = ?');
    values.push(visa.country);
  }
  if (visa.category) {
    updates.push('category = ?');
    values.push(visa.category);
  }
  if (visa.requirements) {
    updates.push('requirements = ?');
    values.push(JSON.stringify(visa.requirements));
  }
  if (visa.processingTime) {
    updates.push('processing_time = ?');
    values.push(visa.processingTime);
  }
  if (visa.validity) {
    updates.push('validity = ?');
    values.push(visa.validity);
  }
  if (visa.fees) {
    updates.push('fees = ?');
    values.push(JSON.stringify(visa.fees));
  }
  if (visa.description !== undefined) {
    updates.push('description = ?');
    values.push(visa.description);
  }
  if (visa.notes !== undefined) {
    updates.push('notes = ?');
    values.push(visa.notes);
  }
  if (visa.isActive !== undefined) {
    updates.push('is_active = ?');
    values.push(visa.isActive ? 1 : 0);
  }

  if (updates.length === 0) return false;

  updates.push('updated_at = NOW()');
  values.push(originalName);

  const pool = getConnectionPool();
  const [result]: any = await pool.execute(
    `UPDATE visas SET ${updates.join(', ')} WHERE name = ?`,
    values
  );

  return result.affectedRows > 0;
}

export async function deleteVisaByName(name: string): Promise<boolean> {
  const pool = getConnectionPool();
  const [result]: any = await pool.execute('DELETE FROM visas WHERE name = ?', [name]);
  return result.affectedRows > 0;
}

// Site content helpers
export async function getSiteContent<T>(contentKey: string): Promise<T | null> {
  const row = await queryOne<{ content_data: string; is_active: number }>(
    'SELECT content_data, is_active FROM site_content WHERE content_key = ?',
    [contentKey]
  );

  if (!row || !row.is_active) return null;

  return JSON.parse(row.content_data) as T;
}

export async function upsertSiteContent(contentKey: string, contentData: any): Promise<void> {
  await query(
    `INSERT INTO site_content (content_key, content_data, is_active)
     VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE content_data = ?, updated_at = NOW()`,
    [contentKey, JSON.stringify(contentData), JSON.stringify(contentData)]
  );
}

