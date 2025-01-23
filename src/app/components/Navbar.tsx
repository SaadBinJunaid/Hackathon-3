"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface CartItem {
  quantity: number;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0); // Dynamic cart item count

  // Update cart item count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems: CartItem[] = JSON.parse(storedCart);
        const totalItems = cartItems.reduce(
          (total: number, item: CartItem) => total + item.quantity,
          0
        );
        setCartItemCount(totalItems);
      } else {
        setCartItemCount(0);
      }
    };

    // Call the function initially to set the cart count
    updateCartCount();

    // Use an interval to update the cart count every second
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div className="bg-gray-100">
      <nav className="w-full bg-[#FBEBB5]">
        <div className="container mx-auto flex justify-between items-center h-20 px-4 md:px-8">
          {/* Mobile Left */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 cursor-pointer" />
            ) : (
              <Bars3Icon className="h-6 w-6 cursor-pointer" />
            )}
          </button>

          {/* Mobile Right */}
          <div className="flex gap-4 md:hidden ml-auto">
            <MagnifyingGlassIcon
              onClick={() => setIsSearchOpen(true)}
              className="h-6 w-6 cursor-pointer hover:text-gray-600"
            />
            <Link href="/myaccount">
              <UserIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
            </Link>
            <Link href="/checkout" className="relative">
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount === 0 ? 0 : cartItemCount}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center justify-center w-full">
            <li className="cursor-pointer hover:text-gray-600">
              <Link href="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-600">
              <Link href="/shop">Shop</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-600">
              <Link href="/about">About</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-600">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/myaccount">
              <UserIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
            </Link>
            <MagnifyingGlassIcon
              onClick={() => setIsSearchOpen(true)}
              className="h-6 w-6 cursor-pointer hover:text-gray-600"
            />
            <HeartIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
            <Link href="/checkout" className="relative">
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount === 0 ? 0 : cartItemCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute top-0 left-0 h-full bg-white w-64 p-6 shadow-lg">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
              <ul className="flex flex-col gap-6 mt-12">
                <li className="cursor-pointer hover:text-gray-600">
                  <Link href="/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-gray-600">
                  <Link href="/shop">Shop</Link>
                </li>
                <li className="cursor-pointer hover:text-gray-600">
                  <Link href="/about">About</Link>
                </li>
                <li className="cursor-pointer hover:text-gray-600">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
