import { useState } from "react";
import Customers from "./components/customers";
import Products from "./components/products";
import Searching from "./components/searching";
import Summary from "./components/summary";
import Topbar from "./components/topbar";
import "./index.css";

function App() {
  // Sample cart items - would be managed via state/context
  const [cartItems] = useState([
    { id: 1, name: "Fresh Milk 1L", price: 85.0, quantity: 2, sku: "MLK001" },
    {
      id: 2,
      name: "White Bread Loaf",
      price: 55.0,
      quantity: 1,
      sku: "BRD001",
    },
    {
      id: 3,
      name: "Rice 5kg Premium",
      price: 450.0,
      quantity: 1,
      sku: "RIC001",
    },
  ]);

  const updateQuantity = (id, delta) => {
    console.log("Update quantity:", id, delta);
  };

  const removeItem = (id) => {
    console.log("Remove item:", id);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Topbar />

      <main
        id="main-content"
        className=" mx-auto px-3 md:px-4 lg:px-6 py-3 md:py-4"
      >
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          {/* Left Panel - Products & Search */}
          <div className="w-full lg:w-[58%] xl:w-[62%] space-y-3 md:space-y-4">
            <Searching />
            <Products />
          </div>

          {/* Right Panel - Cart & Checkout */}
          <aside
            className="w-full lg:w-[42%] xl:w-[38%]"
            aria-label="Shopping cart"
          >
            <div className="card lg:sticky lg:top-20 flex flex-col lg:max-h-[calc(100vh-6rem)]">
              {/* Customer Section */}
              {/* <Customers /> */}

              {/* Cart Section */}
              <div className="flex flex-col min-h-0 flex-1">
                {/* Cart Header */}
                <div className="px-3 py-2 md:px-4 md:py-3 border-b border-gray-200 bg-white flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-sm font-semibold text-gray-800">
                        Cart
                        <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {cartItems.length}
                        </span>
                      </h2>
                    </div>
                    {cartItems.length > 0 && (
                      <button
                        type="button"
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Cart Items List - Scrollable */}
                <div className="flex-1 overflow-y-auto min-h-[120px] max-h-[200px] lg:max-h-[280px]">
                  <div className="p-2 md:p-3">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
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
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">Cart is empty</p>
                      </div>
                    ) : (
                      <ul
                        className="space-y-2"
                        role="list"
                        aria-label="Cart items"
                      >
                        {cartItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                          >
                            {/* Product Details - Compact */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs font-medium text-gray-900 truncate">
                                  {item.name}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 flex-shrink-0"
                                  aria-label={`Remove ${item.name}`}
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>

                              <div className="flex items-center justify-between mt-1">
                                {/* Quantity Controls - Compact */}
                                <div className="flex items-center gap-0.5">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    aria-label="Decrease quantity"
                                  >
                                    <svg
                                      className="w-2.5 h-2.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 12H4"
                                      />
                                    </svg>
                                  </button>
                                  <span className="w-8 text-center text-xs font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    aria-label="Increase quantity"
                                  >
                                    <svg
                                      className="w-2.5 h-2.5"
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
                                  </button>
                                </div>

                                {/* Price - Compact */}
                                <div className="text-right">
                                  <p className="text-xs font-semibold text-gray-900">
                                    ৳{(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Cart Subtotal Bar */}
                {cartItems.length > 0 && (
                  <div className="px-3 py-2 bg-blue-50 border-t border-blue-100 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-700">
                        Cart Subtotal ({cartItems.length} items)
                      </span>
                      <span className="text-sm font-bold text-blue-700">
                        ৳{cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary Section */}
              <Summary cartTotal={cartTotal} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
