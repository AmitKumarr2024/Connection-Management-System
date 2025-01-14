import React, { useState, useEffect } from "react";
import useCreateNeed from "../../hooks/need/useCreateNeed";
import useFetchUsers from "../../hooks/useFetchUsers";

// Form component to create a new "Need" record for users
const CreateNeedForm = () => {
  // Fetching users and setting loading/error states
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const { createNeed, loading, error, success } = useCreateNeed();

  // State to hold form data for a new "Need"
  const [formData, setFormData] = useState({
    userId: "",
    description: "",
    category: "",
    status: "Pending", // Default status
  });

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new "Need"
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNeed(formData);
  };

  // Loading and error messages for fetching users
  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error: {usersError}</div>;

  return (
   <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Need</h2>

  {/* User Selection */}
  <div className="mb-4">
    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">User</label>
    <select
      id="userId"
      name="userId"
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      value={formData.userId}
      required
    >
      <option value="" disabled>Select a user</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>{user.fullName}</option>
      ))}
    </select>
  </div>

  {/* Description Input */}
  <div className="mb-4">
    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
    <textarea
      id="description"
      name="description"
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Briefly describe the need..."
      onChange={handleChange}
      value={formData.description}
      required
    />
  </div>

  {/* Category Selection */}
  <div className="mb-4">
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
    <select
      id="category"
      name="category"
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      value={formData.category}
      required
    >
      <option value="" disabled>Select a category</option>
      <option value="Funding">Funding</option>
      <option value="Networking">Networking</option>
      <option value="Collaboration">Collaboration</option>
      <option value="Mentorship">Mentorship</option>
      <option value="Awareness">Awareness</option>
    </select>
  </div>

  {/* Status Selection */}
  <div className="mb-4">
    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
    <select
      id="status"
      name="status"
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      value={formData.status}
      required
    >
      <option value="Pending">Pending</option>
      <option value="Resolved">Resolved</option>
    </select>
  </div>

  {/* Submit Button */}
  <div className="mt-6">
    <button
      type="submit"
      className={`w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-medium transition duration-200 ${
        loading && "cursor-not-allowed opacity-50"
      }`}
      disabled={loading}
    >
      {loading ? "Creating..." : "Create Need"}
    </button>
  </div>

  {/* Feedback Messages */}
  {success && <p className="mt-4 text-green-600 font-medium text-center">Need created successfully!</p>}
  {error && <p className="mt-4 text-red-600 font-medium text-center">Error: {error}</p>}
</form>

  );
};

export default CreateNeedForm;
