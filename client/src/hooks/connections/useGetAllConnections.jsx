import { useEffect, useState } from "react";

const useGetAllConnections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "/api/connection/all-connection"
      );
      const result = await response.json();
      if (result.data) {
        setConnections(result.data);
      } else {
        setError(result.message || "Failed to fetch all connections");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return { connections, loading, error, fetchConnections };
};

export default useGetAllConnections;
