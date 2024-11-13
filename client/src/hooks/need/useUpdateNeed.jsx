import { useState } from "react";

const useUpdateNeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateNeedStatus = async (needId, status) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `http://localhost:8008/api/need/update-need/${needId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update need status");
      }

      const data = await response.json();
      setSuccess(data);
    } catch (err) {
      setError(err.message || "Error updating need status");
    } finally {
      setLoading(false);
    }
  };

  return { updateNeedStatus, loading, error, success };
};

export default useUpdateNeed;
