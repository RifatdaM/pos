import React, { useState } from "react";

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Sample customers data
  const customers = [
    { id: 1, name: "Walk-in Customer", phone: "N/A", email: "", type: "default" },
    { id: 2, name: "Rahul Ahmed", phone: "01711-234567", email: "rahul@email.com", type: "regular" },
    { id: 3, name: "Fatima Begum", phone: "01812-345678", email: "fatima@email.com", type: "vip" },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSearchQuery("");
  };

  const handleAddNewCustomer = (e) => {
    e.preventDefault();
    // Here you would add API call to create customer
    console.log("Creating customer:", newCustomer);
    setShowModal(false);
    setNewCustomer({ name: "", phone: "", email: "", address: "" });
  };

  return (
    <>
      <div className="px-3 py-2 md:p-3 border-b border-gray-200 bg-gray-50">
        {/* Header - Compact */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-xs font-semibold text-gray-800">Customer</h2>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="btn btn-primary h-7 px-2 text-xs"
            aria-label="Add new customer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New</span>
          </button>
        </div>

        {/* Selected Customer Display - Compact */}
        {selectedCustomer ? (
          <div className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                selectedCustomer.type === "vip" ? "bg-amber-500" : 
                selectedCustomer.type === "regular" ? "bg-blue-500" : "bg-gray-400"
              }`}>
                {selectedCustomer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs flex items-center gap-1">
                  {selectedCustomer.name}
                  {selectedCustomer.type === "vip" && (
                    <span className="badge badge-warning text-[10px] px-1 py-0">VIP</span>
                  )}
                </p>
                <p className="text-[11px] text-gray-500">{selectedCustomer.phone}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCustomer(null)}
              className="text-gray-400 hover:text-red-500 p-1"
              aria-label="Remove selected customer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          /* Customer Search - Compact */
          <div className="relative">
            <label htmlFor="customer-search" className="sr-only">Search customers</label>
            <input
              type="text"
              id="customer-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer..."
              className="input pl-8 text-xs py-1.5"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Customer Dropdown */}
            {searchQuery && (
              <div
                className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                role="listbox"
                aria-label="Customer search results"
              >
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleSelectCustomer(customer)}
                      className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                      role="option"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                        customer.type === "vip" ? "bg-amber-500" : 
                        customer.type === "regular" ? "bg-blue-500" : "bg-gray-400"
                      }`}>
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{customer.name}</p>
                        <p className="text-[11px] text-gray-500">{customer.phone}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-gray-500">
                    No customers found
                  </div>
                )}
              </div>
            )}

            {/* Quick Walk-in Button */}
            {!searchQuery && (
              <button
                type="button"
                onClick={() => handleSelectCustomer(customers[0])}
                className="w-full mt-1.5 py-1 text-[11px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors flex items-center justify-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Walk-in Customer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add New Customer Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
                Add New Customer
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn btn-icon btn-outline h-8 w-8"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddNewCustomer} className="p-4 space-y-4">
              <div>
                <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customer-name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="input"
                  required
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customer-phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="input"
                  required
                  placeholder="01XXX-XXXXXX"
                />
              </div>

              <div>
                <label htmlFor="customer-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="customer-email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="input"
                  placeholder="customer@email.com"
                />
              </div>

              <div>
                <label htmlFor="customer-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="customer-address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="input min-h-[80px] resize-none"
                  placeholder="Enter address"
                  rows={3}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
