"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "home",         label: "Home" },
  { id: "about",        label: "About" },
  { id: "profiles",     label: "CP Profiles" },
  { id: "skills",       label: "Skills" },
  { id: "projects",     label: "Projects" },
  { id: "achievements", label: "Awards" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [active, setActive] = useState("home");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(SECTIONS[i].id);
          return;
        }
      }
      setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--accent), #ec4899, var(--accent-warm))",
        }}
      />

      {/* Section dots — right edge */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden flex-col items-center gap-3 md:flex">
        {SECTIONS.map(sec => (
          <div key={sec.id} className="relative flex items-center">
            {/* Tooltip */}
            {hoveredDot === sec.id && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-3 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-xs font-semibold text-[var(--fg)] shadow-xl"
              >
                {sec.label}
              </motion.div>
            )}
            <button
              onClick={() => goTo(sec.id)}
              onMouseEnter={() => setHoveredDot(sec.id)}
              onMouseLeave={() => setHoveredDot(null)}
              aria-label={sec.label}
              className="flex h-5 w-5 items-center justify-center transition-all"
            >
              <motion.span
                animate={{
                  scale: active === sec.id ? 1 : 0.7,
                  backgroundColor: active === sec.id ? "var(--accent)" : "transparent",
                  borderColor: active === sec.id ? "var(--accent)" : "var(--fg-dim)",
                }}
                transition={{ duration: 0.3 }}
                className="block h-3 w-3 rounded-full border-2"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
