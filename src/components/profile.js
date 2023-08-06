// components/profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      {/* Add more profile information here */}
    </div>
  );
};

export default Profile;