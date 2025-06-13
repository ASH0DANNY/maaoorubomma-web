import { Product } from '../types/product';

export const categoryProducts: Product[] = [
    {
        id: '1',
        name: 'Sample Product 1',
        description: 'This is a sample product description',
        pricing: {
            price: 999,
            originalPrice: 1299
        },
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
        category: 'electronics',
        featured: true,
        newProduct: false,
        bestSeller: true,
        inStock: true,
        rating: 4.5,
        reviewCount: 120,
    },
    {
        id: '2',
        name: 'Sample Product 2',
        description: 'This is another sample product description',
        pricing: {

            price: 1499,
            originalPrice: 1799,
        },
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
        category: 'electronics',
        featured: true,
        newProduct: true,
        bestSeller: false,
        inStock: true,
        rating: 4.2,
        reviewCount: 85,
    },
    // Add more sample products as needed
];
