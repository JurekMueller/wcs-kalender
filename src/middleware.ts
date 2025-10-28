// middleware.ts
import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

/*
This middleware does an "optimistic" auth check. That is it only checks if a session cookie exists, 
and if not redirects to the sign in page.
If a session cookie exists the session still needs to be validated inside the RSCs.
In this case this is done in the /profile/layout.tsx
*/
export async function middleware(req: NextRequest) {
  const cookie = getSessionCookie(req); // existence only, not validation
  if (!cookie && req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/profile/:path*'] };
