import { useState } from "react";

const useUpdateProjectStatus = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);

  const updateProjectStatus = async (projectId, newStatus) => {
    if (!["active", "completed", "paused"].includes(newStatus)) {
      setError("Invalid status");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8008/api/projects/update-project/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setProject(data.data);
      setStatus(newStatus);

      
      setLoading(false);
    } catch (err) {
      setError("Failed to update status");
      setLoading(false);
    }
  };

  return { updateProjectStatus, status, loading, error, project };
};

export default useUpdateProjectStatus;
