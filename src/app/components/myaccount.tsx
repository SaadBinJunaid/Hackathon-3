"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useRouter } from 'next/navigation'

function MyAccount() {
  const router = useRouter();

  // State for form inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  // State for notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic (e.g., validate inputs and send request to backend)
    if (loginEmail && loginPassword) {
      setNotification("Login Successful!");
      setTimeout(() => router.push('/'), 2000);  // Navigate to home page after 2 seconds
    } else {
      setNotification("Please enter both email and password.");
    }
  };

  // Handle Register
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if passwords match
    if (registerPassword !== registerConfirmPassword) {
      setNotification("Passwords do not match.");
      return;
    }
    if (registerName && registerEmail && registerPassword) {
      setNotification("Registration Successful!");
      setTimeout(() => router.push('/'), 2000);  // Navigate to home page after 2 seconds
    } else {
      setNotification("Please fill in all fields.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full aspect-[16/3] sm:aspect-[16/4] md:aspect-[16/2]">
        <Image 
          src="/myaccount1.png"
          alt="My Account Banner"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Login Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Log In</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block mb-2">Username or email address</label>
                <input 
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="submit" className="w-full border-2 border-black py-3 px-6 rounded-md hover:bg-black hover:text-white transition-colors">
                Log In
              </button>
              <Link href="/lost-password" className="block text-center text-gray-600 hover:underline">
                Lost Your Password?
              </Link>
            </form>
          </div>

          {/* Register Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Register</h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block mb-2">Full Name</label>
                <input 
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Email address</label>
                <input 
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input 
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Confirm Password</label>
                <input 
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                />
              </div>
              <p className="text-gray-600 mb-4">
                A link to set a new password will be sent to your email address.
              </p>
              <p className="text-gray-600 mb-4">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                <Link href="/privacy-policy" className="underline">
                  privacy policy
                </Link>
                .
              </p>
              <button type="submit" className="w-full border-2 border-black py-3 px-6 rounded-md hover:bg-black hover:text-white transition-colors">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4 py-16 bg-[#FAF4F4]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4">Free Delivery</h3>
            <p className="text-gray-500">
              For all orders over $50, consectetur adipim scing elit.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">90 Days Return</h3>
            <p className="text-gray-500">
              If goods have problems, consectetur adipim scing elit.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Secure Payment</h3>
            <p className="text-gray-500">
              100% secure payment, consectetur adipim scing elit.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyAccount;
