import React, { useEffect, useState } from "react";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useWishlist } from "../context/WishlistContext";
import type { Product } from "../types/product";
import { getProductsByIds } from "../utils/productDb";

interface ProductCardProps {
  product?: Product;
  productId?: string;
  isGridView?: boolean;
  onAddToCart?: (product: Product) => void;
  showQuickActions?: boolean;
  linkToDetails?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product: initialProduct,
  productId,
  isGridView = true,
  onAddToCart,
  showQuickActions = true,
  linkToDetails = false,
}) => {
  const [product, setProduct] = useState<Product | undefined>(initialProduct);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, items, removeItem } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      if (!initialProduct && productId) {
        const products = await getProductsByIds([productId]);
        setProduct(products[0]);
      }
    }
    fetchProduct();
  }, [initialProduct, productId]);

  if (!product) return null;

  // For new wishlist context, items is Product[]
  const isWishlisted = items.some((item: Product) => item.id === product.id);

  // Format price using Intl
  const formatPrice = (price: number) => {
    if (typeof price !== "number" || isNaN(price)) return "-";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper to get price from correct property
  const getPrice = () => product?.priceing?.price ?? 0;
  const getOriginalPrice = () => product?.priceing?.originalPrice ?? undefined;

  // Calculate discount percentage
  const discountPercentage = getOriginalPrice()
    ? Math.round((1 - getPrice() / (getOriginalPrice() || 1)) * 100)
    : 0;

  // Check if product is in stock
  const isInStock = product?.inventory?.available > 0;
  const isLowStock = product?.inventory?.available > 0 && product?.inventory?.available <= 5;

  // Defensive fallback for images
  const productImage = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : "https://via.placeholder.com/500x500?text=No+Image";

  // Defensive fallback for reviewCount
  const reviewCount = typeof product.reviewCount === "number" ? product.reviewCount : 0;

  // Defensive fallback for rating
  const rating = typeof product.rating === "number" ? product.rating : 0;

  // Defensive fallback for name
  const productName = product.name || "Product";

  // Defensive fallback for slug
  const productSlug = product.slug || "";

  // Defensive fallback for features
  const featured = !!product.featured;
  const newProduct = !!product.newProduct;
  const bestSeller = !!product.bestSeller;

  // Handle wishlist toggle
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && isInStock) {
      onAddToCart(product);
    }
  };

  // Render star rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, idx) => (
          <StarIcon key={`full-${idx}`} className="w-4 h-4 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <StarBorderIcon className="w-4 h-4 text-yellow-400" />
            <StarIcon
              className="w-4 h-4 text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          </div>
        )}
        {[...Array(emptyStars)].map((_, idx) => (
          <StarBorderIcon key={`empty-${idx}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  // If linkToDetails, wrap the card in a Link
  const cardContent = (
    <div
      className={`group bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 relative overflow-hidden ${isGridView ? "p-3" : "p-3 flex gap-3"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
        {featured && (
          <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            Featured
          </span>
        )}
        {newProduct && (
          <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            New
          </span>
        )}
        {bestSeller && (
          <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            Best Seller
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {discountPercentage}% OFF
          </span>
        )}
        {!isInStock && (
          <span className="bg-gray-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            Out of Stock
          </span>
        )}
        {isLowStock && isInStock && (
          <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            Low Stock
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className={`absolute top-2 right-2 z-20 p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${isWishlisted
          ? "bg-red-100/90 text-red-500 hover:bg-red-200/90"
          : "bg-white/90 text-gray-400 hover:bg-gray-100/90 hover:text-red-500"
          }`}
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        onClick={handleWishlistToggle}
      >
        {isWishlisted ? (
          <FavoriteIcon className="w-4 h-4" />
        ) : (
          <FavoriteBorderOutlinedIcon className="w-4 h-4" />
        )}
      </button>

      {/* Product Image */}
      <Link
        href={`/product/${productSlug}`}
        className={`relative overflow-hidden rounded ${isGridView ? "block" : "flex-shrink-0"
          }`}
      >
        <div className={`relative ${isGridView ? "aspect-square" : "w-20 h-20"}`}>
          <img
            src={productImage}
            alt={productName}
            className={`w-full h-full object-cover transition-all duration-300 ${!imageLoaded ? "opacity-0 scale-105" : "opacity-100 scale-100"
              } ${isHovered && isGridView ? "scale-105" : ""
              }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className={`${isGridView ? "mt-3" : "flex-1 min-w-0"}`}>
        <Link href={`/product/${productSlug}`} className="block">
          <h3 className={`font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 ${isGridView ? "text-sm leading-tight" : "text-sm"
            }`}>
            {productName}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars()}
          <span className="text-xs text-gray-600">
            ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`font-semibold text-gray-900 ${isGridView ? "text-base" : "text-base"
              }`}>
              {formatPrice(getPrice())}
            </span>
            {getOriginalPrice() && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(getOriginalPrice() ?? 0)}
              </span>
            )}
          </div>

          {discountPercentage > 0 && (
            <span className="text-xs text-green-600 font-medium">
              Save {formatPrice((getOriginalPrice() || 0) - getPrice())}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {isGridView && (
          <div className="mt-1">
            {isInStock ? (
              <span className="text-xs text-green-600 font-medium">
                {isLowStock ? `Only ${product?.inventory?.available} left` : "In Stock"}
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {showQuickActions && isGridView && (
          <div className={`mt-3 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}>
            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`w-full py-1.5 px-3 rounded text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${isInStock
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <ShoppingCartOutlinedIcon className="w-3.5 h-3.5" />
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        )}

        {/* List view add to cart */}
        {!isGridView && showQuickActions && (
          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`mt-2 py-1.5 px-3 rounded text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isInStock
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <ShoppingCartOutlinedIcon className="w-3.5 h-3.5" />
            {isInStock ? "Add to Cart" : "Out of Stock"}
          </button>
        )}
      </div>
    </div>
  );

  if (linkToDetails && productSlug) {
    return (
      <Link href={`/product/${productSlug}`} className="block">
        {cardContent}
      </Link>
    );
  }
  return cardContent;
};