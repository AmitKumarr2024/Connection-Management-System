import React, { useEffect, useState } from "react"; // Import React and hooks for managing state and effects
import useFetchSingleProject from "../../hooks/projects/useFetchSingleProject"; // Import custom hook to fetch project details

const ProjectDetailsPage = ({ projectId }) => { // Component to display project details by projectId
  const { project, loading, error } = useFetchSingleProject(projectId); // Fetch project data, loading, and error states

  if (loading) return <p className="flex justify-center items-center h-screen">Loading...</p>; // Show loading message while fetching data
  if (error) return <p className="flex justify-center items-center h-screen">{error}</p>; // Show error message if fetch fails

  return (
    <div>
      <h1>{project.projectName}</h1> // Display project name
      <p>{project.description}</p> // Display project description
      <p>Status: {project.status}</p> // Display project status
      <h3>Associated Users</h3> // Title for associated users section
      <ul>
        {project.associatedUsers.map((user) => ( // Map through associated users and display each one
          <li key={user._id}>
            <p>{user.fullName}</p> // Display user's full name
            <p>{user.email}</p> // Display user's email
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailsPage; // Export the component for use in other parts of the app
