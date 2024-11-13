import React, { useState, useEffect } from "react";
import useGetAllConnections from "../../hooks/connections/useGetAllConnections";
import useUpdateConnectionStatus from "../../hooks/connections/useUpdateConnectionStatus";
import useFetchNeeds from "../../hooks/need/useFetchAllNeed";
import useFetchOffers from "../../hooks/offer/useFetchOffers";
import useFetchProjects from "../../hooks/projects/UseFetchAllProjects";
import useUpdateNeed from "../../hooks/need/useUpdateNeed";
import useUpdateProjectStatus from "../../hooks/projects/useUpdateProjectStatus";

const UserNotification = ({ userId }) => {
  const {
    connections,
    loading: fetchingAll,
    error: fetchAllError,
  } = useGetAllConnections();
  const {
    updateConnectionStatus,
    loading: updatingStatus,
    error: updateError,
  } = useUpdateConnectionStatus();
  const { needs, loading: needsLoading, error: needsError } = useFetchNeeds();
  const {
    offers,
    loading: offersLoading,
    error: offersError,
  } = useFetchOffers();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useFetchProjects();

  const { updateNeedStatus, loading, error, success } = useUpdateNeed();
  const {
    updateProjectStatus,
    status: projectStatus,
    project,
    error: projectError,
  } = useUpdateProjectStatus();

  // Handle connection update
  const handleConnectionUpdate = (connectionId, status) => {
    updateConnectionStatus(connectionId, status);
    setNotifications((prev) => [
      ...prev,
      {
        message: `Your connection status has been updated to ${status}`,
        userId: connectionId,
      },
    ]);
  };

  // Handle project status update
  const handleUpdateProjectStatus = (projectId, status) => {
    updateProjectStatus(projectId, status);
    setNotifications((prev) => [
      ...prev,
      { message: `Project status updated to ${status}`, userId: projectId },
    ]);
  };

  // Handle need status update
  const handleUpdateNeedStatus = (needId, status) => {
    updateNeedStatus(needId, status);
    setNotifications((prev) => [
      ...prev,
      { message: `Need status updated to ${status}`, userId: needId },
    ]);
  };

  const userConnections = (connections || []).filter(
    (connection) =>
      connection.user1._id === userId || connection.user2._id === userId
  );
  const filteredOffers = offers.filter((offer) => offer.userId === userId);
  const userNeeds = (needs || []).filter((need) => need.userId === userId);
  const userProjects = (projects || []).filter((project) =>
    project.associatedUsers.some((user) => user._id === userId)
  );

  console.log("filteredOffers", filteredOffers);

  if (fetchingAll || needsLoading || offersLoading || projectsLoading)
    return <div>Loading...</div>;
  if (fetchAllError || needsError || offersError || projectsError)
    return <div>Error occurred</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800">
        User Notifications
      </h1>

      {/* Connections Section */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          All Connections
        </h3>
        {userConnections.length === 0 ? (
          <p className="text-gray-500">No connections available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userConnections.map((connection) => (
              <div
                key={connection._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
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
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() =>
                      handleConnectionUpdate(connection._id, "accepted")
                    }
                    disabled={updatingStatus}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleConnectionUpdate(connection._id, "rejected")
                    }
                    disabled={updatingStatus}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Needs Section */}
      <div className="overflow-x-auto bg-gray-100 p-6 rounded-xl shadow-md mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">User Needs</h3>
        {userNeeds.length === 0 ? (
          <p className="text-gray-500">No needs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userNeeds.map((need) => (
              <div
                key={need._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {need.title}
                </h4>
                <p className="text-gray-600">{need.description}</p>
                <span className="text-sm text-blue-500">
                  Category: {need.category}
                </span>
                <select
                  value={need.status}
                  onChange={(e) =>
                    handleUpdateNeedStatus(need._id, e.target.value)
                  }
                  className="mt-2 border p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Offers Section */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Offers
        </h3>
        {filteredOffers.length === 0 ? (
          <p className="text-gray-500">No offers available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {offer.title}
                </h4>
                <p className="text-gray-600 mb-3">{offer.description}</p>
                <div className="mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    Category: {offer.tags.join(", ")}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Created at: {new Date(offer.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="overflow-x-auto bg-gray-100 p-6 rounded-xl shadow-md mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">User Projects</h3>
        {userProjects.length === 0 ? (
          <p className="text-gray-500">No projects available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {project.projectName}
                </h4>
                <p className="text-gray-600">{project.description}</p>
                <span className="text-sm text-blue-500">
                  Resources Needed: {project.resourcesNeeded.join(", ")}
                </span>
                <select
                  value={project.status}
                  onChange={(e) =>
                    handleUpdateProjectStatus(project._id, e.target.value)
                  }
                  className="mt-2 border p-2"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error messages */}
      {fetchAllError && <p className="text-red-500 mt-2">{fetchAllError}</p>}
      {updateError && <p className="text-red-500 mt-4">{updateError}</p>}
      {projectError && <p className="text-red-500 mt-4">{projectError}</p>}
    </div>
  );
};

export default UserNotification;
