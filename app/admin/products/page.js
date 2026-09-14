"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Trash2,
  Package,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, collections, deleteProduct } = useStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // all, in-stock, sold-out
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.handle.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (categoryFilter !== "all") {
      const lowerType = (p.product_type || "").toLowerCase();
      const lowerFilter = categoryFilter.toLowerCase();
      if (!lowerType.includes(lowerFilter)) return false;
    }

    if (statusFilter === "in-stock" && !p.available) return false;
    if (statusFilter === "sold-out" && p.available) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginated = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to remove "${title}" from the store catalog?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <span>/</span>
            <span className="text-white">Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Products ({products.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#004fff] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-[#14171f] border border-[#222733] rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, SKU, or tags..."
            className="w-full bg-[#1b202c] border border-[#2c3344] rounded-md pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff]"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>

        {/* Category & Status Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex items-center gap-1.5 bg-[#1b202c] border border-[#2c3344] px-3 py-1.5 rounded-md text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-neutral-300 focus:outline-none cursor-pointer"
              aria-label="Filter by Category"
            >
              <option value="all" className="bg-[#1b202c]">All Categories</option>
              {collections.map((c) => (
                <option key={c.id} value={c.title} className="bg-[#1b202c]">
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#1b202c] border border-[#2c3344] px-3 py-1.5 rounded-md text-xs font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-neutral-300 focus:outline-none cursor-pointer"
              aria-label="Filter by Status"
            >
              <option value="all" className="bg-[#1b202c]">All Inventory</option>
              <option value="in-stock" className="bg-[#1b202c]">In Stock</option>
              <option value="sold-out" className="bg-[#1b202c]">Sold Out</option>
            </select>
          </div>

        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#14171f] border border-[#222733] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#222733] bg-[#11131a] text-neutral-400 uppercase text-[10px]">
                <th className="py-3 px-4 w-14">Media</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2330]">
              {paginated.map((product) => (
                <tr key={product.id} className="hover:bg-[#181c26] transition-colors group">
                  <td className="py-3 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-10 h-12 object-cover rounded border border-[#282f40] bg-[#1a1f2b]"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white group-hover:text-[#004fff] transition-colors line-clamp-1 max-w-sm">
                      {product.title}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      Handle: {product.handle}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-300">
                    {product.product_type || "Everyday Homeware"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.available
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}
                    >
                      {product.available ? "Active" : "Draft / Out"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-300">
                    {product.inventory !== undefined ? `${product.inventory} in stock` : "25 in stock"}
                  </td>
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                    Rs. {Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                    <Link
                      href={`/products/${product.handle}`}
                      target="_blank"
                      className="p-1.5 bg-[#1b202c] hover:bg-[#232938] text-neutral-300 hover:text-white rounded inline-flex items-center gap-1 transition-colors"
                      title="View live on customer storefront"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px]">View ↗</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id, product.title)}
                      className="p-1.5 bg-[#261519] hover:bg-[#3d1a22] text-rose-400 hover:text-rose-300 rounded inline-flex items-center gap-1 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-neutral-500 font-mono">
                    No products found matching &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#222733] flex items-center justify-between text-xs font-mono text-neutral-400">
            <div>
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} objects
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-[#1b202c] border border-[#2c3344] rounded text-white disabled:opacity-30 transition-opacity"
              >
                Previous
              </button>
              <span className="px-2 font-bold text-white">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-[#1b202c] border border-[#2c3344] rounded text-white disabled:opacity-30 transition-opacity"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
