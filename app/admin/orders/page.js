"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
  Package,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      search.trim() === "" ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.city.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "unfulfilled" && order.fulfillmentStatus !== "Unfulfilled") return false;
    if (filter === "dispatched" && order.fulfillmentStatus !== "Dispatched") return false;
    if (filter === "delivered" && order.fulfillmentStatus !== "Delivered") return false;

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <span>/</span>
            <span className="text-white">Orders</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Orders ({orders.length})
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 bg-[#181d28] border border-[#272e3f] rounded-md text-amber-400 font-bold">
            {orders.filter((o) => o.fulfillmentStatus === "Unfulfilled").length} Unfulfilled
          </span>
          <span className="px-3 py-1.5 bg-[#181d28] border border-[#272e3f] rounded-md text-blue-400 font-bold">
            {orders.filter((o) => o.fulfillmentStatus === "Dispatched").length} In Transit
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 bg-[#14171f] border border-[#222733] rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID (#TCT-), customer, city..."
            className="w-full bg-[#1b202c] border border-[#2c3344] rounded-md pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff]"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs font-mono">
          {["all", "unfulfilled", "dispatched", "delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-md uppercase transition-colors whitespace-nowrap ${
                filter === status
                  ? "bg-[#004fff] text-white font-bold"
                  : "bg-[#1b202c] text-neutral-300 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#14171f] border border-[#222733] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#222733] bg-[#11131a] text-neutral-400 uppercase text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Collector</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total (INR)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2330]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#181c26] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    #{order.id}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white font-bold">{order.customer.name}</div>
                    <div className="text-[10px] text-neutral-500">{order.customer.city}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    {order.itemsCount} items
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                    Rs. {Number(order.total).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1b2536] text-blue-300 border border-[#2b3a54]">
                      {order.financialStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.fulfillmentStatus === "Delivered"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : order.fulfillmentStatus === "Dispatched"
                          ? "bg-blue-950 text-blue-400 border border-blue-800"
                          : "bg-amber-950 text-amber-400 border border-amber-800"
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    {order.fulfillmentStatus === "Unfulfilled" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Dispatched")}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold transition-colors"
                      >
                        Dispatch
                      </button>
                    )}
                    {order.fulfillmentStatus === "Dispatched" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Delivered")}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-colors"
                      >
                        Deliver
                      </button>
                    )}

                    <Link
                      href={`/order-confirmation?order_id=${order.id}&amount=${order.total}`}
                      target="_blank"
                      className="px-2 py-1 bg-[#222836] hover:bg-[#2b3345] text-neutral-300 rounded text-[11px] transition-colors inline-block"
                    >
                      Slip ↗
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-neutral-500 font-mono">
                    No orders found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
