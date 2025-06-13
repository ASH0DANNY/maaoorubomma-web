'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/src/types/category";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LocationSelector } from "@/src/components/LocationSelector";
import Image from "next/image";
import { MaaoorubommaLogoBase64 } from "@/src/utils/Base64";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    } else {
      router.push("/search");
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearchFocus = () => {
    router.push("/search");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (href: string) => {
    router.push(href);
    closeMobileMenu();
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle sticky navbar
      if (currentScrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Handle mobile search bar visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide mobile search
        setShowMobileSearch(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show mobile search
        setShowMobileSearch(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`bg-white shadow-md z-50 transition-all duration-300 ${isSticky ? "fixed top-0 w-full" : "relative"
        }`}
    >
      {/* Top Bar */}
      <div
        className={`bg-primary py-2 hidden md:block ${isSticky ? "md:hidden" : ""
          }`}
      >
        <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs text-black">
            <div className="flex space-x-4">
              <span>Free shipping on orders over ₹999</span>
              <span>•</span>
              <span>Easy 48-hour returns</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleLinkClick("/help")} className="hover:text-gray-900">
                Help
              </button>
              <button onClick={() => handleLinkClick("/track-order")} className="hover:text-gray-900">
                Track Order
              </button>
              <button onClick={() => handleLinkClick("/store-locator")} className="hover:text-gray-900">
                Store Locator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-4 bg-primary lg:bg-white sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Location */}
          <div className="flex items-center flex-shrink-0 gap-1 lg:gap-0">
            <button onClick={() => handleLinkClick("/")} className="block">
              <Image
                className="h-8 sm:h-10 lg:h-12 w-auto"
                src={MaaoorubommaLogoBase64}
                alt="Maaoorubomma"
                width={120}
                height={48}
              />
            </button>

            {/* Separator line */}
            <div className="h-8 w-[2px] bg-gray-300 mx-4 hidden lg:block"></div>
            <LocationSelector />
          </div>

          {/* Search and Icons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden md:block">
              <div className="relative">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    onFocus={handleSearchFocus}
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </form>
              </div>
            </div>

            <button onClick={() => handleLinkClick("/#")} className="p-1 lg:p-2 text-black hover:text-gray-400">
              <FavoriteBorderOutlinedIcon className="h-6 w-6" />
            </button>

            <button
              onClick={() => handleLinkClick("/#")}
              className="p-1 lg:p-2 text-black hover:text-gray-400 hidden lg:block"
            >
              <PersonOutlineOutlinedIcon className="h-6 w-6" />
            </button>

            <button
              onClick={() => handleLinkClick("/#")}
              className="relative p-1 lg:p-2 text-black hover:text-gray-400"
            >
              <ShoppingCartOutlinedIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Only visible on mobile */}
      <div
        className={`md:hidden bg-primary border-t border-gray-200 transition-all duration-300 overflow-hidden ${showMobileSearch ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="py-3">
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                      closeMobileMenu();
                    }
                  }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Row - Desktop Only */}
      <div className="bg-white hidden lg:block border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-0">
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
                  {category.title}
                </button>

                {category.subCategories && (
                  <div className="absolute left-0 z-10 mt-0 w-screen max-w-md transform px-2 sm:px-0 lg:max-w-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                    <div className="rounded-sm shadow-lg ring-2 ring-gray-300 ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-5 lg:grid-cols-2">
                        {category.subCategories.map((subCategory) => (
                          <div key={subCategory.id}>
                            <button
                              onClick={() => handleLinkClick(subCategory.path)}
                              className="-m-3 p-1 flex items-start rounded-xs hover:bg-gray-50 w-full text-left"
                            >
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {subCategory.name}
                                </p>
                                {subCategory.subCategories && (
                                  <div className="mt-2 pl-2 space-y-1">
                                    {subCategory.subCategories.map(
                                      (nestedSubCategory) => (
                                        <button
                                          key={nestedSubCategory.id}
                                          onClick={() => handleLinkClick(nestedSubCategory.path)}
                                          className="text-sm text-gray-500 hover:text-gray-900 block text-left"
                                        >
                                          {nestedSubCategory.name}
                                        </button>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMobileMenu}
          ></div>

          {/* Side Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Menu Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center">
                <Image
                  className="h-8 w-auto mr-3"
                  src={MaaoorubommaLogoBase64}
                  alt="Maaoorubomma"
                  width={90}
                  height={32}
                />
                <span className="text-lg font-medium text-gray-900">Menu</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch(e);
                          closeMobileMenu();
                        }
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <button
                        type="button"
                        onClick={(e) => {
                          handleSearch(e);
                          closeMobileMenu();
                        }}
                        className="flex items-center"
                      >
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="p-4">
                {/* Category Grid - First 6 categories in circular buttons */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {categories.slice(0, 6).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleLinkClick(category.path)}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2 hover:bg-orange-200 transition-colors">
                        {/* Placeholder for category image - you can replace with actual images */}
                        <span className="text-2xl">
                          {category.id === "bedding" && "🛏️"}
                          {category.id === "furnishings" && "🪑"}
                          {category.id === "decor" && "🖼️"}
                          {category.id === "dining" && "🍽️"}
                          {category.id === "kitchen" && "🍳"}
                          {category.id === "bath" && "🛁"}
                          {![
                            "bedding",
                            "furnishings",
                            "decor",
                            "dining",
                            "kitchen",
                            "bath",
                          ].includes(category.id) && "📦"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 text-center font-medium">
                        {category.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Explore More Categories Button */}
                {categories.length > 6 && (
                  <button
                    onClick={() => handleLinkClick("/category/home-decor")}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors mb-4"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-lg">📋</span>
                      </div>
                      <span className="text-base font-medium text-gray-700">
                        Explore More Categories
                      </span>
                    </div>
                    <ArrowForwardIosIcon className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Menu Footer - User Actions */}
              <div className="border-t border-gray-200 p-4 space-y-3">
                <button
                  onClick={() => handleLinkClick("/account")}
                  className="flex items-center px-2 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  <PersonOutlineOutlinedIcon className="h-5 w-5 mr-3 text-gray-400" />
                  Login / Register
                </button>

                <button
                  onClick={() => handleLinkClick("/track-order")}
                  className="flex items-center px-2 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  <span className="text-sm mr-3">📦</span>
                  Track Your Order
                </button>

                <button
                  onClick={() => handleLinkClick("/help")}
                  className="flex items-center px-2 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  <span className="text-sm mr-3">❓</span>
                  Contact Us
                </button>

                <button
                  onClick={() => handleLinkClick("/store-locator")}
                  className="flex items-center px-2 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md w-full text-left"
                >
                  <span className="text-sm mr-3">📍</span>
                  Store Locator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;