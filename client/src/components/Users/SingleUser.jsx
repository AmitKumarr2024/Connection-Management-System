import React from "react";
import { useParams } from "react-router-dom";
import useFetchSingleUser from "../../hooks/useSingleFetchUser";
import UserProfile from "./UserFtechData";

const SingleDetailsPage = () => {
  const { id } = useParams();
  const { user, loading: userLoading, error: userError } = useFetchSingleUser(id);

  return (
    <div className="bg-slate-800 py-6 h-screen">
      <h1 className="text-white text-center text-3xl font-bold mb-6">Details Of User</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        
        {/* User Details Section */}
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
              <h2 className="text-center text-xl font-semibold">{user.fullName || "No Name"}</h2>
              <p className="text-center text-gray-700">Email: {user.email || "No email available"}</p>
              <p className="text-center text-gray-700">Gender: {user.gender || "No gender specified"}</p>
              <p className="text-center text-gray-700">Role: {user.role || "No role available"}</p>
            </>
          )}
        </div>

        {/* Expanded Details Section */}
        <div className="lg:col-span-2">
          <UserProfile userId={id} />
        </div>
      </div>
    </div>
  );
};

export default SingleDetailsPage;
