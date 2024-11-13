import React, { useState, useEffect } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import CreateUser from "../components/Users/CreateUser";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { users, loading, error, refetchUsers } = useFetchUsers();
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const handleUserCreated = () => {
    setIsCreateUserOpen(false); // Close the modal after successful creation
  };

  const toggleCreateUserModal = () => {
    setIsCreateUserOpen(!isCreateUserOpen);
  };

  // Refetch users when the component is mounted or when user is created
  useEffect(() => {
    refetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );

  return (
    <div className="w-full py-6 bg-gradient-to-r from-blue-300 to-teal-200">
      <div className="flex justify-center mb-8">
        <button
          onClick={toggleCreateUserModal}
          className="bg-orange-600 text-white px-8 py-3 fixed top-16 right-9 rounded-lg text-xl font-medium shadow-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105"
        >
          Create User
        </button>
      </div>

      {isCreateUserOpen && (
        <CreateUser
          onClose={toggleCreateUserModal}
          refetchUsers={handleUserCreated}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 px-6">
        {users.map((user) => (
          <Link
            to={`/single/${user._id}`}
            key={user._id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src={user.profilePic}
              alt={user.fullName}
              className="w-full h-48 object-cover rounded-lg mx-auto mb-4"
            />
            <h2 className="text-center text-2xl font-semibold">
              {user.fullName}
            </h2>
            <p className="text-center text-gray-600">{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
