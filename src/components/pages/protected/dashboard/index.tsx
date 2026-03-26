import React, { useMemo, useState } from 'react';

type EventBar = { color: string; label?: string };

const COLORS = ['bg-amber-400', 'bg-emerald-400', 'bg-sky-400', 'bg-pink-400', 'bg-violet-400'];

// Generate deterministic-ish dummy events for a given month to keep UI stable during session
const generateDummySchedule = (daysInMonth: number, seed = 42) => {
  const map: Record<number, EventBar[]> = {};
  for (let d = 1; d <= daysInMonth; d++) {
    const n = (d + seed) % 3; // 0..2 bars per day in a predictable pattern
    map[d] = Array.from({ length: n }).map((_, i) => ({
      color: COLORS[(d + i) % COLORS.length].replace('bg-', '#'),
    }));
  }
  return map;
};

const Donut = ({
  percent,
  size = 88,
  stroke = 12,
  color = '#10B981',
}: {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;
  return (
    <svg width={size} height={size} className="mx-auto">
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} fill="none" stroke="#0f1724" strokeWidth={stroke} />
        <circle
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90)"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          className="text-sm font-semibold text-white"
          style={{ fontSize: 14 }}
        >
          {Math.round(percent)}%
        </text>
      </g>
    </svg>
  );
};

const CalendarGrid = ({ year, month }: { year: number; month: number }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekDay = first.getDay(); // 0 Sun .. 6 Sat
  const events = useMemo(() => generateDummySchedule(daysInMonth), [daysInMonth]);

  const cells: Array<number | null> = [];
  for (let i = 0; i < startWeekDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const legends = [
    { name: 'Unsweetened Chocolate', color: '#F59E0B' },
    { name: 'Milk Chocolate', color: '#34D399' },
    { name: 'Dark Chocolate', color: '#60A5FA' },
    { name: 'White Chocolate', color: '#FB7185' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">Production Schedule</h3>
          <p className="text-sm text-gray-500">{`${first.toLocaleString('default', { month: 'long' })} ${year}`}</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded text-sm">Today</button>
          <button className="px-3 py-1 border rounded text-sm">Prev</button>
          <button className="px-3 py-1 border rounded text-sm">Next</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="grid grid-cols-7 gap-2 text-xs mb-2">
            {weekday.map((w) => (
              <div key={w} className="text-center text-gray-500 font-medium">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {cells.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(c)}
                className={`relative min-h-18 rounded border border-gray-100 p-2 text-left hover:shadow-md transition-colors bg-white ${c ? 'cursor-pointer' : 'bg-transparent'} `}
              >
                {c ? (
                  <>
                    <div className="text-xs text-gray-400">{c}</div>
                    <div className="absolute left-2 right-2 bottom-2 flex items-end gap-1">
                      {(events[c] || []).length ? (
                        (events[c] || []).map((ev, i) => (
                          <div
                            key={i}
                            className="h-1 rounded-full"
                            style={{ flex: 1, background: ev.color }}
                          />
                        ))
                      ) : (
                        <div className="text-xs text-gray-300">&nbsp;</div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-200">&nbsp;</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <aside className="w-full md:w-56">
          <div className="bg-gray-50 rounded p-3">
            <h4 className="text-sm font-medium mb-2">Legend</h4>
            <ul className="space-y-2 text-sm">
              {legends.map((l) => (
                <li key={l.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                  <span className="text-gray-600">{l.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <h4 className="text-sm font-medium">Selected</h4>
              <div className="mt-2 text-sm text-gray-600">
                {selected ? `Day ${selected}` : 'No day selected'}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const StatCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow p-4 text-gray-800">{children}</div>
);

const Dashboard = () => {
  const now = new Date();
  const productionPercent = 100; // dummy
  const activeMachines = 17;
  const totalMachines = 20;
  const downtime = [
    { label: 'Cleaning', minutes: 148, color: '#60A5FA' },
    { label: 'Maintenance', minutes: 74, color: '#FB7185' },
    { label: 'Unplanned', minutes: 84, color: '#F59E0B' },
  ];

  return (
    <div className="p-6 space-y-6">
      <CalendarGrid year={now.getFullYear()} month={now.getMonth()} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-500">Production Volume</h4>
              <div className="text-3xl font-bold mt-2">9,040 kg</div>
              <div className="text-sm text-green-500 mt-1">+3.6% vs target</div>
            </div>
            <Donut percent={productionPercent} color="#10B981" />
          </div>
        </StatCard>

        <StatCard>
          <h4 className="text-sm text-gray-500">Downtime</h4>
          <div className="mt-3 space-y-3">
            {downtime.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{d.label}</span>
                  <span className="text-xs">
                    {Math.floor(d.minutes / 60)}h {d.minutes % 60}m
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded h-3">
                  <div
                    className="h-3 rounded"
                    style={{ width: `${(d.minutes / 480) * 100}%`, background: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        <StatCard>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-500">Machines Active</h4>
              <div className="text-3xl font-bold mt-2">
                {activeMachines} / {totalMachines}
              </div>
              <div className="text-sm text-gray-400 mt-1">Live</div>
            </div>
            <Donut percent={(activeMachines / totalMachines) * 100} color="#3B82F6" />
          </div>
        </StatCard>
      </div>
    </div>
  );
};

export default Dashboard;
