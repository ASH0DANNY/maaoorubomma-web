export interface ProductColor {
  name: string;
  value: string;
  available: boolean;
}

export interface ProductSize {
  name: string;
  value: string;
  available: boolean;
}

export interface ProductSpecifications {
  [key: string]: string; // Flexible key-value pairs for specifications
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "inches" | "mm";
}

export interface ProductWeight {
  value: number;
  unit: "g" | "kg" | "lb" | "oz";
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 stars
  title?: string;
  comment: string;
  date: Date;
  verified: boolean; // Verified purchase
  helpful: number; // Number of helpful votes
  images?: string[]; // Review images
}

export interface ProductCategory {
  id: string;
  name: string;
  path: string;
  thumbnail?: string;
}


export interface ProductBrand {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

export interface ProductInventory {
  inStock: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  restockDate?: Date;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface ProductShipping {
  weight: ProductWeight;
  dimensions: ProductDimensions;
  shippingClass?: string;
  freeShipping: boolean;
  expeditedShipping: boolean;
}

export interface ProductPricing {
  price: number;
  originalPrice?: number;
  currency: string;
  discount?: number; // Percentage
  salePrice?: number;
  priceValidUntil?: Date;
  taxIncluded: boolean;
}

export interface Product {
  // Basic Information
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;

  // Media
  images: string[];
  videos?: string[];
  thumbnail?: string;

  // Pricing
  pricing: ProductPricing;

  // Variants
  colors?: ProductColor[];
  sizes?: ProductSize[];
  variants?: ProductVariant[]; // For complex variants

  // Inventory
  inventory: ProductInventory;

  // Classification
  category: ProductCategory;
  subCategory?: ProductCategory;
  brand: ProductBrand;
  tags?: string[];

  // Product Details
  material?: string;
  features: string[];
  specifications: ProductSpecifications;

  // Physical Properties
  weight: ProductWeight;
  dimensions: ProductDimensions;

  // Reviews and Ratings
  rating: number; // Average rating
  reviewCount: number;
  reviews?: ProductReview[];

  // Status and Visibility
  status: "active" | "inactive" | "draft" | "discontinued";
  featured: boolean;
  newProduct: boolean;
  bestSeller: boolean;

  // Shipping
  shipping: ProductShipping;

  // SEO
  seo?: ProductSEO;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;

  // Additional Properties
  origin?: string; // Country/region of origin
  artisan?: string; // For handcrafted items
  careInstructions?: string[];
  warranty?: string;
  returnPolicy?: string;

  // Related Products
  relatedProducts?: string[]; // Product IDs
  crossSellProducts?: string[]; // Product IDs
  upSellProducts?: string[]; // Product IDs
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  originalPrice?: number;
  inventory: number;
  attributes: {
    color?: string;
    size?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  images: string[];
  available: boolean;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
  totalPrice: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
}

export interface ProductFilter {
  category?: string[];
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
  features?: string[];
  sortBy?:
    | "price_low"
    | "price_high"
    | "rating"
    | "newest"
    | "best_seller"
    | "name";
}

export interface ProductSearchResult {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: ProductFilter;
}

export type ProductAvailability =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "pre_order"
  | "discontinued";

export type ProductCondition =
  | "new"
  | "like_new"
  | "very_good"
  | "good"
  | "fair"
  | "vintage";

export const createEmptyProduct = (): Partial<Product> => ({
  id: "",
  name: "",
  slug: "",
  sku: "",
  description: "",
  images: [],
  pricing: {
    price: 0,
    currency: "INR",
    taxIncluded: true,
  },
  inventory: {
    inStock: 0,
    reserved: 0,
    available: 0,
    lowStockThreshold: 5,
  },
  category: {
    id: "",
    name: "",
    path: "",
  },
  brand: {
    id: "",
    name: "",
  },
  features: [],
  specifications: {},
  weight: {
    value: 0,
    unit: "g",
  },
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
    unit: "cm",
  },
  rating: 0,
  reviewCount: 0,
  status: "draft",
  featured: false,
  newProduct: false,
  bestSeller: false,
  shipping: {
    weight: { value: 0, unit: "g" },
    dimensions: { length: 0, width: 0, height: 0, unit: "cm" },
    freeShipping: false,
    expeditedShipping: false,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const getProductAvailability = (
  product: Product
): ProductAvailability => {
  if (product.inventory.available <= 0) {
    return product.status === "discontinued" ? "discontinued" : "out_of_stock";
  }
  if (product.inventory.available <= product.inventory.lowStockThreshold) {
    return "low_stock";
  }
  return "in_stock";
};

export const calculateDiscount = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatPrice = (
  price: number,
  currency: string = "INR"
): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
};
