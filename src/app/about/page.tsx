'use client';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from 'react';
import { products } from '../shop/page';
import Image from 'next/image';

export default function AboutUs() {
  const [product, setProduct] = useState<products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: products[] = await response.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const limitedProducts = product.slice(3, 7);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12 text-gray-900 pt-16 mt-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
          <p className="text-lg leading-relaxed mb-4">
            Welcome to <span className="font-semibold">FurniStyle</span>, your destination for high-quality indoor and outdoor furniture.
            We curate a unique selection of sustainable, stylish, and functional pieces tailored for urban homeowners,
            interior designers, and hospitality businesses.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            At <span className="font-semibold">FurniStyle</span>, we believe that furniture should be more than just functional—it should
            reflect your personality and values. That's why we partner with eco-conscious brands and skilled artisans
            to bring you furniture that's both elegant and responsible.
          </p>
        </div>
        
        {/* Image grid with 2 images per row */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 px-4 sm:px-6 lg:px-8">
          {limitedProducts.map((product) => (
            <div key={product._id} className="group cursor-pointer">
              <div className="aspect-square mb-4 relative overflow-hidden w-full h-64">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"  // Ensures image covers the entire space
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* "Our Mission" section with centered text */}
        <div className="max-w-3xl text-center mt-8 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to help you create spaces that feel like home while making sustainable choices. We strive to
            provide furniture that lasts, reducing waste and promoting ethical craftsmanship.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
