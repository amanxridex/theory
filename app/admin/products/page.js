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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e3dc]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-black">Admin</Link>
            <span>/</span>
            <span className="text-black font-semibold">Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212] mt-1">
            Products ({products.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white border border-[#e5e3dc] rounded flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        
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
            className="w-full bg-[#f5f2eb] border border-[#e5e3dc] rounded pl-9 pr-4 py-2 text-xs font-mono text-black placeholder:text-neutral-500 focus:outline-none focus:border-black focus:bg-white"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </div>

        {/* Category & Status Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex items-center gap-1.5 bg-[#f5f2eb] border border-[#e5e3dc] px-3 py-1.5 rounded text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-neutral-800 focus:outline-none cursor-pointer"
              aria-label="Filter by Category"
            >
              <option value="all">All Categories</option>
              {collections.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#f5f2eb] border border-[#e5e3dc] px-3 py-1.5 rounded text-xs font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-neutral-800 focus:outline-none cursor-pointer"
              aria-label="Filter by Status"
            >
              <option value="all">All Inventory</option>
              <option value="in-stock">In Stock</option>
              <option value="sold-out">Sold Out</option>
            </select>
          </div>

        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#e5e3dc] rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#e5e3dc] bg-[#faf8f5] text-neutral-600 uppercase text-[10px]">
                <th className="py-3 px-4 w-14">Media</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e3dc]">
              {paginated.map((product) => (
                <tr key={product.id} className="hover:bg-[#faf8f5] transition-colors group">
                  <td className="py-3 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-10 h-12 object-cover rounded border border-[#e5e3dc] bg-neutral-100"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#121212] group-hover:text-[#004fff] transition-colors line-clamp-1 max-w-sm">
                      {product.title}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      Handle: {product.handle}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">
                    {product.product_type || "Everyday Homeware"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.available
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {product.available ? "Active" : "Draft / Out"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">
                    {product.inventory !== undefined ? `${product.inventory} in stock` : "25 in stock"}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#121212] whitespace-nowrap">
                    Rs. {Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                    <Link
                      href={`/products/${product.handle}`}
                      target="_blank"
                      className="p-1.5 bg-[#f5f2eb] hover:bg-[#eae6dd] text-black rounded inline-flex items-center gap-1 transition-colors border border-[#e5e3dc]"
                      title="View live on customer storefront"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">View ↗</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id, product.title)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded inline-flex items-center gap-1 transition-colors"
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
          <div className="p-4 border-t border-[#e5e3dc] flex items-center justify-between text-xs font-mono text-neutral-500 bg-[#faf8f5]">
            <div>
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} objects
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-white border border-[#e5e3dc] rounded text-black disabled:opacity-30 transition-opacity"
              >
                Previous
              </button>
              <span className="px-2 font-bold text-black">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-white border border-[#e5e3dc] rounded text-black disabled:opacity-30 transition-opacity"
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
