import { useState } from 'react';

const useDeleteConnection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteConnection = async (connectionId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/connection/delete/${connectionId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete connection');
      }
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteConnection, loading, error };
};

export default useDeleteConnection;
