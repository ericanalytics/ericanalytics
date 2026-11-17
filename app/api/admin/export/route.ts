import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

function csvCell(value: unknown) {
  let s = value == null ? '' : String(value);
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

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

  if (error || !data) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  const headers = [
    'Date',
    'First Name',
    'Last Name',
    'Email',
    'Subject',
    'Service',
    'Status',
    'Message',
    'Notes',
  ];

  const rows = data.map((r) =>
    [
      r.created_at,
      r.first_name,
      r.last_name,
      r.email,
      r.subject,
      r.service,
      r.status,
      r.message,
      r.notes,
    ]
      .map(csvCell)
      .join(',')
  );

  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="submissions-${date}.csv"`,
    },
  });
}