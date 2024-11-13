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
    <div className="container">
      <h2>All Needs</h2>
      <ul>
        {needs.map((need) => (
          <li key={need._id} className="need-item">
            {/* Display need description */}
            <p>{need.description}</p>
            
            {/* Display need category */}
            <p>Category: {need.category}</p>
            
            {/* Display need status with conditional styling */}
            <p>Status: 
              <span className={need.status === "completed" ? "completed" : "pending"}>
                {need.status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeedsList;
