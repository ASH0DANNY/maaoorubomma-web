import { categories } from '../types/category';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { MaaoorubommaLogoWhiteBase64 } from '../utils/Base64';

export default function Footer() {
    const mainCategories = categories.slice(0, 4); // Get first 4 main categories

    return (
        <footer className="bg-gray-900 text-white">

            {/* Newsletter Section */}
            {/* <div className="bg-gray-800 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                            <p className="text-gray-300">Subscribe for exclusive offers and updates</p>
                        </div>
                        <div className="flex w-full md:w-auto max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-lg font-semibold transition-colors duration-200">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <img
                            src={MaaoorubommaLogoWhiteBase64}
                            alt="Maaoorubomma"
                            className="h-12 w-auto mb-6"
                        />
                        <p className="text-gray-400 mb-6">
                            Your one-stop destination for authentic Indian artisanal products and handicrafts.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <InstagramIcon />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FacebookIcon />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <TwitterIcon />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <YouTubeIcon />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {mainCategories.map((category) => (
                                <li key={category.id}>
                                    <a href={category.path} className="text-gray-400 hover:text-white">
                                        {category.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a>
                            </li>
                            <li>
                                <a href="/shipping" className="text-gray-400 hover:text-white">Shipping Policy</a>
                            </li>
                            <li>
                                <a href="/returns" className="text-gray-400 hover:text-white">Returns & Exchanges</a>
                            </li>
                            <li>
                                <a href="/faq" className="text-gray-400 hover:text-white">FAQ</a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <PhoneIcon className="text-blue-400" />
                                <span className="text-gray-400">+91 9876543210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <EmailIcon className="text-blue-400" />
                                <span className="text-gray-400">info@maaoorubomma.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <LocationOnIcon className="text-blue-400" />
                                <span className="text-gray-400">
                                    123 Crafts Street, Artisan District
                                    <br />
                                    Hyderabad, India 500081
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <LocalShippingIcon className="text-green-400" />
                            <span>Free Shipping Above ₹999</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <SecurityIcon className="text-green-400" />
                            <span>Secure Payments</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <AssignmentReturnIcon className="text-green-400" />
                            <span>Easy Returns</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <PaymentIcon className="text-green-400" />
                            <span>Multiple Payment Options</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-2 md:mb-0">
                            © 2025 Maaoorubomma. All rights reserved.
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
                            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
                            <a href="/terms" className="hover:text-white">Terms of Service</a>
                            <a href="/sitemap" className="hover:text-white">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}