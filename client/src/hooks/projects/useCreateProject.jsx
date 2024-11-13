import { useState } from "react";

const useCreateProject = (fetchProjects) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createProject = async (projectData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8008/api/projects/create', {
        method: 'POST',
        body: JSON.stringify(projectData), // Pass the project data here
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error("Failed to create project");
      await response.json();
      setSuccess(true);
      fetchProjects(); // Refresh the projects after creating
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading, error, success };
};

export default useCreateProject;
