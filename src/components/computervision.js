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

  const handleImageUpload = async (event) => {
    setLoading(true);
    setError(null);

    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/api/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleImageDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete('/api/deleteImage');
      setImageData(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Computer Vision Component</h1>
      <input type="file" onChange={handleImageUpload} />
      {imageData && (
        <div>
          <img src={imageData.imageUrl} alt="Image" />
          <p>Image Label: {imageData.label}</p>
          <button onClick={handleImageDelete}>Delete Image</button>
        </div>
      )}
    </div>
  );
};

export default ComputerVision;