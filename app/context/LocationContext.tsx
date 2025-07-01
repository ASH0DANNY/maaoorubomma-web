'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Address } from '../types/address';
import { AppUser } from '../types/user';

interface LocationContextType {
    currentLocation: string;
    setCurrentLocation: (location: string) => void;
    isLocationPopupOpen: boolean;
    setIsLocationPopupOpen: (isOpen: boolean) => void;
    userAddresses: Address[];
    selectedAddress: Address | null;
    setSelectedAddress: (address: Address | null) => void;
    addAddress: (address: Address) => void;
    updateAddress: (address: Address) => void;
    removeAddress: (addressId: string) => void;
    setDefaultAddress: (addressId: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const popularLocations = [
    { name: 'Delhi', code: '110001' },
    { name: 'Mumbai', code: '400001' },
    { name: 'Bangalore', code: '560001' },
    { name: 'Chennai', code: '600001' },
    { name: 'Hyderabad', code: '500001' },
    { name: 'Pune', code: '411001' },
];

export function LocationProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [currentLocation, setCurrentLocation] = useState('Select Location');
    const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
    const [userAddresses, setUserAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    // Load user addresses from user object (AppUser)
    useEffect(() => {
        if (user && (user as any).addresses) {
            // If user object has addresses array
            const addresses: Address[] = (user as any).addresses;
            setUserAddresses(addresses);
            const defaultAddress = addresses.find((addr: Address) => addr.isDefault);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
                setCurrentLocation(`${defaultAddress.city} - ${defaultAddress.postalCode}`);
            } else if (addresses.length > 0) {
                setSelectedAddress(addresses[0]);
                setCurrentLocation(`${addresses[0].city} - ${addresses[0].postalCode}`);
            }
        } else {
            setUserAddresses([]);
            setSelectedAddress(null);
            setCurrentLocation('Select Location');
        }
    }, [user]);

    // The following add/update/remove/setDefault methods should sync with backend in a real app
    // For now, only update local state
    const addAddress = (address: Address) => {
        const newAddresses = [...userAddresses, address];
        setUserAddresses(newAddresses);
        if (!selectedAddress || address.isDefault) {
            setSelectedAddress(address);
            setCurrentLocation(`${address.city} - ${address.postalCode}`);
        }
        // TODO: Sync with backend
    };

    const updateAddress = (address: Address) => {
        const newAddresses = userAddresses.map(addr => 
            addr.id === address.id ? address : addr
        );
        setUserAddresses(newAddresses);
        if (selectedAddress?.id === address.id) {
            setSelectedAddress(address);
            setCurrentLocation(`${address.city} - ${address.postalCode}`);
        }
        // TODO: Sync with backend
    };

    const removeAddress = (addressId: string) => {
        const newAddresses = userAddresses.filter(addr => addr.id !== addressId);
        setUserAddresses(newAddresses);
        if (selectedAddress?.id === addressId) {
            const defaultAddress = newAddresses.find(addr => addr.isDefault);
            setSelectedAddress(defaultAddress || null);
            setCurrentLocation(defaultAddress ? 
                `${defaultAddress.city} - ${defaultAddress.postalCode}` : 
                'Select Location'
            );
        }
        // TODO: Sync with backend
    };

    const setDefaultAddress = (addressId: string) => {
        const newAddresses = userAddresses.map(addr => ({
            ...addr,
            isDefault: addr.id === addressId
        }));
        setUserAddresses(newAddresses);
        const newDefaultAddress = newAddresses.find(addr => addr.id === addressId);
        if (newDefaultAddress) {
            setSelectedAddress(newDefaultAddress);
            setCurrentLocation(`${newDefaultAddress.city} - ${newDefaultAddress.postalCode}`);
        }
        // TODO: Sync with backend
    };

    return (
        <LocationContext.Provider
            value={{
                currentLocation,
                setCurrentLocation,
                isLocationPopupOpen,
                setIsLocationPopupOpen,
                userAddresses,
                selectedAddress,
                setSelectedAddress,
                addAddress,
                updateAddress,
                removeAddress,
                setDefaultAddress
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
}
