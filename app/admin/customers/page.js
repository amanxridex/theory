"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Users, Search, MapPin, Mail, Award, ArrowRight } from "lucide-react";

export default function AdminCustomersPage() {
  const { customers: dbCustomers } = useStore();
  const [search, setSearch] = useState("");

  const defaultCustomers = [
    {
      id: "cust-01",
      name: "Aarav Mehta",
      email: "aarav.mehta@gmail.com",
      city: "Mumbai, Maharashtra",
      orders: 4,
      totalSpent: 14250,
      tier: "VIP Collector",
      lastOrder: "Today",
    },
    {
      id: "cust-02",
      name: "Diya Narang",
      email: "diya.narang@outlook.com",
      city: "Bengaluru, Karnataka",
      orders: 3,
      totalSpent: 11800,
      tier: "VIP Collector",
      lastOrder: "Today",
    },
    {
      id: "cust-03",
      name: "Rohan Varma",
      email: "rohan.v@gmail.com",
      city: "New Delhi, NCR",
      orders: 2,
      totalSpent: 5600,
      tier: "Studio Member",
      lastOrder: "Today",
    },
    {
      id: "cust-04",
      name: "Ananya Deshmukh",
      email: "ananya.d@gmail.com",
      city: "Pune, Maharashtra",
      orders: 5,
      totalSpent: 18900,
      tier: "Founding Collector",
      lastOrder: "Yesterday",
    },
    {
      id: "cust-05",
      name: "Vikram Sengupta",
      email: "vikram.s@yahoo.co.in",
      city: "Kolkata, West Bengal",
      orders: 1,
      totalSpent: 1950,
      tier: "New Collector",
      lastOrder: "Yesterday",
    },
    {
      id: "cust-06",
      name: "Kavya Sundaram",
      email: "kavya.sundaram@gmail.com",
      city: "Chennai, Tamil Nadu",
      orders: 3,
      totalSpent: 8700,
      tier: "Studio Member",
      lastOrder: "3 days ago",
    },
  ];

  const customers =
    dbCustomers && dbCustomers.length > 0
      ? dbCustomers.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          city: c.city || "India",
          orders: c.orders_count || 1,
          totalSpent: parseFloat(c.total_spent) || 0,
          tier: (parseFloat(c.total_spent) || 0) > 10000 ? "VIP Collector" : "Studio Member",
          lastOrder: "Recent",
        }))
      : defaultCustomers;

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <span>/</span>
            <span className="text-white">Collectors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Collectors & Customers ({customers.length})
          </h1>
        </div>

        <div className="text-xs font-mono text-neutral-400">
          Total Lifetime Spend: <strong className="text-emerald-400">Rs. 61,200</strong>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-[#14171f] border border-[#222733] rounded-xl flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by collector name, email, or city..."
            className="w-full bg-[#1b202c] border border-[#2c3344] rounded-md pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff]"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#14171f] border border-[#222733] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#222733] bg-[#11131a] text-neutral-400 uppercase text-[10px]">
                <th className="py-3 px-4">Collector</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Status Tier</th>
                <th className="py-3 px-4 text-right">Last Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2330]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#181c26] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-[10px] text-neutral-500">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#004fff]" />
                      <span>{c.city}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">
                    {c.orders} orders
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    Rs. {c.totalSpent.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.tier.includes("Founding")
                          ? "bg-purple-950 text-purple-400 border border-purple-800"
                          : c.tier.includes("VIP")
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : "bg-blue-950 text-blue-400 border border-blue-800"
                      }`}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-neutral-400">
                    {c.lastOrder}
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
