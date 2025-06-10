import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLoaderData } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import type { Product } from "../types/product";
import { ProductCard } from "../components/ProductCard";

interface LoaderData {
  query: string;
  products: Product[];
}

export const SearchPage = () => {
  const { query, products } = useLoaderData() as LoaderData;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories from products
  const availableCategories = Array.from(
    new Set(products.map((product) => product.category.name))
  );

  // Search and filter function
  const filterProducts = (
    products: Product[],
    query: string,
    categories: string[],
    [minPrice, maxPrice]: number[]
  ): Product[] => {
    return products.filter((product) => {
      // Text search
      const searchMatches =
        !query ||
        [
          product.name,
          product.description,
          product.category.name,
          product.subCategory?.name,
          product.brand.name,
          ...(product.features || []),
        ].some((text) => text?.toLowerCase().includes(query.toLowerCase()));

      // Category filter
      const categoryMatches =
        categories.length === 0 || categories.includes(product.category.name);

      // Price filter
      const priceMatches =
        product.pricing.price >= minPrice && product.pricing.price <= maxPrice;

      return searchMatches && categoryMatches && priceMatches;
    });
  };

  // Sort function
  const sortProducts = (products: Product[], sortType: string): Product[] => {
    const sorted = [...products];
    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => a.pricing.price - b.pricing.price);
      case "price-high":
        return sorted.sort((a, b) => b.pricing.price - a.pricing.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return sorted;
    }
  };

  // Update search results when filters change
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const filtered = filterProducts(
      products,
      query,
      selectedCategories,
      priceRange
    );
    const sorted = sortProducts(filtered, sortBy);
    setFilteredProducts(sorted);
  }, [searchParams, selectedCategories, priceRange, sortBy, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setSortBy("relevance");
    const query = searchParams.get("q") || "";
    const filtered = filterProducts(products, query, [], [0, 10000]);
    setFilteredProducts(filtered);
  };

  // Format price using Intl
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //     minimumFractionDigits: 0,
  //   }).format(price);
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              </form>
            </div>

            {/* View Toggle & Filter Button */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 ${
                    isGridView
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <GridViewIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 ${
                    !isGridView
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ViewListIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
              >
                <FilterListIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Search Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              {searchQuery ? (
                <span>
                  Showing {filteredProducts.length} results for "
                  <strong>{searchQuery}</strong>"
                </span>
              ) : (
                <span>Showing {filteredProducts.length} products</span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              parseInt(e.target.value) || 0,
                              priceRange[1],
                            ])
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              parseInt(e.target.value) || 10000,
                            ])
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Categories
                    </h4>
                    <div className="space-y-2">
                      {availableCategories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category,
                                ]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (c) => c !== category
                                  )
                                );
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try adjusting your search.`
                    : "No products available."}
                </p>
              </div>
            ) : (
              <div
                className={
                  isGridView
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
