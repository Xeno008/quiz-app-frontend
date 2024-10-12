import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-12">Dashboard</h1>
        <div className="space-y-8">
          <Link to="/profile" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-2xl block">
            Profile
          </Link>
          <Link to="/upload" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-2xl block">
            Upload Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
