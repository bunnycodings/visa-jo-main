import jwt from 'jsonwebtoken'

// Simple authentication helper for demo purposes
// In a real application, this would use a proper JWT verification

/**
 * Verify the authentication token
 * @param token The JWT token to verify
 * @returns Promise<boolean> Whether the token is valid
 */
export async function verifyToken(token: string): Promise<boolean> {
  const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-here'
  if (!token) return false
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

/**
 * Generate a token for the admin user
 * @param username The admin username
 * @param password The admin password
 * @returns Promise<string|null> The generated token or null if authentication fails
 */
export async function generateToken(username: string, password: string): Promise<string | null> {
  // Deprecated demo function. Use the admin login route to obtain a JWT.
  return null
}