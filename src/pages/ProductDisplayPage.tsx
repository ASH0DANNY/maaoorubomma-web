import { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import type { Product } from '../types/product';
import { useLoaderData } from 'react-router-dom';

// Mock color and size types
interface ColorOption {
    name: string;
    value: string;
    available: boolean;
}

interface SizeOption {
    name: string;
    value: string;
    available: boolean;
}

// Dummy products data using the Product interface
const dummyProducts: Product[] = [
    {
        id: "1",
        name: "Handcrafted Brass Figurine - Ganesha",
        slug: "handcrafted-brass-ganesha",
        sku: "BF-GAN-001",
        description: "Exquisitely handcrafted brass Ganesha figurine",
        shortDescription: "Handcrafted brass Ganesha figurine for home decor",
        images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&sat=50"
        ],
        pricing: {
            price: 2499,
            originalPrice: 3199,
            currency: "INR",
            taxIncluded: true
        },
        inventory: {
            inStock: 15,
            reserved: 2,
            available: 13,
            lowStockThreshold: 5
        },
        category: {
            id: "home-decor",
            name: "Home Decor",
            path: "/category/home-decor"
        },
        brand: {
            id: "artisan-crafts",
            name: "Artisan Crafts"
        },
        features: [
            "100% Pure Brass Construction",
            "Handcrafted by Expert Artisans"
        ],
        specifications: {
            "Material": "Pure Brass",
            "Finish": "Antique Gold"
        },
        weight: {
            value: 850,
            unit: "g"
        },
        dimensions: {
            length: 20,
            width: 15,
            height: 10,
            unit: "cm"
        },
        rating: 4.5,
        reviewCount: 127,
        status: "active",
        featured: true,
        newProduct: false,
        bestSeller: true,
        shipping: {
            weight: { value: 850, unit: "g" },
            dimensions: { length: 20, width: 15, height: 10, unit: "cm" },
            freeShipping: true,
            expeditedShipping: true
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

// Mock color and size options
const mockColors: ColorOption[] = [
    { name: 'Antique Gold', value: '#B8860B', available: true },
    { name: 'Classic Brass', value: '#CD7F32', available: true },
    { name: 'Oxidized Bronze', value: '#8B4513', available: false }
];

const mockSizes: SizeOption[] = [
    { name: 'Small', value: '6"', available: true },
    { name: 'Medium', value: '8"', available: true },
    { name: 'Large', value: '12"', available: true },
    { name: 'Extra Large', value: '16"', available: false }
];

interface LoaderData {
    product: Product;
}

const ProductDisplayPage = () => {
    const { product } = useLoaderData() as LoaderData;
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [showProductTable, setShowProductTable] = useState(false);

    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment' && quantity < product.inventory.available) {
            setQuantity(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => setShowProductTable(!showProductTable)}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                {showProductTable ? 'Show Product Details' : 'Show Product Table'}
            </button>

            {showProductTable ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dummyProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full overflow-hidden">
                                                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.sku}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatPrice(product.pricing.price)}</div>
                                        {product.pricing.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                {formatPrice(product.pricing.originalPrice)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.inventory.available}</div>
                                        <div className="text-sm text-gray-500">In stock</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                                            product.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.category.name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Product view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-gray-600 mt-2">Brand: {product.brand.name} | SKU: {product.sku}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(product.rating)}</div>
                            <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.pricing.price)}</span>
                            {product.pricing.originalPrice && (
                                <>
                                    <span className="text-xl text-gray-500 line-through">{formatPrice(product.pricing.originalPrice)}</span>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                        {Math.round(((product.pricing.originalPrice - product.pricing.price) / product.pricing.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Colors */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>                        <div className="flex space-x-3">
                                {mockColors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        disabled={!color.available}
                                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.name ? 'border-gray-900' : 'border-gray-300'
                                            } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>                        <div className="flex space-x-3">
                                {mockSizes.map((size) => (
                                    <button
                                        key={size.name}
                                        onClick={() => setSelectedSize(size.name)}
                                        disabled={!size.available}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedSize === size.name
                                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {size.name} ({size.value})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center border rounded-md">
                                    <button
                                        onClick={() => handleQuantityChange('decrement')}
                                        className="p-2 hover:bg-gray-100"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-2 border-l border-r">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('increment')}
                                        className="p-2 hover:bg-gray-100"
                                        disabled={quantity >= product.inventory.available}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>                            <span className="text-sm text-gray-600">
                                    {product.inventory.available} items in stock
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 flex items-center justify-center space-x-2">
                                <ShoppingCart className="w-5 h-5" />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`p-3 border rounded-md ${isWishlisted ? 'text-red-600 border-red-600' : 'text-gray-600 border-gray-300'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                            <button className="p-3 border border-gray-300 rounded-md text-gray-600">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                            <div className="flex items-center space-x-2">
                                <Truck className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-gray-600">Free Shipping</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-gray-600">Secure Payment</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RotateCcw className="w-5 h-5 text-purple-600" />
                                <span className="text-sm text-gray-600">Easy Returns</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-yellow-600" />
                                <span className="text-sm text-gray-600">Authentic Product</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Details Tabs */}
            <div className="mt-16">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="py-8">
                    {activeTab === 'description' && (
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-700">{key}:</span>
                                    <span className="text-gray-600">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium text-gray-900">
                                    Customer Reviews ({product.reviewCount})
                                </h4>
                                <div className="flex items-center space-x-2">
                                    <div className="flex">{renderStars(product.rating)}</div>
                                    <span className="text-sm text-gray-600">{product.rating} out of 5</span>
                                </div>
                            </div>
                            <div className="text-center py-8 text-gray-500">
                                <p>Reviews will be displayed here</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDisplayPage;