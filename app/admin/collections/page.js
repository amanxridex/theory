"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Layers,
  Plus,
  ExternalLink,
  Search,
  Eye,
  ShoppingBag,
} from "lucide-react";

export default function AdminCollectionsPage() {
  const { collections, products } = useStore();
  const [search, setSearch] = useState("");

  const filtered = collections.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.handle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e3dc]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-black">Admin</Link>
            <span>/</span>
            <span className="text-black font-semibold">Categories</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212] mt-1">
            Collections &amp; Categories ({collections.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/collections/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Category</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border border-[#e5e3dc] rounded flex items-center justify-between shadow-xs">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories & collections..."
            className="w-full bg-[#f5f2eb] border border-[#e5e3dc] rounded pl-9 pr-4 py-2 text-xs font-mono text-black placeholder:text-neutral-500 focus:outline-none focus:border-black focus:bg-white"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
          {filtered.length} categories active
        </span>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((collection) => {
          // Calculate active items matching this collection handle/title
          const count = collection.handle === "all-products"
            ? products.length
            : products.filter((p) => {
                const lowerType = (p.product_type || "").toLowerCase();
                const titleLower = collection.title.toLowerCase();
                return lowerType.includes(titleLower) || titleLower.includes(lowerType);
              }).length || collection.itemCount;

          return (
            <div
              key={collection.id}
              className="bg-white border border-[#e5e3dc] hover:border-black rounded overflow-hidden group transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="aspect-[16/9] w-full bg-neutral-100 relative overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono font-bold text-white">
                    {count} Objects
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-mono text-[#004fff] uppercase tracking-wider font-bold">
                    /collections/{collection.handle}
                  </div>
                  <h3 className="text-base font-bold uppercase text-[#121212] group-hover:underline transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-mono line-clamp-2 leading-relaxed">
                    {collection.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-5 py-3.5 bg-[#faf8f5] border-t border-[#e5e3dc] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">
                  Status: <strong className="text-emerald-700">Published</strong>
                </span>

                <Link
                  href={`/collections/${collection.handle}`}
                  target="_blank"
                  className="flex items-center gap-1 text-black font-semibold hover:underline transition-colors"
                >
                  <span>View in Store</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
