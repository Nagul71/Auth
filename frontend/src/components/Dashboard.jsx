import React from "react";
import {
  LogIn,
  Sparkles,
  Shield,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-extrabold text-gray-900">
          Welcome to <span className="text-indigo-600">AuthDashboard</span>
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          A comprehensive solution for authentication and user management.
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="mt-8 flex gap-6">
        <Link to="/">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 shadow-lg"
            aria-label="Sign Up"
          >
            <LogIn className="w-5 h-5" />
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition duration-200 shadow-lg"
            aria-label="Log In"
          >
            <Users className="w-5 h-5" />
            Log In
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl">
        {[
          {
            icon: <Sparkles className="w-12 h-12 text-indigo-600" />,
            title: "Complete Auth System",
            description:
              "All-in-one package for login, signup, password reset, and account verification.",
          },
          {
            icon: <Shield className="w-12 h-12 text-indigo-600" />,
            title: "Secure Dashboard",
            description: "Role-based access control for your MERN application.",
          },
          {
            icon: <BarChart2 className="w-12 h-12 text-indigo-600" />,
            title: "User Analytics",
            description:
              "Monitor user activity and authentication metrics in real-time.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Access Section */}
      <div className="mt-12 bg-white p-8 rounded-xl shadow-lg max-w-3xl text-center">
        <h2 className="text-2xl font-semibold">Access Your Dashboard</h2>
        <p className="text-gray-600 mt-2">
          Manage users, monitor activity, and customize your authentication
          workflow.
        </p>

        {/* Additional Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link to="/">
            <button className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-200">
              Create Account
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
              Log In
            </button>
          </Link>
          <Link to="/forgot-password">
            <button className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-200">
              Forgot Password?
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 flex space-x-6">
        <Link
          to="/Dashboard"
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
        >
          <HelpCircle className="w-5 h-5 mr-1" />
          Help Center
        </Link>
        <Link
          to="/Dashboard"
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
        >
          <Settings className="w-5 h-5 mr-1" />
          Admin Settings
        </Link>
      </div>
    </div>
  );
};

export default Home;
