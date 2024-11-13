import React, { useState, useEffect } from "react";
import useCreateNeed from "../../hooks/need/useCreateNeed";
import useFetchUsers from "../../hooks/useFetchUsers";

const CreateNeedForm = () => {
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const { createNeed, loading, error, success } = useCreateNeed();
  const [formData, setFormData] = useState({
    userId: "",
    description: "",
    category: "",
    status: "Pending", // default to "Pending"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNeed(formData);
  };

  if (usersLoading) return <div className="flex justify-center items-center h-screen">Loading users...</div>;
  if (usersError) return <div className="flex justify-center items-center h-screen">Error: {usersError}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Create a New Need</h2>
      
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
        <select
          id="userId"
          name="userId"
          onChange={handleChange}
          value={formData.userId}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={formData.category}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          <option value="Funding">Funding</option>
          <option value="Networking">Networking</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Mentorship">Mentorship</option>
          <option value="Awareness">Awareness</option>
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          onChange={handleChange}
          value={formData.status}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Need"}
        </button>
      </div>

      {success && <p className="text-green-600 text-center">Need created successfully!</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
    </form>
  );
};

export default CreateNeedForm;
