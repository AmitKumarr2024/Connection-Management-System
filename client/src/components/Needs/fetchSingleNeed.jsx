import React from "react";
import { useParams } from "react-router-dom";
import useFetchSingleNeed from "../../hooks/need/useFetcchSingleNeed";

const SingleNeed = () => {
  const { id } = useParams();
  const { need, loading, error } = useFetchSingleNeed(id);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div>
      <h1>Need Details</h1>
      <p>Description: {need.description}</p>
      <p>Category: {need.category}</p>
      <p>Status: {need.status}</p>
    </div>
  );
};

export default SingleNeed;
