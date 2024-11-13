import React, { useState } from "react";
import useCreateProject from "../../hooks/projects/useCreateProject";
import useFetchUsers from "../../hooks/useFetchUsers";

const CreateProject = ({ fetchProjects }) => {
  const { createProject, loading, error, success } = useCreateProject(fetchProjects);
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();

  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    associatedUsers: [],
    resourcesNeeded: [],
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (e, fieldName) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setProjectData((prevData) => ({ ...prevData, [fieldName]: values }));
  };

  const handleUserSelect = (e) => {
    const selectedUsers = Array.from(e.target.selectedOptions, (option) => option.value);
    setProjectData((prevData) => ({ ...prevData, associatedUsers: selectedUsers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(projectData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="projectName" className="text-lg font-medium text-gray-700 mb-2">Project Name</label>
          <input
            name="projectName"
            id="projectName"
            placeholder="Enter project name"
            value={projectData.projectName}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Provide a project description"
            value={projectData.description}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Associated Users</label>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : usersError ? (
            <p className="text-red-500">Error loading users: {usersError}</p>
          ) : (
            <select
              multiple
              name="associatedUsers"
              value={projectData.associatedUsers}
              onChange={handleUserSelect}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="resourcesNeeded" className="text-lg font-medium text-gray-700 mb-2">Resources Needed</label>
          <input
            name="resourcesNeeded"
            id="resourcesNeeded"
            placeholder="Enter resources (comma-separated)"
            value={projectData.resourcesNeeded.join(', ')}
            onChange={(e) => handleArrayChange(e, 'resourcesNeeded')}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={projectData.status}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {success && <p className="text-green-500 text-center mt-4">Project created successfully!</p>}
    </div>
  );
};

export default CreateProject;
