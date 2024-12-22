import React from "react";
import { Link } from "react-router-dom";
import { Car, User, UserCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Smart Parking Solutions</span>
            <span className="block text-indigo-600">for Modern Facilities</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your parking operations with our advanced management
            system. Real-time monitoring, automated entry/exit, and
            comprehensive reporting.
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
