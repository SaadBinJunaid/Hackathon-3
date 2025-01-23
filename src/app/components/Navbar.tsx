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
import { products } from "../shop/page";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = products.filter((product: products) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            <Link href="/checkout">
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
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
            <Link href="/checkout">
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-gray-600" />
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

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Search Products</h2>
                <XMarkIcon
                  onClick={() => setIsSearchOpen(false)}
                  className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for products..."
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Search
              </button>
              <div className="mt-6 max-h-64 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <ul className="space-y-4">
                    {filteredProducts.map((product: products) => (
                      <li
                        key={product._id}
                        className="flex items-start gap-4 border-b pb-4 last:border-b-0"
                      >
                        <img
                          src={product.imagePath}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <Link
                            href={{
                              pathname: `/product/${product._id}`,
                              query: {
                                name: product.name,
                                price: product.price,
                                image: product.imagePath,
                                description: product.description,
                              },
                            }}
                          >
                            <h3 className="font-medium text-lg">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-gray-500 text-sm">
                            {product.description}
                          </p>
                          <p className="text-blue-500 font-semibold">
                            £{product.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center mt-4">
                    No products found.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
