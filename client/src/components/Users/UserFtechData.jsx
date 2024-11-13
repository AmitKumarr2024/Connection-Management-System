import React, { useState } from "react";
import useUserData from "../../hooks/useFetchDataUser";
import useFetchNeeds from "../../hooks/need/useFetchAllNeed";
import useFetchOffers from "../../hooks/offer/useFetchOffers";

const UserProfile = ({ userId }) => {
  const { needs } = useFetchNeeds();
  const { offers } = useFetchOffers();
  const { data, error } = useUserData(userId);
  console.log("offers", offers);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="max-w-full h-[570px] mx-auto p-6 bg-white shadow-lg rounded-lg overflow-y-auto">
      <h1 className="text-3xl font-bold  mb-6 text-center text-blue-700">
        All Data Available
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Projects</h2>
          <ul className="space-y-4">
            {data.projects.map((project) => (
              <li key={project._id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.projectName}
                </h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className="font-medium">{project.status}</span>
                </p>
                <h4 className="font-medium text-gray-700 mt-2">
                  Resources Needed:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {project.resourcesNeeded.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

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
                  Connection Type: {connection.connectionType}
                </h3>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span className="font-medium">{connection.status}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Needs</h2>
          <ul className="space-y-4">
            {needs.length === 0 ? (
              <p>No needs available.</p>
            ) : (
              needs.map((need) => (
                <li key={need._id} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Category: {need.category}
                  </h3>
                  <p className="text-gray-600">
                    Description: {need.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="font-medium">{need.status}</span>
                  </p>
                  {/* Add any other need details as needed */}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="bg-gray-100 rounded-lg p-4 shadow-md overflow-y-scroll max-h-80">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Offers</h2>
          <ul className="space-y-4">
            {offers.length === 0 ? (
              <p>No offers available.</p>
            ) : (
              offers.map((offer) => (
                <li key={offer._id} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600">
                    Description: {offer.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Tags:{" "}
                    {offer.tags?.length ? (
                      <ul className="list-disc list-inside text-gray-600">
                        {offer.tags.map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>No tags available</span>
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
