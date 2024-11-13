import { useState, useEffect } from "react";

const useFetchNeeds = () => {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNeeds = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8008/api/need/");
        if (!response.ok) {
          throw new Error("Failed to fetch needs");
        }
        const data = await response.json();
        setNeeds(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, []);

  return { needs, loading, error };
};

export default useFetchNeeds;
