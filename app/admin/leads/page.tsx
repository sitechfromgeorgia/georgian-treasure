'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  Filter,
  X,
  Loader2,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Bot,
  ArrowDownToLine,
  Pencil,
  Save,
  UserCircle,
  Calendar,
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  tour_id?: string;
  tour_name?: string;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled' | 'completed';
  source: 'website' | 'whatsapp' | 'chatbot' | 'email';
  notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  contacted: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  confirmed: 'bg-green-500/10 text-green-600 dark:text-green-400',
  cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400',
  completed: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

const sourceIcons: Record<string, React.ReactNode> = {
  website: <Globe size={12} />,
  whatsapp: <Phone size={12} />,
  chatbot: <Bot size={12} />,
  email: <Mail size={12} />,
};

export default function LeadsManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (statusFilter) params.set('status', statusFilter);
      if (sourceFilter) params.set('source', sourceFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, statusFilter, sourceFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => { setPage(1); fetchLeads(); }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const saveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteValue }),
      });
      if (res.ok) {
        setEditingNotes(null);
        fetchLeads();
      }
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Tour', 'Status', 'Source', 'Message', 'Notes', 'Created At'];
    const rows = leads.map((l) => [
      l.name,
      l.email || '',
      l.phone,
      l.tour_name || '',
      l.status,
      l.source,
      l.message || '',
      l.notes || '',
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">Leads Management</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Track and manage customer inquiries</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 shadow-sm w-full md:w-64 focus:ring-2 focus:ring-[#D4AF37] outline-none dark:text-white text-sm"
              placeholder="Search leads..."
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
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm"
          >
            <ArrowDownToLine size={16} />
            Export CSV
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
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none"
          >
            <option value="">All Sources</option>
            <option value="website">Website</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="chatbot">Chatbot</option>
            <option value="email">Email</option>
          </select>
          <button
            onClick={() => { setStatusFilter(''); setSourceFilter(''); setSearch(''); setPage(1); }}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-white text-sm flex items-center gap-1"
          >
            <X size={14} /> Clear
          </button>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 dark:text-white/30 text-xs uppercase tracking-[0.15em] font-black border-b border-gray-100 dark:border-white/5">
                <th className="px-5 py-4 font-black">Lead</th>
                <th className="px-5 py-4 font-black">Contact</th>
                <th className="px-5 py-4 font-black">Tour</th>
                <th className="px-5 py-4 font-black">Status</th>
                <th className="px-5 py-4 font-black">Source</th>
                <th className="px-5 py-4 font-black">Notes</th>
                <th className="px-5 py-4 font-black">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 size={28} className="animate-spin text-[#D4AF37] mx-auto" />
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400 dark:text-white/30 text-sm">
                    No leads found. Leads from website, chatbot, and WhatsApp will appear here.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#001F3F] to-[#003366] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {lead.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="font-bold text-[#001F3F] dark:text-white text-sm">{lead.name}</p>
                          {lead.message && (
                            <p className="text-xs text-gray-400 truncate max-w-[200px]">{lead.message}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-white/60">
                          <Phone size={11} /> {lead.phone}
                        </span>
                        {lead.email && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Mail size={11} /> {lead.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-600 dark:text-white/60">
                        {lead.tour_name || <span className="text-gray-300 italic">No tour</span>}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={cn(
                          'px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-0 cursor-pointer outline-none',
                          statusColors[lead.status]
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/40">
                        {sourceIcons[lead.source]}
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-[200px]">
                      {editingNotes === lead.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            value={noteValue}
                            onChange={(e) => setNoteValue(e.target.value)}
                            className="flex-1 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-xs outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            autoFocus
                          />
                          <button
                            onClick={() => saveNotes(lead.id)}
                            className="p-1 rounded hover:bg-green-50 text-green-600"
                          >
                            <Save size={12} />
                          </button>
                          <button
                            onClick={() => setEditingNotes(null)}
                            className="p-1 rounded hover:bg-red-50 text-red-500"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditingNotes(lead.id); setNoteValue(lead.notes || ''); }}
                          className="text-xs text-gray-400 dark:text-white/30 hover:text-[#D4AF37] transition-colors text-left w-full truncate flex items-center gap-1"
                        >
                          {lead.notes || (
                            <span className="flex items-center gap-1 italic">
                              <Pencil size={10} /> Add notes
                            </span>
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={11} />
                        {new Date(lead.created_at).toLocaleDateString()}
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
          <p className="text-xs text-gray-400 dark:text-white/30">{leads.length} leads</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 dark:text-white hover:border-[#D4AF37] transition-all"
            >
              <span className="sr-only">Previous</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="text-sm font-bold text-gray-600 dark:text-white/60 px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-30 dark:text-white hover:border-[#D4AF37] transition-all"
            >
              <span className="sr-only">Next</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
