import Link from "next/link";

export const metadata = {
  title: "About Us | The Cozy Theory",
  description:
    "The Cozy Theory crafts artisanal homeware and ceramics for warm, intentional living spaces. Learn about our craft, philosophy, and materials.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#fffdf8] min-h-screen">
      
      {/* Editorial Hero */}
      <div className="border-b border-[#e5e3dc] py-16 md:py-24 bg-[#121212] text-[#fffdf8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-6">
          <span className="text-xs font-mono tracking-[0.25em] text-blue-400 uppercase block">
            Studio Philosophy // The Cozy Theory
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.92]">
            OBJECTS FOR<br />
            WARM &amp; MINDFUL<br />
            <span className="text-neutral-400">LIVING.</span>
          </h1>
          <p className="text-sm md:text-lg text-neutral-300 font-normal max-w-2xl leading-relaxed">
            The Cozy Theory is an artisanal design studio. We craft everyday ceramics, tactile tabletop objects, and pure cotton linen to turn houses into sanctuaries.
          </p>
        </div>
      </div>

      {/* Main Story & Photography */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-sm md:text-base leading-relaxed text-neutral-800 font-normal">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#121212]">
              Warmth, Texture, &amp; Honest Materials.
            </h2>
            <p>
              We founded The Cozy Theory on the belief that everyday objects carry emotional weight. The coffee mug you reach for at sunrise, the textured linen on your bed, the sculpted vase catching afternoon light—these are not mere fillers.
            </p>
            <p>
              Each piece in our studio is designed to celebrate raw textures: organic hand-thrown ceramics, matte glazes, breathable natural cotton, and hand-finished metal accents.
            </p>
            <div className="p-4 bg-[#f7f5ef] border-l-2 border-[#004fff] text-xs font-mono">
              &ldquo;Transform your home into a gallery of everyday comfort, warmth, and deliberate living.&rdquo;
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/5] bg-neutral-900 border border-[#e5e3dc] overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0593/5890/4514/files/TT-285_1.jpg?v=1733303728"
                alt="The Cozy Theory artisanal ceramic vessel"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#e5e3dc]">
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400">01 // TACTILITY</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Honest Materials</h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              We work with stoneware clay, traditional glazes, and pure washed cotton to craft pieces that feel reassuringly solid in hand.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400">02 // MINDFULNESS</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Everyday Rituals</h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              Elevate morning tea, slow dinners, and peaceful evenings with pieces shaped for quiet presence.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400">03 // CRAFTSMANSHIP</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Artisanal Production</h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              Small batch releases and hand-painted pottery crafted with master artisans across India.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 border-t border-[#e5e3dc] space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase">
            Curate your warm living space
          </h3>
          <div>
            <Link
              href="/collections/all-products"
              className="inline-block px-8 py-4 bg-[#004fff] text-white text-xs font-mono uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-md"
            >
              Browse The Cozy Theory Collection →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
