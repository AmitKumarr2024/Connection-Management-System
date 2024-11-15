import React from "react"; // Importing React library
import { useParams } from "react-router-dom"; // Importing useParams to get route parameters
import useFetchSingleUser from "../../hooks/useSingleFetchUser"; // Custom hook to fetch a single user's details
import UserNotification from "./UserNotification"; // Importing the UserNotification component

// SingleDetailsPage component to display details of a specific user
const SingleDetailsPage = () => {
  // Extracting 'id' from the URL parameters
  const { id } = useParams();

  // Calling the custom hook to fetch user data by 'id'
  const {
    user, // The user data
    loading: userLoading, // Boolean to check if data is loading
    error: userError, // Error message if the fetch fails
  } = useFetchSingleUser(id); // Pass the 'id' to the hook to get the data

  return (
    // Outer div for the page with background color and padding
    <div className="bg-slate-800 py-6 min-h-screen">
      <h1 className="text-white text-center text-3xl font-bold mb-6">
        Details Of User
      </h1>

      {/* Grid layout to show user details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        {/* Section to display user details */}
        <div className="w-full max-w-sm mx-auto lg:col-span-1 border p-6 rounded-lg shadow-lg bg-white">
          {userLoading ? (
            <div>Loading user data...</div>
          ) : userError ? ( 
            <div>No user data</div>
          ) : (
            <>
              <img
                src={user.profilePic || ""} 
                alt={user.fullName || "No Name"} 
                className="w-80 h-80 mx-auto mb-6 border-4 border-indigo-500 shadow-lg rounded-full"
              />
              <h2 className="text-center text-xl font-semibold">
                {user.fullName || "No Name"}
               
              </h2>
              <p className="text-center text-gray-700">
                Email: {user.email || "No email available"} 
              </p>
              <p className="text-center text-gray-700">
                Gender: {user.gender || "No gender specified"}
              </p>
              <p className="text-center text-gray-700">
                Role: {user.role || "No role available"} 
              </p>
            </>
          )}
        </div>

        {/* Section for expanded details or notifications */}
        <div className="lg:col-span-2">
          <UserNotification userId={id} /> 
        </div>
      </div>
    </div>
  );
};

export default SingleDetailsPage;
