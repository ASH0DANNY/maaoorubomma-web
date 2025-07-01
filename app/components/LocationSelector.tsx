import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import type { Address } from '../types/address';

export const LocationSelector = () => {
    const router = useRouter();
    const { user } = useAuth();
    const {
        currentLocation,
        setCurrentLocation,
        isLocationPopupOpen,
        setIsLocationPopupOpen,
        userAddresses,
        selectedAddress,
        setSelectedAddress
    } = useLocation();
    const [postalCode, setPostalCode] = useState('');

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/auth/signin?redirect=/account/addresses');
            return;
        }
        router.push('/account/addresses');
        setIsLocationPopupOpen(false);
    };

    const handleSelectAddress = (address: Address) => {
        setSelectedAddress(address);
        setCurrentLocation(`${address.city} - ${address.postalCode || address.postalCode}`);
        setIsLocationPopupOpen(false);
    };

    const handleDetectLocation = () => {
        if (!user) {
            router.push('/auth/signin?redirect=/account/addresses');
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you'd reverse geocode these coordinates
                    // and create a new address
                    router.push('/account/addresses');
                    setIsLocationPopupOpen(false);
                },
                (error) => {
                    console.error('Error detecting location:', error);
                    alert('Unable to detect location. Please add address manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsLocationPopupOpen(true)}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 hidden lg:block">Deliver To</span>
                    <div className="flex items-center">
                        <LocationOnOutlinedIcon className="h-4 w-4 text-gray-500 mr-0 lg:mr-1" fontSize='small' />
                        <span className="font-medium text-xs">{selectedAddress ? `${selectedAddress.city} ${selectedAddress.postalCode}` : currentLocation}</span>
                    </div>
                </div>
                <ArrowDropDownIcon className="h-4 w-4 text-gray-700 hidden lg:block" />
            </button>

            {isLocationPopupOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsLocationPopupOpen(false)}
                    ></div>

                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                            <div>
                                <div className="text-center">
                                    <LocationOnOutlinedIcon className="mx-auto h-12 w-12 text-blue-600" />
                                    <h3 className="mt-2 text-lg font-medium leading-6 text-gray-900">
                                        Choose your delivery location
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {user ? 'Select a delivery address or add a new one' : 'Sign in to select your delivery address'}
                                    </p>
                                </div>

                                {user && userAddresses.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <h4 className="text-sm font-medium text-gray-900">Your Addresses</h4>
                                        <div className="max-h-48 overflow-y-auto space-y-2">
                                            {userAddresses.map((address: Address) => (
                                                <button
                                                    key={address.id || address.postalCode}
                                                    onClick={() => handleSelectAddress(address)}
                                                    className={`w-full text-left p-3 rounded-lg border ${selectedAddress?.id === address.id
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="font-medium text-sm">{address.name || address.houseNumber}</div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {address.addressLine1 || address.addressLine1}
                                                        {address.addressLine2 && `, ${address.addressLine2}`}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {address.city}, {address.state} <span className="font-semibold">{address.postalCode}</span>
                                                    </div>
                                                    {address.isDefault && (
                                                        <span className="mt-1 inline-block text-xs text-blue-600 font-medium">
                                                            Default Address
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        onClick={handleDetectLocation}
                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <MyLocationIcon className="h-4 w-4 mr-2" />
                                        {user ? 'Add address using current location' : 'Sign in to use location'}
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={handleLocationSubmit}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {user ? 'Add New Address' : 'Sign in to add address'}
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={() => setIsLocationPopupOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};