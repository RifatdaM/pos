import React from "react";

const Summary = () => {
  return (
    <>
      <div className="p-4 border-t border-[gray] text-sm space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" defaultChecked />
          <span>Send SMS notification</span>
        </div>

        <div className="flex justify-between">
          <span>Cart Total:</span>
          <span>৳0.00</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 border px-2 rounded  py-1.5 border-[gray]"
          />
          <button className="bg-indigo-800 text-white px-3 py-1 rounded-xl cursor-pointer h-10 w-20">
            Apply
          </button>
        </div>

        <div className="flex justify-between">
          <span>Discount:</span>
          <input
            type="number"
            defaultValue="0"
            className="w-20 border px-2 rounded text-right appearance-none py-1.5 border-[gray]"
          />
        </div>

        <div className="flex justify-between">
          <span>Coupon Discount:</span>
          <span>৳0.00</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>৳0.00</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping Method:</span>
          <select className="border rounded px-2 py-1.5  border-[gray]">
            <option>Select Method</option>
            <option>Within City (৳50)</option>
            <option>Out of City (৳100)</option>
          </select>
        </div>

        <div className="flex justify-between">
          <span>Shipping Charge:</span>
          <span>৳0.00</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (%):</span>
          <input
            type="number"
            defaultValue="0"
            className="w-16 border px-2 rounded text-right appearance-none py-1.5  border-[gray]"
          />
        </div>

        <div className="flex justify-between">
          <span>Tax Amount:</span>
          <span>৳0.00</span>
        </div>

        <div className="flex justify-between font-semibold text-base">
          <span>Grand Total:</span>
          <span>৳0.00</span>
        </div>

        {/* Payment */}
        <div className="flex gap-2 mt-3">
          <select className="border rounded px-2  flex-1 py-1.5  border-[gray]">
            <option>Cash</option>
            <option>Bkash</option>
            <option>Nagad</option>
          </select>
          <input
            type="number"
            defaultValue="0"
            className="border rounded px-2 w-20 text-right py-1.5 border-[gray]"
          />
          <input
            type="text"
            placeholder="Transaction ID"
            className="border rounded px-1 flex-1 py-1.5 pl-2 border-[gray]"
          />
        </div>
        <div className="flex justify-between font-semibold text-base h-12">
          <button className="bg-cyan-900 text-white px-3 py-1 rounded-xl cursor-pointer w-50">
            Add Payment Method
          </button>
          <button className="bg-emerald-600 text-white px-3 py-1 rounded-xl cursor-pointer w-40">
            Complete Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;
