import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'dhara_admin_session';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours
const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes (except /admin/login)
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to login page without auth
  if (pathname === '/admin/login') {
    const session = request.cookies.get(COOKIE_NAME)?.value;
    if (session) {
      try {
        await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {
        // Session invalid, allow access to login
      }
    }
    return NextResponse.next();
  }

  // For all other /admin/* routes, verify the session
  const session = request.cookies.get(COOKIE_NAME)?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    // Session is valid — refresh the cookie expiry
    const response = NextResponse.next();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    const { SignJWT } = await import('jose');
    const newToken = await new SignJWT({
      userId: payload.userId,
      email: payload.email,
      expiresAt: expiresAt.toISOString(),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(encodedKey);

    response.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
