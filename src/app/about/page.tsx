import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        {/* About content */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Link 
              href="/blog" 
              className="text-xl border-b-2 border-black pb-1 hover:opacity-75"
            >
              Visit Our Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 