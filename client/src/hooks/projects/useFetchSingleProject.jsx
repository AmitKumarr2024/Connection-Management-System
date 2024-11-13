import { useState, useEffect } from "react";

const useFetchSingleProject = (projectId) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8008/api/projects/single-project/${projectId}`);
        const data = await response.json();

        if (response.ok) {
          setProject(data.data);  // Store the project data
        } else {
          setError(data.message || "Error fetching project");
        }
      } catch (err) {
        setError("Error fetching project");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  return { project, loading, error };
};

export default useFetchSingleProject;
