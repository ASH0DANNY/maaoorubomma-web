import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    Favorite,
    ShoppingCart,
    ArrowForward,
    LocalShipping,
    Security,
    Refresh,
    Headset
} from '@mui/icons-material';

// Sample product data
const featuredProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: "₹1,34,900",
        originalPrice: "₹1,59,900",
        discount: "16% OFF",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1234,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Women's Designer Dress",
        price: "₹2,999",
        originalPrice: "₹4,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 856,
        category: "Fashion"
    },
    {
        id: 3,
        name: "Modern Sofa Set",
        price: "₹34,999",
        originalPrice: "₹49,999",
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 423,
        category: "Home & Living"
    },
    {
        id: 4,
        name: "MacBook Air M3",
        price: "₹1,14,900",
        originalPrice: "₹1,34,900",
        discount: "15% OFF",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 2156,
        category: "Electronics"
    }
];

const heroSlides = [
    {
        id: 1,
        title: "Shop Smart, Live Better",
        subtitle: "Discover Electronics, Fashion & Home Essentials",
        description: "Up to 50% off on trending products",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
        cta: "Shop Now"
    },
    {
        id: 2,
        title: "Fashion Forward",
        subtitle: "Latest Trends for Men, Women & Kids",
        description: "Express your style with our curated collection",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
        cta: "Explore Fashion"
    },
    {
        id: 3,
        title: "Tech Revolution",
        subtitle: "Latest Gadgets & Electronics",
        description: "Free shipping on orders above ₹2,000",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
        cta: "Shop Electronics"
    }
];

const categories = [
    {
        id: '1',
        name: 'Electronics',
        path: '/category/electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop',
        itemCount: '1000+ Items',
        subCategories: [
            { id: '1-1', name: 'Phones', path: '/category/electronics/phones' },
            { id: '1-2', name: 'Laptops', path: '/category/electronics/laptops' },
            { id: '1-3', name: 'Accessories', path: '/category/electronics/accessories' }
        ]
    },
    {
        id: '2',
        name: 'Fashion',
        path: '/category/fashion',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop',
        itemCount: '2000+ Items',
        subCategories: [
            { id: '2-1', name: 'Men', path: '/category/fashion/men' },
            { id: '2-2', name: 'Women', path: '/category/fashion/women' },
            { id: '2-3', name: 'Kids', path: '/category/fashion/kids' }
        ]
    },
    {
        id: '3',
        name: 'Home & Living',
        path: '/category/home-living',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
        itemCount: '800+ Items',
        subCategories: [
            { id: '3-1', name: 'Furniture', path: '/category/home-living/furniture' },
            { id: '3-2', name: 'Decor', path: '/category/home-living/decor' },
            { id: '3-3', name: 'Kitchen', path: '/category/home-living/kitchen' }
        ]
    }
];

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [wishlist, setWishlist] = useState<Set<number>>(new Set());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const toggleWishlist = (productId: number) => {
        setWishlist((prev) => {
            const newWishlist = new Set(prev);
            if (newWishlist.has(productId)) {
                newWishlist.delete(productId);
            } else {
                newWishlist.add(productId);
            }
            return newWishlist;
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0' :
                            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                            }`}
                    >
                        <div
                            className="h-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                                <div className="max-w-2xl">
                                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                                        {slide.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl mb-2 opacity-90">
                                        {slide.subtitle}
                                    </p>
                                    <p className="text-lg mb-8 opacity-80">
                                        {slide.description}
                                    </p>
                                    <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                                        {slide.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
                >
                    <ChevronLeft sx={{ fontSize: 24 }} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
                >
                    <ChevronRight sx={{ fontSize: 24 }} />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                                <LocalShipping className="text-green-600" sx={{ fontSize: 24 }} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                                <p className="text-sm text-gray-600">On orders above ₹2,000</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                <Security className="text-blue-600" sx={{ fontSize: 24 }} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Secure Payment</h3>
                                <p className="text-sm text-gray-600">100% secure transactions</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                                <Refresh className="text-purple-600" sx={{ fontSize: 24 }} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Easy Returns</h3>
                                <p className="text-sm text-gray-600">30-day return policy</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                                <Headset className="text-orange-600" sx={{ fontSize: 24 }} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                                <p className="text-sm text-gray-600">Customer service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our diverse collection across Electronics, Fashion & Home Living
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square mb-6">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                            <p className="text-sm opacity-90">{category.itemCount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Subcategories */}
                                {category.subCategories && (
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-gray-800 text-center mb-3">Popular in {category.name}</h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {category.subCategories.map((subCat) => (
                                                <span
                                                    key={subCat.id}
                                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-full cursor-pointer transition-colors"
                                                >
                                                    {subCat.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Featured Products
                            </h2>
                            <p className="text-lg text-gray-600">
                                Handpicked favorites at amazing prices
                            </p>
                        </div>
                        <button className="hidden md:flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors">
                            <span>View All</span>
                            <ArrowForward sx={{ fontSize: 20 }} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {product.discount}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => toggleWishlist(product.id)}
                                            className={`p-2 rounded-full ${wishlist.has(product.id)
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white text-gray-600 hover:text-red-500'
                                                } transition-colors`}
                                        >
                                            <Favorite sx={{ fontSize: 20 }} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center space-x-2">
                                            <ShoppingCart sx={{ fontSize: 16 }} />
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center space-x-1 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    sx={{
                                                        fontSize: 16,
                                                        color: i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ({product.reviews})
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-xl font-bold text-gray-800">
                                            {product.price}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            {product.originalPrice}
                                        </span>
                                    </div>

                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8 md:hidden">
                        <button className="flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors mx-auto">
                            <span>View All Products</span>
                            <ArrowForward sx={{ fontSize: 20 }} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Stay in the Loop
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Get the latest updates on new products, exclusive offers, and design inspiration
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;