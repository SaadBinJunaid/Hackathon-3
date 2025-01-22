'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { products } from '../shop/page';


export default function Famous() {
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

const limitedProducts = product.slice(10,18);
  return (
    <div>
      <div className="bg-white py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Top Picks For You</h2>
          <p className="text-gray-600">
            Find the perfect piece to suit your style from our curated collection.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
          {limitedProducts.map((product) => (
            <div key={product._id} className="group cursor-pointer">
              <Link
              href={{
                pathname: `/product/${product._id}`,
                query: {
                  name: product.name,
                  price: product.price,
                  image: product.imagePath,
                  description: product.description
                }
              }}
              >
                <div className="aspect-square mb-4 relative overflow-hidden w-full">
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base sm:text-lg lg:text-[20px] mb-2">{product.name}</h3>
                <p className="text-sm sm:text-base lg:text-[18px] text-neutral-600">£{product.price}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">

        </div>
      </div>
</div>
);
}
