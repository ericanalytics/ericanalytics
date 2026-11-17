import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'admin_session';

function sign(value: string) {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET || '')
    .update(value)
    .digest('hex');
}

export function createToken() {
  const exp = String(Date.now() + 1000 * 60 * 60 * 8); // 8 ghante
  return `${exp}.${sign(exp)}`;
}

function verifyToken(token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;

  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  return Number(exp) > Date.now();
}

export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

// .env value se extra spaces aur quotes hata deta hai
function cleanEnv(value?: string) {
  return (value || '').trim().replace(/^["']|["']$/g, '');
}

export function passwordMatches(input: string) {
  const expected = cleanEnv(process.env.ADMIN_PASSWORD);
  if (!expected) return false;

  const a = Buffer.from(input.trim());
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}