import { createContext, useContext, useState, type ReactNode } from 'react';

interface LocationContextType {
    currentLocation: string;
    setCurrentLocation: (location: string) => void;
    isLocationPopupOpen: boolean;
    setIsLocationPopupOpen: (isOpen: boolean) => void;
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
    const [currentLocation, setCurrentLocation] = useState('Select Location');
    const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);

    return (
        <LocationContext.Provider
            value={{
                currentLocation,
                setCurrentLocation,
                isLocationPopupOpen,
                setIsLocationPopupOpen
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
