import React from 'react';
import { LogIn, Sparkles, Shield, Users, BarChart2, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">AuthDashboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive Authentication & User Management Solution
          </p>
          
          <div className="flex justify-center mb-12 space-x-4">
            <Link to="/">
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                <LogIn className="w-5 h-5 mr-2" />
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 shadow-lg hover:shadow-xl">
                <Users className="w-5 h-5 mr-2" />
                Log In
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Auth System</h3>
              <p className="text-gray-600">
                Login, signup, password reset, and account verification - all in one package.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Dashboard</h3>
              <p className="text-gray-600">
                Protected routes with role-based access control for your MERN application.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <BarChart2 className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Analytics</h3>
              <p className="text-gray-600">
                Track user activity and monitor authentication metrics in real-time.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Access Your Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Manage users, monitor activity, and customize your authentication workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/">
                <button className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                  Create Account
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Log In
                </button>
              </Link>
              <Link to="/forgot-password">
                <button className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                  Forgot Password?
                </button>
              </Link>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center space-x-8">
            <Link to="/help" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
              <HelpCircle className="w-5 h-5 mr-1" />
              Help Center
            </Link>
            <Link to="/settings" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
              <Settings className="w-5 h-5 mr-1" />
              Admin Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;