import React from "react";

const Customers = () => {
  return (
    <div className="p-4 border-b border-[gray]">
      <div className="flex gap-5 items-center">
        <h3 className="font-semibold text-sm">Select Customer</h3>
        <button className="text-2xl cursor-pointer">+</button>
      </div>

      <input
        type="text"
        placeholder="Search customer..."
        className="w-full mt-3 px-3 py-2 focus:outline-none"
      />
    </div>
  );
};

export default Customers;
