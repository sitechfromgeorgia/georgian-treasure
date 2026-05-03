'use client';

import { useLanguage } from '@/context/LanguageContext';
import { regions as regionData, categories as categoryData } from '@/data/content';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface FilterState {
  regions: string[];
  categories: string[];
  difficulty: string;
  durationMin: number;
  durationMax: number;
  priceMin: number;
  priceMax: number;
  groupSizeMax: number;
}

interface TourFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  resultsCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

const difficultyKeys = ['easy', 'moderate', 'challenging', 'extreme'];

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  moderate: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  challenging: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  extreme: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export function TourFilters({
  filters,
  onFilterChange,
  onClearFilters,
  resultsCount,
  isOpen,
  onToggle,
}: TourFiltersProps) {
  const { language, isRTL, t } = useLanguage();

  const translations = t?.toursPage || {};

  const hasActiveFilters =
    filters.regions.length > 0 ||
    filters.categories.length > 0 ||
    filters.difficulty !== '' ||
    filters.durationMin > 0 ||
    filters.durationMax < 24 ||
    filters.priceMin > 0 ||
    filters.priceMax < 1000 ||
    filters.groupSizeMax < 50;

  const getRegionLabel = (regionId: string) => {
    const r = regionData.find((reg) => reg.id === regionId);
    return r?.translations?.[language]?.name || regionId;
  };

  const getCategoryLabel = (catId: string) => {
    const c = categoryData.find((cat) => cat.id === catId);
    return c?.translations?.[language]?.name || catId;
  };

  const getDifficultyLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      easy: { ka: 'მარტივი', en: 'Easy', ru: 'Легко', he: 'קל' },
      moderate: { ka: 'საშუალო', en: 'Moderate', ru: 'Средне', he: 'בינוני' },
      challenging: { ka: 'რთული', en: 'Challenging', ru: 'Сложно', he: 'מאתגר' },
      extreme: { ka: 'ექსტრემალური', en: 'Extreme', ru: 'Экстрим', he: 'קיצוני' },
    };
    return labels[key]?.[language] || key;
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleRegion = (regionId: string) => {
    const current = filters.regions;
    const next = current.includes(regionId)
      ? current.filter((r) => r !== regionId)
      : [...current, regionId];
    updateFilter('regions', next);
  };

  const toggleCategory = (categoryId: string) => {
    const current = filters.categories;
    const next = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    updateFilter('categories', next);
  };

  // Count active filters
  const activeFilterCount =
    filters.regions.length +
    filters.categories.length +
    (filters.difficulty ? 1 : 0) +
    (filters.durationMin > 0 || filters.durationMax < 24 ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 1000 ? 1 : 0) +
    (filters.groupSizeMax < 50 ? 1 : 0);

  return (
    <div className="w-full">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <SlidersHorizontal size={16} />
          <span>{translations.filters || 'Filters'}</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 w-5 h-5 bg-[#D4AF37] text-[#001F3F] text-xs font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <span className="text-white/60 text-sm">
          <span className="text-[#D4AF37] font-bold">{resultsCount}</span>{' '}
          {resultsCount === 1
            ? (translations.resultsFound || 'tour found').replace(/s$/, '')
            : translations.resultsFound || 'tours found'}
        </span>
      </div>

      {/* Active Filter Tags */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            {filters.regions.map((regionId) => (
              <motion.span
                key={`region-${regionId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-medium rounded-full border border-[#D4AF37]/30"
              >
                {getRegionLabel(regionId)}
                <button
                  onClick={() => toggleRegion(regionId)}
                  className="hover:bg-[#D4AF37]/20 rounded-full p-0.5 transition-colors"
                >
                  <X size={10} />
                </button>
              </motion.span>
            ))}
            {filters.categories.map((catId) => (
              <motion.span
                key={`cat-${catId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-medium rounded-full border border-[#D4AF37]/30"
              >
                {getCategoryLabel(catId)}
                <button
                  onClick={() => toggleCategory(catId)}
                  className="hover:bg-[#D4AF37]/20 rounded-full p-0.5 transition-colors"
                >
                  <X size={10} />
                </button>
              </motion.span>
            ))}
            {filters.difficulty && (
              <motion.span
                key="difficulty"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-medium rounded-full border border-[#D4AF37]/30"
              >
                {getDifficultyLabel(filters.difficulty)}
                <button
                  onClick={() => updateFilter('difficulty', '')}
                  className="hover:bg-[#D4AF37]/20 rounded-full p-0.5 transition-colors"
                >
                  <X size={10} />
                </button>
              </motion.span>
            )}
            {(filters.priceMin > 0 || filters.priceMax < 1000) && (
              <motion.span
                key="price"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-medium rounded-full border border-[#D4AF37]/30"
              >
                {filters.priceMin} - {filters.priceMax} GEL
                <button
                  onClick={() => {
                    updateFilter('priceMin', 0);
                    updateFilter('priceMax', 1000);
                  }}
                  className="hover:bg-[#D4AF37]/20 rounded-full p-0.5 transition-colors"
                >
                  <X size={10} />
                </button>
              </motion.span>
            )}
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-white/50 hover:text-white text-xs rounded-full border border-white/10 hover:border-white/30 transition-colors"
            >
              <RotateCcw size={10} />
              {language === 'ka' ? 'გასუფთავება'
                : language === 'en' ? 'Clear all'
                : language === 'ru' ? 'Сбросить'
                : 'נקה הכל'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">
                  {translations.filters || 'Filters'}
                </h3>
                <button onClick={onToggle} className="text-white/50 hover:text-white transition-colors lg:hidden">
                  <X size={20} />
                </button>
              </div>

              {/* Region Checkboxes */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-3">
                  {translations.allRegions || 'Region'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {regionData.map((r) => {
                    const isChecked = filters.regions.includes(r.id);
                    return (
                      <button
                        key={r.id}
                        onClick={() => toggleRegion(r.id)}
                        className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-left ${
                          isChecked
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]'
                            : 'bg-[#001F3F]/30 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                      >
                        {r.translations?.[language]?.name || r.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category Checkboxes */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-3">
                  {translations.allCategories || 'Category'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {categoryData.map((c) => {
                    const isChecked = filters.categories.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleCategory(c.id)}
                        className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                          isChecked
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]'
                            : 'bg-[#001F3F]/30 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                      >
                        {c.translations?.[language]?.name || c.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Badges */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-3">
                  {translations.allDifficulties || 'Difficulty'}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateFilter('difficulty', '')}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                      filters.difficulty === ''
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]'
                        : 'bg-[#001F3F]/30 border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {language === 'ka' ? 'ყველა'
                      : language === 'en' ? 'All'
                      : language === 'ru' ? 'Все'
                      : 'הכל'}
                  </button>
                  {difficultyKeys.map((d) => (
                    <button
                      key={d}
                      onClick={() => updateFilter('difficulty', filters.difficulty === d ? '' : d)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all capitalize ${
                        filters.difficulty === d
                          ? `${difficultyColors[d]} border-current`
                          : 'bg-[#001F3F]/30 border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {getDifficultyLabel(d)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Range */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  {translations.duration || 'Duration'} ({language === 'ka' ? 'საათი' : language === 'en' ? 'hours' : language === 'ru' ? 'часов' : 'hours'})
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={24}
                    value={filters.durationMin}
                    onChange={(e) => updateFilter('durationMin', Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-[#001F3F]/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    placeholder="Min"
                  />
                  <span className="text-white/30">—</span>
                  <input
                    type="number"
                    min={0}
                    max={72}
                    value={filters.durationMax}
                    onChange={(e) => updateFilter('durationMax', Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-[#001F3F]/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  {translations.priceRange || 'Price Range'} (GEL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    value={filters.priceMin}
                    onChange={(e) => updateFilter('priceMin', Number(e.target.value))}
                    className="w-24 px-3 py-2 bg-[#001F3F]/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    placeholder="Min"
                  />
                  <span className="text-white/30">—</span>
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    value={filters.priceMax}
                    onChange={(e) => updateFilter('priceMax', Number(e.target.value))}
                    className="w-24 px-3 py-2 bg-[#001F3F]/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Group Size Slider */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  {translations.groupSize || 'Max Group Size'}: <span className="text-[#D4AF37]">{filters.groupSizeMax}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={filters.groupSizeMax}
                  onChange={(e) => updateFilter('groupSizeMax', Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-[#D4AF37] hover:text-white text-sm font-medium rounded-xl border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all w-full justify-center"
                >
                  <RotateCcw size={14} />
                  {language === 'ka' ? 'ფილტრების გასუფთავება'
                    : language === 'en' ? 'Clear all filters'
                    : language === 'ru' ? 'Сбросить фильтры'
                    : 'נקה את כל המסננים'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
