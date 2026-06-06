import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getStats } from '../services/dashboard';
import { getOrders, updateOrderStatus } from '../services/orders';
import MetricCard from '../components/dashboard/MetricCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import KanbanBoard from '../components/dashboard/KanbanBoard';
import { SkeletonCards, SkeletonChart, SkeletonTable } from '../components/ui/Skeleton';
import './DashboardPage.css';

// SVG Icons for Metric Cards
const ProductIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const CustomerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const OrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export default function DashboardPage() {
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getStats,
  });

  const { data: orders, isLoading: ordersLoading, error: ordersError } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: (data) => {
      toast.success(`Order #${data.id} marked as ${data.status}`);
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['dashboardStats']);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update order status');
    },
  });

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const isLoading = statsLoading || ordersLoading;
  const isError = statsError || ordersError;

  // Calculate total revenue from orders for Primary KPI
  const totalRevenue = orders 
    ? orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
    : 0;

  if (isError) {
    return (
      <div className="container">
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Failed to Load Dashboard</h2>
          <p className="text-secondary">Please check if the backend API server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Layered Header Section */}
      <div className="dashboard-header-layer">
        <div className="container dashboard-header-content">
          <div>
            <h1 className="dashboard-title">Dashboard Overview</h1>
            <p className="dashboard-subtitle">Real-time metrics, status kanban, and revenue flow</p>
          </div>
          <div className="system-status-pill">
            <span className="status-dot"></span>
            System Health: Optimal
          </div>
        </div>
      </div>

      <div className="container dashboard-content-layer">
        {isLoading ? (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <SkeletonCards />
            </div>
            <div style={{ marginBottom: '2.5rem' }}>
              <SkeletonChart />
            </div>
            <div>
              <SkeletonTable rows={4} cols={3} />
            </div>
          </>
        ) : (
          <>
            {/* Layered KPI Metrics */}
            <div className="dashboard-stats-container">
              {/* Primary Massive KPI */}
              <div className="primary-kpi-wrapper">
                <MetricCard
                  label="Total Revenue"
                  value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  subtext="Cumulative gross income"
                  icon={null}
                  type="primary"
                  variant="primary"
                />
              </div>

              {/* Secondary Pill KPIs */}
              <div className="secondary-kpis-wrapper">
                <MetricCard
                  label="Products"
                  value={stats.total_products}
                  icon={<ProductIcon />}
                  type="info"
                  variant="pill"
                />
                <MetricCard
                  label="Customers"
                  value={stats.total_customers}
                  icon={<CustomerIcon />}
                  type="success"
                  variant="pill"
                />
                <MetricCard
                  label="Orders"
                  value={stats.total_orders}
                  icon={<OrderIcon />}
                  type="info"
                  variant="pill"
                />
                <MetricCard
                  label="Low Stock"
                  value={stats.low_stock.length}
                  icon={<WarningIcon />}
                  type={stats.low_stock.length > 0 ? 'warning' : 'success'}
                  variant="pill"
                />
              </div>
            </div>

            {/* Revenue Chart with Depth */}
            <div className="dashboard-chart-section">
              <RevenueChart orders={orders} />
            </div>

            {/* Kanban Board */}
            <div className="dashboard-kanban-section">
              <div className="kanban-header">
                <div>
                  <h2 className="dashboard-section-title">Order Pipeline</h2>
                  <p className="dashboard-section-subtitle">Drag and drop orders to update their fulfillment state</p>
                </div>
              </div>
              <KanbanBoard orders={orders} onStatusChange={handleStatusChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
