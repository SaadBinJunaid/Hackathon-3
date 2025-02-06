import Image from "next/image";
import Link from "next/link";
const blogData = [
  {
    image: "/blogs1.png",
    title: "Going all-in with millennial design",
    time: "5 min",
    date: "12th Oct 2022",
  },
  {
    image: "/blogs2.png",
    title: "Going all-in with millennial design",
    time: "5 min",
    date: "12th Oct 2022",
  },
  {
    image: "/blogs3.png",
    title: "Going all-in with millennial design",
    time: "5 min",
    date: "12th Oct 2022",
  },
];

function Blogs() {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-12">
        <div className="bg-[#FFFFFF]">
          <h2 className="text-4xl font-medium mb-4">Our Blogs</h2>
          <p className="text-gray-500">
            Find a bright idea to suit your taste with our great selection.
          </p>
        </div>
      </div>

      <div className="bg-[#FFFFFF]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <div key={index} className="blog-card flex flex-col items-center text-center">
              <Image
                src={blog.image}
                alt={`Blog ${index + 1}`}
                width={400}
                height={300}
                className="mb-4"
              />
              <h3 className="text-xl font-medium mb-4">{blog.title}</h3>
              <button className="border-b-2 text-center border-black pb-1 mb-4">Read More</button>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {blog.time}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  <span>{blog.date}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
        <Link 
              href="/blog" 
              className="text-xl border-b-2 border-black pb-1 hover:opacity-75">
            View All Post
            </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Blogs;