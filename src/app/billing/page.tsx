// pages/billingPage.tsx

"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { storeOrder } from "../api/storeOrder/route";



 // Import storeOrder function

// Define the types for the cart items
interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

// Define the form data type
interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export default function BillingDetails() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate subtotal
  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle order submission
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for all fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.country ||
      !formData.phoneNumber
    ) {
      alert("Please fill out all billing details.");
      return;
    }

    const orderData = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      phoneNumber: formData.phoneNumber,
      cartItems: cartItems.map((item) => ({
        productId: item.id.toString(),
        quantity: item.quantity,
      })),
      subtotal: calculateSubtotal(),
    };

    setIsLoading(true);

    try {
      const order = await storeOrder(orderData); // Call the storeOrder function

      console.log("Order placed:", order);

      // Clear form and cart data after successful order
      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      });
      setCartItems([]);
      localStorage.removeItem("cart");

      alert("Order placed successfully!");
    } catch (error: unknown) {
      // Handle different types of errors more gracefully
      if (error instanceof Error) {
        console.error("Error placing order:", error.message);
        alert("An error occurred while placing the order: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Billing Details</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your Address"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter your City Name"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter your postal code"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your Country Name"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your phone Number"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4 border border-gray-200 rounded-md p-6 shadow-sm">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                        <p className="font-medium">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <p className="text-center">{item.quantity}</p>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <p className="font-semibold">Subtotal</p>
              <p className="font-semibold">{formatCurrency(calculateSubtotal())}</p>
            </div>
            <button
              type="submit"
              className="mt-8 w-full py-3 bg-black text-white rounded-md"
              disabled={isLoading || cartItems.length === 0}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
