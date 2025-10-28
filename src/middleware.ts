// middleware.ts
import { auth } from '@/app/server/auth';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const url = new URL(req.url);
  if (url.pathname.startsWith('/profile')) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) return NextResponse.redirect(new URL('/sign-in', url));
  }
  return NextResponse.next();
}

export const config = { runtime: 'nodejs', matcher: ['/profile/:path*'] };
