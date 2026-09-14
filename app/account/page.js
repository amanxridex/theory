"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut } from "lucide-react";

export default function AccountDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cozy_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Sample collector profile if visiting directly
        setUser({ name: "Aditya Sinha", email: "collector@example.com" });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cozy_user");
    router.push("/account/login");
  };

  return (
    <div className="bg-[#fffdf8] min-h-screen py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-10">
        
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#e5e3dc] gap-4">
          <div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-1">
              Collector Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#121212]">
              Welcome, {user?.name || "Collector"}
            </h1>
            <p className="text-xs font-mono text-neutral-500 mt-1">
              {user?.email || "collector@example.com"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Orders & Address Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Order History */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-tight font-sans flex items-center gap-2">
              <Package className="w-5 h-5 text-neutral-700" />
              <span>Order Archive</span>
            </h2>

            <div className="border border-[#e5e3dc] bg-white divide-y divide-[#e5e3dc]">
              
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-black">
                      #TCT-894120
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 uppercase font-semibold">
                      Dispatched
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono">
                    Placed on September 12, 2026 • 2 Objects
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="text-xs font-mono font-bold">
                    Rs. 3,130.00
                  </div>
                  <Link
                    href="/order-confirmation?order_id=TCT-894120&amount=3130"
                    className="text-[11px] font-mono underline hover:text-black block"
                  >
                    View Order Details →
                  </Link>
                </div>
              </div>

              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-black">
                      #TCT-761922
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-200 text-neutral-800 uppercase font-semibold">
                      Delivered
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono">
                    Placed on August 28, 2026 • 1 Object
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="text-xs font-mono font-bold">
                    Rs. 2,800.00
                  </div>
                  <Link
                    href="/order-confirmation?order_id=TCT-761922&amount=2800"
                    className="text-[11px] font-mono underline hover:text-black block"
                  >
                    View Receipt →
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Saved Addresses / Account Info */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-tight font-sans flex items-center gap-2">
              <MapPin className="w-5 h-5 text-neutral-700" />
              <span>Primary Address</span>
            </h2>

            <div className="p-6 bg-[#f7f5ef] border border-[#e5e3dc] space-y-3 font-mono text-xs">
              <div className="font-bold text-black uppercase">{user?.name || "Aditya Sinha"}</div>
              <div className="text-neutral-600 leading-relaxed">
                Flat 502, Sky High Towers<br />
                Senapati Bapat Marg, Lower Parel<br />
                Mumbai, Maharashtra 400013<br />
                India
              </div>
              <div className="pt-2 text-neutral-500">
                Phone: +91 98201 00000
              </div>
              <button
                onClick={() => alert("Address edit modal opens here.")}
                className="pt-2 text-xs font-bold uppercase underline hover:text-black"
              >
                Edit Address
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
