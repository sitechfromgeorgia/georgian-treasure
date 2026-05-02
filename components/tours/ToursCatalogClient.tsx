'use client';

import { useState, useMemo } from 'react';
import { ExtendedTour } from '@/types/tour';
import { useLanguage } from '@/context/LanguageContext';
import { TourCard } from './TourCard';
import { TourFilters, FilterState } from './TourFilters';
import { motion } from 'framer-motion';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

const defaultFilters: FilterState = {
  regions: [],
  categories: [],
  difficulty: '',
  durationMin: 0,
  durationMax: 72,
  priceMin: 0,
  priceMax: 1000,
  groupSizeMax: 50,
};

type SortOption = 'popular' | 'priceAsc' | 'priceDesc';

interface ToursCatalogClientProps {
  tours: ExtendedTour[];
  lang: string;
}

export function ToursCatalogClient({ tours, lang }: ToursCatalogClientProps) {
  const { language, isRTL, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const translations = t?.toursPage || {};
  const itemsPerPage = 12;

  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((tour) => {
        const tr = tour.translations[language] || tour.translations.en;
        return (
          tr.title.toLowerCase().includes(query) ||
          tr.shortDescription.toLowerCase().includes(query) ||
          tr.description.toLowerCase().includes(query) ||
          tour.region.toLowerCase().includes(query) ||
          tour.id.toLowerCase().includes(query)
        );
      });
    }

    // Regions filter (multi-select)
    if (filters.regions.length > 0) {
      result = result.filter((tour) => filters.regions.includes(tour.region));
    }

    // Categories filter (multi-select)
    if (filters.categories.length > 0) {
      result = result.filter((tour) => filters.categories.includes(tour.category));
    }

    // Difficulty filter
    if (filters.difficulty) {
      result = result.filter((tour) => tour.difficulty === filters.difficulty);
    }

    // Duration filter
    if (filters.durationMin > 0 || filters.durationMax < 72) {
      result = result.filter(
        (tour) => tour.durationHours >= filters.durationMin && tour.durationHours <= filters.durationMax
      );
    }

    // Price filter
    result = result.filter(
      (tour) => tour.priceGel >= filters.priceMin && tour.priceGel <= filters.priceMax
    );

    // Group size filter
    result = result.filter((tour) => tour.maxGroupSize <= filters.groupSizeMax);

    // Sorting
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.priceGel - b.priceGel);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.priceGel - a.priceGel);
    } else {
      // Popular: featured first, then by price
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.priceGel - b.priceGel;
      });
    }

    return result;
  }, [searchQuery, filters, sortBy, language, tours]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const sortLabels: Record<string, Record<string, string>> = {
    popular: { ka: 'პოპულარობა', en: 'Popular', ru: 'Популярность', uk: 'Популярність', ar: 'الشعبية', he: 'פופולריות' },
    priceAsc: { ka: 'ფასი: ზრდადი', en: 'Price: Low to High', ru: 'Цена: по возрастанию', uk: 'Ціна: за зростанням', ar: 'السعر: من الأقل', he: 'מחיר: נמוך לגבוה' },
    priceDesc: { ka: 'ფასი: კლებადი', en: 'Price: High to Low', ru: 'Цена: по убыванию', uk: 'Ціна: за спаданням', ar: 'السعر: من الأعلى', he: 'מחיר: גבוה לנמוך' },
  };

  // No results labels
  const noResultsTitle =
    language === 'ka' ? 'ტურები ვერ მოიძებნა'
    : language === 'en' ? 'No tours found'
    : language === 'ru' ? 'Туры не найдены'
    : language === 'uk' ? 'Тури не знайдено'
    : language === 'ar' ? 'لم يتم العثور على جولات'
    : 'לא נמצאו סיורים';

  const noResultsDesc =
    language === 'ka' ? 'სცადეთ სხვა ფილტრები ან საძიებო სიტყვა'
    : language === 'en' ? 'Try adjusting your filters or search query'
    : language === 'ru' ? 'Попробуйте изменить фильтры или поисковый запрос'
    : language === 'uk' ? 'Спробуйте змінити фільтри або пошуковий запит'
    : language === 'ar' ? 'حاول تعديل الفلاتر أو استعلام البحث'
    : 'נסה להתאים את המסננים או שאילתת החיפוש';

  const clearFiltersLabel =
    language === 'ka' ? 'ფილტრების გასუფთავება'
    : language === 'en' ? 'Clear Filters'
    : language === 'ru' ? 'Сбросить фильтры'
    : language === 'uk' ? 'Очистити фільтри'
    : language === 'ar' ? 'مسح الفلاتر'
    : 'נקה מסננים';

  const prevLabel =
    language === 'ka' ? 'წინა'
    : language === 'en' ? 'Previous'
    : language === 'ru' ? 'Назад'
    : language === 'uk' ? 'Назад'
    : language === 'ar' ? 'السابق'
    : 'הקודם';

  const nextLabel =
    language === 'ka' ? 'შემდეგი'
    : language === 'en' ? 'Next'
    : language === 'ru' ? 'Вперед'
    : language === 'uk' ? 'Вперед'
    : language === 'ar' ? 'التالي'
    : 'הבא';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#001F3F] to-[#001F3F]/90 py-16 md:py-20 border-b border-white/10">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {translations.title || 'All Tours'}
            </h1>
            <p className="text-lg text-white/60">
              {translations.subtitle || `${tours.length}+ tours from every corner of Georgia`}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto mt-8"
          >
            <div className="relative">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder={translations.search || 'Search tours...'}
                className="w-full py-3.5 bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-all"
                style={{ paddingLeft: isRTL ? '1rem' : '2.75rem', paddingRight: isRTL ? '2.75rem' : '1rem' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors ${isRTL ? 'left-3' : 'right-3'}`}
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div className="flex-1">
              <TourFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                resultsCount={filteredTours.length}
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-white/40 text-sm hidden md:inline">{translations.duration || 'Sort'}:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-4 py-2.5 pr-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 cursor-pointer"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                >
                  <option value="popular" className="bg-[#001F3F]">
                    {sortLabels.popular[language] || 'Popular'}
                  </option>
                  <option value="priceAsc" className="bg-[#001F3F]">
                    {sortLabels.priceAsc[language] || 'Price: Low to High'}
                  </option>
                  <option value="priceDesc" className="bg-[#001F3F]">
                    {sortLabels.priceDesc[language] || 'Price: High to Low'}
                  </option>
                </select>
                <ChevronDown
                  size={14}
                  className={`absolute top-1/2 -translate-y-1/2 text-white/40 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}
                />
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          {paginatedTours.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedTours.map((tour, idx) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    index={(currentPage - 1) * itemsPerPage + idx}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {noResultsTitle}
              </h3>
              <p className="text-white/50 mb-6">
                {noResultsDesc}
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-[#D4AF37] text-[#001F3F] font-semibold rounded-xl hover:bg-[#E5C048] transition-colors"
              >
                {clearFiltersLabel}
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {prevLabel}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#D4AF37] text-[#001F3F]'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {nextLabel}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
