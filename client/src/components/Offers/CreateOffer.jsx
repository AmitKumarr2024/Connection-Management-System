import React, { useState } from "react";
import useCreateOffer from "../../hooks/offer/useCreateOffer";
import useFetchUsers from "../../hooks/useFetchUsers";

const CreateOffer = () => {
  const { createOffer, loading, error, success } = useCreateOffer();
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e) => {
    setFormData({ ...formData, tags: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOffer(formData);

    // Clear the form by resetting formData
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Create a New Offer
      </h2>

      <select
        name="id"
        value={formData.id}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="" disabled>
          Select User
        </option>
        {usersLoading ? (
          <option>Loading users...</option>
        ) : (
          users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))
        )}
      </select>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <input
        name="tags"
        value={formData.tags.join(", ")}
        onChange={handleTagsChange}
        placeholder="Tags (comma-separated)"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-800"
        } focus:outline-none`}
      >
        {loading ? "Creating..." : "Create Offer"}
      </button>

      {loading && (
        <p className="text-center text-gray-600">Creating offer...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {success && (
        <p className="text-center text-green-500">
          Offer created successfully!
        </p>
      )}
    </form>
  );
};

export default CreateOffer;
