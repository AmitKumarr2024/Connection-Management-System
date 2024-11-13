import React, { useState, useEffect } from "react";
import CreateProject from "../components/Projects/CreateProject";
import ViewProjectsPage from "../components/Projects/ViewAllProjects";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  // Fetching projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects/all-project");
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []); // Empty dependency array means this runs only on mount

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <CreateProject setProjects={setProjects} />
        </div>

        <hr className="border-t-2 border-gray-300 my-8" />

        <div className="bg-white shadow-lg rounded-lg p-8">
          <ViewProjectsPage projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
