"use client";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface products {
  _id: string;
  name: string;
  price: number;
  imagePath:string;
  description: string;
  discountPercentage:number;
  category: string;
  isFeaturedProduct: boolean;
  stockLevel: number;
};


export default function ShopPage() {
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


  return (
    <>
      <div className="min-h-screen">
      <Navbar />
      
      <div className="w-full">
        {/* Banner Image */}
        <div className="relative w-full aspect-[16/3] sm:aspect-[16/4] md:aspect-[16/2]">
          <Image 
            src="/shop.png"
            alt="allProducts" 
            fill
            className="object-cover"
          />
        </div>

        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-8 md:py-12">
            {product.map((product) => (
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
                <div className="aspect-square mb-4 bg-neutral-100 relative overflow-hidden w-full">
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base sm:text-lg lg:text-[20px] mb-2">{product.name}</h3>
                <p className="text-sm sm:text-base lg:text-[18px] text-neutral-600">{product.description}</p>
                <h3 className="text-base sm:text-lg lg:text-[20px] mb-2">£{product.price}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
</>
)
}
