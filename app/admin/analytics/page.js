"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Users,
  Eye,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  ArrowUpRight,
  Globe,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const { analytics, orders } = useStore();
  const [period, setPeriod] = useState("today");

  const visitorTimeline = [
    { time: "06 AM", sessions: 42, live: 8 },
    { time: "08 AM", sessions: 98, live: 14 },
    { time: "10 AM", sessions: 184, live: 21 },
    { time: "12 PM", sessions: 310, live: 26 },
    { time: "02 PM", sessions: 420, live: 29 },
    { time: "04 PM", sessions: 540, live: 32 },
    { time: "06 PM", sessions: 680, live: 36 },
    { time: "08 PM", sessions: 890, live: 42 },
    { time: "NOW", sessions: 340, live: analytics.activeVisitors },
  ];

  const maxSessions = Math.max(...visitorTimeline.map((v) => v.sessions));

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <span>/</span>
            <span className="text-white">Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Store Traffic & Visitor Metrics
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-[#181d28] border border-[#262d3e] rounded-md p-1 text-xs font-mono">
          {["today", "7d", "30d", "90d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded uppercase transition-colors ${
                period === p
                  ? "bg-[#004fff] text-white font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Visitor Pulse Banner */}
      <div className="p-6 bg-gradient-to-r from-[#141b2a] via-[#14171f] to-[#141b2a] border border-[#263148] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              REAL-TIME VISITOR TRANSMISSION
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-black text-white font-mono">
            {analytics.activeVisitors}
            <span className="text-base text-neutral-400 font-normal ml-3">people on the site right now</span>
          </div>
          <p className="text-xs text-neutral-400 font-mono">
            Tracking customer journeys across the desktop and mobile catalog
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#1c2230] p-4 rounded-xl border border-[#2c374d]">
          <div className="text-right font-mono">
            <div className="text-xs text-neutral-400">Total Today</div>
            <div className="text-xl font-bold text-white">
              {analytics.todayVisitors.toLocaleString()} Visitors
            </div>
            <div className="text-[11px] text-emerald-400 font-bold">
              {analytics.todaySessions.toLocaleString()} Sessions
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Traffic KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>TOTAL PAGE VIEWS</span>
            <Eye className="w-4 h-4 text-[#004fff]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            8,420
          </div>
          <div className="text-xs text-emerald-400 font-mono">
            3.84 views per session
          </div>
        </div>

        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>AVG. SESSION DURATION</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            3m 48s
          </div>
          <div className="text-xs text-emerald-400 font-mono">
            +32s vs last week
          </div>
        </div>

        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>BOUNCE RATE</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            26.2%
          </div>
          <div className="text-xs text-emerald-400 font-mono">
            Top tier engagement (ideal &lt;35%)
          </div>
        </div>

        <div className="p-5 bg-[#14171f] border border-[#222733] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
            <span>CONVERSION RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            3.42%
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            {orders.length} total orders recorded
          </div>
        </div>

      </div>

      {/* Hourly Traffic Chart */}
      <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Visitors & Sessions Over Time
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Hourly distribution of store traffic
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Live Peak: Evening 6 PM - 10 PM IST</span>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="pt-6 h-56 flex items-end justify-between gap-3 border-b border-[#222733] pb-4">
          {visitorTimeline.map((item, idx) => {
            const height = Math.round((item.sessions / maxSessions) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center bg-[#202737] p-1.5 rounded border border-[#2f394e] whitespace-nowrap mb-1">
                  <div>{item.sessions} sessions</div>
                  <div className="text-emerald-400">{item.live} active</div>
                </div>

                <div
                  style={{ height: `${height}%` }}
                  className="w-full max-w-[42px] bg-gradient-to-t from-[#004fff] to-blue-400 rounded-t transition-all group-hover:to-blue-300"
                />

                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Devices & Geographic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Device Breakdown (6 Cols) */}
        <div className="lg:col-span-6 p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Device Breakdown
            </h2>
            <span className="text-xs font-mono text-neutral-400">Mobile First</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Mobile Devices (iPhone & Android)</span>
                </span>
                <span className="text-white font-bold">78% (1,708 sessions)</span>
              </div>
              <div className="w-full h-2.5 bg-[#1b202c] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-400" />
                  <span>Desktop (Chrome, Safari, Edge)</span>
                </span>
                <span className="text-white font-bold">18% (394 sessions)</span>
              </div>
              <div className="w-full h-2.5 bg-[#1b202c] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "18%" }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white flex items-center gap-2">
                  <Tablet className="w-4 h-4 text-purple-400" />
                  <span>Tablets & iPads</span>
                </span>
                <span className="text-white font-bold">4% (88 sessions)</span>
              </div>
              <div className="w-full h-2.5 bg-[#1b202c] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "4%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Distribution (6 Cols) */}
        <div className="lg:col-span-6 p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Visitors by Indian Region
            </h2>
            <span className="text-xs font-mono text-neutral-400">Domestic India</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { region: "Maharashtra (Mumbai, Pune)", pct: "38%", visits: "832" },
              { region: "Delhi NCR (Gurgaon, Noida)", pct: "24%", visits: "525" },
              { region: "Karnataka (Bengaluru)", pct: "16%", visits: "350" },
              { region: "Tamil Nadu (Chennai)", pct: "9%", visits: "197" },
              { region: "West Bengal & Gujarat", pct: "8%", visits: "175" },
              { region: "Other States & UTs", pct: "5%", visits: "111" },
            ].map((r) => (
              <div key={r.region} className="flex justify-between items-center py-1.5 border-b border-[#1e2330]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#004fff]" />
                  <span className="text-white">{r.region}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white">{r.pct}</span>
                  <span className="text-neutral-500 text-[11px] ml-2">({r.visits})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Visited Store Pages */}
      <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white">
          Top Viewed Pages & PDPs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#222733] text-neutral-400 uppercase text-[10px]">
                <th className="py-2.5 px-4">Page Route</th>
                <th className="py-2.5 px-4">Page Title</th>
                <th className="py-2.5 px-4">Unique Visitors</th>
                <th className="py-2.5 px-4">Avg. Time On Page</th>
                <th className="py-2.5 px-4 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2330]">
              {[
                { path: "/", title: "Homepage // Living Objects", visits: "3,840", time: "2m 14s" },
                { path: "/collections/all-products", title: "All Objects Archive", visits: "1,920", time: "3m 40s" },
                { path: "/products/tt-251-ceramic-chicken-condiment-jar-with-spoon", title: "Ceramic Chicken Condiment Jar", visits: "860", time: "1m 55s" },
                { path: "/collections/everyday-ceramics", title: "Everyday Ceramics Collection", visits: "710", time: "2m 30s" },
                { path: "/collections/home-linen", title: "Home Linen & Bedding", visits: "540", time: "2m 10s" },
                { path: "/checkout", title: "Express 1-Click Checkout", visits: "240", time: "1m 40s" },
              ].map((p) => (
                <tr key={p.path} className="hover:bg-[#181c26] transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-400">
                    {p.path}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {p.title}
                  </td>
                  <td className="py-3 px-4 text-neutral-300 font-bold">
                    {p.visits}
                  </td>
                  <td className="py-3 px-4 text-neutral-400">
                    {p.time}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={p.path}
                      target="_blank"
                      className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1"
                    >
                      <span>View ↗</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
