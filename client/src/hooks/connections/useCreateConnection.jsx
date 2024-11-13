import { useState } from 'react';

const useCreateConnection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createConnection = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8008/api/connection/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create connection');
      }
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createConnection, loading, error };
};

export default useCreateConnection;
