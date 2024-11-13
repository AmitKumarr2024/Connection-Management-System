import React from "react";
import useFetchNeeds from "../../hooks/need/useFetchAllNeed";

const NeedsList = () => {
  const { needs, loading, error } = useFetchNeeds();


  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-lg max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        All Needs
      </h2>
      <ul className="space-y-6">
        {needs.map((need) => (
          <li
            key={need._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800 line-clamp-2 text-wrap">
                {need.description}
              </p>
            </div>
            <p className="text-gray-600">
              Category:{" "}
              <span className="font-medium text-gray-800">{need.category}</span>
            </p>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  need.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
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
