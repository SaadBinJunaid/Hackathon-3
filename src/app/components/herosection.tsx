"use client"
import Image from "next/image"
import Link from "next/link"

function HeroSection() {
  return (
    <div className="relative bg-[#FBEBB5] h-screen flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
            Rocket single <br /> seater
          </h1>
          <Link
            href={{
              pathname: `/product/1`,
              query: {
                name: "sofa",
                price: "2500",
                image: "/sofa.png",
              },
            }}
          >
          <button className="mt-6 border-b-2 border-black text-lg sm:text-xl hover:opacity-75">
            Shop Now
          </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src="/sofa.png"
            alt="sofa"
            width={853}
            height={1000}
            className="-scale-x-100 object-contain max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection