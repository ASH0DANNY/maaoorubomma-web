import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../types/category'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSubMenuToggle = (categoryId: string) => {
        setOpenSubMenu(openSubMenu === categoryId ? null : categoryId)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Searching for:', searchQuery)
    }

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gray-50 py-2 hidden md:block">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center text-sm text-gray-600">
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
            <nav className="bg-white shadow-sm border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <img
                                    className="h-12 w-auto"
                                    src="/src/assets/Maaoorubomma Logo Final Logo/Maaoorubomma Logo.png"
                                    alt="Maaoorubomma"
                                />
                            </Link>
                        </div>

                        {/* Desktop Categories */}
                        <div className="hidden lg:flex lg:space-x-8">
                            {categories.map((category) => (
                                <div key={category.id} className="relative group">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                                        onClick={() => handleSubMenuToggle(category.id)}
                                    >
                                        {category.name}
                                        {category.subCategories && (
                                            <ArrowDropDownIcon className="ml-1 text-gray-400 group-hover:text-gray-600" />
                                        )}
                                    </button>
                                    {category.subCategories && openSubMenu === category.id && (
                                        <div className="absolute left-0 z-10 mt-2 w-screen max-w-md transform px-2 sm:px-0 lg:max-w-2xl">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                                                    {category.subCategories.map((subCategory) => (
                                                        <div key={subCategory.id}>
                                                            <Link
                                                                to={subCategory.path}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                            >
                                                                <div className="ml-4">
                                                                    <p className="text-base font-medium text-gray-900">
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

                        {/* Search and Icons */}
                        <div className="flex items-center space-x-4">
                            <form onSubmit={handleSearch} className="hidden md:block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <SearchIcon className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>
                            </form>

                            <Link to="/wishlist" className="p-2 text-gray-400 hover:text-gray-600">
                                <FavoriteIcon className="h-6 w-6" />
                            </Link>

                            <Link to="/profile" className="p-2 text-gray-400 hover:text-gray-600">
                                <PersonIcon className="h-6 w-6" />
                            </Link>

                            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-600">
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
                                        {category.name}
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
        </>
    )
}