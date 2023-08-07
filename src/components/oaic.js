import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AOIC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('/api/openai', { prompt });
        setResponse(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (prompt) {
      fetchData();
    }
  }, [prompt]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Artificial Intelligence OpenAI Component</h1>
      <textarea value={prompt} onChange={handleInputChange} />
      <button disabled={!prompt} onClick={() => setPrompt('')}>
        Clear
      </button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AOIC;