import React from "react";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  isGridView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isGridView = true,
}) => {
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
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${isGridView ? "p-4" : "p-4 flex gap-4"
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
            {formatPrice(product.pricing.price)}
          </span>
          {product.pricing.originalPrice && (
            <>
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.pricing.originalPrice)}
              </span>
              <span className="ml-2 text-sm text-green-600">
                {Math.round(
                  (1 - product.pricing.price / product.pricing.originalPrice) *
                  100
                )}
                % OFF
              </span>
            </>
          )}
        </div>

        <div
          className={`flex items-center gap-2 ${isGridView ? "mt-4" : "mt-2"}`}
        >
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Add to Cart
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FavoriteBorderOutlinedIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
