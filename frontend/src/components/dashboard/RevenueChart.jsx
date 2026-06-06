import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './RevenueChart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip glass-tooltip">
        <p className="chart-tooltip-date">{label}</p>
        <div className="tooltip-metrics">
          <p className="chart-tooltip-value">
            <span className="tooltip-dot primary"></span>
            Revenue: ${parseFloat(payload[0]?.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {payload[1] && (
            <p className="chart-tooltip-trend">
              <span className="tooltip-dot secondary"></span>
              Average: ${parseFloat(payload[1].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ orders = [] }) {
  const chartData = useMemo(() => {
    const grouped = {};
    const sortedOrders = [...orders].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    sortedOrders.forEach((order) => {
      if (!order.created_at || order.status === 'cancelled') return;
      const dateObj = new Date(order.created_at);
      const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      grouped[dateStr] = (grouped[dateStr] || 0) + parseFloat(order.total_amount);
    });

    const data = Object.keys(grouped).map((date) => ({
      date,
      revenue: grouped[date],
    }));

    if (data.length === 0) return [{ date: 'No Orders', revenue: 0, average: 0 }];

    // Calculate moving average or simple average for the trend line
    const totalRev = data.reduce((sum, d) => sum + d.revenue, 0);
    const avg = totalRev / data.length;

    return data.map(d => ({ ...d, average: avg }));
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);
  }, [orders]);

  return (
    <div className="revenue-chart-card elevated-chart">
      <div className="revenue-chart-header">
        <h3 className="revenue-chart-title">Revenue Flow Analysis</h3>
        <span className="revenue-chart-subtitle">
          Total Cumulative: <strong className="highlight-text">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </strong>
        </span>
      </div>

      <div className="revenue-chart-body">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            <Line type="monotone" dataKey="average" stroke="rgba(16, 185, 129, 0.5)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
