import { useState, useEffect } from 'react';

const useFetchOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/offer/all-offer");
        const data = await response.json();
        if (data.success) {
          setOffers(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
};

export default useFetchOffers;
