import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

const STATUSES = ['new', 'contacted', 'qualified', 'closed'];

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: 'Server config missing' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: 'Server config missing' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const ids: string[] = Array.isArray(body?.ids)
    ? body.ids.map(String)
    : body?.id
    ? [String(body.id)]
    : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    update.status = body.status;
  }
  if (body.notes !== undefined) {
    update.notes = String(body.notes).slice(0, 2000);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { error } = await supabase
    .from('contact_submissions')
    .update(update)
    .in('id', ids);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: 'Server config missing' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const ids: string[] = Array.isArray(body?.ids) ? body.ids.map(String) : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: 'Missing ids' }, { status: 400 });
  }

  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .in('id', ids);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}