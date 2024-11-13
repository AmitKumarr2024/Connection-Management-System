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
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Create a New Need</h2>
      
      {/* Select user */}
      <div>
        <label htmlFor="userId">User ID</label>
        <select
          id="userId"
          name="userId"
          onChange={handleChange}
          value={formData.userId}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.fullName}</option>
          ))}
        </select>
      </div>

      {/* Input for Need description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </div>

      {/* Select Need category */}
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={formData.category}
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

      {/* Select status */}
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          onChange={handleChange}
          value={formData.status}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Need"}
        </button>
      </div>

      {/* Display success or error message */}
      {success && <p>Need created successfully!</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default CreateNeedForm;
