'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type Status = 'new' | 'contacted' | 'qualified' | 'closed';

type Submission = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string | null;
  service: string;
  message: string;
  status: Status;
  notes: string | null;
};

const STATUSES: { value: Status; label: string; cls: string }[] = [
  { value: 'new', label: 'New', cls: 'bg-[#60ccf1]/15 text-[#60ccf1] border-[#60ccf1]/30' },
  { value: 'contacted', label: 'Contacted', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
  { value: 'qualified', label: 'Qualified', cls: 'bg-violet-400/15 text-violet-300 border-violet-400/30' },
  { value: 'closed', label: 'Closed', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
];

const statusMeta = (s: string) =>
  STATUSES.find((x) => x.value === s) || STATUSES[0];

const RANGES = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
];

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name', label: 'Name A-Z' },
];

const PAGE_SIZES = [10, 25, 50];
const DAY = 864e5;

function csvCell(value: unknown) {
  let s = value == null ? '' : String(value);
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-IN', { dateStyle: 'medium' });
}

export default function ConsolePage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | Status>('all');
  const [service, setService] = useState('all');
  const [range, setRange] = useState('all');
  const [sort, setSort] = useState('newest');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [deleteIds, setDeleteIds] = useState<string[] | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // ---------- Data ----------
  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const json = await res.json();
      setRows(
        (json.data || []).map((r: Submission) => ({
          ...r,
          status: (r.status as Status) || 'new',
        }))
      );
      setLastUpdated(new Date());
      setAuthed(true);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Auto refresh har 60 second
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => load(true), 60000);
    return () => clearInterval(t);
  }, [authed, load]);

  // Esc se drawer band
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenId(null);
        setDeleteIds(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const opened = useMemo(
    () => rows.find((r) => r.id === openId) || null,
    [rows, openId]
  );

  useEffect(() => {
    setNotesDraft(opened?.notes || '');
  }, [opened?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- Auth ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    setLoggingIn(false);

    if (!res.ok) {
      setLoginError('Incorrect password. Please try again.');
      return;
    }
    setPassword('');
    await load();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setRows([]);
    setAuthed(false);
  };

  // ---------- Actions ----------
  const updateStatus = async (ids: string[], status: Status) => {
    const prev = rows;
    setRows((r) => r.map((x) => (ids.includes(x.id) ? { ...x, status } : x)));

    const res = await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status }),
    });

    if (!res.ok) {
      setRows(prev);
      showToast('Update failed');
    } else {
      showToast(
        ids.length > 1
          ? `${ids.length} leads marked ${statusMeta(status).label}`
          : `Marked ${statusMeta(status).label}`
      );
    }
  };

  const saveNotes = async () => {
    if (!opened) return;
    const res = await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: opened.id, notes: notesDraft }),
    });
    if (res.ok) {
      setRows((r) =>
        r.map((x) => (x.id === opened.id ? { ...x, notes: notesDraft } : x))
      );
      showToast('Notes saved');
    } else {
      showToast('Could not save notes');
    }
  };

  const confirmDelete = async () => {
    if (!deleteIds) return;
    const res = await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: deleteIds }),
    });
    if (res.ok) {
      setRows((r) => r.filter((x) => !deleteIds.includes(x.id)));
      setSelectedIds(new Set());
      if (openId && deleteIds.includes(openId)) setOpenId(null);
      showToast(`${deleteIds.length} deleted`);
    } else {
      showToast('Delete failed');
    }
    setDeleteIds(null);
  };

  const copyText = async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(msg);
    } catch {
      showToast('Copy failed');
    }
  };

  // ---------- Derived ----------
  const services = useMemo(
    () => Array.from(new Set(rows.map((r) => r.service))).sort(),
    [rows]
  );

  const statusCounts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    STATUSES.forEach((s) => (c[s.value] = 0));
    rows.forEach((r) => (c[r.status] = (c[r.status] || 0) + 1));
    return c;
  }, [rows]);

  const stats = useMemo(() => {
    const now = Date.now();
    const sod = new Date();
    sod.setHours(0, 0, 0, 0);

    const today = rows.filter((r) => new Date(r.created_at).getTime() >= sod.getTime()).length;
    const week = rows.filter((r) => now - new Date(r.created_at).getTime() <= 7 * DAY).length;
    const prevWeek = rows.filter((r) => {
      const d = now - new Date(r.created_at).getTime();
      return d > 7 * DAY && d <= 14 * DAY;
    }).length;

    let trend: number | null = null;
    if (prevWeek > 0) trend = Math.round(((week - prevWeek) / prevWeek) * 100);
    else if (week > 0) trend = 100;

    const closed = rows.filter((r) => r.status === 'closed').length;
    const rate = rows.length ? Math.round((closed / rows.length) * 100) : 0;

    return { total: rows.length, today, week, trend, closed, rate };
  }, [rows]);

  const chart = useMemo(() => {
    const days: { key: string; label: string; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push({
        key: dayKey(d),
        label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        count: 0,
      });
    }
    rows.forEach((r) => {
      const k = dayKey(new Date(r.created_at));
      const d = days.find((x) => x.key === k);
      if (d) d.count += 1;
    });
    const max = Math.max(1, ...days.map((d) => d.count));
    return { days, max };
  }, [rows]);

  const serviceBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    rows.forEach((r) => (counts[r.service] = (counts[r.service] || 0) + 1));
    const list = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const max = Math.max(1, ...list.map((x) => x[1]));
    return { list, max };
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const now = Date.now();
    const sod = new Date();
    sod.setHours(0, 0, 0, 0);

    const list = rows.filter((r) => {
      if (statusTab !== 'all' && r.status !== statusTab) return false;
      if (service !== 'all' && r.service !== service) return false;

      const t = new Date(r.created_at).getTime();
      if (range === 'today' && t < sod.getTime()) return false;
      if (range === '7d' && now - t > 7 * DAY) return false;
      if (range === '30d' && now - t > 30 * DAY) return false;

      if (!q) return true;
      return [r.first_name, r.last_name, r.email, r.subject, r.service, r.message, r.notes]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });

    list.sort((a, b) => {
      if (sort === 'oldest')
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sort === 'name')
        return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return list;
  }, [rows, search, statusTab, service, range, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, statusTab, service, range, sort, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const allOnPageSelected =
    pageRows.length > 0 && pageRows.every((r) => selectedIds.has(r.id));

  const toggleAllOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) pageRows.forEach((r) => next.delete(r.id));
      else pageRows.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedRows = rows.filter((r) => selectedIds.has(r.id));

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const initials = (r: Submission) =>
    `${r.first_name?.[0] || ''}${r.last_name?.[0] || ''}`.toUpperCase();

  const downloadCsv = (list: Submission[], name: string) => {
    const headers = ['Date', 'First Name', 'Last Name', 'Email', 'Subject', 'Service', 'Status', 'Message', 'Notes'];
    const lines = list.map((r) =>
      [r.created_at, r.first_name, r.last_name, r.email, r.subject, r.service, r.status, r.message, r.notes]
        .map(csvCell)
        .join(',')
    );
    const csv = '\uFEFF' + [headers.join(','), ...lines].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${list.length} rows`);
  };

  const uniqueEmails = (list: Submission[]) =>
    Array.from(new Set(list.map((r) => r.email)));

  // ---------- Loading ----------
  if (authed === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#60ccf1] rounded-full animate-spin" />
      </div>
    );
  }

  // ---------- Login ----------
  if (!authed) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/[0.07] rounded-full blur-[160px]" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-sm bg-black/80 border border-white/[0.08] rounded-2xl p-8 backdrop-blur"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60ccf1] to-[#3372f1] flex items-center justify-center mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="text-white text-2xl font-bold">Welcome back</h1>
          <p className="text-white/50 text-sm mt-1 mb-6">Sign in to view contact submissions.</p>

          <label htmlFor="console-password" className="block text-xs uppercase tracking-[0.15em] text-white font-medium mb-2">
            Password
          </label>
          <input
            id="console-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            autoComplete="current-password"
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#60ccf1]/50 transition-colors"
          />

          {loginError && <p className="mt-3 text-sm text-red-400">{loginError}</p>}

          <button
            type="submit"
            disabled={loggingIn}
            className="mt-6 w-full bg-white text-[#080808] py-3 rounded-xl font-semibold hover:bg-white/90 transition disabled:opacity-60 cursor-pointer"
          >
            {loggingIn ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    );
  }

  const selectCls =
    'bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#60ccf1]/50 cursor-pointer';

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-black/80 backdrop-blur">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#60ccf1] to-[#3372f1] flex items-center justify-center font-bold text-sm">
              E
            </div>
            <div>
              <p className="font-semibold leading-tight">Eric Analytics</p>
              <p className="text-xs text-white/40 leading-tight">Lead Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="hidden sm:inline text-xs text-white/40">
                Updated {lastUpdated.toLocaleTimeString('en-IN', { timeStyle: 'short' })}
              </span>
            )}
            <button
              onClick={() => load()}
              className="border border-white/10 px-3.5 py-2 rounded-lg text-sm hover:bg-white/[0.06] transition cursor-pointer"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleLogout}
              className="border border-white/10 px-3.5 py-2 rounded-lg text-sm hover:bg-white/[0.06] transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Overview</h1>
          <p className="text-sm text-white/50 mt-1">Track and manage enquiries from your website.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-white/50">Total leads</p>
            <p className="mt-3 text-3xl font-bold bg-gradient-to-r from-[#60ccf1] to-[#3372f1] bg-clip-text text-transparent">
              {stats.total}
            </p>
            <p className="text-xs text-white/40 mt-1">{stats.today} today</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-white/50">Last 7 days</p>
            <p className="mt-3 text-3xl font-bold">{stats.week}</p>
            <p
              className={`text-xs mt-1 ${
                stats.trend === null
                  ? 'text-white/40'
                  : stats.trend >= 0
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {stats.trend === null
                ? 'No previous data'
                : `${stats.trend >= 0 ? '▲' : '▼'} ${Math.abs(stats.trend)}% vs previous week`}
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-white/50">Needs follow-up</p>
            <p className="mt-3 text-3xl font-bold text-[#60ccf1]">{statusCounts.new}</p>
            <p className="text-xs text-white/40 mt-1">New, not contacted yet</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-white/50">Closed rate</p>
            <p className="mt-3 text-3xl font-bold text-emerald-400">{stats.rate}%</p>
            <p className="text-xs text-white/40 mt-1">{stats.closed} closed leads</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold">Leads, last 14 days</p>
              <p className="text-xs text-white/40">{chart.days.reduce((a, d) => a + d.count, 0)} total</p>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {chart.days.map((d) => (
                <div key={d.key} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  <span className="absolute -top-1 text-[10px] text-white/0 group-hover:text-white/80 transition">
                    {d.count}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#3372f1] to-[#60ccf1] transition-all"
                    style={{
                      height: `${d.count === 0 ? 3 : Math.max(8, (d.count / chart.max) * 100)}%`,
                      opacity: d.count === 0 ? 0.15 : 1,
                    }}
                    title={`${d.label}: ${d.count}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/40">
              <span>{chart.days[0].label}</span>
              <span>{chart.days[chart.days.length - 1].label}</span>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-sm font-semibold mb-4">Top services</p>
            {serviceBreakdown.list.length === 0 ? (
              <p className="text-sm text-white/40">No data yet</p>
            ) : (
              <div className="space-y-3">
                {serviceBreakdown.list.map(([name, count]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="truncate pr-2 text-white/80">{name}</span>
                      <span className="text-white/50">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#60ccf1] to-[#3372f1]"
                        style={{ width: `${(count / serviceBreakdown.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[{ value: 'all', label: 'All' }, ...STATUSES].map((t) => (
            <button
              key={t.value}
              onClick={() => setStatusTab(t.value as 'all' | Status)}
              className={`px-4 py-2 rounded-xl text-sm border transition cursor-pointer ${
                statusTab === t.value
                  ? 'bg-white text-[#080808] border-white font-semibold'
                  : 'border-white/10 text-white/70 hover:bg-white/[0.06]'
              }`}
            >
              {t.label}
              <span className={`ml-2 text-xs ${statusTab === t.value ? 'text-black/50' : 'text-white/40'}`}>
                {statusCounts[t.value] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, message, notes..."
              className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#60ccf1]/50 w-full sm:w-80"
            />
            <select value={service} onChange={(e) => setService(e.target.value)} className={selectCls}>
              <option value="all" className="text-[#111]">All services</option>
              {services.map((s) => (
                <option key={s} value={s} className="text-[#111]">{s}</option>
              ))}
            </select>
            <select value={range} onChange={(e) => setRange(e.target.value)} className={selectCls}>
              {RANGES.map((r) => (
                <option key={r.value} value={r.value} className="text-[#111]">{r.label}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectCls}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="text-[#111]">{s.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => copyText(uniqueEmails(filtered).join(', '), `${uniqueEmails(filtered).length} emails copied`)}
              disabled={filtered.length === 0}
              className="border border-white/10 px-4 py-2.5 rounded-xl text-sm hover:bg-white/[0.06] transition disabled:opacity-40 cursor-pointer"
            >
              Copy emails
            </button>
            <button
              onClick={() => downloadCsv(filtered, 'submissions-filtered')}
              disabled={filtered.length === 0}
              className="border border-white/10 px-4 py-2.5 rounded-xl text-sm hover:bg-white/[0.06] transition disabled:opacity-40 cursor-pointer"
            >
              Export filtered
            </button>
            <a
              href="/api/admin/export"
              className="bg-white text-[#080808] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition"
            >
              Export all CSV
            </a>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-4 bg-[#3372f1]/10 border border-[#3372f1]/30 rounded-xl px-4 py-3">
            <span className="text-sm font-medium">{selectedIds.size} selected</span>

            <select
              value=""
              onChange={(e) => {
                if (e.target.value) updateStatus(Array.from(selectedIds), e.target.value as Status);
              }}
              className={selectCls}
            >
              <option value="" className="text-[#111]">Mark as...</option>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value} className="text-[#111]">{s.label}</option>
              ))}
            </select>

            <button
              onClick={() => copyText(uniqueEmails(selectedRows).join(', '), 'Emails copied')}
              className="border border-white/10 px-3.5 py-2 rounded-lg text-sm hover:bg-white/[0.06] cursor-pointer"
            >
              Copy emails
            </button>
            <button
              onClick={() => downloadCsv(selectedRows, 'submissions-selected')}
              className="border border-white/10 px-3.5 py-2 rounded-lg text-sm hover:bg-white/[0.06] cursor-pointer"
            >
              Export selected
            </button>
            <button
              onClick={() => setDeleteIds(Array.from(selectedIds))}
              className="border border-red-400/30 text-red-400 px-3.5 py-2 rounded-lg text-sm hover:bg-red-500/10 cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="ml-auto text-sm text-white/50 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto border border-white/[0.08] rounded-2xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.03] text-white/50 text-xs uppercase tracking-wider">
              <tr>
                <th className="pl-5 pr-2 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={toggleAllOnPage}
                    className="accent-[#3372f1] cursor-pointer"
                    aria-label="Select all on page"
                  />
                </th>
                <th className="px-4 py-3.5 font-medium">Contact</th>
                <th className="px-4 py-3.5 font-medium">Subject</th>
                <th className="px-4 py-3.5 font-medium">Service</th>
                <th className="px-4 py-3.5 font-medium">Status</th>
                <th className="px-4 py-3.5 font-medium">Received</th>
                <th className="px-4 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && rows.length === 0 &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-white/[0.06]">
                    <td colSpan={7} className="px-5 py-4">
                      <div className="h-5 bg-white/[0.05] rounded animate-pulse" />
                    </td>
                  </tr>
                ))}

              {!loading && pageRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center text-white/40">
                    No submissions found
                  </td>
                </tr>
              )}

              {pageRows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setOpenId(r.id)}
                  className={`border-t border-white/[0.06] hover:bg-white/[0.03] cursor-pointer transition-colors ${
                    selectedIds.has(r.id) ? 'bg-[#3372f1]/[0.06]' : ''
                  }`}
                >
                  <td className="pl-5 pr-2 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={() => toggleOne(r.id)}
                      className="accent-[#3372f1] cursor-pointer"
                      aria-label="Select row"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-[#60ccf1]/30 to-[#3372f1]/30 border border-white/10 flex items-center justify-center text-xs font-semibold">
                        {initials(r)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">
                          {r.first_name} {r.last_name}
                          {r.notes && <span className="ml-2 text-[10px] text-amber-300" title="Has notes">● note</span>}
                        </p>
                        <p className="text-xs text-white/50 truncate">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-[240px]">
                    <p className="truncate text-white/80">{r.subject || '-'}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-block bg-white/[0.05] text-white/80 border border-white/10 rounded-full px-3 py-1 text-xs whitespace-nowrap">
                      {r.service}
                    </span>
                  </td>
                  <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus([r.id], e.target.value as Status)}
                      className={`rounded-full px-3 py-1 text-xs border outline-none cursor-pointer ${statusMeta(r.status).cls}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value} className="text-[#111] bg-white">
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-white/70">{timeAgo(r.created_at)}</p>
                    <p className="text-xs text-white/40">{formatDate(r.created_at)}</p>
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenId(r.id);
                      }}
                      className="text-[#60ccf1] hover:underline text-xs mr-4 cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteIds([r.id]);
                      }}
                      className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm text-white/50">
          <div className="flex items-center gap-3">
            <p>
              Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </p>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1.5 text-xs outline-none cursor-pointer"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n} className="text-[#111]">{n} / page</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border border-white/10 px-3.5 py-2 rounded-lg hover:bg-white/[0.06] disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border border-white/10 px-3.5 py-2 rounded-lg hover:bg-white/[0.06] disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Detail drawer */}
      {opened && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenId(null)} />
          <aside className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#60ccf1]/30 to-[#3372f1]/30 border border-white/10 flex items-center justify-center font-semibold">
                  {initials(opened)}
                </div>
                <div>
                  <p className="font-semibold">{opened.first_name} {opened.last_name}</p>
                  <p className="text-xs text-white/50">{formatDate(opened.created_at)}</p>
                </div>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="text-white/50 hover:text-white text-xl leading-none cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => updateStatus([opened.id], s.value)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition cursor-pointer ${
                        opened.status === s.value
                          ? s.cls
                          : 'border-white/10 text-white/50 hover:bg-white/[0.06]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Email</p>
                <div className="flex items-center gap-3">
                  <span className="break-all">{opened.email}</span>
                  <button
                    onClick={() => copyText(opened.email, 'Email copied')}
                    className="text-[#60ccf1] hover:underline text-xs shrink-0 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Service</p>
                <p>{opened.service}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Subject</p>
                <p>{opened.subject || '-'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Message</p>
                <p className="whitespace-pre-wrap leading-relaxed text-white/80 bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
                  {opened.message}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Internal notes</p>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  placeholder="Add private notes about this lead..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#60ccf1]/50 resize-none"
                />
                <button
                  onClick={saveNotes}
                  disabled={notesDraft === (opened.notes || '')}
                  className="mt-2 bg-white text-[#080808] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/90 disabled:opacity-40 cursor-pointer"
                >
                  Save notes
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => copyText(opened.email, 'Email copied')}
                className="flex-1 border border-white/10 py-2.5 rounded-xl text-sm hover:bg-white/[0.06] cursor-pointer"
              >
                Copy email
              </button>
              <button
                onClick={() => setDeleteIds([opened.id])}
                className="border border-red-400/30 text-red-400 px-4 py-2.5 rounded-xl text-sm hover:bg-red-500/10 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Delete confirm */}
      {deleteIds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setDeleteIds(null)} />
          <div className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold text-lg">
              Delete {deleteIds.length > 1 ? `${deleteIds.length} submissions` : 'submission'}?
            </h3>
            <p className="text-sm text-white/60 mt-2">
              This will be permanently deleted and cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteIds(null)}
                className="border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/[0.06] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white text-[#080808] px-5 py-3 rounded-xl text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}