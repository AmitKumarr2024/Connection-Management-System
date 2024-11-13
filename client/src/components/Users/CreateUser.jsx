import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      gender: formData.gender,
      role: formData.role,
      profilePic: formData.profilePic,
    };

    try {
      const response = await fetch("http://localhost:8008/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      setIsCreated(true); // Trigger re-render by setting state
      navigate('/offers')
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isCreated) {
      refetchUsers(); // Re-fetch users when a new user is created
      setIsCreated(false); // Reset the state after re-fetch
    }
  }, [isCreated, refetchUsers]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between flex-row-reverse items-center">
          <button className="text-xl font-bold" onClick={onClose}>
            X
          </button>
          <h2 className="text-2xl mb-4">Create User</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
