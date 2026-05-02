'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  Filter,
  X,
  Loader2,
  Calendar,
  Users,
  DollarSign,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface Booking {
  id: string;
  lead_id?: string;
  tour_id: string;
  tour_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  tour_date: string;
  people_count: number;
  total_price_gel: number;
  total_price_usd: number;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'paid';
  special_requests?: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  confirmed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  paid: 'bg-green-500/10 text-green-600 dark:text-green-400',
  completed: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

const paymentColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600',
  partial: 'bg-orange-500/10 text-orange-600',
  paid: 'bg-green-500/10 text-green-600',
};

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/bookings?${params}`);
      const data = await res.json();
      setBookings(data.bookings || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => { setPage(1); fetchBookings(); }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => {
    if (b.status !== 'cancelled') return sum + b.total_price_gel;
    return sum;
  }, 0);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">Bookings</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
            {bookings.length} bookings · Total revenue: {totalRevenue.toLocaleString()} GEL
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 shadow-sm w-full md:w-64 focus:ring-2 focus:ring-[#D4AF37] outline-none dark:text-white text-sm"
              placeholder="Search bookings..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'p-2.5 rounded-xl border transition-all',
              showFilters
                ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
                : 'bg-white dark:bg-zinc-900 text-gray-500 border-gray-200 dark:border-white/10'
            )}
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-white/5 p-4 mb-4 flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => { setStatusFilter(''); setSearch(''); setPage(1); }}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-white text-sm flex items-center gap-1"
          >
            <X size={14} /> Clear
          </button>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 dark:text-white/30 text-xs uppercase tracking-[0.15em] font-black border-b border-gray-100 dark:border-white/5">
                <th className="px-5 py-4 font-black">Customer</th>
                <th className="px-5 py-4 font-black">Tour</th>
                <th className="px-5 py-4 font-black">Date</th>
                <th className="px-5 py-4 font-black">People</th>
                <th className="px-5 py-4 font-black">Price</th>
                <th className="px-5 py-4 font-black">Status</th>
                <th className="px-5 py-4 font-black">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 size={28} className="animate-spin text-[#D4AF37] mx-auto" />
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400 dark:text-white/30 text-sm">
                    No bookings yet. Bookings from leads will appear here.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#001F3F] to-[#003366] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {booking.customer_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="font-bold text-[#001F3F] dark:text-white text-sm">{booking.customer_name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                              <Phone size={9} /> {booking.customer_phone}
                            </span>
                            {booking.customer_email && (
                              <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                                <Mail size={9} /> {booking.customer_email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-white/70">{booking.tour_name}</p>
                      {booking.special_requests && (
                        <p className="text-[10px] text-gray-400 italic truncate max-w-[150px]">{booking.special_requests}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60">
                        <Calendar size={12} /> {new Date(booking.tour_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60">
                        <Users size={12} /> {booking.people_count}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-sm text-[#001F3F] dark:text-white">
                        <DollarSign size={12} className="inline" />{booking.total_price_gel} GEL
                      </p>
                      <p className="text-xs text-gray-400">${booking.total_price_usd}</p>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className={cn(
                          'px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-0 cursor-pointer outline-none',
                          statusColors[booking.status]
                        )}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="paid">Paid</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider',
                        paymentColors[booking.payment_status]
                      )}>
                        <CreditCard size={10} /> {booking.payment_status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-white/5">
          <p className="text-xs text-gray-400 dark:text-white/30">{bookings.length} bookings</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 dark:text-white hover:border-[#D4AF37] transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-bold text-gray-600 dark:text-white/60 px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 dark:text-white hover:border-[#D4AF37] transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
