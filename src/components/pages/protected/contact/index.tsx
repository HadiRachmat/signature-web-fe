import React, { useMemo, useState } from 'react';

type Contact = {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  address: string;
  klass?: string;
};

const demoContacts: Contact[] = [
  {
    id: 'c1',
    studentName: 'Ahmad Nur',
    parentName: 'H. Nur',
    parentPhone: '+62 812-3456-7890',
    address: 'Jl. Merdeka No.12, Bandung',
    klass: 'TPA A',
  },
  {
    id: 'c2',
    studentName: 'Siti Aminah',
    parentName: 'Ibu Siti',
    parentPhone: '+62 813-1111-2222',
    address: 'Komplek Melati Blok B/3, Jakarta',
    klass: 'TPA B',
  },
  {
    id: 'c3',
    studentName: 'Budi Santoso',
    parentName: 'Bpk Santoso',
    parentPhone: '+62 816-9999-0000',
    address: 'Desa Sukamaju RT 02 RW 01',
    klass: 'TPA A',
  },
  {
    id: 'c4',
    studentName: 'Mawar',
    parentName: 'Ibu Mawar',
    parentPhone: '+62 818-2222-3333',
    address: 'Jl. Anggrek No.7, Surabaya',
    klass: 'TPA C',
  },
  {
    id: 'c5',
    studentName: 'Fahri',
    parentName: 'Bpk Ahmad',
    parentPhone: '+62 812-7777-4444',
    address: 'Perum Griya Asri, Cimahi',
    klass: 'TPA B',
  },
];

const ContactPage: React.FC = () => {
  const [contacts] = useState<Contact[]>(demoContacts);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) =>
      [c.studentName, c.parentName, c.parentPhone, c.address, c.klass]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [contacts, query]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Kontak Santri</h2>
          <p className="text-sm text-gray-500">
            Daftar kontak santri — nama santri, orang tua, nomor telepon, dan alamat rumah.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama santri, orang tua, atau alamat..."
            className="px-3 py-2 border rounded-md text-sm w-72 focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-label="Cari kontak"
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
                Nama Santri
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Orang Tua
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. Telpon
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alamat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((c, idx) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{idx + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{c.studentName}</div>
                  {c.klass && <div className="text-xs text-gray-500">{c.klass}</div>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {c.parentName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-sky-600">
                  <a href={`tel:${c.parentPhone.replace(/\s+/g, '')}`}>{c.parentPhone}</a>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{c.address}</td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                  Tidak ada kontak yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactPage;
