import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import { blogCategories, type BlogLanguage } from '@/types/blog';
import { generateMetaTags, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Search, Calendar, User, Tag, ArrowRight, ChevronRight } from 'lucide-react';

// ─── Generate Metadata ────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  return generateMetaTags({
    title: 'Travel Blog',
    description:
      'Discover Georgia through our travel blog. Expert guides, travel tips, and inspiring stories about destinations, culture, food, wine, and adventure across Georgia.',
    url: `/${lang}/blog`,
    locale: lang,
    keywords:
      'Georgia travel blog, Georgia travel guide, visit Georgia, Georgia tourism, travel tips Georgia, Caucasus travel',
  });
}

// ─── Page Component ───────────────────────────────────────────

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const supportedLangs: BlogLanguage[] = ['ka', 'en', 'ru'];
  if (!supportedLangs.includes(lang as BlogLanguage)) {
    notFound();
  }

  const locale = lang as BlogLanguage;
  const posts = blogPosts;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001F3F] via-[#0A2A5E] to-[#001F3F]">
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#D4AF37] blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#D4AF37] blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F9E272] text-sm font-medium mb-6">
              <Tag className="w-4 h-4" />
              Georgia Travel Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Travel{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F9E272] bg-clip-text text-transparent">
                Stories & Guides
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Expert guides, insider tips, and inspiring stories to help you plan the perfect Georgia
              adventure
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {blogCategories.map(category => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-white/5 text-white/70 border border-white/10 hover:bg-[#D4AF37]/20 hover:text-[#F9E272] hover:border-[#D4AF37]/30 data-[active=true]:bg-[#D4AF37] data-[active=true]:text-[#001F3F] data-[active=true]:border-[#D4AF37]"
                data-active={category === 'All'}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Post ─── */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Link
            href={`/${lang}/blog/${featuredPost.slug}`}
            className="group block relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto min-h-[400px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.translations[locale].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/60 to-transparent lg:bg-gradient-to-l" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37] text-[#001F3F] text-xs font-semibold uppercase tracking-wide">
                  Featured
                </span>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F9E272] text-xs font-medium w-fit mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#F9E272] transition-colors">
                  {featuredPost.translations[locale].title}
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {featuredPost.translations[locale].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/40 mb-6">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'ka-GE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-[#D4AF37] font-medium group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ─── Blog Post Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingPosts.map(post => (
            <PostCard key={post.slug} post={post} locale={locale} lang={lang} />
          ))}
        </div>
      </section>

      {/* ─── Newsletter Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#D4AF37]/20 to-[#F9E272]/10 border border-[#D4AF37]/20 p-8 md:p-12 text-center">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#D4AF37]/20 blur-[80px]" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Travel Tips in Your Inbox
            </h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Subscribe to our newsletter for the latest Georgia travel guides, insider tips, and
              exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F9E272] text-[#001F3F] font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Post Card Component ──────────────────────────────────────

function PostCard({
  post,
  locale,
  lang,
}: {
  post: (typeof blogPosts)[number];
  locale: BlogLanguage;
  lang: string;
}) {
  const t = post.translations[locale];

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={t.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#001F3F]/80 backdrop-blur-sm text-[#F9E272] text-xs font-medium border border-[#D4AF37]/30">
          {post.category}
        </span>
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F9E272] transition-colors line-clamp-2">
          {t.title}
        </h3>
        <p className="text-white/50 text-sm mb-4 line-clamp-3 flex-1">{t.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-white/40 mt-auto pt-3 border-t border-white/5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}
