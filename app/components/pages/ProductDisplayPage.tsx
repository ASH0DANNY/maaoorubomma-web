'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw, Award } from "lucide-react";
import type { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

interface ProductDisplayPageProps {
  product: Product;
}

const ProductDisplayPage = ({ product }: ProductDisplayPageProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      image: product.images[0],
      slug: product.slug
    });

    // Navigate to cart page
    router.push('/cart');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {product && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index
                        ? "border-blue-500"
                        : "border-transparent"
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Title and Price */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-gray-600">{product.shortDescription}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${index < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.reviewCount} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                        100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color: any) => (
                        <button
                          key={color.code}
                          onClick={() => setSelectedColor(color.code)}
                          className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.code
                            ? "ring-2 ring-blue-500"
                            : ""
                            }`}
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Size
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size: any) => (
                        <button
                          key={size.code}
                          onClick={() => setSelectedSize(size.code)}
                          className={`px-3 py-1 rounded-md border ${selectedSize === size.code
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-300 hover:border-gray-400"
                            } ${size.available
                              ? "text-gray-900"
                              : "text-gray-400 cursor-not-allowed"
                            }`}
                          disabled={!size.available}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          setQuantity((q) => (q > 1 ? q - 1 : q))
                        }
                        className="p-2 hover:bg-gray-100 rounded-l-lg"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-lg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.inventory?.available ?? 0} items available
                    </span>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button className="p-3 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg">
                    <Heart className="h-5 w-5" />
                  </button>

                  <button className="p-3 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Free Shipping
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Secure Payment
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      Easy Returns
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-600">
                      Authentic Product
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-16">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {["description", "specifications", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-8">
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Key Features:
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {product.features.map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {product.specifications && Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index}>
                        <h4 className="font-medium text-gray-900 mb-3">{key}:</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between py-2 border-b border-gray-100 text-sm">
                            <span className="text-gray-900">{String(value)}</span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          Customer Reviews
                        </h4>
                        <p className="text-sm text-gray-600">
                          {product.reviewCount} total reviews
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        Write a Review
                      </button>
                    </div>

                    {/* Add review list here when available */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplayPage;
