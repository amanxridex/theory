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
    <div className="min-h-screen bg-[#0d0f14] text-[#e4e7eb] flex font-sans antialiased">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation (Shopify Polaris style) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#14171f] border-r border-[#222733] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Admin Header / Store Identifier */}
          <div className="px-5 py-4 border-b border-[#222733] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#004fff] flex items-center justify-center text-white font-black text-sm shadow-md">
                TCT
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-sm tracking-tight uppercase text-white block truncate">
                  THE COZY THEORY
                </span>
                <span className="text-[10px] font-mono tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Shopify Studio Pro
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Online Store Switcher */}
          <div className="px-3 pt-4 pb-2">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-3 py-2 bg-[#1b202c] hover:bg-[#232938] text-xs font-mono rounded-md text-neutral-300 hover:text-white transition-colors border border-[#2d3446]"
            >
              <span className="flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-[#004fff]" />
                <span>View Online Store</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </Link>
          </div>

          {/* Main Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
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
                    className={`flex-1 flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all ${
                      active
                        ? "bg-[#004fff] text-white font-semibold shadow-sm"
                        : "text-neutral-400 hover:text-white hover:bg-[#1a1f2c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-neutral-400 group-hover:text-white"}`} />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold bg-amber-500 text-black px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Direct Add shortcut icon */}
                  {item.actionHref && (
                    <Link
                      href={item.actionHref}
                      className="p-1.5 mr-1 text-neutral-500 hover:text-white hover:bg-[#222733] rounded transition-colors"
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
          <div className="p-4 mx-3 my-4 bg-gradient-to-br from-[#181d28] to-[#131620] border border-[#262c3a] rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">STORE STATUS</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE
              </span>
            </div>
            <div className="text-xl font-bold text-white font-mono flex items-baseline gap-1.5">
              <span>{analytics.activeVisitors}</span>
              <span className="text-xs text-neutral-400 font-normal">active visitors right now</span>
            </div>
            <p className="text-[11px] text-neutral-500 font-mono">
              Simulated real-time shoppers browsing products & checking out.
            </p>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#222733] flex items-center justify-between text-xs font-mono text-neutral-400 bg-[#10131b]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#202636] border border-[#30384c] flex items-center justify-center font-bold text-white text-[11px]">
              AD
            </div>
            <div>
              <div className="text-white font-medium truncate max-w-[100px]">Aditya (Admin)</div>
              <div className="text-[10px] text-neutral-500">Super Admin</div>
            </div>
          </div>
          <Link
            href="/"
            className="p-1.5 hover:text-white text-neutral-500 hover:bg-[#1a1f2c] rounded transition-colors"
            title="Return to Customer Storefront"
          >
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Control Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#14171f]/95 backdrop-blur-md border-b border-[#222733] px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Mobile hamburger & Global Admin Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-neutral-400 hover:text-white lg:hidden"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Search products, orders, categories, collectors (Ctrl + K)..."
                className="w-full bg-[#1c212d] border border-[#2d3446] rounded-md pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#004fff] transition-colors"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Right: Quick actions, Live visitor badge, Notifications */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live visitors chip */}
            <Link
              href="/admin/analytics"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1b202c] border border-[#2d3446] rounded-full text-xs font-mono text-neutral-300 hover:border-[#004fff] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong>{analytics.activeVisitors}</strong> visitors live</span>
            </Link>

            {/* Quick Add Product Button */}
            <Link
              href="/admin/products/new"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#004fff] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Product</span>
            </Link>

            {/* Notifications */}
            <button
              onClick={() => alert("All systems operational. Zero webhook errors.")}
              className="p-2 text-neutral-400 hover:text-white hover:bg-[#1f2432] rounded-md transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#004fff]"></span>
            </button>

            {/* Storefront preview */}
            <Link
              href="/"
              target="_blank"
              className="p-2 text-neutral-400 hover:text-white hover:bg-[#1f2432] rounded-md transition-colors"
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
