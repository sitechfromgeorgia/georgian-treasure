'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Map,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Tours', icon: Map, href: '/admin/tours' },
  { label: 'Leads', icon: Users, href: '/admin/leads' },
  { label: 'Bookings', icon: Calendar, href: '/admin/bookings' },
  { label: 'Blog', icon: BookOpen, href: '/admin/blog' },
  { label: 'Chatbot', icon: MessageSquare, href: '/admin/chatbot' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading, logout } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [isLoading, user, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001F3F]">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-[#001F3F] dark:bg-black text-white flex flex-col border-r border-white/5 transition-all duration-300 fixed h-full z-40',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className={cn('p-6 flex items-center gap-3', sidebarCollapsed && 'justify-center p-4')}>
          <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-[#001F3F]" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <div className="text-xl font-black tracking-tighter text-white">GT ADMIN</div>
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Georgian Treasure</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative',
                  isActive
                    ? 'bg-[#D4AF37] text-[#001F3F] font-bold shadow-lg shadow-[#D4AF37]/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5',
                  sidebarCollapsed && 'justify-center px-2'
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-[#001F3F] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info + Bottom Actions */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {!sidebarCollapsed && user && (
            <div className="px-3 py-2 text-xs text-white/40 truncate">
              {user.email}
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> <span className="text-sm">Collapse</span></>}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        )}
      >
        {children}
      </main>
    </div>
  );
}
