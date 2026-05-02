'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Filter,
  X,
  Loader2,
  MapPin,
  Tag,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
} from 'lucide-react';

interface Tour {
  id: string;
  slug: string;
  region: string;
  category: string;
  duration: string;
  duration_hours: number;
  price_gel: number;
  price_usd: number;
  max_group_size: number;
  difficulty: string;
  featured: boolean;
  languages: string[];
  images: string[];
  includes: string[];
  not_includes: string[];
  what_to_bring: string[];
  translations: Record<string, any>;
  created_at: string;
}

const REGIONS = ['adjara', 'tbilisi', 'kakheti', 'kazbegi', 'svaneti', 'west', 'samtskhe', 'imereti', 'racha', 'guria', 'samegrelo', 'tusheti'];
const CATEGORIES = ['city', 'mountain', 'wine', 'adventure', 'cultural', 'food', 'transfer', 'custom'];

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/10 text-green-600',
  moderate: 'bg-yellow-500/10 text-yellow-600',
  challenging: 'bg-orange-500/10 text-orange-600',
  extreme: 'bg-red-500/10 text-red-600',
};

export default function ToursManagement() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTours, setSelectedTours] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const limit = 20;

  const fetchTours = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (regionFilter) params.set('region', regionFilter);
      if (categoryFilter) params.set('category', categoryFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/tours?${params}`);
      const data = await res.json();
      setTours(data.tours || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [page, regionFilter, categoryFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchTours();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const toggleSelect = (id: string) => {
    setSelectedTours((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedTours.size === tours.length) {
      setSelectedTours(new Set());
    } else {
      setSelectedTours(new Set(tours.map((t) => t.id)));
    }
  };

  const deleteTour = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    try {
      const res = await fetch(`/api/tours/${slug}`, { method: 'DELETE' });
      if (res.ok) fetchTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedTours.size} selected tours?`)) return;
    // Sequential delete to avoid overwhelming the server
    const toDelete = tours.filter((t) => selectedTours.has(t.id));
    for (const tour of toDelete) {
      await fetch(`/api/tours/${tour.slug}`, { method: 'DELETE' });
    }
    setSelectedTours(new Set());
    fetchTours();
  };

  const filteredTours = useMemo(() => tours, [tours]);

  const getTitle = (tour: Tour) => {
    return tour.translations?.en?.title || tour.translations?.ka?.title || tour.slug;
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">Tours Management</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage all {tours.length} tours across 12 regions</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 shadow-sm w-full md:w-64 focus:ring-2 focus:ring-[#D4AF37] outline-none dark:text-white text-sm"
              placeholder="Search tours..."
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
          <button
            onClick={() => { setEditingTour(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#001F3F] hover:bg-[#003366] text-white rounded-xl font-bold text-sm transition-all shadow-sm"
          >
            <Plus size={16} />
            Add Tour
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-white/5 p-4 mb-4 flex flex-wrap gap-3">
          <select
            value={regionFilter}
            onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
          >
            <option value="">All Regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <button
            onClick={() => { setRegionFilter(''); setCategoryFilter(''); setSearch(''); setPage(1); }}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-white text-sm flex items-center gap-1"
          >
            <X size={14} /> Clear
          </button>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedTours.size > 0 && (
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl p-3 mb-4 flex items-center justify-between">
          <span className="text-sm font-bold text-[#001F3F] dark:text-[#D4AF37]">
            {selectedTours.size} tour(s) selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-all flex items-center gap-1"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Tours Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 dark:text-white/30 text-xs uppercase tracking-[0.15em] font-black border-b border-gray-100 dark:border-white/5">
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={selectedTours.size === tours.length && tours.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </th>
                <th className="px-5 py-4 font-black">Tour</th>
                <th className="px-5 py-4 font-black">Region</th>
                <th className="px-5 py-4 font-black">Category</th>
                <th className="px-5 py-4 font-black">Price</th>
                <th className="px-5 py-4 font-black">Duration</th>
                <th className="px-5 py-4 font-black">Difficulty</th>
                <th className="px-5 py-4 font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <Loader2 size={28} className="animate-spin text-[#D4AF37] mx-auto" />
                  </td>
                </tr>
              ) : filteredTours.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-400 dark:text-white/30 text-sm">
                    No tours found. Try adjusting filters or add a new tour.
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour) => (
                  <tr key={tour.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTours.has(tour.id)}
                        onChange={() => toggleSelect(tour.id)}
                        className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#001F3F] to-[#003366] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {tour.images?.[0] ? (
                            <img src={tour.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <MapPin size={16} className="text-white/60" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[#001F3F] dark:text-white text-sm">{getTitle(tour)}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {tour.featured && (
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#D4AF37]">
                                <Star size={10} fill="#D4AF37" /> Featured
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400">{tour.languages?.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60">
                        <MapPin size={12} /> {tour.region}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60">
                        <Tag size={10} /> {tour.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-sm text-[#001F3F] dark:text-white">{tour.price_gel} GEL</p>
                      <p className="text-xs text-gray-400">${tour.price_usd}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60">
                        <Clock size={12} /> {tour.duration}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        'px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider',
                        difficultyColors[tour.difficulty] || 'bg-gray-100 text-gray-500'
                      )}>
                        {tour.difficulty}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setEditingTour(tour); setShowForm(true); }}
                          className="p-1.5 rounded-lg hover:bg-[#D4AF37]/10 text-gray-400 hover:text-[#D4AF37] transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteTour(tour.slug)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-white/5">
          <p className="text-xs text-gray-400 dark:text-white/30">
            Showing {tours.length} tours
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 dark:text-white hover:border-[#D4AF37] transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-sm font-bold text-gray-600 dark:text-white/60 px-2">
              Page {page} of {totalPages}
            </span>
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
