import { useState, useEffect } from "react";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8008/api/user/all-user");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.data); // Ensure you're accessing 'data' which contains the array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Automatically fetch users on mount
  }, []);

  return { users, loading, error, refetchUsers: fetchUsers }; // Return fetchUsers as refetchUsers
};

export default useFetchUsers;
