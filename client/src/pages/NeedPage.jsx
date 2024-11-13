import React from "react";
import NeedsList from "../components/Needs/FetchAllNeedList";
import CreateNeedForm from "../components/Needs/CreateNeedForm";

const NeedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Needs List Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
           
            <NeedsList />
          </div>

          {/* Create New Need Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
              Create New Need
            </h2>
            <CreateNeedForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedPage;
