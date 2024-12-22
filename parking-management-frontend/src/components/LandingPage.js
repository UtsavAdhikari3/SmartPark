import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  User,
  UserCircle,
  Clock,
  CreditCard,
  Shield,
  BarChart,
  Camera,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const LandingPage = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-indigo-600" />,
      title: "Automated License Plate Recognition",
      description:
        "State-of-the-art ALPR technology for quick and accurate vehicle identification.",
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Real-Time Monitoring",
      description:
        "Track parking space availability and vehicle status in real-time.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-indigo-600" />,
      title: "Automated Billing",
      description:
        "Hassle-free payment processing with automated fee calculation.",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Enhanced Security",
      description:
        "24/7 monitoring and secure access control for your facility.",
    },
  ];

  const stats = [
    { number: "99.9%", label: "System Uptime" },
    { number: "50,000+", label: "Vehicles Managed" },
    { number: "30+", label: "Partner Facilities" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                ParkWise
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/user-login"
                className="px-4 py-2 rounded-lg flex items-center space-x-2 text-gray-600 hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
                <span>User Login</span>
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
              >
                <UserCircle className="h-5 w-5" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Smart Parking Solutions</span>
              <span className="block text-indigo-600">
                for Modern Facilities
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your parking facility with our intelligent management
              system. Streamline operations, enhance security, and improve user
              experience.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for parking illustration */}
        {/* Placeholder for parking illustration */}
        <div className="relative w-full h-64 sm:h-72 md:h-96 mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
            <img
              src="/hero.jpg" // Free image from Unsplash
              alt="Smart Parking System"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage parking
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="absolute -top-4 left-4 bg-indigo-50 rounded-lg p-3">
                    {feature.icon}
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-extrabold text-indigo-600">
                  {stat.number}
                </div>
                <div className="mt-1 text-base text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to modernize your parking facility?
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-100">
              Join thousands of facilities already using ParkWise to streamline
              their operations.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">
                  ParkWise
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Making parking management smarter and more efficient.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@parkwise.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+977 9812345678</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Chabahil, Kathmandu</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
                <Link
                  to="/features"
                  className="block text-gray-400 hover:text-white"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="block text-gray-400 hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              <h3 className="text-white text-sm font-bold uppercase">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaLinkedinIn className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} ParkWise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
