'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import {
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Map,
  Bell,
  Search,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardStats {
  totalTours: number;
  totalLeads: number;
  newLeadsThisMonth: number;
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  revenueChange: number;
  leadsChange: number;
}

interface RecentLead {
  id: string;
  name: string;
  phone: string;
  tour_name: string;
  status: string;
  source: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-600',
  contacted: 'bg-yellow-500/10 text-yellow-600',
  confirmed: 'bg-green-500/10 text-green-600',
  cancelled: 'bg-red-500/10 text-red-600',
  completed: 'bg-purple-500/10 text-purple-600',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTours: 0,
    totalLeads: 0,
    newLeadsThisMonth: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    revenueChange: 12.5,
    leadsChange: 8.2,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [leadsChartData, setLeadsChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const supabase = createBrowserSupabaseClient();

        const { count: toursTotal, error: toursError } = await supabase
          .from('tours')
          .select('*', { count: 'exact', head: true });
        if (toursError) throw toursError;

        const { data: leads, count: leadsTotal, error: leadsError } = await supabase
          .from('leads')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(50);
        if (leadsError) throw leadsError;

        const { data: bookings, count: bookingsTotal, error: bookingsError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(50);
        if (bookingsError) throw bookingsError;

        // Calculate this month's leads
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        const newLeadsThisMonth = (leads || []).filter((l: any) => {
          const d = new Date(l.created_at);
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        }).length;

        const totalRevenue = (bookings || []).reduce((sum: number, b: any) => {
          if (b.status === 'confirmed' || b.status === 'paid' || b.status === 'completed') {
            return sum + (b.total_price_gel || 0);
          }
          return sum;
        }, 0);

        setStats({
          totalTours: toursTotal || 0,
          totalLeads: leadsTotal || 0,
          newLeadsThisMonth,
          totalBookings: bookingsTotal || 0,
          pendingBookings: (bookings || []).filter((b: any) => b.status === 'pending').length,
          totalRevenue,
          revenueChange: 12.5,
          leadsChange: 8.2,
        });

        setRecentLeads((leads || []).slice(0, 8));

        const chartData: Record<string, number> = {};
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          chartData[key] = 0;
        }

        (leads || []).forEach((lead: any) => {
          const d = new Date(lead.created_at);
          const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (chartData[key] !== undefined) {
            chartData[key]++;
          }
        });

        setLeadsChartData(
          Object.entries(chartData).map(([date, count]) => ({ date, count }))
        );
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: 'Total Tours',
      value: stats.totalTours,
      icon: Map,
      color: 'bg-blue-500',
      change: null,
    },
    {
      label: 'Leads This Month',
      value: stats.newLeadsThisMonth,
      icon: Users,
      color: 'bg-orange-500',
      change: stats.leadsChange,
    },
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-purple-500',
      change: null,
    },
    {
      label: 'Revenue (GEL)',
      value: stats.totalRevenue.toLocaleString(),
      icon: DollarSign,
      color: 'bg-green-500',
      change: stats.revenueChange,
    },
  ];

  const quickActions = [
    { label: 'Add New Tour', href: '/admin/tours', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'View Leads', href: '/admin/leads', color: 'bg-orange-500 hover:bg-orange-600' },
    { label: 'Manage Bookings', href: '/admin/bookings', color: 'bg-purple-500 hover:bg-purple-600' },
    { label: 'Chatbot Settings', href: '/admin/chatbot', color: 'bg-emerald-500 hover:bg-emerald-600' },
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#001F3F] dark:text-white tracking-tight">
            Welcome back, Giorgi!
          </h1>
          <p className="text-gray-500 dark:text-white/40 mt-1 text-sm">
            Here&apos;s what&apos;s happening with Georgian Treasure today.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 shadow-sm w-full md:w-64 focus:ring-2 focus:ring-[#D4AF37] outline-none dark:text-white text-sm"
              placeholder="Search..."
            />
          </div>
          <button className="bg-white dark:bg-zinc-900 p-2.5 rounded-xl shadow-sm relative text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/10 hover:border-[#D4AF37]/30 transition-all">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
          </button>
          <div className="w-10 h-10 rounded-xl gold-gradient border-2 border-white dark:border-zinc-800 shadow-lg flex items-center justify-center">
            <span className="text-[#001F3F] font-black text-sm">G</span>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="animate-spin text-[#D4AF37]" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 group hover:border-[#D4AF37]/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg', stat.color)}>
                    <stat.icon size={22} />
                  </div>
                  {stat.change !== null && (
                    <span className={cn(
                      'flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full',
                      stat.change >= 0 ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                    )}>
                      {stat.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {Math.abs(stat.change)}%
                    </span>
                  )}
                </div>
                <p className="text-gray-500 dark:text-white/40 text-xs font-bold uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <h4 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">
                  {stat.value}
                </h4>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-sm transition-all flex items-center gap-2',
                  action.color
                )}
              >
                {action.label}
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leads Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-[#001F3F] dark:text-white tracking-tight">
                  Leads Over Time
                </h3>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Last 30 Days</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={leadsChartData}>
                  <defs>
                    <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#999' }}
                    tickLine={false}
                    axisLine={false}
                    interval={4}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#999' }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#D4AF37"
                    strokeWidth={2}
                    fill="url(#leadsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Leads */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-[#001F3F] dark:text-white tracking-tight">
                  Recent Leads
                </h3>
                <Link href="/admin/leads" className="text-[#D4AF37] text-xs font-black flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                {recentLeads.length === 0 ? (
                  <p className="text-center text-gray-400 dark:text-white/30 text-sm py-8">
                    No leads yet. Leads from chatbot and website will appear here.
                  </p>
                ) : (
                  recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#001F3F] to-[#003366] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {lead.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#001F3F] dark:text-white text-sm truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-white/30 truncate">
                          {lead.tour_name || 'General inquiry'} · {lead.phone}
                        </p>
                      </div>
                      <span className={cn(
                        'px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex-shrink-0',
                        statusColors[lead.status] || 'bg-gray-100 text-gray-500'
                      )}>
                        {lead.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
