import React, { useState, useEffect } from "react"; // Import necessary React hooks
import { useNavigate } from "react-router-dom"; // Import navigate hook for redirection

// CreateUser component to handle the creation of a new user
const CreateUser = ({ onClose, refetchUsers }) => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    fullName: "", // User's full name
    email: "", // User's email
    gender: "male", // Default gender
    role: "individual", // Default role
    profilePic: "https://example.com/default.jpg", // Default profile picture URL
  });

  // State to track if user is created
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate(); // Hook for navigating to different pages

  // Handle input changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const userData = { // Prepare the user data to send to the server
      fullName: formData.fullName,
      email: formData.email,
      gender: formData.gender,
      role: formData.role,
      profilePic: formData.profilePic,
    };

    try {
      // Make API request to create a new user
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Setting the request header
        },
        body: JSON.stringify(userData), // Sending user data as a JSON string
      });

      if (!response.ok) { // If the response is not okay, throw an error
        throw new Error("Failed to create user");
      }

      const result = await response.json(); // Parse the response JSON
      setIsCreated(true); // Mark user creation as successful, triggers re-render
      navigate('/offers'); // Redirect to the 'offers' page
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error:", error); // Log any errors that occur
    }
  };

  // useEffect hook to re-fetch users when a new user is created
  useEffect(() => {
    if (isCreated) {
      refetchUsers(); // Call the passed function to re-fetch users
      setIsCreated(false); // Reset isCreated state after re-fetching
    }
  }, [isCreated, refetchUsers]);

  return (
    // Modal that appears for creating a user
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between flex-row-reverse items-center">
          <button className="text-xl font-bold" onClick={onClose}> // Button to close the modal
            X
          </button>
          <h2 className="text-2xl mb-4">Create User</h2> {/* Title of the modal */}
        </div>
        <form onSubmit={handleSubmit}> {/* Form to create a new user */}
          {/* Input fields for full name, email, gender, role */}
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
          {/* Dropdown for gender selection */}
          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {/* Dropdown for role selection */}
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
          {/* File input for profile picture */}
          <input
            type="file"
            name="profilePic"
            onChange={(e) => {
              const file = e.target.files[0]; // Get the selected file
              if (file) {
                const reader = new FileReader(); // Create a FileReader to read the file
                reader.onloadend = () => {
                  setFormData({ ...formData, profilePic: reader.result }); // Set the profilePic in state
                };
                reader.readAsDataURL(file); // Read the file as data URL
              }
            }}
            accept="image/*"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {/* Submit button for creating the user */}
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
