export const metadata = {
  title: "Terms of Service | The Cozy Theory",
  description: "Terms and conditions governing orders and usage of The Cozy Theory.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#fffdf8] min-h-screen py-12 md:py-20">
      <div className="max-w-[900px] mx-auto px-4 md:px-8 space-y-8">
        
        <div className="space-y-2 pb-6 border-b border-[#e5e3dc]">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Legal & Operations
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#121212]">
            Terms of Service
          </h1>
        </div>

        <div className="text-xs md:text-sm leading-relaxed space-y-6 text-neutral-800">
          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              1. Studio Overview
            </h2>
            <p>
              This website is operated by The Cozy Theory. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to The Cozy Theory. By visiting our site and/or purchasing an object, you engage in our service and agree to be bound by these terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              2. Products & Finishes
            </h2>
            <p>
              Certain products are limited edition drops. Due to the handcrafted nature of our alloy casting, concrete moulding, and hand patination, slight variations in texture, finish, and tone are inherent characteristics of the craftsmanship.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              3. Accuracy of Billing & Account Information
            </h2>
            <p>
              We reserve the right to refuse any order you place with us. In the event that we make a change to or cancel an order, we will notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
