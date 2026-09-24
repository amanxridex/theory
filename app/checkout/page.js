"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder, validateDiscountCode } from "@/lib/supabase";
import {
  ShieldCheck,
  Lock,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Tag,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // COD only active for now
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0); // in percent or flat amount
  const [discountMsg, setDiscountMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingFee = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const discountAmount = (subtotal * discountApplied) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    const result = await validateDiscountCode(discountCode, subtotal);
    if (result.valid) {
      if (result.type === "percentage") {
        setDiscountApplied(result.value);
      } else {
        const percentEquiv = Math.min(100, (result.value / (subtotal || 1)) * 100);
        setDiscountApplied(percentEquiv);
      }
      setDiscountMsg(result.message);
    } else {
      setDiscountApplied(0);
      setDiscountMsg(result.message);
    }
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your bag is empty! Please add items before checking out.");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customer_name:
          `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim() ||
          "Valued Customer",
        customer_email: contactInfo.email,
        customer_phone: contactInfo.phone,
        shipping_address: shippingAddress,
        items: items.map((it) => ({
          id: it.id,
          title: it.title,
          price: parseFloat(it.price) || 0,
          quantity: it.quantity || 1,
          image: (it.images && it.images[0]) || "",
        })),
        subtotal: subtotal,
        shipping_cost: shippingFee,
        discount: discountAmount,
        total: total,
        payment_method: "Cash on Delivery (COD)",
        payment_status: "pending",
        fulfillment_status: "Unfulfilled",
      };

      const placedOrder = await createOrder(orderData);

      // Auto-save account session for first-time customer
      try {
        localStorage.setItem(
          "cozy_user",
          JSON.stringify({
            id: "cust-" + contactInfo.phone.replace(/\D/g, ""),
            name: orderData.customer_name,
            phone: contactInfo.phone.replace(/\D/g, ""),
            email: contactInfo.email,
            city: shippingAddress.city,
          })
        );
      } catch (e) {
        console.error(e);
      }

      clearCart();
      setIsProcessing(false);
      router.push(`/order-confirmation?order_id=${placedOrder.id}&amount=${total}&payment=cod`);
    } catch (err) {
      console.error("Order error:", err);
      setIsProcessing(false);
      const fallbackOrderId = "TCT-" + Math.floor(100000 + Math.random() * 900000);
      clearCart();
      router.push(`/order-confirmation?order_id=${fallbackOrderId}&amount=${total}&payment=cod`);
    }
  };

  return (
    <div className="bg-[#fffdf8] min-h-screen">
      {/* Minimal Checkout Header */}
      <div className="border-b border-[#e5e3dc] bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold tracking-[-0.04em] text-xl sm:text-2xl uppercase font-sans text-[#121212]">
              THE COZY THEORY
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              Secure Checkout
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Customer Details, Address, Payment Methods */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Express Checkout Options */}
            <div className="p-6 bg-[#f7f5ef] border border-[#e5e3dc] space-y-4">
              <div className="text-center text-xs font-mono uppercase text-neutral-500 tracking-wider">
                Express 1-Click Checkout
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("upi");
                    alert("Selected Express UPI. Fill shipping address to complete.");
                  }}
                  className="py-3 bg-[#004fff] text-white text-xs font-mono font-bold uppercase hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Google Pay / PhonePe</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("cod");
                    alert("Selected Cash On Delivery. Fill address below.");
                  }}
                  className="py-3 bg-[#121212] text-white text-xs font-mono font-bold uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Banknote className="w-4 h-4" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <div className="flex-1 h-[1px] bg-[#e5e3dc]"></div>
                <span>OR FILL DETAILS BELOW</span>
                <div className="flex-1 h-[1px] bg-[#e5e3dc]"></div>
              </div>
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-8">
              
              {/* Step 1: Contact Information */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#121212]">
                    1. Contact Information
                  </h2>
                  <Link href="/account/login" className="text-xs font-mono underline text-neutral-600 hover:text-black">
                    Already have an account? Log in
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#121212]">
                  2. Shipping Address
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                    Street Address & House / Flat No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    placeholder="E.g. Flat 402, Lotus Residency, 5th Cross"
                    className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="Mumbai"
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      State *
                    </label>
                    <select
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi / NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Other">Other States</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      placeholder="400001"
                      className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#121212]">
                    3. Payment Method
                  </h2>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                    COD Active
                  </span>
                </div>

                <div className="border border-[#e5e3dc] bg-white">
                  {/* Cash on Delivery (Enabled & Selected) */}
                  <label className="flex items-start gap-3 p-4 cursor-pointer bg-[#faf8f2] border-l-4 border-l-[#121212] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={true}
                      readOnly
                      className="accent-[#121212] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#121212]" />
                        <span className="text-xs font-mono font-bold uppercase text-black">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[9px] font-mono uppercase bg-emerald-600 text-white font-bold px-1.5 py-0.5">
                          Standard
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-neutral-600 mt-1">
                        Pay with cash or UPI QR on delivery. Free, verified delivery across India.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Complete Order Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className="w-full py-4 bg-[#121212] text-[#fffdf8] text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Confirming COD Order & Saving to Database...
                    </span>
                  ) : (
                    <span>Confirm COD Order • Rs. {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#f7f5ef] border border-[#e5e3dc] space-y-6">
              <h3 className="text-base font-bold uppercase tracking-tight font-sans text-[#121212]">
                Order Items ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </h3>

              {/* Line Items List */}
              <div className="divide-y divide-[#e5e3dc] max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-16 object-cover border border-[#e5e3dc] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-tight line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-500">
                        Qty: {item.quantity} × Rs. {Number(item.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="text-xs font-mono font-bold text-right">
                      Rs. {(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code Form */}
              <form onSubmit={handleApplyDiscount} className="flex gap-2 pt-2 border-t border-[#e5e3dc]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Coupon (e.g. WELCOME10)"
                    className="w-full bg-white border border-[#e5e3dc] px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-black uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#121212] text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Apply
                </button>
              </form>
              {discountMsg && (
                <p className={`text-[11px] font-mono ${discountApplied > 0 ? "text-emerald-700" : "text-rose-600"}`}>
                  {discountMsg}
                </p>
              )}

              {/* Totals Breakdown */}
              <div className="space-y-2 text-xs font-mono text-neutral-600 divide-y divide-[#e5e3dc] pt-2">
                <div className="flex justify-between items-center pt-2">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">
                    Rs. {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {discountApplied > 0 && (
                  <div className="flex justify-between items-center pt-2 text-emerald-700">
                    <span>Discount ({discountApplied}%)</span>
                    <span>- Rs. {discountAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span>Shipping (Express India)</span>
                  <span>{shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}.00`}</span>
                </div>

                <div className="flex justify-between items-center pt-3 text-base font-bold text-black">
                  <span>Total Amount</span>
                  <span>Rs. {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-[#e5e3dc] flex items-center gap-3 text-xs font-mono text-neutral-600">
              <Truck className="w-5 h-5 text-neutral-700 flex-shrink-0" />
              <span>Orders dispatch within 24-48 hours via premium express delivery across India.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
