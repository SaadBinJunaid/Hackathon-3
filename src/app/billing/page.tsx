"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { storeOrder } from "@/sanity/lib/storeOrder";

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

  // Fetch cart items from local storage
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      ...formData,
      cartItems: cartItems.map((item) => ({
        productId: item.id.toString(),
        quantity: item.quantity,
      })),
      subtotal: calculateSubtotal(),
    };

    setIsLoading(true);

    try {
      const order = await storeOrder(orderData); // Call storeOrder API function

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
      <div className="container mx-auto px-6 py-10">
        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-lg shadow-md"
        >
          {/* Billing Details Form */}
          <div>
            <h2 className="text-3xl font-extrabold mb-8">Billing Details</h2>
            <div className="space-y-6">
              {[{
                label: "Full Name", name: "name", type: "text", placeholder: "Enter your name"
              }, {
                label: "Email Address", name: "email", type: "email", placeholder: "Enter your email"
              }, {
                label: "Address", name: "address", type: "textarea", placeholder: "Enter your address"
              }, {
                label: "City", name: "city", type: "text", placeholder: "Enter your city"
              }, {
                label: "Postal Code", name: "postalCode", type: "text", placeholder: "Enter your postal code"
              }, {
                label: "Country", name: "country", type: "text", placeholder: "Enter your country"
              }, {
                label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "Enter your phone number"
              }].map(({ label, name, type, placeholder }, index) => (
                <div key={index}>
                  <label htmlFor={name} className="block text-sm font-semibold">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      id={name}
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-2 border rounded-md px-4 py-3"
                      placeholder={placeholder}
                    />
                  ) : (
                    <input
                      id={name}
                      type={type}
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-2 border rounded-md px-4 py-3"
                      placeholder={placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-3xl font-extrabold mb-8">Order Summary</h2>
            <div className="space-y-6 bg-white p-6 rounded-md shadow-sm">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-4 bg-gray-100 p-4 rounded-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-sm font-medium">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="ml-4 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No items in your cart.</p>
              )}
              <div className="mt-4">
                <p className="font-semibold">Subtotal: {formatCurrency(calculateSubtotal())}</p>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-[#2A254B] text-white px-6 py-3 rounded-md font-semibold"
              disabled={isLoading}
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
