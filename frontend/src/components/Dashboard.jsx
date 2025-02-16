import React from 'react';
import { LogIn, Sparkles, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">Authentication</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Authenticate Yourself
          </p>
          
          <div className="flex justify-center mb-12">
            <Link to="/">
            <button
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign Up to Continue
            </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovative Features</h3>
              <p className="text-gray-600">
                Access cutting-edge tools and features designed to enhance your experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security measures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Community</h3>
              <p className="text-gray-600">
                Join thousands of users who are already part of our community.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              Create an account or sign in to access all features and join our community.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                Create Account
              </button>
              <Link to='/login'>
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Log In
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;