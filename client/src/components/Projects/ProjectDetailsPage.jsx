import React, { useEffect, useState } from "react";
import useFetchSingleProject from "../../hooks/projects/useFetchSingleProject";

const ProjectDetailsPage = ({ projectId }) => {
  const { project, loading, error } = useFetchSingleProject(projectId);

  if (loading) return <p className="flex justify-center items-center h-screen">Loading...</p>;
  if (error) return <p className="flex justify-center items-center h-screen">{error}</p>;

  return (
    <div>
      <h1>{project.projectName}</h1>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <h3>Associated Users</h3>
      <ul>
        {project.associatedUsers.map((user) => (
          <li key={user._id}>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailsPage;
