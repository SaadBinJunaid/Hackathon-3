"use client"

import { useState } from "react"
import Image from "next/image"

function Contact() {
  // State to store form values and error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Type the errors state to match the structure { name, email, subject, message }
  const [errors, setErrors] = useState<{ name: string; email: string; subject: string; message: string; }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    // Create an errors object with the expected structure
    const newErrors: { name: string; email: string; subject: string; message: string } = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Validate form fields
    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required.";
    }
    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = "Please enter a valid email address.";
    }
    if (!subject) {
      formIsValid = false;
      newErrors.subject = "Subject is required.";
    }
    if (!message) {
      formIsValid = false;
      newErrors.message = "Message is required.";
    }

    // If validation fails, update the errors state
    if (!formIsValid) {
      setErrors(newErrors);
    } else {
      // Handle successful form submission (e.g., send data to server)
      alert("Form submitted successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <>
      <div className="relative w-full aspect-[16/3] sm:aspect-[16/4] md:aspect-[16/2]">
        <Image 
          src="/contact.png"
          alt="Contact Banner"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get In Touch With Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            For More Information About Our Product & Services. Please Feel Free To Drop Us
            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Address</h3>
              <p className="text-gray-600">
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Phone</h3>
              <p className="text-gray-600">
                Mobile: +(84) 546-6789 <br />
                Hotline: +(84) 456-6789
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Working Time</h3>
              <p className="text-gray-600">
                Monday-Friday: 9:00 - 22:00 <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Your name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name" 
                className="w-full p-3 border rounded-lg"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full p-3 border rounded-lg"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2">Subject</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject" 
                className="w-full p-3 border rounded-lg"
                required
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>

            <div>
              <label className="block mb-2">Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Comment" 
                rows={6}
                className="w-full p-3 border rounded-lg"
                required
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

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
    </>
  );
}

export default Contact;
