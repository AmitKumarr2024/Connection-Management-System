import React from "react";
import useFetchNeeds from "../../hooks/need/useFetchAllNeed";

// Component to display a list of "Needs"
const NeedsList = () => {
  // Fetch all needs with loading and error handling
  const { needs, loading, error } = useFetchNeeds();

  // Show loading message while data is being fetched
  if (loading) return <div>Loading...</div>;
  // Show error message if there was a problem fetching data
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Needs</h2>
  
  <ul className="space-y-4">
    {needs.map((need) => (
      <li key={need._id} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
        {/* Need description */}
        <p className="text-lg font-semibold text-gray-800 mb-2">{need.description}</p>
        
        {/* Need category */}
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium text-gray-700">Category:</span> {need.category}
        </p>
        
        {/* Need status */}
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Status:</span> 
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
              need.status === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {need.status.charAt(0).toUpperCase() + need.status.slice(1)}
          </span>
        </p>
      </li>
    ))}
  </ul>
</div>

  );
};

export default NeedsList;
