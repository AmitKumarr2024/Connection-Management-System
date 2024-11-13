import { useState, useEffect } from 'react';

const useUserData = (userId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8008/api/user/one-user-module/${userId}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchUserData();
  }, [userId]);

  return { data, error };
};

export default useUserData;
