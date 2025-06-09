import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";
import { categories } from "../../types/category";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowForward } from "@mui/icons-material";
import type { Product } from "../../types/product";

interface LoaderData {
  categoryId: string;
  products: Product[];
}

const CategoryPage = () => {
  const { categoryId, subCategoryId } = useParams();
  const { products } = useLoaderData() as LoaderData;
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<
    (typeof categories)[0] | undefined
  >();
  const [
    selectedCategoryForSubcategories,
    setSelectedCategoryForSubcategories,
  ] = useState<(typeof categories)[0] | undefined>();
  const subcategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  interface SubCategoryType {
    id: string;
    name: string;
    path: string;
    thumbnail?: string;
  }
  const [activeSubCategory, setActiveSubCategory] = useState<
    SubCategoryType | undefined
  >();

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

  const handleCategoryClick = (category: (typeof categories)[0]) => {
    setSelectedCategoryForSubcategories(category);
    // Scroll to the category section in subcategories
    const categoryRef = subcategoryRefs.current[category.id];
    if (categoryRef) {
      categoryRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {activeCategory && (
              <li>
                <Link
                  to={activeCategory.path}
                  className={`${
                    !subCategoryId
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📂</span>
                Categories
              </h2>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedCategoryForSubcategories?.id === category.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{category.name.charAt(0)}</span>
                        {category.name}
                      </span>
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            {category.subCategories.length}
                          </span>
                        )}
                    </button>

                    {/* Show subcategories for active category in sidebar */}
                    {activeCategory?.id === category.id &&
                      category.subCategories && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subCategories.map((subCategory) => (
                            <Link
                              key={subCategory.id}
                              to={subCategory.path}
                              className={`block px-3 py-1 rounded-md text-xs transition-colors duration-200 ${
                                location.pathname === subCategory.path
                                  ? "bg-blue-100 text-blue-700 font-medium"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {subCategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Subcategories Display */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeSubCategory?.name ||
                  activeCategory?.name ||
                  "All Categories"}
              </h1>
              <p className="text-gray-600">
                {selectedCategoryForSubcategories?.name && !activeSubCategory
                  ? `Browse ${selectedCategoryForSubcategories.name} subcategories`
                  : activeSubCategory
                  ? `Products in ${activeSubCategory.name}`
                  : "Explore our complete category collection"}
              </p>
            </div>

            {/* Content Area */}
            <div className="space-y-8">
              {/* If showing subcategories */}
              {!subCategoryId &&
              (!activeCategory || activeCategory.subCategories) ? (
                <div className="space-y-8">
                  {categories.map(
                    (category) =>
                      category.subCategories &&
                      category.subCategories.length > 0 && (
                        <div
                          key={category.id}
                          ref={(el) => {
                            subcategoryRefs.current[category.id] = el;
                          }}
                          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                              <span className="mr-3 text-2xl">
                                {category.name.charAt(0)}
                              </span>
                              {category.name}
                            </h2>
                            <Link
                              to={category.path}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                            >
                              View All
                              <ArrowForward className="h-4 w-4 ml-1" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {category.subCategories.map((subCategory) => (
                              <Link
                                key={subCategory.id}
                                to={subCategory.path}
                                className="group"
                              >
                                <div className="bg-gray-50 rounded-xl p-3 hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200">
                                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-3 group-hover:scale-105 transition-transform duration-200">
                                    {subCategory.thumbnail ? (
                                      <img
                                        src={subCategory.thumbnail}
                                        alt={subCategory.name}
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
                                            placeholder.innerHTML = `<span class="text-lg font-bold text-gray-500">${subCategory.name.charAt(
                                              0
                                            )}</span>`;
                                            parent.appendChild(placeholder);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                        <span className="text-lg font-bold text-gray-500">
                                          {subCategory.name.charAt(0)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <h3 className="text-xs font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-200">
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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="group"
                      >
                        <div className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4 group-hover:scale-105 transition-transform duration-200">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <p className="text-lg font-bold text-gray-900">
                                  {formatPrice(product.pricing.price)}
                                </p>
                                {product.pricing.originalPrice && (
                                  <p className="text-sm text-gray-500 line-through">
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
                                    className={`text-xs ${
                                      idx < Math.floor(product.rating)
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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-gray-400">📦</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We're working on adding products to this category.
                  </p>
                  <Link
                    to="/"
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
