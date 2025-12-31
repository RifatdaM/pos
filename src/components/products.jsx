import React, { useState } from "react";

const Products = () => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Sample products data - would come from API/barcode scan
  const [scannedProducts] = useState([
    {
      id: 1,
      name: "Fresh Milk 1L",
      sku: "MLK001",
      barcode: "4901234567890",
      price: 85.0,
      stock: 45,
      category: "Dairy",
      image: null,
      brand: "DairyPure1",
    },
    {
      id: 2,
      name: "White Bread Loaf",
      sku: "BRD001",
      barcode: "4901234567891",
      price: 55.0,
      stock: 30,
      category: "Bakery",
      image: null,
      brand: "DairyPure2",
    },
    {
      id: 3,
      name: "Rice 5kg Premium",
      sku: "RIC001",
      barcode: "4901234567892",
      price: 450.0,
      stock: 100,
      category: "Grocery",
      image: null,
      brand: "DairyPure3",
    },
  ]);

  const [recentScans] = useState([
    { barcode: "4901234567890", time: "10:45 AM", product: "Fresh Milk 1L" },
    { barcode: "4901234567891", time: "10:44 AM", product: "White Bread Loaf" },
  ]);

  return (
    <div className="card">
      {/* Header with View Toggle - Compact */}
      <div className="flex items-center justify-between px-3 py-2 md:p-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-800">Products</h2>
            <p className="text-[11px] text-gray-500">
              {scannedProducts.length} available
            </p>
          </div>
        </div>

        {/* View Toggle - Compact */}
        <div
          className="flex items-center gap-0.5 bg-gray-100 rounded p-0.5"
          role="tablist"
          aria-label="View mode"
        >
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            role="tab"
            aria-selected={viewMode === "grid"}
            aria-label="Grid view"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-1 rounded transition-colors ${
              viewMode === "list"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            role="tab"
            aria-selected={viewMode === "list"}
            aria-label="List view"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Display */}
      <div className="p-2 md:p-3">
        {scannedProducts.length === 0 ? (
          /* Empty State - Compact */
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Ready to Scan
            </h3>
            <p className="text-xs text-gray-500 max-w-xs">
              Scan barcodes or search to add products
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-600">
              <kbd className="px-1.5 py-0.5 bg-blue-50 rounded text-[10px] font-medium">
                F2
              </kbd>
              <span>to focus scanner</span>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View - Responsive */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-2">
            {scannedProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                className="group p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left"
                aria-label={`Add ${product.name} to cart`}
              >
                {/* Product Image Placeholder */}
                <div className="w-full aspect-square bg-gray-100 rounded-md mb-2 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <svg
                    className="w-8 h-8 text-gray-300 group-hover:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>

                {/* Product Info */}
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">
                    {product.brand}
                  </p>
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">
                      ৳{product.price.toFixed(2)}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${
                      product.stock > 10 ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>

                {/* Quick Add Overlay */}
              </button>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-2">
            {scannedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                {/* Product Image */}
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        SKU: {product.sku} | Barcode: {product.barcode}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                      ৳{product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="badge badge-info">{product.category}</span>
                    <span
                      className={`text-xs ${
                        product.stock > 10 ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  className="btn btn-primary h-9 px-4"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Recent Scans
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentScans.map((scan, index) => (
              <button
                key={index}
                type="button"
                className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md text-xs hover:border-blue-300 transition-colors"
              >
                <span className="text-gray-500">{scan.time}</span>
                <span className="font-medium text-gray-700">
                  {scan.product}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
