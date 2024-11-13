import React from "react";
import CreateOffer from "../components/Offers/CreateOffer";
import AllOffers from "../components/Offers/AllOffers";

const OfferPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 lg:px-28 flex flex-col lg:flex-row gap-10 justify-between items-center space-y-10 lg:space-y-0">
        <div className="bg-white shadow-lg rounded-lg w-full md:w-2/3 lg:w-1/2 p-6">
          <CreateOffer />
        </div>
        <div className="bg-white shadow-lg overflow-y-auto h-[650px] rounded-lg w-[750px] md:w-2/3 lg:w-1/2 p-6">
          <AllOffers />
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
