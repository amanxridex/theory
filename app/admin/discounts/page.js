"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { supabase } from "@/lib/supabase";
import { Tag, Plus, CheckCircle2, Copy } from "lucide-react";

export default function AdminDiscountsPage() {
  const { discounts: storeDiscounts } = useStore();
  const [coupons, setCoupons] = useState([
    {
      code: "COZY10",
      discount: "10% OFF",
      type: "Percentage",
      status: "Active",
      uses: 48,
      appliesTo: "Entire Order",
      minOrder: "₹0.00",
    },
    {
      code: "FESTIVE20",
      discount: "20% OFF",
      type: "Percentage",
      status: "Active",
      uses: 32,
      appliesTo: "Collector Orders",
      minOrder: "₹2,500.00",
    },
    {
      code: "THEORY500",
      discount: "₹500 OFF",
      type: "Flat Amount",
      status: "Active",
      uses: 19,
      appliesTo: "Ceramics & Stoneware",
      minOrder: "₹3,000.00",
    },
  ]);

  useEffect(() => {
    if (storeDiscounts && storeDiscounts.length > 0) {
      const formatted = storeDiscounts.map((d) => ({
        code: d.code,
        discount: d.type === "percentage" ? `${d.value}% OFF` : `₹${d.value} OFF`,
        type: d.type === "percentage" ? "Percentage" : "Flat Amount",
        status: d.status || "Active",
        uses: d.usage_count || 0,
        appliesTo: "All Products",
        minOrder: `₹${d.min_requirement || 0}`,
      }));
      setCoupons(formatted);
    }
  }, [storeDiscounts]);

  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("15");
  const [showModal, setShowModal] = useState(false);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (newCode.trim()) {
      const upper = newCode.trim().toUpperCase();
      const val = parseFloat(newDiscount) || 15;
      const newCouponItem = {
        code: upper,
        discount: `${val}% OFF`,
        type: "Percentage",
        status: "Active",
        uses: 0,
        appliesTo: "All Products",
        minOrder: "₹0.00",
      };

      setCoupons([newCouponItem, ...coupons]);
      setNewCode("");
      setShowModal(false);

      try {
        await supabase.from("discounts").upsert([
          {
            id: "disc_" + Date.now(),
            code: upper,
            type: "percentage",
            value: val,
            min_requirement: 0,
            status: "active",
            usage_count: 0,
          },
        ]);
      } catch (err) {
        console.error("Failed to save discount to DB:", err);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e3dc]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-black">Admin</Link>
            <span>/</span>
            <span className="text-black font-semibold">Promotions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212] mt-1">
            Discount Codes &amp; Coupons
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Discount Code</span>
        </button>
      </div>

      {/* Coupons List */}
      <div className="bg-white border border-[#e5e3dc] rounded overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#e5e3dc] bg-[#faf8f5] flex justify-between items-center text-xs font-mono text-neutral-600">
          <span>Active Checkout Coupons ({coupons.length})</span>
          <span className="text-emerald-700 font-semibold">Active in Checkout</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#e5e3dc] bg-[#faf8f5] text-neutral-600 uppercase text-[10px]">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Min. Requirement</th>
                <th className="py-3 px-4">Redemptions</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e3dc]">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#121212] flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#004fff]" />
                    <span>{c.code}</span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold">
                    {c.discount}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {c.type}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">
                    {c.minOrder}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {c.uses} used
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(c.code);
                        alert(`Copied "${c.code}" to clipboard!`);
                      }}
                      className="px-2 py-1 bg-[#f5f2eb] hover:bg-[#eae6dd] text-black border border-[#e5e3dc] rounded text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating Discount */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#e5e3dc] rounded w-full max-w-md p-6 space-y-5 shadow-2xl">
            <h3 className="text-base font-bold uppercase text-[#121212]">Create New Discount Code</h3>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-neutral-600 block mb-1 font-semibold">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="E.g. FESTIVE25"
                  className="w-full bg-[#f5f2eb] border border-[#e5e3dc] rounded px-3 py-2.5 text-xs font-mono text-black uppercase focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-600 block mb-1 font-semibold">
                  Percentage Value (%)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full bg-[#f5f2eb] border border-[#e5e3dc] rounded px-3 py-2.5 text-xs font-mono text-black focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#f5f2eb] hover:bg-[#ede9e0] text-neutral-700 text-xs font-mono rounded border border-[#e5e3dc]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#121212] hover:bg-neutral-800 text-white text-xs font-bold font-mono uppercase rounded transition-colors"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
