"use client";

import { Search, Filter, Layers } from "lucide-react";
import { Category } from "@/types";
import { CONDITION_FILTERS } from "@/constants";

interface LayersViewProps {
  categories: Category[];
  selectedSubcategories: string[];
  selectedConditions: string[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset: () => void;
  onSubcategoryChange: (id: string) => void;
  onConditionChange: (condition: string) => void;
}

export const LayersView = ({
  categories,
  selectedSubcategories,
  selectedConditions,
  loading,
  searchQuery,
  onSearchChange,
  onReset,
  onSubcategoryChange,
  onConditionChange,
}: LayersViewProps) => {
  return (
    <>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Layers */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Layer Pemetaan
          </h2>
          <button
            onClick={onReset}
            className="text-[10px] text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
          >
            Reset
          </button>
        </div>

        {loading ? (
          <div className="text-xs text-gray-500">Memuat kategori...</div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                selectedSubcategories={selectedSubcategories}
                onSubcategoryChange={onSubcategoryChange}
              />
            ))}
            {categories.length === 0 && (
              <div className="text-xs text-gray-500 italic">
                Belum ada kategori data.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Condition Filters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Filter Kondisi
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CONDITION_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => onConditionChange(status)}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors cursor-pointer ${
                selectedConditions.includes(status)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// Extracted sub-component for category items
interface CategoryItemProps {
  category: Category;
  selectedSubcategories: string[];
  onSubcategoryChange: (id: string) => void;
}

const CategoryItem = ({
  category,
  selectedSubcategories,
  onSubcategoryChange,
}: CategoryItemProps) => {
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <div>
      <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        {category.name}
      </h3>
      <div className="space-y-1.5">
        {hasSubcategories ? (
          category.subcategories.map((sub) => (
            <CheckboxItem
              key={sub.id}
              id={sub.id}
              label={sub.name}
              checked={selectedSubcategories.includes(sub.id)}
              onChange={() => onSubcategoryChange(sub.id)}
            />
          ))
        ) : (
          <CheckboxItem
            id={category.id}
            label={`Semua ${category.name}`}
            checked={selectedSubcategories.includes(category.id)}
            onChange={() => onSubcategoryChange(category.id)}
          />
        )}
      </div>
    </div>
  );
};

// Reusable checkbox component
interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem = ({ label, checked, onChange }: CheckboxItemProps) => (
  <label className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer group">
    <input
      type="checkbox"
      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      checked={checked}
      onChange={onChange}
    />
    <span className="text-xs text-gray-700 group-hover:text-gray-900">
      {label}
    </span>
  </label>
);
