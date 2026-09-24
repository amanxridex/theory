export default function AnnouncementBar() {
  const announcements = [
    "THE COZY THEORY // STAY COZY, STAY YOU",
    "•",
    "ARTISANAL HOMEWARE & TEXTILES",
    "•",
    "FREE EXPRESS SHIPPING ON ORDERS ABOVE RS. 2,999",
    "•",
    "HANDCRAFTED CERAMICS & STONEWARE",
    "•",
    "THE COZY THEORY // STAY COZY, STAY YOU",
    "•",
    "DISPATCHES WITHIN 24–48 HOURS ACROSS INDIA",
    "•",
    "NEW CURATED SEASONAL ARRIVALS",
    "•",
    "PURE WASHED COTTON HOME LINEN",
    "•",
  ];

  return (
    <aside aria-label="Announcement" className="w-full bg-[#004fff] text-white text-[11px] md:text-xs tracking-[0.15em] uppercase py-2.5 overflow-hidden select-none z-30 relative shadow-sm">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...announcements, ...announcements].map((item, idx) => (
          <span
            key={idx}
            className={`mx-3 md:mx-4 font-mono font-medium ${
              item === "•" ? "text-blue-200 scale-75" : "text-white"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </aside>
  );
}
