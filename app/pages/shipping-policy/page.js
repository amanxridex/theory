export const metadata = {
  title: "Shipping Policy | The Cozy Theory",
  description: "Information regarding domestic India delivery, express transit times, and packaging by The Cozy Theory.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#fffdf8] min-h-screen py-12 md:py-20">
      <div className="max-w-[900px] mx-auto px-4 md:px-8 space-y-8">
        
        <div className="space-y-2 pb-6 border-b border-[#e5e3dc]">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Studio Logistics
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#121212]">
            Shipping Policy
          </h1>
        </div>

        <div className="prose prose-neutral max-w-none text-xs md:text-sm leading-relaxed space-y-6 text-neutral-800">
          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              1. Domestic Shipping (Within India)
            </h2>
            <p>
              We provide express domestic delivery across all serviceable pin codes in India.
              Orders above Rs. 9,999 qualify for complimentary express shipping. For orders below Rs. 9,999, a standard nominal shipping charge of Rs. 99 is applied at checkout. In the rare event of transit mishap, we provide a 50% refund if damaged.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              2. Processing & Dispatch Timelines
            </h2>
            <p>
              All confirmed orders are packaged in protective archival boxing and dispatched from our Mumbai studio within 24 to 48 business hours (excluding Sundays and national holidays).
              Transit typically requires 2 to 4 business days for metro locations, and 3 to 6 business days for rest of India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              3. International Shipping
            </h2>
            <p>
              We ship worldwide to North America, Europe, Asia Pacific, and the Middle East via DHL Express. International transit takes between 4 to 9 business days. Duties, taxes, and import levies are determined by the destination customs authority.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#121212]">
              4. Tracking & Delivery Confirmation
            </h2>
            <p>
              Once your order dispatches, you will receive a dispatch notification and live courier tracking link as your order leaves our house to reach your house. You can monitor the package journey until it is safely received.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
