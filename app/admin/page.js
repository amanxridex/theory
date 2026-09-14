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
    { hour: "NOW", visitors: analytics.activeVisitors * 12, revenue: 76500 },
  ];

  const maxRevenue = Math.max(...trafficData.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#004fff] font-bold">
              THE COZY THEORY CONTROL CENTER
            </span>
            <span className="text-xs font-mono text-neutral-500">•</span>
            <span className="text-xs font-mono text-emerald-400">All Systems Normal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Store Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#181d28] border border-[#262d3e] rounded-md p-1 text-xs font-mono">
            {["today", "7d", "30d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded capitalize transition-colors ${
                  timeRange === range
                    ? "bg-[#004fff] text-white font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {range === "today" ? "Today" : range === "7d" ? "Last 7 Days" : "Last 30 Days"}
              </button>
            ))}
          </div>

          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#004fff] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Sales */}
        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-3">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>TOTAL SALES</span>
            <span className="p-2 bg-[#1b2230] rounded-lg text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              Rs. {salesFormatted}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs previous period</span>
            </div>
          </div>
        </div>

        {/* Total Store Visitors */}
        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-3">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>ONLINE STORE SESSIONS</span>
            <span className="p-2 bg-[#1b2230] rounded-lg text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {analytics.todayVisitors.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong>{analytics.activeVisitors}</strong> visitors browsing right now</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-3">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>TOTAL ORDERS</span>
            <span className="p-2 bg-[#1b2230] rounded-lg text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {analytics.totalOrders}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mt-1">
              <span className="text-amber-400 font-bold">{orders.filter((o) => o.fulfillmentStatus === "Unfulfilled").length} pending</span>
              <span>fulfillment</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-3">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>CONVERSION RATE</span>
            <span className="p-2 bg-[#1b2230] rounded-lg text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {analytics.conversionRate}%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mt-1">
              <span>AOV:</span>
              <strong className="text-white">Rs. {analytics.averageOrderValue}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Revenue & Real-Time Traffic Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales & Traffic Trend (8 Cols) */}
        <div className="lg:col-span-8 p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Sales & Traffic Velocity (Hourly Breakdown)
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Real-time checkout volume and concurrent shopper activity today
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#004fff]"></span>
                <span className="text-neutral-300">Revenue (₹)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-400"></span>
                <span className="text-neutral-300">Visitors</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visual Representation */}
          <div className="pt-4 h-64 flex items-end justify-between gap-3 border-b border-[#222733] pb-4">
            {trafficData.map((item, i) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center bg-[#202737] p-1.5 rounded border border-[#2f394e] whitespace-nowrap pointer-events-none mb-1 shadow-lg">
                    <div>Rs. {item.revenue.toLocaleString()}</div>
                    <div className="text-emerald-400">{item.visitors} sessions</div>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full max-w-[36px] flex items-end gap-1 h-full justify-center">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-[#004fff] rounded-t transition-all duration-500 group-hover:bg-blue-400"
                    />
                    <div
                      style={{ height: `${Math.min(100, Math.round((item.visitors / 600) * 100))}%` }}
                      className="w-full bg-emerald-500/80 rounded-t transition-all duration-500 group-hover:bg-emerald-400"
                    />
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400 uppercase">
                    {item.hour}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
            <span>Peak hour today: 08:00 PM (₹1,48,500 with 540 active visits)</span>
            <Link href="/admin/analytics" className="text-[#004fff] hover:underline">
              View Detailed Analytics Report →
            </Link>
          </div>
        </div>

        {/* Live Channel Acquisition (4 Cols) */}
        <div className="lg:col-span-4 p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Traffic Sources
            </h2>
            <span className="text-xs font-mono text-neutral-400">30-Day Cohort</span>
          </div>

          <div className="space-y-4">
            {[
              { source: "Instagram & Reels", share: 48, visitors: "1,051", color: "bg-pink-500" },
              { source: "Direct Studio Visitors", share: 26, visitors: "569", color: "bg-[#004fff]" },
              { source: "Google Organic Search", share: 18, visitors: "394", color: "bg-emerald-500" },
              { source: "Pinterest & Lookbooks", share: 8, visitors: "175", color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.source} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white">{item.source}</span>
                  <span className="text-neutral-400">{item.share}% ({item.visitors})</span>
                </div>
                <div className="w-full h-2 bg-[#1e2330] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#222733] space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Quick Catalog Stats
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#181d28] border border-[#262c3a] rounded-lg">
                <div className="text-xs font-mono text-neutral-400">Products</div>
                <div className="text-lg font-bold text-white font-mono">{products.length}</div>
              </div>
              <div className="p-3 bg-[#181d28] border border-[#262c3a] rounded-lg">
                <div className="text-xs font-mono text-neutral-400">Categories</div>
                <div className="text-lg font-bold text-white font-mono">{collections.length}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders & Fulfillment Center */}
      <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-white">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Live transmissions from customer checkouts across India
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono text-[#004fff] hover:underline flex items-center gap-1"
          >
            <span>View All Orders Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#222733] text-neutral-400 uppercase text-[10px]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2330]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#181c26] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    #{order.id}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white font-medium">{order.customer.name}</div>
                    <div className="text-[10px] text-neutral-500">{order.customer.city}</div>
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
                        Mark Delivered
                      </button>
                    )}
                    <Link
                      href={`/order-confirmation?order_id=${order.id}&amount=${order.total}`}
                      target="_blank"
                      className="px-2 py-1 bg-[#222836] hover:bg-[#2b3345] text-neutral-300 rounded text-[11px] transition-colors inline-block"
                    >
                      Receipt ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Launchpad to Subpages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Link
          href="/admin/products"
          className="p-5 bg-[#14171f] hover:bg-[#181c26] border border-[#222733] hover:border-[#004fff] rounded-xl transition-all group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-[#004fff] group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-white group-hover:text-[#004fff] transition-colors">
              Manage Catalog ({products.length})
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Upload new objects, adjust inventory & pricing
            </p>
          </div>
        </Link>

        <Link
          href="/admin/collections"
          className="p-5 bg-[#14171f] hover:bg-[#181c26] border border-[#222733] hover:border-[#004fff] rounded-xl transition-all group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-white group-hover:text-purple-400 transition-colors">
              Categories & Collections ({collections.length})
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Create categories & group products by theme
            </p>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="p-5 bg-[#14171f] hover:bg-[#181c26] border border-[#222733] hover:border-[#004fff] rounded-xl transition-all group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-white group-hover:text-emerald-400 transition-colors">
              Traffic & Visitor Metrics
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Real-time map, conversions, device breakdown
            </p>
          </div>
        </Link>
      </div>

    </div>
  );
}
