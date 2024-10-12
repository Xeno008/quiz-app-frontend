import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-black text-white h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-12">Welcome to Quiz App</h1>
        <div className="flex space-x-8">
          <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-2xl">
            Register
          </Link>
          <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-2xl">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
