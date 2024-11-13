import { useState, useEffect, useRef } from "react";

const useFetchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectsRef = useRef(setProjects);

  // Update the ref with the latest setProjects function
  useEffect(() => {
    projectsRef.current = setProjects;
  }, [setProjects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8008/api/projects/all-project");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      // Use the ref to update the state
      projectsRef.current(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refreshProjects: fetchProjects };
};

export default useFetchProjects;
