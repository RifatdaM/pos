import React, { useState } from "react";

const Summary = ({ cartTotal = 0 }) => {
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("");
  const [sendSms, setSendSms] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    { method: "cash", amount: 0, transactionId: "" },
  ]);

  // Calculations
  const couponDiscount = 0;
  const shippingCharge = shippingMethod === "city" ? 50 : shippingMethod === "outside" ? 100 : 0;
  const subtotal = cartTotal - discount - couponDiscount;
  const taxAmount = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + shippingCharge + taxAmount;

  const updatePaymentMethod = (index, field, value) => {
    const updated = [...paymentMethods];
    updated[index][field] = value;
    setPaymentMethods(updated);
  };

  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, { method: "cash", amount: 0, transactionId: "" }]);
  };

  const removePaymentMethod = (index) => {
    if (paymentMethods.length > 1) {
      setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
    }
  };

  const totalPaid = paymentMethods.reduce((sum, pm) => sum + Number(pm.amount), 0);
  const changeAmount = totalPaid - grandTotal;

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Compact Summary Row */}
      <div className="px-3 py-2">
        {/* Toggle Details Button */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between text-xs text-gray-500 hover:text-gray-700 mb-2"
        >
          <span className="flex items-center gap-1">
            <svg
              className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showDetails ? "Hide" : "Show"} Details
          </span>
          <label className="flex items-center gap-1.5 cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={sendSms}
              onChange={(e) => setSendSms(e.target.checked)}
              className="w-3 h-3 text-blue-600 rounded border-gray-300"
            />
            <span>SMS</span>
          </label>
        </button>

        {/* Collapsible Details */}
        {showDetails && (
          <div className="space-y-2 pb-2 mb-2 border-b border-gray-100 text-xs">
            {/* Coupon Row */}
            <div className="flex gap-1.5">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="input flex-1 text-xs py-1.5 px-2"
              />
              <button type="button" className="btn btn-outline text-xs py-1 px-2" disabled={!couponCode.trim()}>
                Apply
              </button>
            </div>

            {/* Discount & Tax Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-500">Discount</label>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">৳</span>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="input w-16 text-right text-xs py-1 px-1.5"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-500">Tax</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value))}
                    className="input w-14 text-right text-xs py-1 px-1.5"
                    min="0"
                    max="100"
                  />
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>

            {/* Shipping Row */}
            <div className="flex items-center justify-between">
              <label className="text-gray-500">Shipping</label>
              <select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="input select text-xs py-1 px-2 w-32"
              >
                <option value="">None</option>
                <option value="city">City ৳50</option>
                <option value="outside">Outside ৳100</option>
              </select>
            </div>
          </div>
        )}

        {/* Summary Totals - Always Visible */}
        <div className="space-y-1 text-xs">
          {/* Subtotal Row */}
          <div className="flex items-center justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="tabular-nums">৳{subtotal.toFixed(2)}</span>
          </div>

          {/* Show adjustments only if they exist */}
          {(discount > 0 || taxAmount > 0 || shippingCharge > 0) && (
            <div className="flex items-center justify-between text-gray-500 text-[11px]">
              <span>
                {discount > 0 && `Disc: -৳${discount}`}
                {taxAmount > 0 && ` | Tax: +৳${taxAmount.toFixed(0)}`}
                {shippingCharge > 0 && ` | Ship: +৳${shippingCharge}`}
              </span>
            </div>
          )}

          {/* Grand Total Row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-bold text-gray-900">Grand Total</span>
            <span className="text-lg font-bold text-blue-600 tabular-nums">৳{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Section - Compact */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
        <div className="space-y-2">
          {paymentMethods.map((pm, index) => (
            <div key={index} className="space-y-1.5">
              {/* Payment Amount - Large and Prominent */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={pm.amount}
                  onChange={(e) => updatePaymentMethod(index, "amount", e.target.value)}
                  placeholder="0.00"
                  className="input text-right text-2xl font-bold py-3 px-4 tabular-nums flex-1"
                  min="0"
                  step="0.01"
                  aria-label="Payment amount"
                />
                {paymentMethods.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePaymentMethod(index)}
                    className="text-red-400 hover:text-red-600 p-2"
                    aria-label="Remove payment"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Payment Method and Transaction ID - Small Secondary Row */}
              <div className="flex items-center gap-2">
                <select
                  value={pm.method}
                  onChange={(e) => updatePaymentMethod(index, "method", e.target.value)}
                  className="input select text-xs py-1.5 px-2 w-24"
                  aria-label="Payment method"
                >
                  <option value="cash">💵 Cash</option>
                  <option value="bkash">📱 bKash</option>
                  <option value="nagad">📱 Nagad</option>
                  <option value="card">💳 Card</option>
                </select>
                {pm.method !== "cash" && (
                  <input
                    type="text"
                    value={pm.transactionId}
                    onChange={(e) => updatePaymentMethod(index, "transactionId", e.target.value)}
                    placeholder="Transaction ID"
                    className="input  w-1/2 text-xs py-1.5 px-2"
                    aria-label="Transaction ID"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Add Payment Button */}
          <button
            type="button"
            onClick={addPaymentMethod}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5 mt-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Payment
          </button>
        </div>

        {/* Payment Status - Compact */}
        {totalPaid > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
            <span className="text-gray-500">Paid: ৳{totalPaid.toFixed(2)}</span>
            <span className={`font-semibold ${changeAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
              {changeAmount >= 0 ? "Change" : "Due"}: ৳{Math.abs(changeAmount).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons - Compact */}
      <div className="px-3 py-2 border-t border-gray-200 flex gap-2">
        <button type="button" className="btn btn-outline flex-1 py-2 text-xs">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Hold
        </button>
        <button
          type="button"
          className="btn btn-success flex-[2] py-2 text-sm font-semibold"
          disabled={grandTotal <= 0}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Complete ৳{grandTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Summary;
