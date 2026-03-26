import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const generateDummyCostData = (weeks = 5) => {
  const base = [5000, 4200, 3800, 4500, 5200];
  return Array.from({ length: weeks }).map((_, i) => ({
    week: `Week ${i + 1}`,
    material: Math.round(base[i % base.length] * (0.8 + Math.random() * 0.4)),
    labor: Math.round(base[(i + 1) % base.length] * (0.4 + Math.random() * 0.6)),
    overhead: Math.round(base[(i + 2) % base.length] * (0.2 + Math.random() * 0.6)),
  }));
};

const Card: React.FC<{ title: string; children: React.ReactNode; controls?: React.ReactNode }> = ({
  title,
  children,
  controls,
}) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-xs text-gray-500">Overview and trends</p>
      </div>
      <div className="flex items-center gap-2">{controls}</div>
    </div>
    <div style={{ height: 320 }}>{children}</div>
  </div>
); 
const MemorizeRecordPage = () => {
  const [month] = useState('Aug 2023');
  const [product] = useState('Unsweetened Chocolate 250 g');
  const data = useMemo(() => generateDummyCostData(6), []);

  return (
    <div className="p-6 space-y-6">
      <Card
        title="Production Cost Summary"
        controls={
          <>
            <select className="px-3 py-1 border rounded text-sm bg-white">
              <option>{month}</option>
            </select>
            <select className="px-3 py-1 border rounded text-sm bg-white">
              <option>{product}</option>
            </select>
          </>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number | undefined) =>
                value === undefined
                  ? ''
                  : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
              }
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="material"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line type="monotone" dataKey="labor" stroke="#34D399" strokeWidth={2} dot={{ r: 3 }} />
            <Line
              type="monotone"
              dataKey="overhead"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card
        title="Cost Analysis Summary"
        controls={
          <select className="px-3 py-1 border rounded text-sm bg-white">
            <option>Aug 2023</option>
          </select>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number | undefined) =>
                value === undefined
                  ? ''
                  : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
              }
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="material" stroke="#F59E0B" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="labor" stroke="#34D399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="overhead" stroke="#60A5FA" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default MemorizeRecordPage;
