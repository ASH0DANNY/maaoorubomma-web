import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../types/category'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { LocationSelector } from './LocationSelector'

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSticky, setIsSticky] = useState(false)

    const handleSubMenuToggle = (categoryId: string) => {
        setOpenSubMenu(openSubMenu === categoryId ? null : categoryId)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Searching for:', searchQuery)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`bg-white shadow-md z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 w-full' : 'relative'}`}>
            {/* Top Bar */}
            <div className={`bg-primary py-2 hidden md:block ${isSticky ? 'md:hidden' : ''}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center text-xs text-black">
                        <div className="flex space-x-4">
                            <span>Free shipping on orders over ₹999</span>
                            <span>•</span>
                            <span>Easy 48-hour returns</span>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/help" className="hover:text-gray-900">Help</Link>
                            <Link to="/track-order" className="hover:text-gray-900">Track Order</Link>
                            <Link to="/store-locator" className="hover:text-gray-900">Store Locator</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Location */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="block">
                            <img
                                className="h-12 w-auto"
                                src="/src/assets/Maaoorubomma Logo Final Logo/Maaoorubomma Logo.png"
                                alt="Maaoorubomma"
                            />
                        </Link>

                        {/* Separator line */}
                        <div className="h-8 w-[2px] bg-gray-300 mx-4"></div>
                        <LocationSelector />
                    </div>

                    {/* Search and Icons */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <div className="hidden md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-48 lg:w-64 pl-4 pr-10 py-2 border border-black rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(e);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <SearchIcon className="h-5 w-5 text-black" />
                                </button>
                            </div>
                        </div>

                        <Link to="/#" className="p-2 text-black hover:text-gray-400">
                            <FavoriteIcon className="h-6 w-6" />
                        </Link>

                        <Link to="/#" className="p-2 text-black hover:text-gray-400">
                            <PersonIcon className="h-6 w-6" />
                        </Link>

                        <Link to="/#" className="relative p-2 text-black hover:text-gray-400">
                            <ShoppingCartIcon className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
                        >
                            {isMobileMenuOpen ? (
                                <CloseIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Categories Row - Desktop Only */}
            <div className="bg-white hidden lg:block border-t border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-8 py-0">
                        {categories.map((category) => (
                            <div key={category.id} className="relative group">
                                <button
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap"
                                >
                                    {category.title}
                                </button>

                                {category.subCategories && (
                                    <div className="absolute left-0 z-10 mt-0 w-screen max-w-md transform px-2 sm:px-0 lg:max-w-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                                        <div className="rounded-sm shadow-lg ring-2 ring-gray-300 ring-opacity-5 overflow-hidden">
                                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-5 lg:grid-cols-2">
                                                {category.subCategories.map((subCategory) => (
                                                    <div key={subCategory.id}>
                                                        <Link
                                                            to={subCategory.path}
                                                            className="-m-3 p-1 flex items-start rounded-xs hover:bg-gray-50"
                                                        >
                                                            <div className="ml-4">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {subCategory.name}
                                                                </p>
                                                                {subCategory.subCategories && (
                                                                    <div className="mt-2 pl-2 space-y-1">
                                                                        {subCategory.subCategories.map((nestedSubCategory) => (
                                                                            <Link
                                                                                key={nestedSubCategory.id}
                                                                                to={nestedSubCategory.path}
                                                                                className="text-sm text-gray-500 hover:text-gray-900 block"
                                                                            >
                                                                                {nestedSubCategory.name}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {categories.map((category) => (
                            <div key={category.id} className="border-b border-gray-200 last:border-b-0">
                                <button
                                    onClick={() => handleSubMenuToggle(category.id)}
                                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700"
                                >
                                    {category.title}
                                    {category.subCategories && (
                                        <ArrowDropDownIcon
                                            className={`transform transition-transform ${openSubMenu === category.id ? 'rotate-180' : ''
                                                }`}
                                        />
                                    )}
                                </button>

                                {category.subCategories && openSubMenu === category.id && (
                                    <div className="bg-gray-50 px-4 py-2">
                                        {category.subCategories.map((subCategory) => (
                                            <div key={subCategory.id} className="py-1">
                                                <Link
                                                    to={subCategory.path}
                                                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                                                >
                                                    {subCategory.name}
                                                </Link>
                                                {subCategory.subCategories && (
                                                    <div className="pl-4 space-y-1">
                                                        {subCategory.subCategories.map((nestedSubCategory) => (
                                                            <Link
                                                                key={nestedSubCategory.id}
                                                                to={nestedSubCategory.path}
                                                                className="block px-3 py-1 text-sm text-gray-500 hover:text-gray-900"
                                                            >
                                                                {nestedSubCategory.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}