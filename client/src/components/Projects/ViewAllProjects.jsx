import React from "react"; // Import React to use JSX and hooks
import useFetchProjects from "../../hooks/projects/UseFetchAllProjects"; // Import hook to fetch all projects
import useCreateProject from "../../hooks/projects/useCreateProject"; // Import hook to create a project

const ViewProjectsPage = () => { // Component to display all projects
  const { projects, loading, error, fetchProjects } = useFetchProjects(); // Fetch all projects, handle loading, error states

  console.log(projects); // Log fetched projects for debugging
  
  const { // Destructure createProject function and states (loading, error, success) from the hook
    createProject,
    loading: createLoading,
    error: createError,
    success,
  } = useCreateProject(fetchProjects);

  if (loading || createLoading) // Show loading message if projects or project creation is loading
    return <div className="flex justify-center items-center h-screen">Loading projects...</div>;
  if (error || createError) // Show error message if there's an issue with fetching or creating projects
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error || createError}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12"> {/* Main wrapper */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Projects</h1> {/* Page title */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid to display projects */}
        {projects.map((project) => ( // Loop through each project and display its details
          <div
            key={project._id} // Unique key for each project
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105" // Styling for each project card
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{project.projectName}</h2> {/* Project name */}
            <p className="text-gray-600 mb-4">{project.description}</p> {/* Project description */}
            <p className="text-sm text-gray-500 mb-4">
              Status:{" "}
              <span
                className={`font-medium ${
                  project.status === "active"
                    ? "text-green-500" // Green for active projects
                    : project.status === "completed"
                    ? "text-blue-500" // Blue for completed projects
                    : "text-gray-500" // Gray for inactive projects
                }`}
              >
                {project.status}
              </span>
            </p>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Associated Users:</h3> {/* Section for users associated with the project */}
              {project.associatedUsers.length > 0 ? ( // Check if there are users associated
                <ul className="list-none">
                  {project.associatedUsers.map((user) => ( // Map through associated users
                    <li key={user._id} className="flex items-center mt-2">
                      <img
                        src={user.profilePic} // Display user profile picture
                        alt={user.fullName} // Alt text for the image
                        className="w-10 h-10 rounded-full mr-3 shadow-md" // Style for the profile image
                      />
                      <span className="text-sm text-gray-800">{user.fullName}</span> {/* Display user full name */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No users associated</p> // Message if no users are associated
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Resources Needed:</h3> {/* Section for resources needed */}
              {project.resourcesNeeded.length > 0 ? ( // Check if there are resources listed
                <ul className="list-none">
                  {project.resourcesNeeded.map((resource, index) => ( // Map through resources and display each
                    <li key={index} className="text-sm text-gray-600">
                      {resource}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No resources specified</p> // Message if no resources are listed
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProjectsPage; // Export the component for use in other parts of the app
