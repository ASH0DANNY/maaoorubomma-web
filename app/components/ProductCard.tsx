'use client';

import Link from "next/link";
import Image from "next/image";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import type { Product } from "@/types/product";

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
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
        isGridView ? "p-4" : "p-4 flex gap-4"
      }`}
    >
      <Link
        href={`/product/${product.slug}`}
        className={isGridView ? "" : "flex-shrink-0"}
      >
        <div className={`relative ${isGridView ? "aspect-square" : "w-40 h-40"}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </Link>

      <div className={isGridView ? "mt-4" : "flex-grow"}>
        <Link href={`/product/${product.slug}`}>
          <h3
            className={`font-medium text-gray-900 ${
              isGridView ? "text-sm" : "text-base"
            } ${isGridView ? "line-clamp-2" : ""}`}
          >
            {product.name}
          </h3>
        </Link>

        {!isGridView && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        <div
          className={`flex items-center justify-between ${
            isGridView ? "mt-2" : "mt-4"
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-gray-900">
                {formatPrice(product.pricing.price)}
              </span>
              {product.pricing.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.pricing.originalPrice)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <FavoriteBorderOutlined className="h-6 w-6" />
          </button>
        </div>

        {!isGridView && product.availability && (
          <div className="mt-4">
            <span className="text-sm text-green-600">In stock</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
