'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Tag,
  Calendar,
  User,
  Save,
  X,
  FileText,
  Globe,
} from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  keywords: string;
  published: boolean;
  translations: Record<string, {
    title: string;
    content: string;
    excerpt: string;
  }>;
  created_at: string;
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form state
  const [formSlug, setFormSlug] = useState('');
  const [formAuthor, setFormAuthor] = useState('Giorgi');
  const [formCategory, setFormCategory] = useState('general');
  const [formImage, setFormImage] = useState('/blog/default.jpg');
  const [formTags, setFormTags] = useState('');
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDesc, setFormSeoDesc] = useState('');
  const [formKeywords, setFormKeywords] = useState('');
  const [formPublished, setFormPublished] = useState(false);
  const [formTranslations, setFormTranslations] = useState<Record<string, { title: string; content: string; excerpt: string }>>({
    en: { title: '', content: '', excerpt: '' },
    ka: { title: '', content: '', excerpt: '' },
    ru: { title: '', content: '', excerpt: '' },
  });
  const [activeLang, setActiveLang] = useState('en');

  const limit = 20;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (search) params.set('search', search);

      const res = await fetch(`/api/blog?${params}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const timeout = setTimeout(() => { setPage(1); fetchPosts(); }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const resetForm = () => {
    setFormSlug('');
    setFormAuthor('Giorgi');
    setFormCategory('general');
    setFormImage('/blog/default.jpg');
    setFormTags('');
    setFormSeoTitle('');
    setFormSeoDesc('');
    setFormKeywords('');
    setFormPublished(false);
    setFormTranslations({ en: { title: '', content: '', excerpt: '' }, ka: { title: '', content: '', excerpt: '' }, ru: { title: '', content: '', excerpt: '' } });
    setEditingPost(null);
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormSlug(post.slug);
    setFormAuthor(post.author);
    setFormCategory(post.category);
    setFormImage(post.image);
    setFormTags(post.tags?.join(', ') || '');
    setFormSeoTitle(post.seo_title || '');
    setFormSeoDesc(post.seo_description || '');
    setFormKeywords(post.keywords || '');
    setFormPublished(post.published);
    setFormTranslations(post.translations || {});
    setShowForm(true);
  };

  const handleSubmit = async () => {
    const payload = {
      slug: formSlug,
      author: formAuthor,
      date: new Date().toISOString().split('T')[0],
      image: formImage,
      category: formCategory,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
      seo_title: formSeoTitle,
      seo_description: formSeoDesc,
      keywords: formKeywords,
      published: formPublished,
      translations: formTranslations,
    };

    try {
      const url = editingPost ? `/api/blog/${editingPost.slug}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowForm(false);
        resetForm();
        fetchPosts();
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      if (res.ok) fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, published: !post.published }),
      });
      if (res.ok) fetchPosts();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ka', label: 'Georgian' },
    { code: 'ru', label: 'Russian' },
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">Blog Management</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Create and manage blog posts</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 shadow-sm w-full md:w-64 focus:ring-2 focus:ring-[#D4AF37] outline-none dark:text-white text-sm"
              placeholder="Search posts..."
            />
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#001F3F] hover:bg-[#003366] text-white rounded-xl font-bold text-sm transition-all shadow-sm"
          >
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      {!showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 dark:text-white/30 text-xs uppercase tracking-[0.15em] font-black border-b border-gray-100 dark:border-white/5">
                  <th className="px-5 py-4 font-black">Post</th>
                  <th className="px-5 py-4 font-black">Category</th>
                  <th className="px-5 py-4 font-black">Author</th>
                  <th className="px-5 py-4 font-black">Status</th>
                  <th className="px-5 py-4 font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="py-16 text-center"><Loader2 size={28} className="animate-spin text-[#D4AF37] mx-auto" /></td></tr>
                ) : posts.length === 0 ? (
                  <tr><td colSpan={5} className="py-16 text-center text-gray-400 dark:text-white/30 text-sm">No blog posts yet.</td></tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {post.image ? (
                              <img src={post.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <FileText size={18} className="text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#001F3F] dark:text-white text-sm">{post.translations?.en?.title || post.slug}</p>
                            <p className="text-[10px] text-gray-400">/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 flex items-center gap-1 w-fit">
                          <Tag size={10} /> {post.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/40">
                          <User size={11} /> {post.author}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => togglePublish(post)}
                          className={cn(
                            'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all',
                            post.published
                              ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          )}
                        >
                          {post.published ? <Eye size={10} /> : <EyeOff size={10} />}
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => startEdit(post)} className="p-1.5 rounded-lg hover:bg-[#D4AF37]/10 text-gray-400 hover:text-[#D4AF37] transition-all">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => deletePost(post.slug)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all">
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
        </div>
      )}

      {/* Blog Post Form */}
      {showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-[#001F3F] dark:text-white">
              {editingPost ? 'Edit Post' : 'New Blog Post'}
            </h2>
            <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Slug</label>
                <input value={formSlug} onChange={(e) => setFormSlug(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="post-slug" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Category</label>
                <input value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="general" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Author</label>
                <input value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Image URL</label>
                <input value={formImage} onChange={(e) => setFormImage(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Tags (comma-separated)</label>
                <input value={formTags} onChange={(e) => setFormTags(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="wine, travel, tips" />
              </div>
            </div>

            {/* SEO Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">SEO Title</label>
                <input value={formSeoTitle} onChange={(e) => setFormSeoTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">SEO Description</label>
                <input value={formSeoDesc} onChange={(e) => setFormSeoDesc(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Keywords</label>
              <input value={formKeywords} onChange={(e) => setFormKeywords(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="georgia travel, tbilisi tours, wine..." />
            </div>

            {/* Language Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-1 w-fit">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-bold transition-all',
                    activeLang === lang.code
                      ? 'bg-white dark:bg-zinc-700 text-[#001F3F] dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-white/40 hover:text-gray-700'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Translation Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Title ({activeLang})</label>
                <input
                  value={formTranslations[activeLang]?.title || ''}
                  onChange={(e) => setFormTranslations((prev) => ({ ...prev, [activeLang]: { ...prev[activeLang], title: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Excerpt ({activeLang})</label>
                <input
                  value={formTranslations[activeLang]?.excerpt || ''}
                  onChange={(e) => setFormTranslations((prev) => ({ ...prev, [activeLang]: { ...prev[activeLang], excerpt: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="Short excerpt"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-white/40 mb-1.5">Content (Markdown) ({activeLang})</label>
                <textarea
                  value={formTranslations[activeLang]?.content || ''}
                  onChange={(e) => setFormTranslations((prev) => ({ ...prev, [activeLang]: { ...prev[activeLang], content: e.target.value } }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                  rows={8}
                  placeholder="# Heading\n\nWrite your content in Markdown..."
                />
              </div>
            </div>

            {/* Published Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formPublished}
                onChange={(e) => setFormPublished(e.target.checked)}
                className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-sm font-bold text-gray-700 dark:text-white/70">Publish immediately</span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#001F3F] hover:bg-[#003366] text-white rounded-xl font-bold text-sm transition-all"
              >
                <Save size={16} /> {editingPost ? 'Update' : 'Create'} Post
              </button>
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
