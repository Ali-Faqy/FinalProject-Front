import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
          <h1 className="text-5xl font-bold text-red-500">404</h1>
          <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Go Home
          </Link>
        </div>
      );
    };
    
    export default ErrorPage;