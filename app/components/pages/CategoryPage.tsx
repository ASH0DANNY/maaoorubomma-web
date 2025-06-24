'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowForward, Menu, X } from "@mui/icons-material";
import { categories } from "@/app/types/category";
import { Product } from "@/app/types/product";

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage = ({ products }: CategoryPageProps) => {
  // Use useParams() to get categoryId and subCategoryId from Next.js Router
  const pathname = window.location.pathname;
  const paths = pathname.split('/').filter(Boolean);
  const categoryId = paths[1];
  const subCategoryId = paths[2];

  const [activeCategory, setActiveCategory] = useState<typeof categories[0] | undefined>();
  const [selectedCategoryForSubcategories, setSelectedCategoryForSubcategories] = useState<typeof categories[0] | undefined>();
  const subcategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  interface SubCategoryType {
    id: string;
    name: string;
    path: string;
    thumbnail?: string;
  }

  const [activeSubCategory, setActiveSubCategory] = useState<SubCategoryType | undefined>();

  useEffect(() => {
    // Find active category and subcategory based on URL params
    const category = categories.find((c) => c.path.includes(categoryId || ""));
    setActiveCategory(category);
    setSelectedCategoryForSubcategories(category || categories[0]);

    if (category && subCategoryId) {
      const subCategory = category.subCategories?.find((sc) =>
        sc.path.includes(subCategoryId)
      );
      setActiveSubCategory(subCategory as SubCategoryType | undefined);
    } else {
      setActiveSubCategory(undefined);
    }
  }, [categoryId, subCategoryId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    setSelectedCategoryForSubcategories(category);
    setIsMobileSidebarOpen(false); // Close mobile sidebar after selection
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-sm">
        <div className="px-4 py-3">
          <button
            onClick={toggleMobileSidebar}
            className="inline-flex items-center space-x-2 text-gray-600"
          >
            <Menu className="h-6 w-6" />
            <span className="font-medium">Categories</span>
          </button>

          {/* Mobile breadcrumb - simplified */}
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            {activeCategory && (
              <>
                <span className="truncate max-w-20">{activeCategory.name}</span>
                {activeSubCategory && (
                  <>
                    <ChevronRight className="h-3 w-3" />
                    <span className="truncate max-w-20">
                      {activeSubCategory.name}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Breadcrumb Navigation - Desktop only */}
        <nav className="hidden lg:flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {activeCategory && (
              <li>
                <Link
                  href={activeCategory.path}
                  className={`${!subCategoryId
                      ? "text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {activeCategory.name}
                </Link>
              </li>
            )}
            {activeSubCategory && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <li className="text-gray-900 font-medium">
                  {activeSubCategory.name}
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={toggleMobileSidebar}
              />

              {/* Sidebar */}
              <div className="relative bg-white w-80 max-w-xs shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📂</span>
                    Categories
                  </h2>
                  <button
                    onClick={toggleMobileSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={category.path}
                        onClick={() => handleCategoryClick(category)}
                        className={`group w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${activeCategory?.id === category.id
                            ? "bg-blue-50 text-blue-700 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {category.thumbnail ? (
                              <Image
                                src={category.thumbnail}
                                alt={category.name}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                            ) : (
                              <span className="text-lg font-bold text-gray-500">
                                {category.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          {/* Active indicator */}
                          {activeCategory?.id === category.id && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-sm font-medium truncate ${activeCategory?.id === category.id
                                ? "text-blue-700"
                                : "text-gray-900 group-hover:text-blue-600"
                              }`}
                          >
                            {category.name}
                          </h3>
                          {category.subCategories &&
                            category.subCategories.length > 0 && (
                              <p className="text-xs text-gray-500 mt-1">
                                {category.subCategories.length} subcategories
                              </p>
                            )}
                        </div>

                        <ChevronRight
                          className={`h-4 w-4 transition-colors duration-200 ${activeCategory?.id === category.id
                              ? "text-blue-500"
                              : "text-gray-400 group-hover:text-blue-500"
                            }`}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Left Sidebar - Categories */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">📂</span>
                Categories
              </h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {categories.map((category) => (
                  <div key={category.id}>
                    <Link
                      href={category.path}
                      onClick={() => handleCategoryClick(category)}
                      className={`group w-full text-left flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 hover:shadow-md ${activeCategory?.id === category.id
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          {category.thumbnail ? (
                            <Image
                              src={category.thumbnail}
                              alt={category.name}
                              width={40}
                              height={40}
                              className="rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-lg font-bold text-gray-500">
                              {category.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        {/* Active indicator */}
                        {activeCategory?.id === category.id && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-medium truncate ${activeCategory?.id === category.id
                              ? "text-blue-700"
                              : "text-gray-900 group-hover:text-blue-600"
                            }`}
                        >
                          {category.name}
                        </h3>
                        {category.subCategories &&
                          category.subCategories.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {category.subCategories.length} subcategories
                            </p>
                          )}
                      </div>

                      <ChevronRight
                        className={`h-4 w-4 transition-colors duration-200 ${activeCategory?.id === category.id
                            ? "text-blue-500"
                            : "text-gray-400 group-hover:text-blue-500"
                          }`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Subcategories Display */}
          <div className="col-span-1 lg:col-span-3">
            {/* Header */}
            <div className="mb-4 lg:mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {activeSubCategory?.name ||
                  activeCategory?.name ||
                  "All Categories"}
              </h1>
              <p className="text-sm lg:text-base text-gray-600">
                {selectedCategoryForSubcategories?.name && !activeSubCategory
                  ? `Browse ${selectedCategoryForSubcategories.name} subcategories`
                  : activeSubCategory
                    ? `Products in ${activeSubCategory.name}`
                    : "Explore our complete category collection"}
              </p>
            </div>

            {/* Content Area */}
            <div className="space-y-6 lg:space-y-8">
              {/* If showing subcategories */}
              {!subCategoryId &&
                (!activeCategory || activeCategory.subCategories) ? (
                <div className="space-y-6 lg:space-y-8">
                  {categories.map(
                    (category) =>
                      category.subCategories &&
                      category.subCategories.length > 0 && (
                        <div
                          key={category.id}
                          ref={(el) => {
                            subcategoryRefs.current[category.id] = el;
                          }}
                          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6"
                        >
                          <div className="flex items-center justify-between mb-4 lg:mb-6">
                            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 flex items-center">
                              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-2 lg:mr-3">
                                {category.thumbnail ? (
                                  <Image
                                    src={category.thumbnail}
                                    alt={category.name}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.style.display = "none";
                                      const parent = target.parentElement;
                                      if (parent) {
                                        const placeholder =
                                          document.createElement("span");
                                        placeholder.className =
                                          "text-lg lg:text-xl font-bold text-gray-500";
                                        placeholder.textContent =
                                          category.name.charAt(0);
                                        parent.appendChild(placeholder);
                                      }
                                    }}
                                  />
                                ) : (
                                  <span className="text-lg lg:text-xl font-bold text-gray-500">
                                    {category.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              {category.name}
                            </h2>
                            <Link
                              href={category.path}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                            >
                              View All
                              <ArrowForward className="h-4 w-4 ml-1" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
                            {category.subCategories.map((subCategory) => (
                              <Link
                                key={subCategory.id}
                                href={subCategory.path}
                                className="group"
                              >
                                <div className="bg-gray-50 rounded-xl p-3 lg:p-4 hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200">
                                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-2 lg:mb-3 group-hover:scale-105 transition-transform duration-200">
                                    {subCategory.thumbnail ? (
                                      <Image
                                        src={subCategory.thumbnail}
                                        alt={subCategory.name}
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-cover object-center"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.style.display = "none";
                                          const parent = target.parentElement;
                                          if (parent) {
                                            const placeholder =
                                              document.createElement("div");
                                            placeholder.className =
                                              "h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center";
                                            placeholder.innerHTML = `<span class="text-sm lg:text-lg font-bold text-gray-500">${subCategory.name.charAt(
                                              0
                                            )}</span>`;
                                            parent.appendChild(placeholder);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                        <span className="text-sm lg:text-lg font-bold text-gray-500">
                                          {subCategory.name.charAt(0)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <h3 className="text-xs font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                                    {subCategory.name}
                                  </h3>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                /* Product Grid */
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group"
                      >
                        <div className="bg-gray-50 rounded-xl p-3 lg:p-4 hover:bg-white hover:shadow-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-3 lg:mb-4 group-hover:scale-105 transition-transform duration-200">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <p className="text-base lg:text-lg font-bold text-gray-900">
                                  {formatPrice(product.pricing.price)}
                                </p>
                                {product.pricing.originalPrice && (
                                  <p className="text-xs lg:text-sm text-gray-500 line-through">
                                    {formatPrice(product.pricing.originalPrice)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xs ${idx < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                      }`}
                                  >
                                    ★
                                  </span>
                                ))}
                                <span className="text-xs text-gray-500">
                                  ({product.reviewCount})
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <span className="mr-1">View</span>
                                <ArrowForward className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {products.length === 0 && subCategoryId && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 text-center">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl text-gray-400">
                      📦
                    </span>
                  </div>
                  <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
                    We're working on adding products to this category.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Browse All Categories
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
