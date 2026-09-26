"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import {
  Settings,
  Sparkles,
  Save,
  Check,
  RefreshCw,
  Eye,
  Megaphone,
  FileText,
  Compass,
  Plus,
  Trash2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { storeSettings, updateStoreSettings } = useStore();

  const [formData, setFormData] = useState({
    brand_name: "THE COZY THEORY",
    brand_tagline: "STAY COZY, STAY YOU",
    header_story_label: "Our Story",
    header_tagline: "",
    show_header_tagline: false,
    about_title: "THE COZY THEORY",
    about_tagline: "STAY COZY, STAY YOU",
    about_description:
      "The Cozy Theory curates everyday objects, dining accents, and soft furnishings that transform your living space into a sanctuary of warmth, texture, and individual expression. We believe in everyday rituals elevated by honest materials.",
    footer_newsletter_title: "Join The Cozy Theory Collector List",
    footer_newsletter_text:
      "Be first to gain access to limited seasonal drops, archival ceramics, and private offers.",
    footer_tagline:
      "Stay cozy, stay you. The Cozy Theory crafts everyday homeware, everyday ceramics, and pure linen for warm living spaces.",
    announcements: [
      "FREE SHIPPING ABOVE 9999/-",
      "50% REFUND IF DAMAGED",
      "THE COZY THEORY // ARTISANAL HOMEWARE",
      "100% HANDCRAFTED STONEWARE",
    ],
  });

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("brand");

  // Sync with store settings when loaded
  useEffect(() => {
    if (storeSettings) {
      setFormData({
        brand_name: storeSettings.brand_name || "THE COZY THEORY",
        brand_tagline: storeSettings.brand_tagline || "STAY COZY, STAY YOU",
        header_story_label: storeSettings.header_story_label || "Our Story",
        header_tagline: storeSettings.header_tagline || "",
        show_header_tagline: Boolean(storeSettings.show_header_tagline),
        about_title: storeSettings.about_title || "THE COZY THEORY",
        about_tagline: storeSettings.about_tagline || "STAY COZY, STAY YOU",
        about_description:
          storeSettings.about_description ||
          "The Cozy Theory curates everyday objects, dining accents, and soft furnishings that transform your living space into a sanctuary of warmth, texture, and individual expression. We believe in everyday rituals elevated by honest materials.",
        footer_newsletter_title:
          storeSettings.footer_newsletter_title || "Join The Cozy Theory Collector List",
        footer_newsletter_text:
          storeSettings.footer_newsletter_text ||
          "Be first to gain access to limited seasonal drops, archival ceramics, and private offers.",
        footer_tagline:
          storeSettings.footer_tagline ||
          "Stay cozy, stay you. The Cozy Theory crafts everyday homeware, everyday ceramics, and pure linen for warm living spaces.",
        announcements:
          Array.isArray(storeSettings.announcements) && storeSettings.announcements.length > 0
            ? storeSettings.announcements
            : [
                "FREE SHIPPING ABOVE 9999/-",
                "50% REFUND IF DAMAGED",
                "THE COZY THEORY // ARTISANAL HOMEWARE",
                "100% HANDCRAFTED STONEWARE",
              ],
      });
    }
  }, [storeSettings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAnnouncement = () => {
    const trimmed = newAnnouncement.trim().toUpperCase();
    if (!trimmed) return;
    setFormData((prev) => ({
      ...prev,
      announcements: [...prev.announcements, trimmed],
    }));
    setNewAnnouncement("");
  };

  const handleRemoveAnnouncement = (index) => {
    setFormData((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSaveSuccess(false);

    try {
      await updateStoreSettings(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Save settings error:", err);
      setErrorMsg("Failed to save to Supabase: " + (err.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e3dc] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#004fff] font-bold">
              Database Configuration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212] mt-1">
            Brand &amp; Store Settings
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-1">
            Manage your brand identity, footer bio, taglines, and live announcements in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#004fff] hover:bg-blue-600 text-white rounded text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved &amp; Live!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Brand Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-xs font-mono text-emerald-800 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>
              ✓ Brand and store settings saved successfully to Supabase. Frontend updated in real time!
            </span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded text-xs font-mono text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#e5e3dc] overflow-x-auto pb-1 text-xs font-mono uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("brand")}
          className={`px-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "brand"
              ? "border-[#004fff] text-[#004fff] font-bold"
              : "border-transparent text-neutral-500 hover:text-black"
          }`}
        >
          Brand &amp; About Bio
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`px-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "announcements"
              ? "border-[#004fff] text-[#004fff] font-bold"
              : "border-transparent text-neutral-500 hover:text-black"
          }`}
        >
          Announcement Bar ({formData.announcements.length})
        </button>
        <button
          onClick={() => setActiveTab("header")}
          className={`px-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "header"
              ? "border-[#004fff] text-[#004fff] font-bold"
              : "border-transparent text-neutral-500 hover:text-black"
          }`}
        >
          Header &amp; Tagline
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`px-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === "footer"
              ? "border-[#004fff] text-[#004fff] font-bold"
              : "border-transparent text-neutral-500 hover:text-black"
          }`}
        >
          Footer &amp; Newsletter
        </button>
      </div>

      {/* Tab 1: Brand & About Bio (User's Exact Screenshot Content) */}
      {activeTab === "brand" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Edit Form */}
          <div className="lg:col-span-7 bg-white border border-[#e5e3dc] p-6 space-y-6 rounded shadow-xs">
            <div className="border-b border-[#e5e3dc] pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                Brand Identity &amp; Bio
              </h2>
              <p className="text-xs font-mono text-neutral-500 mt-0.5">
                Edit the text that appears on the website footer and brand descriptions.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono font-bold focus:outline-none focus:border-black rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  name="brand_tagline"
                  value={formData.brand_tagline}
                  onChange={handleChange}
                  className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold">
                    About / Bio Description
                  </label>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {formData.about_description.length} characters
                  </span>
                </div>
                <textarea
                  name="about_description"
                  rows={5}
                  value={formData.about_description}
                  onChange={handleChange}
                  placeholder="Enter your brand narrative..."
                  className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black rounded leading-relaxed"
                />
                <p className="text-[11px] font-mono text-neutral-500 mt-1">
                  This narrative appears directly under THE COZY THEORY in the website footer.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e5e3dc] flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold tracking-wider transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Live Preview Panel (Looks exactly like the footer screenshot!) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-500 font-semibold">
              <Eye className="w-4 h-4 text-[#004fff]" />
              <span>Live Website Preview</span>
            </div>

            {/* Simulated Dark Footer Container */}
            <div className="bg-[#121212] text-[#fffdf8] p-6 sm:p-8 rounded-lg border border-neutral-800 shadow-xl space-y-4">
              <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-500 border-b border-neutral-800 pb-2">
                FOOTER DISPLAY PREVIEW
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-[-0.04em] text-2xl uppercase font-sans text-white">
                    {formData.brand_name || "THE COZY THEORY"}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#004fff] inline-block -mt-2"></span>
                </div>

                <span className="text-[10px] font-mono tracking-[0.25em] text-blue-400 uppercase font-bold block">
                  {formData.brand_tagline || "STAY COZY, STAY YOU"}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal pt-1">
                  {formData.about_description ||
                    "Enter your brand story to preview how it will appear to visitors."}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#faf8f2] border border-[#e5e3dc] rounded text-[11px] font-mono text-neutral-600 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-[#004fff] flex-shrink-0 mt-0.5" />
              <span>
                Any edit saved here updates the Supabase database and instantly syncs across all pages of the storefront without redeployment.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Announcement Bar */}
      {activeTab === "announcements" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e5e3dc] p-6 space-y-6 rounded shadow-xs">
            <div className="border-b border-[#e5e3dc] pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                Announcement Bar Marquee Messages
              </h2>
              <p className="text-xs font-mono text-neutral-500 mt-0.5">
                These phrases continuously scroll on the top vibrant blue bar of your website.
              </p>
            </div>

            {/* Add New Announcement */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAnnouncement();
                  }
                }}
                placeholder="e.g. FESTIVE DROPS LIVE // FREE SHIPPING ON 9999+"
                className="flex-1 bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded uppercase"
              />
              <button
                type="button"
                onClick={handleAddAnnouncement}
                className="px-4 py-2.5 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Message</span>
              </button>
            </div>

            {/* Announcements List */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                Active Marquee Phrases ({formData.announcements.length})
              </div>

              {formData.announcements.length === 0 ? (
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-center text-xs font-mono text-neutral-500">
                  No announcements set. Default phrases will be used.
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 border border-[#e5e3dc] rounded bg-[#faf8f2]">
                  {formData.announcements.map((msg, idx) => (
                    <div
                      key={idx}
                      className="p-3 flex items-center justify-between gap-4 text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-neutral-900 uppercase">{msg}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAnnouncement(idx)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Blue Bar Preview */}
            <div className="pt-4 border-t border-[#e5e3dc] space-y-2">
              <div className="text-xs font-mono uppercase text-neutral-500 font-semibold">
                Live Announcement Bar Preview
              </div>
              <div className="w-full bg-[#004fff] text-white text-xs font-mono uppercase tracking-[0.15em] py-3 px-4 overflow-hidden rounded shadow-sm">
                <div className="flex items-center gap-4 whitespace-nowrap overflow-x-auto">
                  {formData.announcements.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 flex-shrink-0">
                      <span>{item}</span>
                      <span className="text-blue-200">•</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e5e3dc] flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-[#004fff] hover:bg-blue-600 text-white rounded text-xs font-mono uppercase font-bold tracking-wider transition-colors"
              >
                {saving ? "Saving..." : "Save Announcements"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Header & Top Tagline */}
      {activeTab === "header" && (
        <div className="bg-white border border-[#e5e3dc] p-6 space-y-6 rounded shadow-xs max-w-3xl">
          <div className="border-b border-[#e5e3dc] pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
              Header Navigation &amp; Top Subtitle
            </h2>
            <p className="text-xs font-mono text-neutral-500 mt-0.5">
              Control the top left story link and brand indicators in the main header.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                Top Left Navigation Link Label
              </label>
              <input
                type="text"
                name="header_story_label"
                value={formData.header_story_label}
                onChange={handleChange}
                placeholder="Our Story"
                className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded"
              />
              <p className="text-[11px] font-mono text-neutral-500 mt-1">
                Links to /pages/our-story on desktop.
              </p>
            </div>

            <div className="p-4 bg-[#faf8f2] border border-[#e5e3dc] rounded space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-800 font-bold block">
                    Show Secondary Tagline Beside &ldquo;Our Story&rdquo;
                  </span>
                  <p className="text-[11px] font-mono text-neutral-500">
                    Previously displayed &ldquo;Artisanal Studio&rdquo;. Keep unchecked for a clean, minimalist header.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="show_header_tagline"
                    checked={formData.show_header_tagline}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fff]"></div>
                </label>
              </div>

              {formData.show_header_tagline && (
                <div className="pt-2 border-t border-[#e5e3dc]">
                  <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                    Custom Tagline Text
                  </label>
                  <input
                    type="text"
                    name="header_tagline"
                    value={formData.header_tagline}
                    onChange={handleChange}
                    placeholder="e.g. Curated Homeware"
                    className="w-full bg-white border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#e5e3dc] flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold tracking-wider transition-colors"
            >
              {saving ? "Saving..." : "Save Header Settings"}
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Footer & Newsletter */}
      {activeTab === "footer" && (
        <div className="bg-white border border-[#e5e3dc] p-6 space-y-6 rounded shadow-xs max-w-3xl">
          <div className="border-b border-[#e5e3dc] pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
              Footer &amp; Newsletter Settings
            </h2>
            <p className="text-xs font-mono text-neutral-500 mt-0.5">
              Customize the newsletter invitation and bottom drawer tagline.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                Newsletter Invitation Title
              </label>
              <input
                type="text"
                name="footer_newsletter_title"
                value={formData.footer_newsletter_title}
                onChange={handleChange}
                className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                Newsletter Subtitle / Incentive
              </label>
              <input
                type="text"
                name="footer_newsletter_text"
                value={formData.footer_newsletter_text}
                onChange={handleChange}
                className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                Mobile Drawer Footer Note
              </label>
              <textarea
                name="footer_tagline"
                rows={3}
                value={formData.footer_tagline}
                onChange={handleChange}
                className="w-full bg-[#faf8f2] border border-[#e5e3dc] p-2.5 text-xs font-mono focus:outline-none focus:border-black rounded"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#e5e3dc] flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold tracking-wider transition-colors"
            >
              {saving ? "Saving..." : "Save Footer Settings"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
