import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, service, message, captchaToken } = body;

    if (!firstName || !lastName || !email || !service || !message || !captchaToken) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. reCAPTCHA server-side verify
    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: captchaToken,
      }),
    });
    const verifyData = await verify.json();

    if (!verifyData.success) {
      return NextResponse.json({ error: 'Captcha failed' }, { status: 400 });
    }

    // 2. Supabase me save
    const { error } = await supabase.from('contact_submissions').insert({
      first_name: String(firstName).trim(),
      last_name: String(lastName).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : null,
      service,
      message: String(message).trim().slice(0, 500),
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}