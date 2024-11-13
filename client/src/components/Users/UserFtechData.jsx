import React, { useState } from "react"; // Importing React and useState hook for managing state
import useUserData from "../../hooks/useFetchDataUser"; // Custom hook to fetch user data
import useFetchNeeds from "../../hooks/need/useFetchAllNeed"; // Custom hook to fetch needs data
import useFetchOffers from "../../hooks/offer/useFetchOffers"; // Custom hook to fetch offers data

// UserProfile component displays user profile with various sections like projects, connections, needs, and offers
const UserProfile = ({ userId }) => {
  // Fetching needs, offers, and user data using custom hooks
  const { needs } = useFetchNeeds();
  const { offers } = useFetchOffers();
  const { data, error } = useUserData(userId); // Fetching user data based on userId
  console.log("offers", offers); // Logging the offers data for debugging

  // If there's an error, display the error message
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );

  // If there's no user data yet, display a loading message
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    // Main container with padding and styling for the profile page
    <div className="max-w-full h-[570px] mx-auto p-6 bg-white shadow-lg rounded-lg overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        All Data Available
      </h1>

      {/* Grid layout for sections: projects, connections, needs, and offers */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Section for displaying user projects */}
        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Projects</h2>
          <ul className="space-y-4">
            {data.projects.map((project) => (
              <li key={project._id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.projectName} {/* Project name */}
                </h3>
                <p className="text-gray-600">{project.description}</p>{" "}
                {/* Project description */}
                <p className="text-sm text-gray-500">
                  Status: <span className="font-medium">{project.status}</span>
                </p>
                <h4 className="font-medium text-gray-700 mt-2">
                  Resources Needed:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {project.resourcesNeeded.map((resource, index) => (
                    <li key={index}>{resource}</li>
                    /* Listing resources needed for the project */
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Section for displaying user connections */}
        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Connections
          </h2>
          <ul className="space-y-4">
            {data.connections.map((connection) => (
              <li
                key={connection._id}
                className="p-4 bg-white rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Connection Type: {connection.connectionType}{" "}
                  {/* Connection type */}
                </h3>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span className="font-medium">{connection.status}</span>{" "}
                  {/* Connection status */}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Section for displaying user needs */}
        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Needs</h2>
          <ul className="space-y-4">
            {needs.length === 0 ? (
              <p>No needs available.</p> // Display a message if there are no needs
            ) : (
              needs.map((need) => (
                <li key={need._id} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Category: {need.category} {/* Need category */}
                  </h3>
                  <p className="text-gray-600">
                    Description: {need.description} {/* Need description */}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="font-medium">{need.status}</span>{" "}
                    {/* Need status */}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Section for displaying user offers */}
        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Offers</h2>
          <ul className="space-y-4">
            {offers.length === 0 ? (
              <p>No offers available.</p> // Display a message if there are no offers
            ) : (
              offers.map((offer) => (
                <li key={offer._id} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {offer.title} {/* Offer title */}
                  </h3>
                  <p className="text-gray-600">
                    Description: {offer.description} {/* Offer description */}
                  </p>
                  <div className="text-sm text-gray-500">
                    Tags:{" "}
                    {offer.tags?.length ? (
                      <ul className="list-disc list-inside text-gray-600">
                        {offer.tags.map((tag, index) => (
                          <li key={index}>
                            {tag}
                          </li> /* Listing tags for the offer */
                        ))}
                      </ul>
                    ) : (
                      <span>No tags available</span> // Show a message if no tags are available
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
