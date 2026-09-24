"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, ExternalLink, FileText, Calendar, Clock, User, CheckCircle, RefreshCw } from "lucide-react";
import { getBlogPosts, deleteBlogPost } from "@/lib/supabase";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await getBlogPosts({ includeUnpublished: true });
      setPosts(data || []);
    } catch (err) {
      console.error("Error loading blog posts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete post: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e3dc]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Link href="/admin" className="hover:text-black">Admin</Link>
            <span>/</span>
            <span className="text-black font-semibold">Editorial &amp; Blog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212] mt-1">
            Studio Journal ({posts.length})
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-0.5">
            Real articles published to the public journal, managed by Derick Martin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadPosts}
            className="p-2 border border-[#e5e3dc] bg-white rounded text-neutral-600 hover:text-black hover:bg-[#f5f2eb] transition-colors"
            title="Refresh articles"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-neutral-800 text-white rounded text-xs font-mono uppercase font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white border border-[#e5e3dc] rounded shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center font-mono text-xs text-neutral-500">
            Loading Studio Journal articles from Supabase...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-16 text-center space-y-3 font-mono">
            <p className="text-neutral-500 text-xs">No blog posts found in database.</p>
            <Link
              href="/admin/blogs/new"
              className="inline-block px-4 py-2 bg-black text-white text-xs uppercase font-bold"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#e5e3dc]">
            {posts.map((post) => (
              <div
                key={post.id || post.handle}
                className="p-4 sm:p-6 hover:bg-[#faf8f5] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-neutral-200 overflow-hidden flex-shrink-0 border border-[#e5e3dc]">
                    <img
                      src={post.image || "https://cdn.shopify.com/s/files/1/0826/5053/0110/files/06_f701ce34-3d80-4167-87f5-e3dd0ec7dc5f.jpg?v=1765797590&width=800"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold">
                        Published
                      </span>
                      <span>•</span>
                      <span>
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Studio Archive"}
                      </span>
                      <span>•</span>
                      <span>{post.read_time || "4 min read"}</span>
                    </div>

                    <h2 className="text-base font-bold text-[#121212] truncate">
                      {post.title}
                    </h2>

                    <p className="text-xs text-neutral-600 line-clamp-1 font-mono">
                      {post.excerpt}
                    </p>

                    <div className="text-[10px] font-mono text-neutral-400">
                      Slug: /{post.handle} • Author: {post.author || "Derick Martin"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  <Link
                    href={`/blogs/news/${post.handle}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f5f2eb] hover:bg-[#eae6dd] border border-[#e5e3dc] rounded text-xs font-mono text-black font-semibold transition-colors"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletingId === post.id}
                    className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
