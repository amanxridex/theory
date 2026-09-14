"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  DollarSign,
  Tag,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function AddNewProductPage() {
  const router = useRouter();
  const { collections, addProduct } = useStore();

  const [formData, setFormData] = useState({
    title: "",
    handle: "",
    description: "",
    product_type: "Tableware & Dining",
    price: "1850",
    compare_at_price: "2450",
    cost: "950",
    inventory: "30",
    sku: "TCT-CER-01",
    available: true,
    tags: "Curated Living, Artisanal Stoneware, New Drop",
    images: [
      "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product_79-01.png?v=1784392136",
      "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product9-01.png?v=1784242846",
    ],
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);

  // Auto-generate slug when title changes (if handle hasn't been manually detached)
  const handleTitleChange = (val) => {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      handle: prev.handle === "" || prev.handle === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ? autoSlug : prev.handle,
    }));
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a product title.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const tagList = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const saved = addProduct({
        ...formData,
        tags: tagList,
      });

      setIsSubmitting(false);
      setCreatedProduct(saved);
    }, 600);
  };

  // Preset sample studio images to click-and-add
  const imagePresets = [
    { title: "Ceramic Pitcher", url: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product_79-01.png?v=1784392136" },
    { title: "Chicken Condiment Jar", url: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product9-01.png?v=1784242846" },
    { title: "Bird Section Bowl", url: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/TT75REDDIVIDEDBOWL.png?v=1788126151" },
    { title: "Washed Cotton Linen", url: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/DSC00422_eee0df88-82cb-49a4-818d-182c056960b2.jpg?v=1740976529" },
    { title: "Sculptural Ceramic Vase", url: "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/ChatGPTImageJul18_2026_11_18_29PM.png?v=1784397111" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-[#1b202c] hover:bg-[#232938] text-neutral-300 hover:text-white rounded-lg transition-colors"
            aria-label="Back to products list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#004fff] font-bold">
              Theory Product Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
              Add New Product
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-[#1b202c] hover:bg-[#232938] text-neutral-300 text-xs font-mono rounded-md transition-colors"
          >
            Discard
          </Link>
          <button
            onClick={handleSaveProduct}
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#004fff] hover:bg-blue-600 text-white text-xs font-bold font-mono uppercase tracking-wider rounded-md transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Publishing Object..." : "Save & Publish"}
          </button>
        </div>
      </div>

      {/* Success Notification Modal */}
      {createdProduct && (
        <div className="p-6 bg-[#13231c] border border-emerald-700/60 rounded-xl space-y-4 animate-in fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Product Successfully Published to THE COZY THEORY!
                </h3>
                <p className="text-xs font-mono text-emerald-300 mt-0.5">
                  &ldquo;{createdProduct.title}&rdquo; is now live and browseable on the customer storefront.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCreatedProduct(null)}
              className="text-xs font-mono text-neutral-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/products/${createdProduct.handle}`}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase rounded-md transition-colors shadow"
            >
              <span>View Live Product Page ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/products"
              className="px-4 py-2 bg-[#1b202c] hover:bg-[#252c3c] text-neutral-200 text-xs font-mono rounded-md transition-colors"
            >
              Back to Products List
            </Link>

            <button
              onClick={() => {
                setCreatedProduct(null);
                setFormData({
                  title: "",
                  handle: "",
                  description: "",
                  product_type: "Everyday Ceramics",
                  price: "1650",
                  compare_at_price: "2200",
                  cost: "850",
                  inventory: "25",
                  sku: "TCT-NEW",
                  available: true,
                  tags: "New Drop",
                  images: ["https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product9-01.png?v=1784242846"],
                });
              }}
              className="px-4 py-2 bg-[#1b202c] hover:bg-[#252c3c] text-neutral-200 text-xs font-mono rounded-md transition-colors"
            >
              Add Another Product
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Form Left (7 Cols), Sidebar Right (5 Cols) */}
      <form onSubmit={handleSaveProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Title, Description, Media, Pricing */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Title & Description */}
          <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="E.g. Scalloped Ceramic Serving Bowl in Olive Glaze"
                className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
                Custom URL Handle / Slug
              </label>
              <div className="flex items-center bg-[#1b202c] border border-[#2d3446] rounded-md px-3 text-xs font-mono text-neutral-400">
                <span>/products/</span>
                <input
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  placeholder="scalloped-ceramic-serving-bowl"
                  className="w-full bg-transparent py-2.5 text-white focus:outline-none pl-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
                Description & Craftsmanship Details
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the tactile texture, artisanal stoneware material, glaze finish, and ritual purpose of this piece..."
                className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md p-4 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff] transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Card: Media & Images */}
          <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Media & Product Imagery
                </h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Primary photo appears in grid, secondary photo on hover flip
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {formData.images.length} Images
              </span>
            </div>

            {/* Existing Image Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg border border-[#282f40] bg-[#1a1f2b] overflow-hidden group"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-md"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-[#004fff] text-white text-[9px] font-mono font-bold rounded uppercase">
                      Primary
                    </span>
                  )}
                  {idx === 1 && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-[#252c3c] text-white text-[9px] font-mono font-bold rounded uppercase">
                      Hover Flip
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Add Image by URL Input */}
            <div className="pt-3 border-t border-[#222733] space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block">
                Add Image from URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="flex-1 bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff]"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-[#222836] hover:bg-[#2c3447] text-white rounded-md text-xs font-mono transition-colors"
                >
                  Add Media
                </button>
              </div>

              {/* Presets picker */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                  Or pick sample studio image:
                </span>
                <div className="flex flex-wrap gap-2">
                  {imagePresets.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => {
                        if (!formData.images.includes(preset.url)) {
                          setFormData((prev) => ({ ...prev, images: [...prev.images, preset.url] }));
                        }
                      }}
                      className="px-2.5 py-1 bg-[#1b202c] hover:bg-[#252c3c] border border-[#2d3446] rounded text-[11px] font-mono text-neutral-300 transition-colors"
                    >
                      + {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card: Pricing */}
          <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Pricing (INR ₹)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
                  Price (Selling) *
                </label>
                <div className="flex items-center bg-[#1b202c] border border-[#2d3446] rounded-md px-3 text-xs font-mono text-white">
                  <span className="text-neutral-500">₹</span>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-transparent py-2.5 pl-2 text-white focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
                  Compare-at Price
                </label>
                <div className="flex items-center bg-[#1b202c] border border-[#2d3446] rounded-md px-3 text-xs font-mono text-white">
                  <span className="text-neutral-500">₹</span>
                  <input
                    type="number"
                    value={formData.compare_at_price}
                    onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
                    className="w-full bg-transparent py-2.5 pl-2 text-neutral-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
                  Cost per Item
                </label>
                <div className="flex items-center bg-[#1b202c] border border-[#2d3446] rounded-md px-3 text-xs font-mono text-white">
                  <span className="text-neutral-500">₹</span>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full bg-transparent py-2.5 pl-2 text-neutral-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Profit margin summary */}
            {formData.price && formData.cost && (
              <div className="p-3 bg-[#181d28] border border-[#262c3a] rounded-lg text-xs font-mono flex justify-between items-center text-neutral-400">
                <span>Calculated Profit Margin:</span>
                <span className="text-emerald-400 font-bold">
                  ₹{(Number(formData.price) - Number(formData.cost)).toFixed(2)} ({(((Number(formData.price) - Number(formData.cost)) / Number(formData.price)) * 100).toFixed(1)}%)
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Organization, Inventory, Status */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card: Status & Visibility */}
          <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Status & Publishing
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-[#1b202c] border border-[#2d3446] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="accent-[#004fff] w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase font-mono">
                    {formData.available ? "Active & In Stock" : "Draft / Out of Stock"}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Live on customer catalog and discoverable in search
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Card: Category & Collection */}
          <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Category Selection
              </h2>
              <Link href="/admin/collections/new" className="text-xs font-mono text-[#004fff] hover:underline">
                + New
              </Link>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                Primary Product Type *
              </label>
              <select
                value={formData.product_type}
                onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#004fff]"
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.title} className="bg-[#1b202c]">
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                Studio Tags (Comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Curated Living, Ceramic, Stoneware"
                className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#004fff]"
              />
            </div>
          </div>

          {/* Card: Inventory */}
          <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Inventory & Tracking
            </h2>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                Quantity Available in Studio
              </label>
              <input
                type="number"
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#004fff]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-400 block mb-1.5">
                SKU (Stock Keeping Unit)
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#004fff]"
              />
            </div>
          </div>

          {/* Bottom Save Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#004fff] hover:bg-blue-600 text-white text-xs font-bold font-mono uppercase tracking-widest rounded-lg transition-colors shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Save Product to Catalog"}
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
