import { useState, useEffect } from "react";

const useFetchUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/one-user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data.data); // Set user data from response
        console.log("single", data.data); // Log the correct user data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]); // Use 'id' as the dependency

  return { user, loading, error };
};

export default useFetchUser;
