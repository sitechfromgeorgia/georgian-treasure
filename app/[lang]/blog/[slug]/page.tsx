import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, getRelatedPosts, getBlogPostBySlug } from '@/data/blog-posts';
import { SUPPORTED_LOCALES } from '@/data/tours';
import type { BlogLanguage } from '@/types/blog';
import { generateMetaTags, generateBreadcrumbSchema } from '@/lib/seo';
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
} from '@/components/seo/StructuredData';
import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Bookmark,
  ChevronRight,
  Eye,
} from 'lucide-react';

// ─── Generate Static Params ───────────────────────────────────

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  const langs = SUPPORTED_LOCALES;

  for (const lang of langs) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }

  return params;
}

// ─── Generate Metadata ────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Not Found | Georgian Treasure',
    };
  }

  const locale = lang as BlogLanguage;
  const t = post.translations[locale] || post.translations.en;

  return generateMetaTags({
    title: post.seoTitle || t.title,
    description: post.seoDescription || t.excerpt,
    image: post.image,
    url: `/${lang}/blog/${post.slug}`,
    locale: lang,
    type: 'article',
    publishedTime: post.date,
    author: post.author,
    keywords: post.keywords,
  });
}

// ─── Share Links Helper ───────────────────────────────────────

function getShareLinks(slug: string, title: string, lang: string) {
  const url = encodeURIComponent(`https://georgiantreasure.com/${lang}/blog/${slug}`);
  const text = encodeURIComponent(title);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
  };
}

// ─── Reading Time Calculator ──────────────────────────────────

function calculateReadingTime(content: string[]): number {
  const wordsPerMinute = 200;
  const totalWords = content.reduce((acc, paragraph) => {
    return acc + paragraph.split(/\\s+/).length;
  }, 0);
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

// ─── Page Component ───────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const supportedLangs: BlogLanguage[] = ['ka', 'en', 'ru'];
  const locale = (supportedLangs.includes(lang as BlogLanguage)
    ? lang
    : 'en') as BlogLanguage;
  const t = post.translations[locale];
  const readingTime = calculateReadingTime(t.content);
  const relatedPosts = getRelatedPosts(slug, 3);
  const shareLinks = getShareLinks(slug, t.title, lang);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: `/${lang}` },
    { name: 'Blog', url: `/${lang}/blog` },
    { name: t.title, url: `/${lang}/blog/${slug}` },
  ];

  // Article structured data
  const articleData = {
    title: t.title,
    description: t.excerpt,
    image: post.image,
    url: `/${lang}/blog/${slug}`,
    author: post.author,
    publishedTime: post.date,
    category: post.category,
    tags: post.tags,
  };

  // FAQ for this post (generated from content sections)
  const postFaqs = [
    {
      question: `What is the best time to read about ${t.title}?`,
      answer: t.excerpt,
    },
    {
      question: `Who wrote this guide about ${t.title}?`,
      answer: `This article was written by ${post.author}, an experienced travel guide and Georgia expert at Georgian Treasure.`,
    },
  ];

  // Table of contents from content paragraphs
  const tableOfContents = t.content.map((_, index) => ({
    id: `section-${index + 1}`,
    label: `Section ${index + 1}`,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001F3F] via-[#0A2A5E] to-[#001F3F]">
      {/* Structured Data */}
      <ArticleSchema article={articleData} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema faqs={postFaqs} />

      {/* ─── Hero Section ─── */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={post.image}
          alt={t.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/80 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
            <Link href={`/${lang}`} className="hover:text-[#F9E272] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${lang}/blog`} className="hover:text-[#F9E272] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F9E272] truncate max-w-[200px]">{t.title}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F9E272] text-xs font-medium w-fit mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight mb-6">
            {t.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#D4AF37]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              {new Date(post.date).toLocaleDateString(
                locale === 'en' ? 'en-US' : locale === 'ru' ? 'ru-RU' : 'ka-GE',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <article className="prose prose-invert max-w-none">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-medium border-l-4 border-[#D4AF37] pl-6">
              {t.excerpt}
            </p>

            {/* Table of Contents */}
            <div className="mb-10 p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#D4AF37]" />
                Table of Contents
              </h2>
              <ol className="space-y-2">
                {tableOfContents.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-white/60 hover:text-[#F9E272] transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#F9E272] text-xs flex items-center justify-center shrink-0">
                        {item.id.split('-')[1]}
                      </span>
                      {t.content[parseInt(item.id.split('-')[1]) - 1]?.slice(0, 60)}...
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Article Content */}
            {t.content.map((paragraph, index) => (
              <div key={index} id={`section-${index + 1}`} className="mb-6 scroll-mt-24">
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              </div>
            ))}

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#D4AF37]" />
                Share This Article
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1877F2]/20 border border-[#1877F2]/30 text-white hover:bg-[#1877F2]/30 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-white hover:bg-[#1DA1F2]/30 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 text-white hover:bg-[#25D366]/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={shareLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0088CC]/20 border border-[#0088CC]/30 text-white hover:bg-[#0088CC]/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </a>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F9E272] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Author Card */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F9E272] flex items-center justify-center text-[#001F3F] font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author}</p>
                  <p className="text-xs text-white/50">Travel Expert</p>
                </div>
              </div>
              <p className="text-sm text-white/60">
                Experienced Georgia travel guide sharing insider knowledge and practical tips for
                exploring the Caucasus.
              </p>
            </div>

            {/* Quick Info */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold text-white mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-white/60">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    Reading time
                  </span>
                  <span className="text-white">{readingTime} min</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    Published
                  </span>
                  <span className="text-white">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#D4AF37]" />
                    Category
                  </span>
                  <span className="text-white">{post.category}</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#D4AF37]" />
                    Views
                  </span>
                  <span className="text-white">2,450+</span>
                </div>
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-[#D4AF37]/20 hover:text-[#F9E272] hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Related Posts ─── */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="border-t border-white/10 pt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Related{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F9E272] bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  href={`/${lang}/blog/${relatedPost.slug}`}
                  className="group flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.translations[locale].title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#D4AF37] text-xs font-medium mb-1">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#F9E272] transition-colors line-clamp-2">
                      {relatedPost.translations[locale].title}
                    </h3>
                    <span className="text-xs text-white/40 mt-auto">
                      {new Date(relatedPost.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
