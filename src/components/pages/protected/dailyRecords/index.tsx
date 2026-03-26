import React, { useMemo, useState } from 'react';

type Santri = {
  id: string;
  name: string;
  klass: string;
  todayTarget: string; // e.g. "Surah Al-Fatihah: 1-7"
  progress: number; // 0-100
  lastReviewed?: string; // ISO date
  doneToday?: boolean;
};

const demoSantri: Santri[] = [
  {
    id: 's1',
    name: 'Ahmad Nur',
    klass: 'TPA A',
    todayTarget: 'Al-Fatihah 1-7',
    progress: 72,
    lastReviewed: '2026-03-23',
    doneToday: false,
  },
  {
    id: 's2',
    name: 'Siti Aminah',
    klass: 'TPA B',
    todayTarget: 'Yasin 1-10',
    progress: 45,
    lastReviewed: '2026-03-22',
    doneToday: false,
  },
  {
    id: 's3',
    name: 'Budi Santoso',
    klass: 'TPA A',
    todayTarget: 'An-Nas 1-6',
    progress: 88,
    lastReviewed: '2026-03-24',
    doneToday: true,
  },
  {
    id: 's4',
    name: 'Mawar',
    klass: 'TPA C',
    todayTarget: 'Al-Ikhlas 1-4',
    progress: 33,
    lastReviewed: '2026-03-20',
    doneToday: false,
  },
  {
    id: 's5',
    name: 'Fahri',
    klass: 'TPA B',
    todayTarget: 'Al-Kafirun 1-6',
    progress: 55,
    lastReviewed: '2026-03-23',
    doneToday: false,
  },
  {
    id: 's6',
    name: 'Lina',
    klass: 'TPA A',
    todayTarget: 'Al-Falaq 1-5',
    progress: 15,
    lastReviewed: '2026-03-21',
    doneToday: false,
  },
  {
    id: 's7',
    name: 'Rizky',
    klass: 'TPA C',
    todayTarget: 'Al-Ma`un 1-7',
    progress: 97,
    lastReviewed: '2026-03-24',
    doneToday: true,
  },
  {
    id: 's8',
    name: 'Nadia',
    klass: 'TPA B',
    todayTarget: 'Al-Kawthar 1-3',
    progress: 5,
    lastReviewed: '2026-03-18',
    doneToday: false,
  },
];

const Avatar: React.FC<{ name: string; size?: number }> = ({ name, size = 40 }) => {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('');
  const colors = ['bg-sky-500', 'bg-rose-500', 'bg-emerald-500', 'bg-violet-500', 'bg-yellow-500'];
  const color = colors[name.length % colors.length];
  return (
    <div
      className={`${color} text-white font-semibold rounded-full flex items-center justify-center`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials}
    </div>
  );
};

const Donut: React.FC<{ percent: number; size?: number }> = ({ percent, size = 48 }) => {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#10b981"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          fill="none"
        />
      </g>
    </svg>
  );
};

const DailyRecordsPage: React.FC = () => {
  const [santri, setSantri] = useState<Santri[]>(demoSantri);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return santri;
    return santri.filter(
      (s) => s.name.toLowerCase().includes(q) || s.klass.toLowerCase().includes(q)
    );
  }, [santri, query]);

  const toggleDone = (id: string) => {
    setSantri((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, doneToday: !s.doneToday, lastReviewed: new Date().toISOString().slice(0, 10) }
          : s
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Hafalan Sehari-hari</h2>
          <p className="text-sm text-gray-500">
            Daftar santri dan target hafalan hari ini (personal)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Cari nama atau kelas..."
            aria-label="Cari santri"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white shadow-sm rounded-lg p-4 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={s.name} size={48} />
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.klass}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-500">Progress</div>
                <div className="flex items-center gap-2">
                  <Donut percent={s.progress} />
                  <div className="text-sm font-medium">{s.progress}%</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex-1">
              <div className="text-sm text-gray-600">Target hari ini</div>
              <div className="mt-1 font-medium">{s.todayTarget}</div>
              <div className="mt-3 text-xs text-gray-400">
                Terakhir review: {s.lastReviewed ?? '-'}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => toggleDone(s.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${s.doneToday ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
              >
                {s.doneToday ? 'Selesai hari ini' : 'Tandai selesai'}
              </button>

              <div className="text-right">
                <div className="text-xs text-gray-500">Progress level</div>
                <div className="font-semibold">
                  {s.progress >= 90
                    ? 'Excellent'
                    : s.progress >= 60
                      ? 'Good'
                      : s.progress >= 30
                        ? 'Needs practice'
                        : 'Just starting'}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            Tidak ada santri yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyRecordsPage;
