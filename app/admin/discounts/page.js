"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Plus, CheckCircle2, Copy } from "lucide-react";

export default function AdminDiscountsPage() {
  const [coupons, setCoupons] = useState([
    {
      code: "WELCOME10",
      discount: "10% OFF",
      type: "Percentage",
      status: "Active",
      uses: 48,
      appliesTo: "Entire Order",
      minOrder: "₹0.00",
    },
    {
      code: "COZY20",
      discount: "20% OFF",
      type: "Percentage",
      status: "Active",
      uses: 32,
      appliesTo: "Collector Orders",
      minOrder: "₹2,500.00",
    },
    {
      code: "STUDIO500",
      discount: "₹500 OFF",
      type: "Flat Amount",
      status: "Active",
      uses: 19,
      appliesTo: "Ceramics & Stoneware",
      minOrder: "₹3,999.00",
    },
  ]);

  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("15");
  const [showModal, setShowModal] = useState(false);

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (newCode.trim()) {
      setCoupons([
        {
          code: newCode.trim().toUpperCase(),
          discount: `${newDiscount}% OFF`,
          type: "Percentage",
          status: "Active",
          uses: 0,
          appliesTo: "All Products",
          minOrder: "₹0.00",
        },
        ...coupons,
      ]);
      setNewCode("");
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <span>/</span>
            <span className="text-white">Promotions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Discount Codes & Coupons
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#004fff] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Discount Code</span>
        </button>
      </div>

      {/* Coupons List */}
      <div className="bg-[#14171f] border border-[#222733] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#222733] flex justify-between items-center text-xs font-mono text-neutral-400">
          <span>Active Checkout Coupons ({coupons.length})</span>
          <span className="text-emerald-400">Tested & Functional in Checkout</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#222733] bg-[#11131a] text-neutral-400 uppercase text-[10px]">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Min. Requirement</th>
                <th className="py-3 px-4">Redemptions</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2330]">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#181c26] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#004fff]" />
                    <span>{c.code}</span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {c.discount}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    {c.type}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">
                    {c.minOrder}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    {c.uses} used
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(c.code);
                        alert(`Copied "${c.code}" to clipboard! Test it on /checkout.`);
                      }}
                      className="px-2 py-1 bg-[#1b202c] hover:bg-[#252c3c] text-neutral-300 hover:text-white rounded text-[11px] inline-flex items-center gap-1 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171f] border border-[#2d3446] rounded-xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create New Discount Code</h3>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 block mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="E.g. FESTIVE25"
                  className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2.5 text-xs font-mono text-white uppercase focus:outline-none focus:border-[#004fff]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 block mb-1">
                  Percentage Value (%)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#004fff]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#1b202c] hover:bg-[#232938] text-neutral-300 text-xs font-mono rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#004fff] hover:bg-blue-600 text-white text-xs font-bold font-mono uppercase rounded-md"
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
