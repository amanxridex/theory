"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  ArrowLeft,
  Layers,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

export default function NewCollectionPage() {
  const router = useRouter();
  const { addCollection } = useStore();

  const [formData, setFormData] = useState({
    title: "",
    handle: "",
    description: "",
    image: "https://thehomedefiner.com/cdn/shop/files/TT-285_1.jpg?v=1733303728",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCollection, setCreatedCollection] = useState(null);

  const handleTitleChange = (val) => {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      handle: prev.handle === "" || prev.handle === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ? autoSlug : prev.handle,
    }));
  };

  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a category title.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const saved = addCollection(formData);
      setIsSubmitting(false);
      setCreatedCollection(saved);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/collections"
            className="p-2 bg-[#1b202c] hover:bg-[#232938] text-neutral-300 hover:text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#004fff] font-bold">
              Shopify Category Builder
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
              Create New Category
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/collections"
            className="px-4 py-2 bg-[#1b202c] hover:bg-[#232938] text-neutral-300 text-xs font-mono rounded-md transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSaveCollection}
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#004fff] hover:bg-blue-600 text-white text-xs font-bold font-mono uppercase tracking-wider rounded-md transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Save Category"}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {createdCollection && (
        <div className="p-6 bg-[#13231c] border border-emerald-700/60 rounded-xl space-y-4 animate-in fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Category &ldquo;{createdCollection.title}&rdquo; Successfully Created!
                </h3>
                <p className="text-xs font-mono text-emerald-300 mt-0.5">
                  Available in the product editor dropdown and live at /collections/{createdCollection.handle}.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCreatedCollection(null)}
              className="text-xs font-mono text-neutral-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/collections/${createdCollection.handle}`}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase rounded-md transition-colors shadow"
            >
              <span>View Live Category Page ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-[#1b202c] hover:bg-[#252c3c] text-neutral-200 text-xs font-mono rounded-md transition-colors"
            >
              Add Product to this Category
            </Link>

            <Link
              href="/admin/collections"
              className="px-4 py-2 bg-[#1b202c] hover:bg-[#252c3c] text-neutral-200 text-xs font-mono rounded-md transition-colors"
            >
              Back to Categories
            </Link>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSaveCollection} className="space-y-6">
        
        {/* Title, Slug & Description */}
        <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
              Category Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="E.g. Ambient Lighting & Sconces"
              className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
              Category Handle / URL Slug
            </label>
            <div className="flex items-center bg-[#1b202c] border border-[#2d3446] rounded-md px-3 text-xs font-mono text-neutral-400">
              <span>/collections/</span>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                placeholder="ambient-lighting-sconces"
                className="w-full bg-transparent py-2.5 text-white focus:outline-none pl-1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1.5">
              Category Description (Editorial Manifesto)
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the aesthetic theme and curate what living spaces this collection complements..."
              className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md p-4 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff] transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* Banner Image */}
        <div className="p-6 bg-[#14171f] border border-[#222733] rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Category Banner Image
            </h2>
            <span className="text-xs font-mono text-neutral-400">Preview Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 aspect-[16/9] bg-[#1b202c] rounded-lg overflow-hidden border border-[#2d3446]">
              <img
                src={formData.image}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full bg-[#1b202c] border border-[#2d3446] rounded-md px-3 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff]"
                />
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                  Or pick preset studio banner:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {[
                    { label: "Stoneware Dining", url: "https://thehomedefiner.com/cdn/shop/files/DD-96_1.jpg?v=1733303710" },
                    { label: "Terracotta Vessels", url: "https://thehomedefiner.com/cdn/shop/files/TT-285_1.jpg?v=1733303728" },
                    { label: "Washed Cotton", url: "https://thehomedefiner.com/cdn/shop/files/THD383_1.jpg?v=1733303800" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: p.url })}
                      className="px-2.5 py-1 bg-[#1b202c] hover:bg-[#252c3c] border border-[#2d3446] rounded text-[11px] text-neutral-300"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#004fff] hover:bg-blue-600 text-white text-xs font-bold font-mono uppercase tracking-widest rounded-lg transition-colors shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Save Category & Publish"}
          </button>
        </div>

      </form>

    </div>
  );
}
