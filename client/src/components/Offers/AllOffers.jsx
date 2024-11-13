import React from "react";
import useFetchOffers from "../../hooks/offer/useFetchOffers"; // Hook to fetch offers
import { Link } from "react-router-dom"; // Link component for routing

const AllOffers = () => {
  const { offers, loading, error } = useFetchOffers(); // Fetch offers data
  console.log(offers); // Logs the fetched offers

  if (loading) 
    return <div className="flex justify-center items-center h-screen">Loading offers...</div>; // Display loading state
  if (error) 
    return <p className="flex justify-center items-center h-screen">{error}</p>; // Display error message

  return (
    <div className="space-y-8  p-8 bg-gray-50 rounded-xl shadow-xl max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        All Offers
      </h2>

      {offers.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No offers available at the moment.
        </p> // Message when no offers are available
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <Link
              key={offer._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {offer.title}
              </h3> // Display offer title
              <p className="mt-2 text-gray-600 line-clamp-2">
                {offer.description}
              </p> // Display offer description
              <div className="mt-3 text-sm text-gray-500">
                <p>Tags: {offer.tags.join(", ")}</p> // Display tags
                <p className="mt-1">
                  Created on: {new Date(offer.createdAt).toLocaleDateString()}
                </p> // Display creation date
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOffers;
