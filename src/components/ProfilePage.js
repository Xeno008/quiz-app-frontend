import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="mb-2"><strong>Username:</strong> {user.username}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Password:</strong> {user.password}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
