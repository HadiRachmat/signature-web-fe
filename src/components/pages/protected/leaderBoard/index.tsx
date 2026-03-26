import { useMemo, useState } from 'react';

type UserScore = {
  id: number;
  name: string;
  role: 'Student';
  score: number;
  completed: number; // percent
  lastRank?: number; // previous position to show movement
};

const makeDummy = (n = 30): UserScore[] => {
  const roles: UserScore['role'][] = ['Student'];
  const names = [
    'Aisyah',
    'Budi',
    'Citra',
    'Dedi',
    'Elisa',
    'Fajar',
    'Gita',
    'Hendra',
    'Indah',
    'Joko',
    'Kiki',
    'Lina',
    'Mawar',
    'Nadia',
    'Oka',
    'Putu',
    'Rizal',
    'Sari',
    'Tania',
    'Umar',
    'Vina',
    'Wawan',
    'Xena',
    'Yusuf',
    'Zahra',
    'Agus',
    'Bella',
    'Cecep',
    'Dina',
    'Eko',
  ];
  return Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    name: names[i % names.length] + (i > names.length ? ` ${Math.floor(i / names.length)}` : ''),
    role: roles[i % roles.length],
    score: Math.max(0, Math.round(1000 - i * (Math.random() * 10 + 5) + Math.random() * 200)),
    completed: Math.min(100, Math.round(Math.random() * 100)),
    lastRank: Math.max(1, Math.round(Math.random() * n)),
  }));
};

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      {initials}
    </div>
  );
};

const LeaderBoardPage = () => {
  const [data] = useState<UserScore[]>(() => makeDummy(50));
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = data.filter(
      (d) => d.name.toLowerCase().includes(q) || d.role.toLowerCase().includes(q)
    );
    list = list.sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));
    return list;
  }, [data, query, sortDesc]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const goto = (p: number) => setPage(Math.max(1, Math.min(pageCount, p)));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
          <p className="text-sm text-gray-500">Top learners and their progress</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search name or role"
            className="px-3 py-2 border rounded w-64"
          />
          <button
            onClick={() => {
              setSortDesc((s) => !s);
              setPage(1);
            }}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Sort by Score {sortDesc ? '↓' : '↑'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-2 py-3 text-center text-sm text-gray-600">No</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">User</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Role</th>
              <th className="px-4 py-3 text-right text-sm text-gray-600">Score</th>
              <th className="px-4 py-3 text-right text-sm text-gray-600">Progress</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => {
              const globalIndex = filtered.findIndex((r) => r.id === row.id);
              const rank = globalIndex + 1;
              const delta = (row.lastRank || rank) - rank; // positive => moved up
              const isTop = rank <= 3;
              return (
                <tr
                  key={row.id}
                  className={`border-t hover:bg-gray-50 ${isTop ? 'bg-linear-to-r from-white to-gray-50' : ''}`}
                >
                  <td className="w-12 px-2 py-3 text-sm text-gray-700 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold text-sm ${isTop ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {rank}
                      </span>
                      <span>
                        {delta > 0 ? (
                          <span className="text-green-600 text-sm">▲{Math.abs(delta)}</span>
                        ) : delta < 0 ? (
                          <span className="text-red-600 text-sm">▼{Math.abs(delta)}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">▬</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-3">
                    <Avatar name={row.name} />
                    <div>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-xs text-gray-500">ID: {row.id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right font-semibold">
                    {row.score}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right w-48">
                    <div className="w-full bg-gray-100 rounded h-3">
                      <div
                        className="h-3 rounded"
                        style={{
                          width: `${row.completed}%`,
                          background:
                            row.completed > 66
                              ? '#10B981'
                              : row.completed > 33
                                ? '#F59E0B'
                                : '#F97373',
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of{' '}
            {filtered.length}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => goto(1)} className="px-2 py-1 border rounded">
              First
            </button>
            <button onClick={() => goto(page - 1)} className="px-2 py-1 border rounded">
              Prev
            </button>
            <span className="px-3 py-1">Page</span>
            <input
              value={page}
              onChange={(e) => goto(Number(e.target.value || 1))}
              className="w-12 px-2 py-1 border rounded text-center"
            />
            <span className="px-2">/ {pageCount}</span>
            <button onClick={() => goto(page + 1)} className="px-2 py-1 border rounded">
              Next
            </button>
            <button onClick={() => goto(pageCount)} className="px-2 py-1 border rounded">
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
