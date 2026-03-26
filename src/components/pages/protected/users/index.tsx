import React, { useEffect, useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  active: boolean;
};

const demoUsers: User[] = [
  { id: 'u1', name: 'Ahmad Nur', email: 'ahmad@example.com', role: 'Student', active: true },
  { id: 'u2', name: 'Siti Aminah', email: 'siti@example.com', role: 'Student', active: true },
  { id: 'u3', name: 'Bpk. Yusuf', email: 'yusuf@example.com', role: 'Teacher', active: true },
  { id: 'u4', name: 'Admin Super', email: 'admin@example.com', role: 'Admin', active: true },
  { id: 'u5', name: 'Mawar', email: 'mawar@example.com', role: 'Student', active: false },
];

const Avatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  return (
    <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold">
      {initials}
    </div>
  );
};

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(demoUsers);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | User['role']>('All');

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      const matchesQuery =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [users, query, roleFilter]);

  // reset page when filters change
  useEffect(() => setCurrentPage(1), [query, roleFilter, pageSize]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleActive = (id: string) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  const removeUser = (id: string) => setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Manajemen User</h2>
          <p className="text-sm text-gray-500">
            Daftar user aplikasi — Admin, Teacher, dan Student.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRoleFilter(e.target.value as 'All' | User['role'])
            }
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="All">Semua role</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau email..."
            className="px-3 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginated.map((u, idx) => {
              const globalIndex = (currentPage - 1) * pageSize + idx + 1;
              return (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {globalIndex}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{u.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{u.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{u.role}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {u.active ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleActive(u.id)}
                        className="px-2 py-1 rounded-md text-sm border"
                      >
                        {u.active ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => removeUser(u.id)}
                        className="px-2 py-1 rounded-md text-sm bg-red-600 text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                  Tidak ada user yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Menampilkan {total === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{' '}
          {Math.min(currentPage * pageSize, total)} dari {total} user
        </div>

        <div className="flex items-center gap-3">
          <select
            value={pageSize}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPageSize(Number(e.target.value))
            }
            className="px-2 py-1 border rounded-md text-sm"
            aria-label="Pilih jumlah per halaman"
          >
            <option value={5}>5 / halaman</option>
            <option value={10}>10 / halaman</option>
            <option value={25}>25 / halaman</option>
            <option value={50}>50 / halaman</option>
          </select>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
            >
              Prev
            </button>

            {/* simple page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 rounded-md text-sm ${page === currentPage ? 'bg-sky-600 text-white' : 'border'}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
