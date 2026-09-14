import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "../page";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    handle: post.handle,
  }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const post = BLOG_POSTS.find((p) => p.handle === handle);
  if (!post) return { title: "Article Not Found | The Cozy Theory" };
  return {
    title: `${post.title} | The Cozy Theory Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { handle } = await params;
  const post = BLOG_POSTS.find((p) => p.handle === handle);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-[#fffdf8] min-h-screen py-12 md:py-20">
      <div className="max-w-[900px] mx-auto px-4 md:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          href="/blogs/news"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 pb-6 border-b border-[#e5e3dc]">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="text-black font-semibold">{post.author}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#121212] leading-[1.05]">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] bg-neutral-900 border border-[#e5e3dc] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Copy */}
        <div className="text-sm md:text-base leading-relaxed space-y-6 text-neutral-800 font-normal">
          <p className="text-base md:text-lg font-medium text-neutral-900 leading-relaxed">
            {post.excerpt}
          </p>

          <p>
            When we first began exploring the industrial topography of Mumbai, we noticed how physical forms shape our subconscious memory of place. The Marine Drive tetrapods, cast in thousands of tons of concrete, resist the Arabian Sea&apos;s relentless monsoon swells. They do not bend; they absorb and disperse energy.
          </p>

          <p>
            Bringing this brutalist architectural principle into interior spaces was an exercise in tactile balance. We downscaled the geometry into hand-poured concrete and solid milled brass, preserving the brutalist honesty of the original maritime design while turning it into an undeniable tabletop monolith.
          </p>

          <blockquote className="p-6 bg-[#f7f5ef] border-l-4 border-[#121212] font-mono text-xs md:text-sm text-neutral-700 italic">
            &ldquo;An object in your living room should not seek approval. It should stand with authority and invite conversation.&rdquo;
          </blockquote>

          <p>
            Each piece is individually numbered and finished with archival coatings to ensure it endures the test of time, collecting its own unique patina and history in your gallery space.
          </p>
        </div>

        {/* Article Footer CTA */}
        <div className="pt-10 border-t border-[#e5e3dc] flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/collections/all-products"
            className="px-6 py-3.5 bg-[#121212] text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            Explore Related Objects →
          </Link>
          <Link
            href="/blogs/news"
            className="text-xs font-mono uppercase underline hover:text-neutral-500"
          >
            Read More Dispatches
          </Link>
        </div>

      </div>
    </article>
  );
}
