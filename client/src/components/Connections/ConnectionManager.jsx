import React, { useState, useEffect } from "react";
import useCreateConnection from "../../hooks/connections/useCreateConnection";
import useGetAllConnections from "../../hooks/connections/useGetAllConnections";

import useFetchUsers from "../../hooks/useFetchUsers";

const ConnectionManager = ({ userId }) => {
  const [connectionData, setConnectionData] = useState({
    user1: "",
    user2: "",
    connectionType: "",
    status: "pending",
  });
  const [statusToUpdate, setStatusToUpdate] = useState(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState(null);

  const {
    users,
    loading: fetchingUsers,
    error: fetchUsersError,
  } = useFetchUsers();
  const {
    createConnection,
    loading: creating,
    error: createError,
  } = useCreateConnection();
  const {
    connections,
    loading: fetchingAll,
    error: fetchAllError,
    fetchConnections,
  } = useGetAllConnections();

  console.log("connection", connections);

  const handleCreateConnection = async () => {
    const result = await createConnection(connectionData);
    if (result) {
      setConnectionData({
        user1: "",
        user2: "",
        connectionType: "",
        status: "pending",
      });
      fetchConnections(); // Trigger a refetch of connections after creating.
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []); // Empty array to call only once when the component mounts

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Manage Connections
      </h2>

      {/* Create Connection Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Create New Connection
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <select
            value={connectionData.user1}
            onChange={(e) =>
              setConnectionData({ ...connectionData, user1: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select User 1</option>
            {fetchingUsers ? (
              <option>Loading users...</option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))
            )}
          </select>
          <select
            value={connectionData.user2}
            onChange={(e) =>
              setConnectionData({ ...connectionData, user2: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select User 2</option>
            {fetchingUsers ? (
              <option>Loading users...</option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))
            )}
          </select>
          <select
            value={connectionData.connectionType}
            onChange={(e) =>
              setConnectionData({
                ...connectionData,
                connectionType: e.target.value,
              })
            }
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Connection Type</option>
            <option value="offer">Offer</option>
            <option value="need">Need</option>
            <option value="project">Project</option>
          </select>
          <select
            value={connectionData.status}
            onChange={(e) =>
              setConnectionData({ ...connectionData, status: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={handleCreateConnection}
            disabled={creating}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Connection"}
          </button>
        </div>
        {createError && <p className="text-red-500 mt-2">{createError}</p>}
      </div>

      {/* Display All Connections */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          All Connections
        </h3>
        {fetchingAll ? (
          <p className="text-gray-600">Loading all connections...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(connections || []).map((connection) => (
              <div
                key={connection._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {connection.user1.fullName} ↔ {connection.user2.fullName}
                  </h4>
                  <span
                    className={`text-sm ${
                      connection.status === "accepted"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {connection.status}
                  </span>
                  <p>
                    Connection Type:{" "}
                    <span className="text-sky-500 font-extrabold">
                      {connection.connectionType}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionManager;
