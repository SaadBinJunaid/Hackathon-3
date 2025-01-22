"use client"
import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Blog() {
  return (
    <>
      <Navbar />
      <div className="relative w-full aspect-[16/3] sm:aspect-[16/4] md:aspect-[16/2]">
        <Image 
          src="/group1.png"
          alt="Blog Banner"
          fill
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-[2fr,1fr] gap-16">
          {/* Main Blog Content */}
          <div className="space-y-16">
            <article>
              <Image 
                src="/r1.png" 
                alt="Going all-in with millennial design" 
                width={800} 
                height={400}
                className="mb-6"
              />
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <span>Admin</span>
                <span>14 Oct 2022</span>
                <span>Wood</span>
              </div>
              <h2 className="text-2xl font-medium mb-4">Going all-in with millennial design</h2>
              <p className="text-gray-500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link href="#" className="text-black hover:underline">Read more</Link>
            </article>

            <article>
              <Image 
                src="/r2.png" 
                alt="Exploring new ways of decorating" 
                width={800} 
                height={400}
                className="mb-6"
              />
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <span>Admin</span>
                <span>13 Oct 2022</span>
                <span>Handmade</span>
              </div>
              <h2 className="text-2xl font-medium mb-4">Exploring new ways of decorating</h2>
              <p className="text-gray-500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <Link href="#" className="text-black hover:underline">Read more</Link>
            </article>

            <article>
              <Image 
                src="/r3.png" 
                alt="Handmade pieces" 
                width={800} 
                height={400}
                className="mb-6"
              />
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <span>Admin</span>
                <span>14 Oct 2022</span>
                <span>Wood</span>
              </div>
              <h2 className="text-2xl font-medium mb-4">Handmade pieces that took time to make</h2>
              <p className="text-gray-500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <Link href="#" className="text-black hover:underline">Read more</Link>
            </article>

            <div className="flex justify-center gap-4 mt-12">
              <button className="px-4 py-2 bg-[#FBEBB5]">1</button>
              <button className="px-4 py-2 hover:bg-[#FBEBB5]">2</button>
              <button className="px-4 py-2 hover:bg-[#FBEBB5]">3</button>
              <button className="px-4 py-2 hover:bg-[#FBEBB5]">Next</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div>
              <input 
                type="search"
                placeholder="Search"
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Crafts</span>
                  <span className="text-gray-500">2</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Design</span>
                  <span className="text-gray-500">8</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Handmade</span>
                  <span className="text-gray-500">7</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Interior</span>
                  <span className="text-gray-500">1</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Wood</span>
                  <span className="text-gray-500">8</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Recent Posts</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image 
                    src="/r4.png" 
                    alt="Recent post" 
                    width={200} 
                    height={200} 
                    className="object-cover"
                  />
                </div>
                {/* Add more recent posts similarly */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blog
