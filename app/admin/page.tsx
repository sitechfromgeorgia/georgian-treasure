'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Smartphone, 
  Map, 
  Bell,
  Search,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(saved);
  }, []);

  const stats = [
    { label: 'Total Bookings', value: bookings.length + 128, icon: <Calendar />, color: 'bg-blue-500' },
    { label: 'Total Revenue', value: '$4,250', icon: <DollarSign />, color: 'bg-green-500' },
    { label: 'Popular Tour', value: 'Mountainous Adjara', icon: <TrendingUp />, color: 'bg-purple-500' },
    { label: 'New Inquiries', value: '12', icon: <Users />, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-64 bg-primary dark:bg-black text-white p-8 hidden lg:flex flex-col border-r border-white/5">
        <div className="text-2xl font-black text-accent mb-12 tracking-tighter">GT ADMIN</div>
        <nav className="space-y-6 flex-1">
          <div className="p-3.5 bg-accent text-primary rounded-2xl flex items-center gap-3 font-bold shadow-lg shadow-accent/20">
            <Smartphone size={20} />
            <span>Dashboard</span>
          </div>
          <div className="p-3.5 hover:bg-white/5 rounded-2xl flex items-center gap-3 transition-all text-white/60 hover:text-white">
            <Calendar size={20} />
            <span>Bookings</span>
          </div>
          <div className="p-3.5 hover:bg-white/5 rounded-2xl flex items-center gap-3 transition-all text-white/60 hover:text-white">
            <Map size={20} />
            <span>Tours</span>
          </div>
          <div className="p-3.5 hover:bg-white/5 rounded-2xl flex items-center gap-3 transition-all text-white/60 hover:text-white">
            <Users size={20} />
            <span>Clients</span>
          </div>
        </nav>

        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold">
          <ArrowLeft size={16} />
          Back to Site
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary dark:text-white tracking-tight">Welcome back, Giorgi!</h1>
            <p className="text-gray-500 dark:text-white/40 mt-1">Here&apos;s what&apos;s happening with Georgian Treasure today.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                className="bg-white dark:bg-zinc-900 border-none rounded-2xl pl-12 pr-4 py-3 shadow-sm w-full md:w-64 focus:ring-2 focus:ring-accent outline-none dark:text-white" 
                placeholder="Search..." 
              />
            </div>
            <button className="bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm relative text-gray-500 dark:text-white/40 border border-gray-100 dark:border-white/5">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </button>
            <div className="w-12 h-12 rounded-2xl gold-gradient border-2 border-white dark:border-zinc-800 shadow-xl" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-white/5 group hover:border-accent/20 transition-all">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform", stat.color)}>
                {React.cloneElement(stat.icon as React.ReactElement, { size: 28 })}
              </div>
              <p className="text-gray-500 dark:text-white/40 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-3xl font-black text-primary dark:text-white mt-2 tracking-tighter">{stat.value}</h4>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white dark:bg-zinc-900 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/5 p-8 lg:p-10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight">Recent Bookings</h3>
            <button className="text-accent font-black flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 dark:text-white/20 text-xs uppercase tracking-[0.2em] font-black border-b border-gray-50 dark:border-white/5">
                  <th className="pb-6 font-black">Client</th>
                  <th className="pb-6 font-black">Tour</th>
                  <th className="pb-6 font-black">Date</th>
                  <th className="pb-6 font-black">People</th>
                  <th className="pb-6 font-black">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {bookings.length > 0 ? bookings.map((b, i) => (
                  <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-6">
                      <p className="font-black text-primary dark:text-white">{b.name}</p>
                      <p className="text-xs text-gray-500 dark:text-white/30">{b.phone}</p>
                    </td>
                    <td className="py-6 text-gray-600 dark:text-white/60 font-medium">{b.tour}</td>
                    <td className="py-6 text-gray-600 dark:text-white/60 font-medium">{b.date}</td>
                    <td className="py-6 text-gray-600 dark:text-white/60 font-medium">{b.people}</td>
                    <td className="py-6">
                      <span className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">New</span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td className="py-12 text-center text-gray-400 dark:text-white/20 font-medium" colSpan={5}>
                      No live bookings yet. Use the website form to see them here!
                    </td>
                  </tr>
                )}
                <tr className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors opacity-50">
                  <td className="py-6">
                    <p className="font-black text-primary dark:text-white">Sample Tourist</p>
                    <p className="text-xs text-gray-500">+995 555 123 456</p>
                  </td>
                  <td className="py-6 text-gray-600 dark:text-white/60 font-medium">Mountainous Adjara</td>
                  <td className="py-6 text-gray-600 dark:text-white/60 font-medium">2026-02-15</td>
                  <td className="py-4 text-gray-600 dark:text-white/60 font-medium">2</td>
                  <td className="py-4">
                    <span className="bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">Demo</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
