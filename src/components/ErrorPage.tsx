import React from 'react';

type ServerErrorProps = {
  message?: string;
};

const ServerError: React.FC<ServerErrorProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Internal Server Error</h2>
      <p className="text-gray-600 mb-6">
        {message || "Oops! Something went wrong on our end. Please try again later."}
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back home
      </a>
    </div>
  );
};

export default ServerError;

