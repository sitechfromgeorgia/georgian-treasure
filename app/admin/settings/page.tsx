'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Save,
  RefreshCw,
  Phone,
  Mail,
  Globe,
  CreditCard,
  MessageCircle,
  CheckCircle,
  Settings2,
  Share2,
  Search,
  DollarSign,
} from 'lucide-react';

interface SiteSettings {
  company_name: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  telegram_url: string;
  default_seo_title: string;
  default_seo_description: string;
  default_keywords: string;
  currency_primary: string;
  currency_secondary: string;
  payment_methods: string[];
  whatsapp_message: string;
  group_discount_threshold: number;
  group_discount_percent: number;
}

const defaultSettings: SiteSettings = {
  company_name: 'Georgian Treasure',
  contact_phone: '+995 599 033 319',
  contact_whatsapp: '+995 599 033 319',
  contact_email: 'info@georgiantreasure.ge',
  address: 'Batumi, Adjara, Georgia',
  facebook_url: 'https://facebook.com/georgiantreasure',
  instagram_url: 'https://instagram.com/georgiantreasure',
  youtube_url: '',
  telegram_url: '',
  default_seo_title: 'Georgian Treasure - Tours in Georgia | Batumi, Tbilisi, Kakheti',
  default_seo_description: 'Discover Georgia with Georgian Treasure. Premium tours in Batumi, Tbilisi, Kakheti wine region, Kazbegi mountains, and Svaneti. Professional guides, best prices.',
  default_keywords: 'Georgia tours, Batumi tours, Tbilisi tours, Kakheti wine tour, Kazbegi, Svaneti, Georgian Treasure',
  currency_primary: 'GEL',
  currency_secondary: 'USD',
  payment_methods: ['cash', 'bank_transfer', 'wise'],
  whatsapp_message: 'Hello! I am interested in booking a tour with Georgian Treasure.',
  group_discount_threshold: 6,
  group_discount_percent: 15,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage (in production, this would come from Supabase)
    const saved = localStorage.getItem('gt_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch { /* ignore */ }
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    // In production: save to Supabase
    localStorage.setItem('gt_settings', JSON.stringify(settings));
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage site configuration and defaults</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all',
            saving
              ? 'bg-gray-100 text-gray-400 cursor-wait'
              : 'bg-[#001F3F] hover:bg-[#003366] text-white shadow-sm'
          )}
        >
          {saving ? <RefreshCw size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Phone size={18} className="text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#001F3F] dark:text-white">Contact Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Company Name</label>
              <input
                value={settings.company_name}
                onChange={(e) => updateField('company_name', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Phone</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={settings.contact_phone}
                    onChange={(e) => updateField('contact_phone', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">WhatsApp</label>
                <div className="relative">
                  <MessageCircle size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={settings.contact_whatsapp}
                    onChange={(e) => updateField('contact_whatsapp', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={settings.contact_email}
                  onChange={(e) => updateField('contact_email', e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Address</label>
              <input
                value={settings.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Share2 size={18} className="text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#001F3F] dark:text-white">Social Links</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Facebook</label>
              <input
                value={settings.facebook_url}
                onChange={(e) => updateField('facebook_url', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Instagram</label>
              <input
                value={settings.instagram_url}
                onChange={(e) => updateField('instagram_url', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">YouTube</label>
              <input
                value={settings.youtube_url}
                onChange={(e) => updateField('youtube_url', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Telegram</label>
              <input
                value={settings.telegram_url}
                onChange={(e) => updateField('telegram_url', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="https://t.me/..."
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Search size={18} className="text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#001F3F] dark:text-white">SEO Defaults</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Default Title</label>
              <input
                value={settings.default_seo_title}
                onChange={(e) => updateField('default_seo_title', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Default Description</label>
              <textarea
                value={settings.default_seo_description}
                onChange={(e) => updateField('default_seo_description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Default Keywords</label>
              <input
                value={settings.default_keywords}
                onChange={(e) => updateField('default_keywords', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard size={18} className="text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#001F3F] dark:text-white">Payment Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Primary Currency</label>
                <select
                  value={settings.currency_primary}
                  onChange={(e) => updateField('currency_primary', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="GEL">GEL (Georgian Lari)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Secondary Currency</label>
                <select
                  value={settings.currency_secondary}
                  onChange={(e) => updateField('currency_secondary', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="USD">USD (US Dollar)</option>
                  <option value="GEL">GEL (Georgian Lari)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Group Discount Min</label>
                <input
                  type="number"
                  value={settings.group_discount_threshold}
                  onChange={(e) => updateField('group_discount_threshold', parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Discount %</label>
                <input
                  type="number"
                  value={settings.group_discount_percent}
                  onChange={(e) => updateField('group_discount_percent', parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">WhatsApp Default Message</label>
              <textarea
                value={settings.whatsapp_message}
                onChange={(e) => updateField('whatsapp_message', e.target.value)}
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
