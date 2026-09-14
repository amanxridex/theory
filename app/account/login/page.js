"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("cozy_user", JSON.stringify({ email, name: email.split("@")[0] }));
      router.push("/account");
    }, 1000);
  };

  return (
    <div className="bg-[#fffdf8] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-[#e5e3dc] p-8 md:p-10 shadow-lg space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#f7f5ef] flex items-center justify-center mx-auto border border-[#e5e3dc]">
            <User className="w-5 h-5 text-neutral-600" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase block">
            Collector Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212]">
            Log In
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            Access your orders, saved addresses, and drop priority.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase text-neutral-600 block mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#f7f5ef] border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase text-neutral-600 block">
                Password *
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset instructions dispatched to your email."); }} className="text-[11px] font-mono text-neutral-400 hover:text-black underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#f7f5ef] border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#121212] text-[#fffdf8] text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <span>Authenticating...</span> : <span>Sign In →</span>}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center pt-4 border-t border-[#e5e3dc] space-y-2">
          <p className="text-xs font-mono text-neutral-500">
            Don&apos;t have an account yet?
          </p>
          <Link
            href="/account/register"
            className="inline-block text-xs font-mono font-bold uppercase underline hover:text-neutral-500"
          >
            Create Collector Account
          </Link>
        </div>

      </div>
    </div>
  );
}
