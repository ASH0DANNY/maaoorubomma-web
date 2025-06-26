import type { Product } from "../types/product";
import { toyimageBase64 } from "../utils/Base64";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

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
    description: `High-quality ${name.toLowerCase()} for your home`,
    shortDescription: `Beautiful ${name.toLowerCase()}`,
    images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    ],
    priceing: {
        price,
        originalPrice: Math.round(price * 1.2),
        currency: "INR",
        taxIncluded: true,
    },
    inventory: {
        available: 10,
        total: 10,
    },
    categoryId: category,
    subCategoryId: subCategory,
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
    // highlight flags (default false)
    bestSeller: false,
    newProduct: false,
    featured: false,
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
                normalizePath(product.categoryId).includes(normalizedCategoryId) &&
                product.subCategoryId &&
                normalizePath(product.subCategoryId).includes(
                    normalizedSubCategoryId
                )
        );
    }

    return categoryProducts.filter((product) =>
        normalizePath(product.categoryId).includes(normalizedCategoryId)
    );
};

// Fetch products from Firestore 'products' collection
export async function getSampleProductsFromFirestore(): Promise<Product[]> {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
}