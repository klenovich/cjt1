import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComputerVision = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get('/api/imageData');
        setImageData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImageData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Computer Vision Component</h1>
      {imageData && (
        <div>
          <img src={imageData.imageUrl} alt="Image" />
          <p>Image Label: {imageData.label}</p>
        </div>
      )}
    </div>
  );
};

export default ComputerVision;