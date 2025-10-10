import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white gold:text-gold-900">
          Welcome to Test App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A comprehensive tool for text conversion, math operations, and temperature conversion
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/convert/lower"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      <section id="features" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white gold:text-gold-900">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 gold:bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Text Conversion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Convert text between various formats: lowercase, uppercase, camelCase, Title Case, and more.
            </p>
            <Link
              to="/convert/lower"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Try it now →
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 gold:bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Math Operations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Perform basic arithmetic operations: addition, subtraction, multiplication, and division.
            </p>
            <Link
              to="/math/add"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Calculate now →
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 gold:bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Temperature Converter
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Convert temperatures between Celsius and Fahrenheit with ease.
            </p>
            <Link
              to="/temp/c-to-f"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Convert now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
