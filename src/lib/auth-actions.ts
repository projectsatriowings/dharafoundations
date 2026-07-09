'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { createSession, deleteSession, getSession } from '@/lib/session';

export interface LoginState {
  error?: string;
}

export async function getCurrentSessionInfo(): Promise<{ email: string; expiresAt: string } | null> {
  const session = await getSession();
  if (!session) return null;
  return {
    email: session.email,
    expiresAt: session.expiresAt.toISOString(),
  };
}

export async function login(
  _prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    // Query admin user by email
    const rows = await sql`
      SELECT id, email, password_hash FROM admin_users WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return { error: 'Invalid email or password.' };
    }

    const user = rows[0];

    // Compare password with bcrypt hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return { error: 'Invalid email or password.' };
    }

    // Update last login timestamp
    await sql`UPDATE admin_users SET last_login_at = NOW() WHERE id = ${user.id}`;

    // Create session
    await createSession(user.id, user.email);
  } catch (err) {
    console.error('Login error:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  // Redirect to admin dashboard on success
  redirect('/admin');
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect('/admin/login');
}
