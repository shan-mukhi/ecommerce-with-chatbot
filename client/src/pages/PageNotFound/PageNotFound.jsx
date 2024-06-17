import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
        <p className="mt-8">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
          >
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
