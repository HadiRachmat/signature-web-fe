import React, { useEffect, useMemo, useState } from 'react';

type MurajaahSession = {
  id: string;
  student: string;
  klass: string;
  target: string; // e.g. "Surah Al-Fatihah 1-7"
  scheduledFor: string; // ISO date
  durationMin: number; // expected session length
  progress: number; // 0-100
  done?: boolean;
};

const demoSessions: MurajaahSession[] = [
  {
    id: 'm1',
    student: 'Ahmad Nur',
    klass: 'TPA A',
    target: 'Al-Fatihah 1-7',
    scheduledFor: '2026-03-24',
    durationMin: 10,
    progress: 60,
    done: false,
  },
  {
    id: 'm2',
    student: 'Siti Aminah',
    klass: 'TPA B',
    target: 'Yasin 1-10',
    scheduledFor: '2026-03-24',
    durationMin: 15,
    progress: 20,
    done: false,
  },
  {
    id: 'm3',
    student: 'Budi Santoso',
    klass: 'TPA A',
    target: 'An-Nas 1-6',
    scheduledFor: '2026-03-23',
    durationMin: 8,
    progress: 100,
    done: true,
  },
  {
    id: 'm4',
    student: 'Mawar',
    klass: 'TPA C',
    target: 'Al-Ikhlas 1-4',
    scheduledFor: '2026-03-25',
    durationMin: 5,
    progress: 40,
    done: false,
  },
];

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : '-');

const MemorizeMurajaahPage: React.FC = () => {
  const [sessions, setSessions] = useState<MurajaahSession[]>(demoSessions);
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string>(new Date().toISOString().slice(0, 10));

  // active session state (simple in-page player)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeSessionId) ?? null,
    [sessions, activeSessionId]
  );

  useEffect(() => {
    let t: number | undefined;
    if (activeSessionId) {
      t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (t) window.clearInterval(t);
    };
  }, [activeSessionId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => {
      const matchesQuery =
        !q ||
        s.student.toLowerCase().includes(q) ||
        s.klass.toLowerCase().includes(q) ||
        s.target.toLowerCase().includes(q);
      const matchesDate = !dateFilter || s.scheduledFor === dateFilter;
      return matchesQuery && matchesDate;
    });
  }, [sessions, query, dateFilter]);

  const startSession = (id: string) => {
    setActiveSessionId(id);
    setSeconds(0);
  };

  const stopSession = () => setActiveSessionId(null);

  const markDone = (id: string) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, done: true, progress: 100 } : s)));
    if (activeSessionId === id) stopSession();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Murojaah Harian</h2>
          <p className="text-sm text-gray-500">
            Kelola sesi murojaah (personal) — mulai sesi, catat progress, dan tandai selesai.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, kelas, atau target..."
            className="px-3 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
            aria-label="Filter tanggal"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-8">Tidak ada sesi untuk kriteria ini.</div>
        )}

        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white shadow-sm rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-semibold">
                {s.student
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <div className="font-semibold">{s.student}</div>
                <div className="text-xs text-gray-500">
                  {s.klass} • {s.target}
                </div>
                <div className="text-xs text-gray-400">Jadwal: {formatDate(s.scheduledFor)}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 text-right">
                Durasi: <span className="font-medium">{s.durationMin} menit</span>
              </div>
              <div className="w-48">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-green-400`} style={{ width: `${s.progress}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">Progress: {s.progress}%</div>
              </div>

              <div className="flex items-center gap-2">
                {!s.done && (
                  <button
                    onClick={() => startSession(s.id)}
                    className="px-3 py-1 rounded-md bg-sky-600 text-white text-sm hover:bg-sky-700"
                  >
                    Mulai
                  </button>
                )}

                {s.done ? (
                  <div className="text-sm text-green-600 font-medium">Selesai</div>
                ) : (
                  <button
                    onClick={() => markDone(s.id)}
                    className="px-3 py-1 rounded-md border text-sm"
                  >
                    Tandai selesai
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active session panel */}
      {activeSession && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Sedang sesi: {activeSession.student}</div>
              <div className="text-xs text-gray-500">Target: {activeSession.target}</div>
            </div>
            <div className="text-sm text-gray-700">
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, '0')}
              :{(seconds % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={stopSession} className="px-3 py-1 rounded-md border text-sm">
                Stop
              </button>
              <button
                onClick={() => markDone(activeSession.id)}
                className="px-3 py-1 rounded-md bg-green-600 text-white text-sm"
              >
                Selesai dan Simpan
              </button>
            </div>
            <div className="text-xs text-gray-400">
              Durasi direkam di sesi ini: {Math.ceil(seconds / 60)} menit
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemorizeMurajaahPage;
