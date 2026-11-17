import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  createToken,
  passwordMatches,
} from '../../../../lib/adminAuth';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }));

  // TEMPORARY DEBUG (kaam ho jaye to ye console.log delete kar dena)
  // Sirf lengths print hoti hain, password nahi.
  console.log(
    'DEBUG -> env set:', !!process.env.ADMIN_PASSWORD,
    '| env length:', process.env.ADMIN_PASSWORD?.length,
    '| typed length:', String(password || '').length,
    '| secret set:', !!process.env.ADMIN_SESSION_SECRET
  );

  if (!password || !passwordMatches(String(password))) {
    await new Promise((r) => setTimeout(r, 800)); // brute-force slow karne ke liye
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return res;
}