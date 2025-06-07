import { useParams, Link, useLocation, useLoaderData } from 'react-router-dom';
import { categories } from '../../types/category';
import { useState, useEffect } from 'react';
import { ChevronRight } from '@mui/icons-material';
import type { Product } from '../../types/product';

interface LoaderData {
    categoryId: string;
    products: Product[];
}

const CategoryPage = () => {
    const { categoryId, subCategoryId } = useParams();
    const { products } = useLoaderData() as LoaderData;
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState<typeof categories[0] | undefined>();
    interface SubCategoryType {
        id: string;
        name: string;
        path: string;
        thumbnail?: string;
    }
    const [activeSubCategory, setActiveSubCategory] = useState<SubCategoryType | undefined>();

    useEffect(() => {
        // Find active category and subcategory based on URL params
        const category = categories.find(c => c.path.includes(categoryId || ''));
        setActiveCategory(category);

        if (category && subCategoryId) {
            const subCategory = category.subCategories?.find(sc => sc.path.includes(subCategoryId));
            setActiveSubCategory(subCategory as SubCategoryType | undefined);
        } else {
            setActiveSubCategory(undefined);
        }
    }, [categoryId, subCategoryId]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                    </li>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                    {activeCategory && (
                        <li>
                            <Link to={activeCategory.path} className={`${!subCategoryId ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
                                {activeCategory.name}
                            </Link>
                        </li>
                    )}
                    {activeSubCategory && (
                        <>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                            <li className="text-gray-900 font-medium">
                                {activeSubCategory.name}
                            </li>
                        </>
                    )}
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Category Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold p-4 border-b border-gray-200">Categories</h2>
                        <nav className="space-y-1 p-4">
                            {categories.map((category) => (
                                <div key={category.id}>
                                    <Link
                                        to={category.path}
                                        className={`block px-4 py-2 rounded-md text-sm ${location.pathname === category.path ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {category.name}
                                    </Link>
                                    {category.id === activeCategory?.id && category.subCategories && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {category.subCategories.map((subCategory) => (
                                                <Link
                                                    key={subCategory.id}
                                                    to={subCategory.path}
                                                    className={`block px-4 py-2 rounded-md text-sm ${location.pathname === subCategory.path ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                                >
                                                    {subCategory.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            {activeSubCategory?.name || activeCategory?.name || 'All Categories'}
                        </h1>

                        {/* Category Grid or Product Grid */}
                        {!subCategoryId && activeCategory?.subCategories ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeCategory.subCategories.map((subCategory) => (
                                    <Link
                                        key={subCategory.id}
                                        to={subCategory.path}
                                        className="group"
                                    >
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            {subCategory.thumbnail ? (
                                                <img
                                                    src={subCategory.thumbnail}
                                                    alt={subCategory.name}
                                                    className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                                    onError={(e) => {
                                                        // Fallback to placeholder if image fails to load
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        const parent = target.parentElement;
                                                        if (parent) {
                                                            const placeholder = document.createElement('div');
                                                            placeholder.className = 'h-48 bg-gray-200 flex items-center justify-center';
                                                            placeholder.innerHTML = `<span class="text-4xl text-gray-400">${subCategory.name.charAt(0)}</span>`;
                                                            parent.appendChild(placeholder);
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                                    <span className="text-4xl text-gray-400">{subCategory.name.charAt(0)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="mt-4 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                            {subCategory.name}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.slug}`}
                                        className="group"
                                    >
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                            />
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <p className="text-lg font-medium text-gray-900">
                                                    {formatPrice(product.pricing.price)}
                                                </p>
                                                {product.pricing.originalPrice && (
                                                    <p className="text-sm text-gray-500 line-through">
                                                        {formatPrice(product.pricing.originalPrice)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`w-4 h-4 ${idx < Math.floor(product.rating)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span className="text-sm text-gray-500">
                                                    ({product.reviewCount})
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;