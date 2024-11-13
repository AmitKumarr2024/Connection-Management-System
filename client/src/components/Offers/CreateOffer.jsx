import React, { useState } from "react";
import useCreateOffer from "../../hooks/offer/useCreateOffer"; // Hook to create an offer
import useFetchUsers from "../../hooks/useFetchUsers"; // Hook to fetch users

const CreateOffer = () => {
  const { createOffer, loading, error, success } = useCreateOffer(); // Destructure functions and states for offer creation
  const { users, loading: usersLoading, error: usersError } = useFetchUsers(); // Fetch users for selection
  const [formData, setFormData] = useState({ // State to manage form data
    id: "",
    title: "",
    description: "",
    tags: [],
  });

  const handleChange = (e) => { // Update form data on input change
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e) => { // Handle changes in tags input
    setFormData({ ...formData, tags: e.target.value.split(",") });
  };

  const handleSubmit = (e) => { // Handle form submission
    e.preventDefault();
    createOffer(formData); // Call the function to create offer with form data

    // Reset form after submission
    setFormData({
      id: "",
      title: "",
      description: "",
      tags: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Create a New Offer
      </h2>

      <select // Dropdown to select user
        name="id"
        value={formData.id}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="" disabled>Select User</option>
        {usersLoading ? (
          <option>Loading users...</option>
        ) : (
          users.map((user) => (
            <option key={user._id} value={user._id}>{user.fullName}</option>
          ))
        )}
      </select>

      <input // Input for title
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <textarea // Textarea for description
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <input // Input for tags
        name="tags"
        value={formData.tags.join(", ")}
        onChange={handleTagsChange}
        placeholder="Tags (comma-separated)"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button // Submit button to create the offer
        type="submit"
        disabled={loading}
        className={`w-full py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-800"} focus:outline-none`}
      >
        {loading ? "Creating..." : "Create Offer"}
      </button>

      {loading && <p className="text-center text-gray-600">Creating offer...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {success && <p className="text-center text-green-500">Offer created successfully!</p>}
    </form>
  );
};

export default CreateOffer;
