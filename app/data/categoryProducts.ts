import type { Product } from "../types/product";
import { toyimageBase64 } from "../utils/Base64";

// Helper function to create a base product
const createBaseProduct = (
    id: string,
    name: string,
    category: string,
    subCategory: string,
    price: number
): Product => ({
    id,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    sku: `${category.substring(0, 3)}-${id}`,
    description: `High-quality ${name.toLowerCase()} for your home`,
    shortDescription: `Beautiful ${name.toLowerCase()}`,
    images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    ],
    pricing: {
        price,
        originalPrice: Math.round(price * 1.2),
        currency: "INR",
        taxIncluded: true,
    },
    inventory: {
        inStock: 10,
        reserved: 0,
        available: 10,
        lowStockThreshold: 5,
    },
    category: {
        id: category,
        name: category,
        path: `/category/${category.toLowerCase().replace(/\s+/g, "-")}`,
        thumbnail: toyimageBase64,
    },
    subCategory: {
        id: subCategory,
        name: subCategory,
        path: `/category/${category
            .toLowerCase()
            .replace(/\s+/g, "-")}/${subCategory.toLowerCase().replace(/\s+/g, "-")}`,
        thumbnail: toyimageBase64,
    },
    brand: {
        id: "artisan-crafts",
        name: "Artisan Crafts",
    },
    features: [
        "Handcrafted with care",
        "Premium quality materials",
        "Traditional design",
    ],
    specifications: {
        Material: "Premium Quality",
        Origin: "India",
    },
    weight: {
        value: 500,
        unit: "g",
    },
    dimensions: {
        length: 20,
        width: 15,
        height: 10,
        unit: "cm",
    },
    rating: 4.5,
    reviewCount: 25,
    status: "active",
    featured: false,
    newProduct: true,
    bestSeller: false,
    shipping: {
        weight: { value: 500, unit: "g" },
        dimensions: { length: 20, width: 15, height: 10, unit: "cm" },
        freeShipping: true,
        expeditedShipping: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
});

// Create products for each subcategory
export const categoryProducts: Product[] = [
    // Home Decor - Wall Art
    createBaseProduct(
        "wa1",
        "Traditional Wall Painting",
        "Home Decor",
        "Wall Art",
        1999
    ),
    createBaseProduct(
        "wa2",
        "Madhubani Art Frame",
        "Home Decor",
        "Wall Art",
        2499
    ),
    createBaseProduct("wa3", "Wooden Wall Panel", "Home Decor", "Wall Art", 3499),
    createBaseProduct("wa4", "Metal Wall Decor", "Home Decor", "Wall Art", 1799),

    // Home Decor - Paintings
    createBaseProduct(
        "pt1",
        "Traditional Indian Painting",
        "Home Decor",
        "Paintings",
        4999
    ),
    createBaseProduct(
        "pt2",
        "Modern Abstract Art",
        "Home Decor",
        "Paintings",
        3999
    ),
    createBaseProduct(
        "pt3",
        "Village Scene Canvas",
        "Home Decor",
        "Paintings",
        2999
    ),

    // Home Decor - Lanterns
    createBaseProduct(
        "ln1",
        "Brass Table Lantern",
        "Home Decor",
        "Lanterns",
        1299
    ),
    createBaseProduct(
        "ln2",
        "Hanging Glass Lantern",
        "Home Decor",
        "Lanterns",
        999
    ),
    createBaseProduct(
        "ln3",
        "Traditional Oil Lamp",
        "Home Decor",
        "Lanterns",
        799
    ),

    // Home Decor - Brass Figurines
    createBaseProduct(
        "bf1",
        "Brass Ganesha Statue",
        "Home Decor",
        "Brass Figurines",
        2999
    ),
    createBaseProduct(
        "bf2",
        "Dancing Nataraja",
        "Home Decor",
        "Brass Figurines",
        4999
    ),
    createBaseProduct(
        "bf3",
        "Decorative Peacock",
        "Home Decor",
        "Brass Figurines",
        1999
    ),

    // Event Decor - Solawood
    createBaseProduct(
        "sw1",
        "Solawood Flower Set",
        "Event Decor",
        "Solawood Decor",
        599
    ),
    createBaseProduct(
        "sw2",
        "Decorative Centerpiece",
        "Event Decor",
        "Solawood Decor",
        899
    ),
    createBaseProduct(
        "sw3",
        "Wedding Backdrop Kit",
        "Event Decor",
        "Solawood Decor",
        1499
    ),

    // Event Decor - Fabric
    createBaseProduct(
        "fd1",
        "Silk Table Runner",
        "Event Decor",
        "Fabric Decor Pieces",
        799
    ),
    createBaseProduct(
        "fd2",
        "Decorative Cushion Set",
        "Event Decor",
        "Fabric Decor Pieces",
        1299
    ),
    createBaseProduct(
        "fd3",
        "Embroidered Wall Hanging",
        "Event Decor",
        "Fabric Decor Pieces",
        999
    ),

    // Home & Living - Functional Items
    createBaseProduct(
        "fi1",
        "Brass Serving Tray",
        "Home & Living",
        "Functional Items",
        1499
    ),
    createBaseProduct(
        "fi2",
        "Wooden Storage Box",
        "Home & Living",
        "Functional Items",
        999
    ),
    createBaseProduct(
        "fi3",
        "Traditional Spice Box",
        "Home & Living",
        "Functional Items",
        799
    ),

    // Home & Living - Everyday Items
    createBaseProduct(
        "ei1",
        "Copper Water Bottle",
        "Home & Living",
        "Everyday Use Items",
        699
    ),
    createBaseProduct(
        "ei2",
        "Brass Kitchen Set",
        "Home & Living",
        "Everyday Use Items",
        1299
    ),
    createBaseProduct(
        "ei3",
        "Traditional Dinner Set",
        "Home & Living",
        "Everyday Use Items",
        2499
    ),

    // Vintage Board Games
    createBaseProduct(
        "bg1",
        "Traditional Carrom Board",
        "Vintage Board Games",
        "Board Games",
        2999
    ),
    createBaseProduct(
        "bg2",
        "Wooden Chess Set",
        "Vintage Board Games",
        "Board Games",
        1499
    ),
    createBaseProduct(
        "bg3",
        "Handmade Pachisi Game",
        "Vintage Board Games",
        "Board Games",
        999
    ),

    // Indian Artforms - Kolam
    createBaseProduct(
        "kl1",
        "Traditional Kolam Kit",
        "Indian Artforms",
        "Kolam",
        499
    ),
    createBaseProduct(
        "kl2",
        "Kolam Stencil Set",
        "Indian Artforms",
        "Kolam",
        299
    ),
    createBaseProduct(
        "kl3",
        "Festival Kolam Pack",
        "Indian Artforms",
        "Kolam",
        799
    ),

    // Indian Artforms - Madhubani
    createBaseProduct(
        "md1",
        "Madhubani Wall Art",
        "Indian Artforms",
        "Madhubani",
        3999
    ),
    createBaseProduct(
        "md2",
        "Madhubani Canvas Set",
        "Indian Artforms",
        "Madhubani",
        2999
    ),
    createBaseProduct(
        "md3",
        "Traditional Madhubani",
        "Indian Artforms",
        "Madhubani",
        5999
    ),

    // Indian Artforms - Warli
    createBaseProduct(
        "wr1",
        "Warli Tribal Art",
        "Indian Artforms",
        "Warli",
        1999
    ),
    createBaseProduct(
        "wr2",
        "Warli Wall Decor",
        "Indian Artforms",
        "Warli",
        2499
    ),
    createBaseProduct(
        "wr3",
        "Modern Warli Design",
        "Indian Artforms",
        "Warli",
        1799
    ),

    // Pooja Items - Brass Akhand Diya
    createBaseProduct(
        "ad1",
        "Traditional Akhand Diya",
        "Pooja Items",
        "Brass Akhand Diya",
        1299
    ),
    createBaseProduct(
        "ad2",
        "Decorative Brass Diya",
        "Pooja Items",
        "Brass Akhand Diya",
        999
    ),
    createBaseProduct(
        "ad3",
        "Festival Special Diya",
        "Pooja Items",
        "Brass Akhand Diya",
        1499
    ),

    // Pooja Items - Oil-lamp Deepak
    createBaseProduct(
        "dp1",
        "Antique Brass Deepak",
        "Pooja Items",
        "Oil-lamp Deepak",
        899
    ),
    createBaseProduct(
        "dp2",
        "Traditional Oil Lamp",
        "Pooja Items",
        "Oil-lamp Deepak",
        799
    ),
    createBaseProduct(
        "dp3",
        "Decorative Deepak",
        "Pooja Items",
        "Oil-lamp Deepak",
        1199
    ),

    // Vintage Board Games - Chess
    createBaseProduct(
        "ch1",
        "Handcrafted Chess Set",
        "Vintage Board Games",
        "Chess",
        4999
    ),
    createBaseProduct(
        "ch2",
        "Wooden Chess Board",
        "Vintage Board Games",
        "Chess",
        2999
    ),
    createBaseProduct(
        "ch3",
        "Travel Chess Kit",
        "Vintage Board Games",
        "Chess",
        1499
    ),

    // Vintage Board Games - Ludo
    createBaseProduct(
        "ld1",
        "Traditional Ludo Board",
        "Vintage Board Games",
        "Ludo",
        999
    ),
    createBaseProduct(
        "ld2",
        "Family Ludo Set",
        "Vintage Board Games",
        "Ludo",
        1299
    ),
    createBaseProduct(
        "ld3",
        "Premium Ludo Game",
        "Vintage Board Games",
        "Ludo",
        1999
    ),

    // Chilli Powders
    createBaseProduct(
        "cp1",
        "Premium Red Chilli Powder",
        "Chilli Powders",
        "Spices",
        299
    ),
    createBaseProduct(
        "cp2",
        "Organic Chilli Powder",
        "Chilli Powders",
        "Spices",
        399
    ),
    createBaseProduct(
        "cp3",
        "Extra Hot Chilli Blend",
        "Chilli Powders",
        "Spices",
        349
    ),

    // Clearance Items
    createBaseProduct(
        "cl1",
        "Brass Collection Set",
        "Clearance",
        "Sale Items",
        4999
    ),
    createBaseProduct(
        "cl2",
        "Decorative Wall Art",
        "Clearance",
        "Sale Items",
        1999
    ),
    createBaseProduct(
        "cl3",
        "Traditional Game Pack",
        "Clearance",
        "Sale Items",
        2499
    ),

    // Blog Related Products
    createBaseProduct("br1", "Brass Care Kit", "Blog", "Product Care Guide", 799),
    createBaseProduct(
        "br2",
        "Traditional Craft Book",
        "Blog",
        "Indian Crafts",
        499
    ),
    createBaseProduct("br3", "Cultural Art Guide", "Blog", "Indian Culture", 599),

    // Event Decor - Additional Items
    createBaseProduct(
        "ed1",
        "Wedding Decoration Set",
        "Event Decor",
        "Solawood Decor",
        2999
    ),
    createBaseProduct(
        "ed2",
        "Festival Decor Pack",
        "Event Decor",
        "Fabric Decor Pieces",
        1999
    ),
    createBaseProduct(
        "ed3",
        "Party Decoration Kit",
        "Event Decor",
        "Solawood Decor",
        2499
    ),

    // Home & Living - Additional Items
    createBaseProduct(
        "hl1",
        "Kitchen Storage Set",
        "Home & Living",
        "Functional Items",
        1999
    ),
    createBaseProduct(
        "hl2",
        "Dining Essentials",
        "Home & Living",
        "Everyday Use Items",
        2499
    ),
    createBaseProduct(
        "hl3",
        "Home Organization Kit",
        "Home & Living",
        "Functional Items",
        1799
    ),
];

// Helper function to get products by category and subcategory
export const getProductsByCategory = (
    categoryId: string,
    subCategoryId?: string
): Product[] => {
    if (!categoryId) {
        return categoryProducts; // Return all products when no category is specified
    }

    const normalizePath = (path: string) =>
        path.toLowerCase().replace(/[^a-z0-9-]/g, "");
    const normalizedCategoryId = normalizePath(categoryId);

    if (subCategoryId) {
        const normalizedSubCategoryId = normalizePath(subCategoryId);
        return categoryProducts.filter(
            (product) =>
                normalizePath(product.category.path).includes(normalizedCategoryId) &&
                product.subCategory &&
                normalizePath(product.subCategory.path).includes(
                    normalizedSubCategoryId
                )
        );
    }

    return categoryProducts.filter((product) =>
        normalizePath(product.category.path).includes(normalizedCategoryId)
    );
};

export const sampleProducts: Product[] = [
    {
        id: "sp001",
        name: "Premium Cotton Bedsheet Set",
        slug: "premium-cotton-bedsheet-set",
        sku: "BED-SP001",
        description:
            "Luxurious 100% cotton bedsheet set with superior comfort and durability. Perfect for a good night's sleep.",
        shortDescription: "Premium cotton bedsheet set for ultimate comfort",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
        ],
        pricing: {
            price: 2499,
            originalPrice: 3999,
            currency: "INR",
            discount: 38,
            taxIncluded: true,
        },
        colors: [
            { name: "White", value: "#FFFFFF", available: true },
            { name: "Light Blue", value: "#ADD8E6", available: true },
            { name: "Cream", value: "#F5F5DC", available: false },
        ],
        sizes: [
            { name: "Single", value: "90x190cm", available: true },
            { name: "Double", value: "140x190cm", available: true },
            { name: "King", value: "180x200cm", available: true },
        ],
        inventory: {
            inStock: 45,
            reserved: 5,
            available: 40,
            lowStockThreshold: 10,
        },
        category: {
            id: "bedding",
            name: "Bedding",
            path: "/category/bedding",
        },
        subCategory: {
            id: "bedsheets",
            name: "Bedsheets",
            path: "/category/bedding/bedsheets",
        },
        brand: {
            id: "comfort-home",
            name: "Comfort Home",
            description: "Premium home textiles brand",
        },
        features: [
            "100% Pure Cotton",
            "Breathable and Soft",
            "Machine Washable",
            "Fade Resistant",
        ],
        specifications: {
            Material: "100% Cotton",
            "Thread Count": "300 TC",
            Care: "Machine Wash",
            Origin: "India",
        },
        weight: { value: 1200, unit: "g" },
        dimensions: { length: 200, width: 180, height: 5, unit: "cm" },
        rating: 4.5,
        reviewCount: 128,
        status: "active",
        featured: true,
        newProduct: false,
        bestSeller: true,
        shipping: {
            weight: { value: 1200, unit: "g" },
            dimensions: { length: 35, width: 25, height: 8, unit: "cm" },
            freeShipping: true,
            expeditedShipping: true,
        },
        tags: ["cotton", "bedding", "comfortable", "premium"],
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-12-01"),
    },
    {
        id: "sp002",
        name: "Wooden Dining Chair",
        slug: "wooden-dining-chair",
        sku: "FUR-SP002",
        description:
            "Elegant wooden dining chair crafted from solid oak wood. Features ergonomic design and timeless appeal.",
        shortDescription: "Solid oak wooden dining chair",
        images: [
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
        ],
        pricing: {
            price: 4999,
            originalPrice: 6999,
            currency: "INR",
            discount: 29,
            taxIncluded: true,
        },
        colors: [
            { name: "Natural Oak", value: "#D2B48C", available: true },
            { name: "Dark Walnut", value: "#5D4037", available: true },
            { name: "White Wash", value: "#F5F5F5", available: true },
        ],
        inventory: {
            inStock: 25,
            reserved: 3,
            available: 22,
            lowStockThreshold: 5,
        },
        category: {
            id: "furniture",
            name: "Furniture",
            path: "/category/furniture",
        },
        subCategory: {
            id: "chairs",
            name: "Chairs",
            path: "/category/furniture/chairs",
        },
        brand: {
            id: "woodcraft-studio",
            name: "WoodCraft Studio",
            description: "Handcrafted wooden furniture",
        },
        features: [
            "Solid Oak Wood",
            "Ergonomic Design",
            "Sturdy Construction",
            "Easy Assembly",
        ],
        specifications: {
            Material: "Solid Oak Wood",
            Finish: "Natural Polish",
            "Weight Capacity": "120 kg",
            Assembly: "Required",
        },
        weight: { value: 8500, unit: "g" },
        dimensions: { length: 45, width: 50, height: 85, unit: "cm" },
        rating: 4.2,
        reviewCount: 89,
        status: "active",
        featured: false,
        newProduct: true,
        bestSeller: false,
        shipping: {
            weight: { value: 9000, unit: "g" },
            dimensions: { length: 55, width: 55, height: 95, unit: "cm" },
            freeShipping: false,
            expeditedShipping: false,
        },
        tags: ["wooden", "dining", "chair", "furniture", "oak"],
        createdAt: new Date("2024-02-10"),
        updatedAt: new Date("2024-11-28"),
    },
    {
        id: "sp003",
        name: "Smart LED Table Lamp",
        slug: "smart-led-table-lamp",
        sku: "LIG-SP003",
        description:
            "Modern smart LED table lamp with adjustable brightness, color temperature control, and wireless charging base.",
        shortDescription: "Smart LED lamp with wireless charging",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop",
        ],
        pricing: {
            price: 3499,
            originalPrice: 4999,
            currency: "INR",
            discount: 30,
            taxIncluded: true,
        },
        colors: [
            { name: "Matte Black", value: "#2C2C2C", available: true },
            { name: "White", value: "#FFFFFF", available: true },
            { name: "Rose Gold", value: "#E8B4B8", available: false },
        ],
        inventory: {
            inStock: 60,
            reserved: 8,
            available: 52,
            lowStockThreshold: 15,
        },
        category: {
            id: "lighting",
            name: "Lighting",
            path: "/category/lighting",
        },
        subCategory: {
            id: "table-lamps",
            name: "Table Lamps",
            path: "/category/lighting/table-lamps",
        },
        brand: {
            id: "bright-tech",
            name: "BrightTech",
            description: "Smart lighting solutions",
        },
        features: [
            "Wireless Charging Base",
            "Adjustable Brightness",
            "Color Temperature Control",
            "Touch Controls",
            "USB-C Charging Port",
        ],
        specifications: {
            Power: "15W LED",
            Charging: "10W Wireless + USB-C",
            Brightness: "5-100%",
            "Color Temp": "3000K-6500K",
            Connectivity: "Touch Control",
        },
        weight: { value: 750, unit: "g" },
        dimensions: { length: 18, width: 18, height: 42, unit: "cm" },
        rating: 4.7,
        reviewCount: 203,
        status: "active",
        featured: true,
        newProduct: true,
        bestSeller: true,
        shipping: {
            weight: { value: 950, unit: "g" },
            dimensions: { length: 25, width: 25, height: 50, unit: "cm" },
            freeShipping: true,
            expeditedShipping: true,
        },
        tags: ["smart", "led", "lamp", "wireless-charging", "modern"],
        createdAt: new Date("2024-03-05"),
        updatedAt: new Date("2024-12-02"),
    },
    {
        id: "sp004",
        name: "Ceramic Coffee Mug Set",
        slug: "ceramic-coffee-mug-set",
        sku: "KIT-SP004",
        description:
            "Beautiful set of 4 handcrafted ceramic coffee mugs with unique glazed finish. Perfect for your morning coffee ritual.",
        shortDescription: "Handcrafted ceramic coffee mug set of 4",
        images: [
            "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        ],
        pricing: {
            price: 1299,
            originalPrice: 1799,
            currency: "INR",
            discount: 28,
            taxIncluded: true,
        },
        colors: [
            { name: "Ocean Blue", value: "#006994", available: true },
            { name: "Forest Green", value: "#228B22", available: true },
            { name: "Sunset Orange", value: "#FF8C00", available: true },
        ],
        inventory: {
            inStock: 35,
            reserved: 2,
            available: 33,
            lowStockThreshold: 8,
        },
        category: {
            id: "kitchenware",
            name: "Kitchenware",
            path: "/category/kitchenware",
        },
        subCategory: {
            id: "mugs-cups",
            name: "Mugs & Cups",
            path: "/category/kitchenware/mugs-cups",
        },
        brand: {
            id: "artisan-pottery",
            name: "Artisan Pottery",
            description: "Handcrafted ceramic goods",
        },
        features: [
            "Set of 4 Mugs",
            "Handcrafted Ceramic",
            "Unique Glazed Finish",
            "Microwave Safe",
            "Dishwasher Safe",
        ],
        specifications: {
            Material: "Premium Ceramic",
            Capacity: "350ml each",
            "Set Size": "4 pieces",
            Care: "Dishwasher & Microwave Safe",
        },
        weight: { value: 1800, unit: "g" },
        dimensions: { length: 12, width: 9, height: 10, unit: "cm" },
        rating: 4.4,
        reviewCount: 67,
        status: "active",
        featured: false,
        newProduct: false,
        bestSeller: false,
        shipping: {
            weight: { value: 2000, unit: "g" },
            dimensions: { length: 30, width: 20, height: 15, unit: "cm" },
            freeShipping: true,
            expeditedShipping: false,
        },
        tags: ["ceramic", "coffee", "mug", "handcrafted", "set"],
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-11-15"),
    },
    {
        id: "sp005",
        name: "Yoga Exercise Mat",
        slug: "yoga-exercise-mat",
        sku: "FIT-SP005",
        description:
            "Premium non-slip yoga mat made from eco-friendly TPE material. Perfect for yoga, pilates, and general fitness exercises.",
        shortDescription: "Eco-friendly non-slip yoga mat",
        images: [
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        ],
        pricing: {
            price: 1999,
            originalPrice: 2999,
            currency: "INR",
            discount: 33,
            taxIncluded: true,
        },
        colors: [
            { name: "Purple", value: "#8A2BE2", available: true },
            { name: "Teal", value: "#008080", available: true },
            { name: "Pink", value: "#FFC0CB", available: true },
            { name: "Black", value: "#000000", available: false },
        ],
        sizes: [
            { name: "Standard", value: "183x61cm", available: true },
            { name: "Extra Long", value: "200x66cm", available: true },
        ],
        inventory: {
            inStock: 80,
            reserved: 10,
            available: 70,
            lowStockThreshold: 20,
        },
        category: {
            id: "fitness",
            name: "Fitness",
            path: "/category/fitness",
        },
        subCategory: {
            id: "yoga-accessories",
            name: "Yoga Accessories",
            path: "/category/fitness/yoga-accessories",
        },
        brand: {
            id: "zen-fitness",
            name: "Zen Fitness",
            description: "Mindful fitness equipment",
        },
        features: [
            "Non-slip Surface",
            "Eco-friendly TPE Material",
            "6mm Thickness",
            "Lightweight & Portable",
            "Easy to Clean",
        ],
        specifications: {
            Material: "TPE (Thermoplastic Elastomer)",
            Thickness: "6mm",
            Dimensions: "183 x 61 cm",
            Weight: "1.2kg",
            Care: "Wipe with damp cloth",
        },
        weight: { value: 1200, unit: "g" },
        dimensions: { length: 183, width: 61, height: 0.6, unit: "cm" },
        rating: 4.6,
        reviewCount: 145,
        status: "active",
        featured: true,
        newProduct: false,
        bestSeller: true,
        shipping: {
            weight: { value: 1400, unit: "g" },
            dimensions: { length: 65, width: 15, height: 15, unit: "cm" },
            freeShipping: true,
            expeditedShipping: true,
        },
        tags: ["yoga", "exercise", "mat", "fitness", "eco-friendly"],
        createdAt: new Date("2024-02-28"),
        updatedAt: new Date("2024-11-30"),
    },
];