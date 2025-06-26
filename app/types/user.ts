export interface UserAddress {
    houseNumber: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface UserOrder {
    items: any[]; // You can import CartItem[] for stricter typing
    total: number;
    paymentMethod: string;
    status: string;
    createdAt: any; // Firestore Timestamp
}

export interface AppUser {
    uid: string;
    name: string;
    email: string;
    mobile?: string;
    address?: UserAddress;
    orders?: UserOrder[];
    createdAt: string;
}
