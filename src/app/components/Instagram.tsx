import Image from "next/image";

function Instagram() {
  return (
    <div className="bg-[#fff7f7] relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/image1.png"
          alt="Background coffee cup"
          fill
          className="object-cover"
          style={{ opacity: 0.15 }}
          priority
        />
      </div>

      {/* Content */}
      <div className="text-center relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Instagram
          </h2>
          <p className="text-sm md:text-lg lg:text-xl mb-6">
            Follow our store on Instagram
          </p>
          <button className="bg-[#FAF4F4] text-black px-6 md:px-10 lg:px-14 py-3 md:py-4 rounded-full hover:bg-gray-100 transition-colors shadow-md">
            Follow Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instagram;