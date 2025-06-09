import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LocalShipping,
  Security,
  Refresh,
  Headset,
} from "@mui/icons-material";
import { ProductCard } from "../../components/ProductCard";
import { categoryProducts } from "../../data/categoryProducts";
import type { Product } from "../../types/product";

const heroSlides = [
  {
    id: 1,
    title: "Shop Smart, Live Better",
    subtitle: "Discover Electronics, Fashion & Home Essentials",
    description: "Up to 50% off on trending products",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Fashion Forward",
    subtitle: "Latest Trends for Men, Women & Kids",
    description: "Express your style with our curated collection",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
    cta: "Explore Fashion",
  },
  {
    id: 3,
    title: "Tech Revolution",
    subtitle: "Latest Gadgets & Electronics",
    description: "Free shipping on orders above ₹2,000",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
    cta: "Shop Electronics",
  },
];

const categories = [
  {
    id: "1",
    name: "Electronics",
    path: "/category/electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop",
    itemCount: "1000+ Items",
    subCategories: [
      { id: "1-1", name: "Phones", path: "/category/electronics/phones" },
      { id: "1-2", name: "Laptops", path: "/category/electronics/laptops" },
      {
        id: "1-3",
        name: "Accessories",
        path: "/category/electronics/accessories",
      },
    ],
  },
  {
    id: "2",
    name: "Fashion",
    path: "/category/fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
    itemCount: "2000+ Items",
    subCategories: [
      { id: "2-1", name: "Men", path: "/category/fashion/men" },
      { id: "2-2", name: "Women", path: "/category/fashion/women" },
      { id: "2-3", name: "Kids", path: "/category/fashion/kids" },
    ],
  },
  {
    id: "3",
    name: "Home & Living",
    path: "/category/home-living",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    itemCount: "800+ Items",
    subCategories: [
      { id: "3-1", name: "Furniture", path: "/category/home-living/furniture" },
      { id: "3-2", name: "Decor", path: "/category/home-living/decor" },
      { id: "3-3", name: "Kitchen", path: "/category/home-living/kitchen" },
    ],
  },
];

// Get featured products from categoryProducts
const getFeaturedProducts = () => {
  return categoryProducts
    .filter(
      (product) => product.featured || product.newProduct || product.bestSeller
    )
    .slice(0, 6); // Limit to 6 featured products
};

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts] = useState(getFeaturedProducts());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Add to cart handler
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id} className="min-w-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-2">{slide.subtitle}</p>
                <p className="text-base md:text-lg mb-6">{slide.description}</p>
                <Link
                  to="/products"
                  className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <LocalShipping className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over ₹2,000</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Security className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-sm text-gray-600">100% secure payment</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Refresh className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-gray-600">10 days return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Headset className="text-4xl text-primary" />
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-gray-600">Customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isGridView={true} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm">{category.itemCount}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default HomePage;
