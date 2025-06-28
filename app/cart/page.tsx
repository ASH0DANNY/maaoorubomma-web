'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { EmptyCart } from '../components/EmptyStateGraphics';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [couponCode, setCouponCode] = useState('WELCOME50');
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/payment');
    }
  };

  // Calculate pricing details
  const calculatePricing = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = items.reduce((sum, item) => {
      const originalPrice = item.price * 1.5; // Assuming 33% discount
      return sum + (originalPrice * item.quantity);
    }, 0);

    const discount = originalTotal - subtotal;
    const couponDiscount = appliedCoupon ? 50 : 0;
    const finalTotal = subtotal - couponDiscount;
    const totalSavings = discount + couponDiscount;

    return {
      subtotal,
      originalTotal,
      discount,
      couponDiscount,
      finalTotal,
      totalSavings,
      deliveryCharges: 0 // Free delivery
    };
  };

  const pricing = calculatePricing();

  const applyCoupon = () => {
    if (couponCode === 'WELCOME50') {
      setAppliedCoupon(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>
        <div className="text-center py-8">
          {/* <p className="text-gray-600 mb-4">Your cart is empty</p> */}
          <EmptyCart size="3xl" className="bg-white rounded-xl" />
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {items.map((item) => {
            const originalPrice = item.price * 1.5; // Assuming 33% discount
            const discount = Math.round(((originalPrice - item.price) / originalPrice) * 100);

            return (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex items-start gap-4 border-b border-gray-200 py-6"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  {/* Limited Time Offer Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-orange-600 font-medium">Limited time offer</span>
                  </div>

                  {/* Product Name */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-lg font-medium hover:text-blue-600 block mb-2"
                  >
                    {item.name}
                  </Link>

                  {/* Product Variants */}
                  {(item.color || item.size) && (
                    <div className="text-sm text-gray-600 mb-2">
                      {item.size && <span>{item.size}</span>}
                    </div>
                  )}

                  {/* Return Policy */}
                  <div className="text-sm text-gray-500 mb-3">5d return</div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100 text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x min-w-[50px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-right">
                  <div className="text-xl font-bold mb-1">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 line-through mb-1">
                    ₹{(originalPrice * item.quantity).toLocaleString()}
                  </div>
                  <div className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full inline-block">
                    {discount}% OFF
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          {/* Savings Banner */}
          <div className="bg-teal-600 text-white p-4 rounded-lg mb-4 text-center">
            <span className="text-sm font-medium">
              You are saving ₹{pricing.totalSavings.toLocaleString()} today!
            </span>
          </div>

          {/* Gift Wrap Offer */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎁</span>
              <span className="font-medium">Make this order special</span>
              <span className="text-sm text-red-600 ml-auto">Free Gift Wrap</span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-gray-50 border rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-medium">WELCOME50</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Best Offer For You
              </span>
              <button
                onClick={applyCoupon}
                className="ml-auto bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                disabled={appliedCoupon}
              >
                {appliedCoupon ? 'Applied' : 'Apply'}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Get flat ₹50 off on your order. One time use only.
            </p>
            <button className="text-sm text-blue-600 mt-2 hover:underline">
              View more coupon codes
            </button>
          </div>

          {/* Checkout Button */}
          <div className="bg-yellow-400 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">₹{pricing.finalTotal.toLocaleString()}</span>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className={`${items.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  } text-white px-6 py-2 rounded-md flex items-center gap-2`}
              >
                Checkout
                <span className="text-sm">💳</span>
              </button>
            </div>
          </div>

          {/* Bill Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Total Bill Breakdown</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Item Total (MRP)</span>
                <span>₹{pricing.originalTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-red-600">
                <span>Discount from MRP</span>
                <span>-₹{pricing.discount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <div className="text-right">
                  <span className="line-through text-gray-500">₹70.00</span>
                  <span className="text-green-600 ml-2">FREE</span>
                </div>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{pricing.couponDiscount}</span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Total Savings</span>
                  <span>₹{pricing.totalSavings.toLocaleString()} Saving</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Final amount <span className="text-sm font-normal">(Tax Included)</span></span>
                  <span>₹{pricing.finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}