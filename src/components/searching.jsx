import React from "react";

const Searching = () => {
  return (
    <div className="flex  md:items-end gap-4  mb-4">
      {/* Branch Selection */}
      <div className="">
        <h2 className="text-lg font-semibold">Branch Selection</h2>
        <input
          type="text"
          placeholder="Select Branch"
          className="w-full px-4 py-2 focus:outline-none"
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Searching;
