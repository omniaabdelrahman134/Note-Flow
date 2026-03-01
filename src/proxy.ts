import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const authPage = pathname == '/login' || pathname == '/signup';

  if (token && authPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && !authPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup'],
};
