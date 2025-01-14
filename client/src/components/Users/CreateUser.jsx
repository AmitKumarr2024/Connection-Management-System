import React, { useState, useEffect } from "react"; // React hooks
import { useNavigate } from "react-router-dom"; // Navigation hook

// Component to create a new user
const CreateUser = ({ onClose, refetchUsers }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "male",
    role: "individual",
    profilePic: "https://example.com/default.jpg",
  });
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form to create a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      await response.json();
      setIsCreated(true);
      navigate("/offers"); // Redirect on success
      onClose(); // Close modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Refetch users on successful creation
  useEffect(() => {
    if (isCreated) {
      refetchUsers();
      setIsCreated(false);
    }
  }, [isCreated, refetchUsers]);

  return (
    // Modal for user creation
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between flex-row-reverse items-center">
<<<<<<< HEAD
          <button className="text-xl font-bold" onClick={onClose}>
=======
          <button className="text-xl font-bold" onClick={onClose}> 
>>>>>>> 1e0b9db49b6daae4991f6ff4d0d3081cae8bfe1d
            X
          </button>
          <h2 className="text-2xl mb-4">Create User</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <input
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
            placeholder="Full Name"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {/* Gender selection */}
          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {/* Role selection */}
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="individual">Individual</option>
            <option value="business">Business</option>
            <option value="organization">Organization</option>
          </select>
          {/* Profile picture input */}
          <input
            type="file"
            name="profilePic"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({ ...formData, profilePic: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
            accept="image/*"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-2 bg-purple-700 text-white rounded mb-4"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
