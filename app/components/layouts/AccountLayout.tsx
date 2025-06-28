'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    const menuItems = [
        { name: 'All Orders', href: '/account/orders', current: pathname === '/account/orders' },
        { name: 'Saved Addresses', href: '/account/addresses', current: pathname === '/account/addresses' },
        { name: 'My Wishlist', href: '/wishlist', current: pathname === '/wishlist' },
        { name: 'Contact us', href: '/contact', current: pathname === '/contact' },
        { name: 'Wallet & eGift Cards', href: '/account/wallet', current: pathname === '/account/wallet' },
    ];

    const policyItems = [
        { name: 'Terms Of Use', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Returns & Exchange Policy', href: '/returns' },
        { name: 'Shipping Policy', href: '/shipping' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        {/* User Info */}
                        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                            <h2 className="text-lg font-medium mb-1">Hi, There!</h2>
                            {user?.phoneNumber && (
                                <p className="text-gray-600 text-sm mb-1">{user.phoneNumber}</p>
                            )}
                            {user?.email && (
                                <p className="text-gray-600 text-sm">{user.email}</p>
                            )}
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-1 bg-white rounded-lg shadow mb-6">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block px-4 py-3 text-sm hover:bg-gray-50 border-l-4 ${item.current
                                        ? 'border-blue-500 text-blue-600 font-medium'
                                        : 'border-transparent'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Policies */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-4 py-3 border-b">
                                <h3 className="font-medium">Policies and Settings</h3>
                            </div>
                            <nav className="space-y-1">
                                {policyItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-lg shadow p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
