import { useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLocation, popularLocations } from '../context/LocationContext';

export const LocationSelector = () => {
    const { currentLocation, setCurrentLocation, isLocationPopupOpen, setIsLocationPopupOpen } = useLocation();
    const [postalCode, setPostalCode] = useState('');

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (postalCode.trim()) {
            setCurrentLocation(`${postalCode}`);
            setIsLocationPopupOpen(false);
            setPostalCode('');
        }
    };

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    // In a real app, you'd reverse geocode these coordinates
                    setCurrentLocation('Current Location');
                    setIsLocationPopupOpen(false);
                },
                (error) => {
                    console.error('Error detecting location:', error);
                    alert('Unable to detect location. Please enter postal code manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const selectPopularLocation = (location: { name: string; code: string }) => {
        setCurrentLocation(`${location.name} - ${location.code}`);
        setIsLocationPopupOpen(false);
    };

    // Extract postal code from current location for display
    const displayCode = currentLocation.includes('-') ?
        currentLocation.split('-').pop()?.trim() || currentLocation :
        currentLocation;

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
                        <span className="font-medium text-xs">{displayCode}</span>
                    </div>
                </div>
                <ArrowDropDownIcon className="h-4 w-4 text-gray-700 hidden lg:block" />
            </button>

            {/* Location Popup Modal */}
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
                                        Choose your location
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter your postal code to see products available in your area
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={handleDetectLocation}
                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <MyLocationIcon className="h-4 w-4 mr-2" />
                                        Detect my location
                                    </button>
                                </div>

                                <div className="mt-4 flex items-center">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-3 text-sm text-gray-500">or</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>

                                <div className="mt-4">
                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="Enter postal code"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleLocationSubmit(e);
                                                }
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleLocationSubmit}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Apply
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Popular locations</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {popularLocations.map((location) => (
                                            <button
                                                key={location.code}
                                                onClick={() => selectPopularLocation(location)}
                                                className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200 hover:border-gray-300"
                                            >
                                                <div className="font-medium">{location.name}</div>
                                                <div className="text-xs text-gray-500">{location.code}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6">
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
            )}
        </>
    );
};