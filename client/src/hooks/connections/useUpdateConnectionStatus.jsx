import { useState } from 'react';

const useUpdateConnectionStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateConnectionStatus = async (connectionId, status) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8008/api/connection/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionId, status }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update status');
      }
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateConnectionStatus, loading, error };
};

export default useUpdateConnectionStatus;
