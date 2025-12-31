import React, { useState, useRef, useEffect } from "react";
import Customers from "./customers";

const Searching = () => {
  // const [branch, setBranch] = useState("");
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const barcodeInputRef = useRef(null);

  // Auto-focus barcode input for scanner
  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, []);

  // Handle barcode submission
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) {
      setIsScanning(true);
      // Simulate scan animation
      setTimeout(() => {
        setIsScanning(false);
        setBarcode("");
        // Here you would add the product to cart
      }, 500);
    }
  };

  // Handle keyboard shortcut for focusing barcode input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // F2 key to focus barcode input
      if (e.key === "F2") {
        e.preventDefault();
        barcodeInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="card p-3 md:p-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* <div className="md:w-48 lg:w-56">
          <label
            htmlFor="branch-select"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Branch
          </label>
          <select
            id="branch-select"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="input select text-sm py-2"
          >
            <option value="">Select Branch</option>
            <option value="main">Main - Dhaka</option>
            <option value="branch1">Chittagong</option>
            <option value="branch2">Sylhet</option>
          </select>
        </div> */}
        <Customers />

        <div className="w-1/2">
          <label
            htmlFor="barcode-input"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              Scan / Search
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] text-gray-500 bg-gray-100 rounded">
                F2
              </kbd>
            </span>
          </label>
          <form onSubmit={handleBarcodeSubmit} className="relative">
            <input
              ref={barcodeInputRef}
              type="text"
              id="barcode-input"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Scan barcode or search..."
              className={`input pl-9 pr-16 !pl-9 text-sm py-2 ${
                isScanning ? "scan-active border-blue-500" : ""
              }`}
              autoComplete="off"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className={`w-4 h-4 ${
                  isScanning ? "text-blue-600" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
              <button
                type="submit"
                className="btn btn-primary h-7 px-2.5 text-xs"
                disabled={!barcode.trim()}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="hidden sm:inline ml-1">Add</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Stats - Compact */}
      <div className="flex flex-wrap gap-3 md:gap-4 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
            aria-hidden="true"
          ></span>
          <span className="text-gray-500">Sales:</span>
          <span className="font-semibold text-gray-800">৳12,450</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
            aria-hidden="true"
          ></span>
          <span className="text-gray-500">Txns:</span>
          <span className="font-semibold text-gray-800">24</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className="w-1.5 h-1.5 bg-amber-500 rounded-full"
            aria-hidden="true"
          ></span>
          <span className="text-gray-500">Items:</span>
          <span className="font-semibold text-gray-800">156</span>
        </div>
      </div>
    </div>
  );
};

export default Searching;
