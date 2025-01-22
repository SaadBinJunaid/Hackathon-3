"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { products } from "../shop/page";
import client from "../../../sanityClient";

function Carts() {
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

  const limitedProducts = product.slice(0, 8);
  return (
    <div className="">
      {/* Top Picks Section */}
      <div className="bg-[#fff7f7]">
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
                    description: product.description,
                  },
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
                <p className="text-sm sm:text-base lg:text-[18px] text-neutral-600">
                  £{product.price}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <Link href="/shop">
          <div className="text-center mt-12">
            <span className="text-xl border-b-2 border-black pb-1 cursor-pointer hover:opacity-75">
              View our shop
            </span>
          </div>
        </Link>
      </div>

      {/* New Arrivals Section */}
      <div className="bg-[#fff1c1] flex flex-col md:flex-row justify-between items-center p-8 md:p-20 mb-12">
        <Image
          src={"/Asgaardsofa.png"}
          alt="Asgaard Sofa Set"
          width={500}
          height={500}
          className="object-cover mx-auto"
        />
        <div className="text-center md:text-right mt-8 md:mt-0 md:w-1/2">
          <p className="text-2xl mb-4">New Arrivals</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Asgaard Sofa</h2>
          <Link
            href={{
              pathname: `/product/1`,
              query: {
                name: "Asgaard Sofa",
                price: "2500",
                image: "/Asgaardsofa.png",
              },
            }}
          >
            <button className="border-2 border-black px-12 py-4 hover:bg-black hover:text-white transition-colors">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Carts;
