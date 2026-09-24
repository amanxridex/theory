export default function AnnouncementBar() {
  const announcements = [
    "FREE SHIPPING ABOVE 9999/-",
    "•",
    "50% REFUND IF DAMAGED",
    "•",
    "RS. 500 OFF ABOVE 5,999/-",
    "•",
    "THE COZY THEORY // STAY COZY, STAY YOU",
    "•",
    "FREE SHIPPING ABOVE 9999/-",
    "•",
    "50% REFUND IF DAMAGED",
    "•",
    "RS. 500 OFF ABOVE 5,999/-",
    "•",
    "HANDCRAFTED ARTISANAL HOMEWARE",
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
