import React from "react";
import useFetchProjects from "../../hooks/projects/UseFetchAllProjects";
import useCreateProject from "../../hooks/projects/useCreateProject";

const ViewProjectsPage = () => {
  const { projects, loading, error, fetchProjects } = useFetchProjects();

  console.log(projects);
  
  const {
    createProject,
    loading: createLoading,
    error: createError,
    success,
  } = useCreateProject(fetchProjects);

  if (loading || createLoading)
    return <div className="flex justify-center items-center h-screen">Loading projects...</div>;
  if (error || createError)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error || createError}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {project.projectName}
            </h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Status:{" "}
              <span
                className={`font-medium ${
                  project.status === "active"
                    ? "text-green-500"
                    : project.status === "completed"
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                {project.status}
              </span>
            </p>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Associated Users:
              </h3>
              {project.associatedUsers.length > 0 ? (
                <ul className="list-none">
                  {project.associatedUsers.map((user) => (
                    <li key={user._id} className="flex items-center mt-2">
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full mr-3 shadow-md"
                      />
                      <span className="text-sm text-gray-800">
                        {user.fullName}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No users associated</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Resources Needed:
              </h3>
              {project.resourcesNeeded.length > 0 ? (
                <ul className="list-none">
                  {project.resourcesNeeded.map((resource, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {resource}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No resources specified</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProjectsPage;
