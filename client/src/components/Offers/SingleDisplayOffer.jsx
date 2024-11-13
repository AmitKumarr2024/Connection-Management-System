import React from "react";
import { useParams } from "react-router-dom"; // Get parameters from the URL (like offer id)
import useFetchSingleOffer from "../../hooks/offer/useSingleViewOffer"; // Hook to fetch single offer details

const SingleOffer = () => {
  const { id } = useParams(); // Get the offer id from the URL

  const { offer, loading, error } = useFetchSingleOffer(id); // Fetch the offer data based on the id
  console.log("single-offer", offer);

  // Show loading message while fetching data
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  // Show error message if there’s an error
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row max-w-4xl mx-auto bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="p-6 w-full lg:w-1/2">
        <h1 className="text-3xl font-semibold text-gray-900">{offer.title}</h1> {/* Display offer title */}
        <p className="text-gray-700 text-justify mt-4">{offer.description}</p> {/* Display offer description */}
        <p className="text-gray-600 text-sm mt-4">
          <span className="font-medium text-gray-800">Tags:</span>{" "}
          {offer.tags.join(", ")} {/* Display tags */}
        </p>
      </div>
    </div>
  );
};

export default SingleOffer;
