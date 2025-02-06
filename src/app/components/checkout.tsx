"use client"
import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="relative w-full aspect-[16/3] sm:aspect-[16/4] md:aspect-[16/2] pt-16 mt-16">
        <Image 
          src="/cart1.png"
          alt="cart Banner"
          fill
          className="object-cover"
          
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Cart Table */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 flex-grow">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16">
            <p className="text-[24px] font-semibold mb-4">Your cart is empty</p>
            <p className="text-neutral-600 mb-8">
              Add items to your cart to see them here. Start shopping now!
            </p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-[#FBEBB5] border-black hover:text-white rounded-md hover:bg-black transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[2fr,1fr,1fr] gap-8 pb-4 border-b border-neutral-200">
              <div>Product</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid md:grid-cols-[2fr,1fr,1fr] gap-8 py-8 border-b border-neutral-200"
              >
                <div className="flex gap-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[80px] h-[80px] md:w-[124px] md:h-[124px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-[16px] md:text-[20px] font-medium mb-1 md:mb-2">
                      {item.name}
                    </h3>
                    <p className="text-neutral-600 text-[14px] md:text-[16px] mb-2 md:mb-4">
                      {item.description}
                    </p>
                    <p className="font-semibold text-[14px] md:text-[16px]">
                    £{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-start mt-4 md:mt-0">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-12 md:w-16 text-center py-1"
                  />
                </div>

                <div className=" hidden text-right font-semibold mt-4 md:mt-0">
                £{(item.price * item.quantity).toFixed(2)}
                </div>

                <div className="md:flex justify-end mt-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-8">
              <div className="w-full md:w-[400px]">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-neutral-600 mb-8">
                  Taxes and shipping are calculated at checkout
                </p>
                <Link href='/billing'>
                <button className="w-full bg-[#FBEBB5] hover:text-white py-4 border-black hover:bg-black transition-colors rounded-md">
                  Go to checkout
                </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

        </div>

      <div className="container mx-auto px-4 py-16 bg-[#FAF4F4]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4">Free Delivery</h3>
            <p className="text-gray-500">
              For all oders over $50, consectetur adipim scing elit.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">90 Days Return</h3>
            <p className="text-gray-500">
              If goods have problems, consectetur adipim scing elit.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Secure Payment</h3>
            <p className="text-gray-500">
              100% secure payment, consectetur adipim scing elit.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}


