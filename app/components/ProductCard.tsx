import React from "react";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useWishlist } from "../context/WishlistContext";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  isGridView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isGridView = true,
}) => {
  const { addItem, items, removeItem } = useWishlist();
  const isWishlisted = items.some((i) => i.productId === product.id);

  // Format price using Intl
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow relative ${isGridView ? "p-4" : "p-4 flex gap-4"
        }`}
    >
      <Link
        href={`/product/${product.slug}`}
        className={isGridView ? "" : "flex-shrink-0"}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className={`rounded-lg object-cover ${isGridView ? "w-full h-48" : "w-24 h-24"
            }`}
        />
      </Link>
      <button
        className={`absolute top-2 right-2 z-10 p-1 rounded-full ${isWishlisted ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-400"}`}
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        onClick={() =>
          isWishlisted
            ? removeItem(product.id)
            : addItem({
              productId: product.id,
              name: product.name,
              image: product.images[0],
              slug: product.slug,
              price: product.price,
              addedAt: new Date().toISOString(),
            })
        }
      >
        <FavoriteBorderOutlinedIcon />
      </button>
      <div className={`${isGridView ? "mt-4" : "flex-1"}`}>
        <Link href={`/product/${product.slug}`}>
          <h3
            className={`font-medium text-gray-900 hover:text-blue-600 ${isGridView ? "text-sm" : "text-base"
              }`}
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) => (
              <span
                key={idx}
                className={`w-4 h-4 ${idx < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
                  }`}
              >
                ★
              </span>
            ))}
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="ml-2 text-sm text-green-600">
                {Math.round(
                  (1 - product.price / product.originalPrice) * 100
                )}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
