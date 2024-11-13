import { useState, useEffect } from "react";

const useFetchSingleNeed = (id) => {
  const [need, setNeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNeed = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/need/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch need");
        }
        const data = await response.json();
        setNeed(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNeed();
  }, [id]);

  return { need, loading, error };
};

export default useFetchSingleNeed;
