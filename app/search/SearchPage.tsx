'use client';

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Product } from "@/app/types/product";
import { ProductCard } from "../components/ProductCard";

interface SearchPageProps {
  query: string;
  products: Product[];
}

export const SearchPage = ({ query, products }: SearchPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.priceing.price - b.priceing.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.priceing.price - a.priceing.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (relevance) - maintain original order
        sorted = products;
    }
    setFilteredProducts(sorted);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Products"}
            </h1>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative flex-1 md:w-96">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
              </form>

              <button
                onClick={toggleFilters}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <FilterListIcon className="h-6 w-6" />
              </button>

              <button
                onClick={toggleView}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {isGridView ? (
                  <ViewListIcon className="h-6 w-6" />
                ) : (
                  <GridViewIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </p>

            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div
            className={`lg:block ${showFilters ? "block" : "hidden"
              } col-span-1 space-y-6`}
          >
            {/* Price Range Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange([
                        Number(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-20 px-2 py-1 border border-primary focus:ring-primary rounded"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange([
                        priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-20 px-2 py-1 border border-primary focus:ring-primary rounded"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {["Electronics", "Fashion", "Home", "Books"].map(
                  (category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">
                        {category}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  isGridView
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isGridView={isGridView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
