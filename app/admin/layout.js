"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  BarChart3,
  Tag,
  ExternalLink,
  Menu,
  X,
  Search,
  Bell,
  CheckCircle2,
  Sparkles,
  Plus,
  Home,
  Store,
  FileText,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { analytics, orders } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");

  const pendingOrdersCount = orders.filter((o) => o.fulfillmentStatus === "Unfulfilled").length;

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
      actionHref: "/admin/products/new",
    },
    {
      title: "Categories",
      href: "/admin/collections",
      icon: Layers,
      actionHref: "/admin/collections/new",
    },
    {
      title: "Blog & Journal",
      href: "/admin/blogs",
      icon: FileText,
      actionHref: "/admin/blogs/new",
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Analytics & Traffic",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Discounts",
      href: "/admin/discounts",
      icon: Tag,
    },
  ];

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121212] flex font-sans antialiased selection:bg-neutral-200">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation (White Screen / Warm Editorial Aesthetic) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#fffdf8] border-r border-[#e5e3dc] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Admin Header / Store Identifier */}
          <div className="px-5 py-4 border-b border-[#e5e3dc] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#121212] flex items-center justify-center text-white font-black text-xs tracking-wider shadow-sm">
                TCT
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-sm tracking-tight uppercase text-[#121212] block truncate">
                  THE COZY THEORY
                </span>
                <span className="text-[10px] font-mono tracking-wider text-emerald-700 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Admin Studio
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-neutral-500 hover:text-black lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Online Store Switcher */}
          <div className="px-3 pt-4 pb-2">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-3 py-2 bg-[#f5f2eb] hover:bg-[#ede9e0] text-xs font-mono rounded text-neutral-800 hover:text-black transition-colors border border-[#e5e3dc]"
            >
              <span className="flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-[#004fff]" />
                <span className="font-medium">View Online Store</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>

          {/* Main Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              Operations
            </div>

            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <div key={item.href} className="group relative flex items-center">
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex-1 flex items-center justify-between px-3 py-2 rounded text-xs transition-all ${
                      active
                        ? "bg-[#121212] text-white font-medium shadow-sm"
                        : "text-neutral-600 hover:text-black hover:bg-[#f2efe8]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-neutral-500 group-hover:text-black"}`} />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold bg-[#004fff] text-white px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Direct Add shortcut icon */}
                  {item.actionHref && (
                    <Link
                      href={item.actionHref}
                      className="p-1 mr-1 text-neutral-400 hover:text-black hover:bg-[#eae6dd] rounded transition-colors"
                      title={`Add ${item.title}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Live Store Pulse Box */}
          <div className="p-4 mx-3 my-4 bg-[#f8f6f0] border border-[#e5e3dc] rounded space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 font-semibold">STORE STATUS</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                LIVE
              </span>
            </div>
            <div className="text-2xl font-extrabold text-[#121212] font-mono flex items-baseline gap-1.5">
              <span>{analytics.activeVisitors || 1}</span>
              <span className="text-xs text-neutral-500 font-normal">active users right now</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono leading-relaxed">
              Real telemetry from live customer sessions across the storefront.
            </p>
          </div>

        </div>

        {/* Sidebar Footer with Derek Martin as Owner */}
        <div className="p-4 border-t border-[#e5e3dc] flex items-center justify-between text-xs font-mono text-neutral-600 bg-[#faf8f5]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-[#121212] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm flex-shrink-0">
              DM
            </div>
            <div className="min-w-0">
              <div className="text-[#121212] font-bold truncate">Derek Martin</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Founder &amp; Owner</div>
            </div>
          </div>
          <Link
            href="/"
            className="p-1.5 hover:text-black text-neutral-400 hover:bg-[#ede9e0] rounded transition-colors flex-shrink-0"
            title="Return to Customer Storefront"
          >
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Control Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#fffdf8]/95 backdrop-blur-md border-b border-[#e5e3dc] px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Mobile hamburger & Global Admin Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-neutral-600 hover:text-black lg:hidden"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Search products, orders, articles, collectors (Ctrl + K)..."
                className="w-full bg-[#f5f2eb] border border-[#e5e3dc] rounded pl-9 pr-4 py-2 text-xs font-mono text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Right: Quick actions, Live visitor badge, Notifications */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Supabase DB Status Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded text-[11px] font-mono text-emerald-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Supabase DB: Connected</span>
            </div>

            {/* Live visitors chip */}
            <Link
              href="/admin/analytics"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#f5f2eb] border border-[#e5e3dc] rounded text-xs font-mono text-neutral-800 hover:border-black transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span><strong>{analytics.activeVisitors || 1}</strong> users live</span>
            </Link>

            {/* Quick Add Product Button */}
            <Link
              href="/admin/products/new"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-medium transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Product</span>
            </Link>

            {/* Notifications */}
            <button
              onClick={() => alert("All systems operational. Telemetry live.")}
              className="p-2 text-neutral-500 hover:text-black hover:bg-[#f0ede6] rounded transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#004fff]"></span>
            </button>

            {/* Storefront preview */}
            <Link
              href="/"
              target="_blank"
              className="p-2 text-neutral-500 hover:text-black hover:bg-[#f0ede6] rounded transition-colors"
              title="Open Live Store in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

        </header>

        {/* Dynamic Admin Subpage Viewport */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

