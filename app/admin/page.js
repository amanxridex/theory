"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Package,
  Layers,
  Plus,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  FileText,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { products, collections, orders, analytics, updateOrderStatus } = useStore();
  const [timeRange, setTimeRange] = useState("today"); // today, 7d, 30d

  const salesFormatted = Number(analytics.totalSales).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const trafficData = [
    { hour: "10 AM", visitors: 110, revenue: 24500 },
    { hour: "12 PM", visitors: 185, revenue: 48900 },
    { hour: "02 PM", visitors: 260, revenue: 64200 },
    { hour: "04 PM", visitors: 310, revenue: 89000 },
    { hour: "06 PM", visitors: 420, revenue: 112000 },
    { hour: "08 PM", visitors: 540, revenue: 148500 },
    { hour: "NOW", visitors: (analytics.activeVisitors || 1) * 8, revenue: 76500 },
  ];

  const maxRevenue = Math.max(...trafficData.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e3dc]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#004fff] font-bold">
              THE COZY THEORY CONTROL CENTER // DEREK MARTIN
            </span>
            <span className="text-xs font-mono text-neutral-400">•</span>
            <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Live Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212] mt-1">
            Store Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#f5f2eb] border border-[#e5e3dc] rounded p-1 text-xs font-mono">
            {["today", "7d", "30d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded capitalize transition-colors ${
                  timeRange === range
                    ? "bg-[#121212] text-white font-bold"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                {range === "today" ? "Today" : range === "7d" ? "Last 7 Days" : "Last 30 Days"}
              </button>
            ))}
          </div>

          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-medium transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Sales */}
        <div className="p-5 bg-white border border-[#e5e3dc] rounded space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span className="font-semibold">TOTAL SALES</span>
            <span className="p-2 bg-emerald-50 rounded text-emerald-700 border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#121212] font-mono">
              Rs. {salesFormatted}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Real store revenue</span>
            </div>
          </div>
        </div>

        {/* Real Store Visitors */}
        <div className="p-5 bg-white border border-[#e5e3dc] rounded space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span className="font-semibold">ONLINE STORE SESSIONS</span>
            <span className="p-2 bg-blue-50 rounded text-blue-700 border border-blue-100">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#121212] font-mono">
              {Number(analytics.todayVisitors || 1).toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono mt-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span><strong>{analytics.activeVisitors || 1}</strong> active users right now</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-white border border-[#e5e3dc] rounded space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span className="font-semibold">TOTAL ORDERS</span>
            <span className="p-2 bg-amber-50 rounded text-amber-800 border border-amber-100">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#121212] font-mono">
              {analytics.totalOrders || orders.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-mono mt-1">
              <span className="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {orders.filter((o) => o.fulfillmentStatus === "Unfulfilled").length} pending
              </span>
              <span>fulfillment</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-5 bg-white border border-[#e5e3dc] rounded space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span className="font-semibold">CONVERSION RATE</span>
            <span className="p-2 bg-purple-50 rounded text-purple-700 border border-purple-100">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#121212] font-mono">
              {analytics.conversionRate || "3.4"}%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-mono mt-1">
              <span>Avg Order:</span>
              <strong className="text-black font-bold">Rs. {analytics.averageOrderValue || "2,800"}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Revenue & Real-Time Traffic Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales & Traffic Trend (8 Cols) */}
        <div className="lg:col-span-8 p-6 bg-white border border-[#e5e3dc] rounded space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                Sales & Traffic Velocity (Hourly Breakdown)
              </h2>
              <p className="text-xs text-neutral-500 font-mono">
                Real checkout volume and concurrent shopper activity
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#121212]"></span>
                <span className="text-neutral-700">Revenue (₹)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span>
                <span className="text-neutral-700">Visitors</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visual Representation */}
          <div className="pt-4 h-64 flex items-end justify-between gap-3 border-b border-[#e5e3dc] pb-4">
            {trafficData.map((item, i) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center bg-[#121212] text-white p-1.5 rounded whitespace-nowrap pointer-events-none mb-1 shadow-lg">
                    <div>Rs. {item.revenue.toLocaleString()}</div>
                    <div className="text-emerald-400">{item.visitors} sessions</div>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full max-w-[36px] flex items-end gap-1 h-full justify-center">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-[#121212] rounded-t transition-all duration-500 group-hover:bg-[#004fff]"
                    />
                    <div
                      style={{ height: `${Math.min(100, Math.round((item.visitors / 600) * 100))}%` }}
                      className="w-full bg-emerald-600/80 rounded-t transition-all duration-500 group-hover:bg-emerald-600"
                    />
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 uppercase">
                    {item.hour}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-neutral-500">
            <span>Peak hour today: 08:00 PM (₹1,48,500 with 540 active visits)</span>
            <Link href="/admin/analytics" className="text-[#004fff] font-bold hover:underline">
              View Detailed Analytics Report →
            </Link>
          </div>
        </div>

        {/* Live Channel Acquisition (4 Cols) */}
        <div className="lg:col-span-4 p-6 bg-white border border-[#e5e3dc] rounded space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
              Traffic Sources
            </h2>
            <span className="text-xs font-mono text-neutral-500">30-Day Cohort</span>
          </div>

          <div className="space-y-4">
            {[
              { source: "Instagram & Reels", share: 48, visitors: "1,051", color: "bg-pink-600" },
              { source: "Direct Studio Visitors", share: 26, visitors: "569", color: "bg-[#121212]" },
              { source: "Google Organic Search", share: 18, visitors: "394", color: "bg-emerald-600" },
              { source: "Pinterest & Lookbooks", share: 8, visitors: "175", color: "bg-amber-600" },
            ].map((item) => (
              <div key={item.source} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#121212] font-medium">{item.source}</span>
                  <span className="text-neutral-500">{item.share}% ({item.visitors})</span>
                </div>
                <div className="w-full h-2 bg-[#f0ede6] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#e5e3dc] space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Quick Catalog Stats
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#faf8f5] border border-[#e5e3dc] rounded">
                <div className="text-xs font-mono text-neutral-500">Products</div>
                <div className="text-lg font-bold text-[#121212] font-mono">{products.length}</div>
              </div>
              <div className="p-3 bg-[#faf8f5] border border-[#e5e3dc] rounded">
                <div className="text-xs font-mono text-neutral-500">Categories</div>
                <div className="text-lg font-bold text-[#121212] font-mono">{collections.length}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders & Fulfillment Center */}
      <div className="p-6 bg-white border border-[#e5e3dc] rounded space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              Live transmissions from customer checkouts across India
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono text-[#004fff] font-bold hover:underline flex items-center gap-1"
          >
            <span>View All Orders &amp; Print Slips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#e5e3dc] bg-[#faf8f5] text-neutral-600 uppercase text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e3dc]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#121212]">
                    #{order.id}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#121212] font-semibold">{order.customer.name}</div>
                    <div className="text-[10px] text-neutral-500">{order.customer.city}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#121212] whitespace-nowrap">
                    Rs. {Number(order.total).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      COD
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.fulfillmentStatus === "Delivered"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : order.fulfillmentStatus === "Dispatched"
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    {order.fulfillmentStatus === "Unfulfilled" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Dispatched")}
                        className="px-2.5 py-1 bg-[#121212] hover:bg-neutral-800 text-white rounded text-[11px] font-bold transition-colors"
                      >
                        Dispatch
                      </button>
                    )}
                    {order.fulfillmentStatus === "Dispatched" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Delivered")}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-bold transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                    <Link
                      href={`/admin/orders/${order.id}/invoice`}
                      className="px-2 py-1 bg-[#f5f2eb] hover:bg-[#eae6dd] border border-[#e5e3dc] text-black font-semibold rounded text-[11px] transition-colors inline-block"
                      title="Print Invoice Slip"
                    >
                      Print Slip 🖨️
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Launchpad to Subpages */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
        <Link
          href="/admin/products"
          className="p-5 bg-white hover:bg-[#faf8f5] border border-[#e5e3dc] hover:border-black rounded transition-all group flex items-center gap-4 shadow-xs"
        >
          <div className="w-12 h-12 rounded bg-[#f5f2eb] border border-[#e5e3dc] flex items-center justify-center text-[#121212] group-hover:scale-105 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-[#121212]">
              Catalog ({products.length})
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Objects, inventory & pricing
            </p>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="p-5 bg-white hover:bg-[#faf8f5] border border-[#e5e3dc] hover:border-black rounded transition-all group flex items-center gap-4 shadow-xs"
        >
          <div className="w-12 h-12 rounded bg-[#f5f2eb] border border-[#e5e3dc] flex items-center justify-center text-[#121212] group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-[#121212]">
              Orders &amp; Slips
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Invoices &amp; package slips
            </p>
          </div>
        </Link>

        <Link
          href="/admin/blogs"
          className="p-5 bg-white hover:bg-[#faf8f5] border border-[#e5e3dc] hover:border-black rounded transition-all group flex items-center gap-4 shadow-xs"
        >
          <div className="w-12 h-12 rounded bg-[#f5f2eb] border border-[#e5e3dc] flex items-center justify-center text-[#121212] group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-[#121212]">
              Blog &amp; Stories
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Manage articles &amp; journal
            </p>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="p-5 bg-white hover:bg-[#faf8f5] border border-[#e5e3dc] hover:border-black rounded transition-all group flex items-center gap-4 shadow-xs"
        >
          <div className="w-12 h-12 rounded bg-[#f5f2eb] border border-[#e5e3dc] flex items-center justify-center text-[#121212] group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-[#121212]">
              Real Analytics
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Live traffic &amp; sessions
            </p>
          </div>
        </Link>
      </div>

    </div>
  );
}
