import { useState, useEffect } from "react";

const useFetchSingleOffer = (offerId) => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8008/api/offer/one-offer/${offerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch offer");
        }
        const data = await response.json();
        setOffer(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (offerId) fetchOffer();
  }, [offerId]);

  return { offer, loading, error };
};

export default useFetchSingleOffer;
