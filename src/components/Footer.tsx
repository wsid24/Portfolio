"use client";

import React, { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const SOCIALS = [
  { id: "github", icon: FiGithub, href: "https://github.com/wsid24" },
  { id: "linkedin", icon: FiLinkedin, href: "https://www.linkedin.com/in/siddhant-wani/" },
  { id: "twitter", icon: FaXTwitter, href: "https://x.com/w_SiD1024" },
  { id: "email", icon: FiMail, href: "mailto:siddhantpwani@gmail.com" },
];

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const istTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTime(istTime + " IST");
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elev)] py-10 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left side: Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-[var(--fg-soft)]">
          <p className="font-heading font-medium text-[var(--fg)]">© {new Date().getFullYear()} Siddhant Wani</p>
          <span className="hidden md:block h-3.5 w-px bg-[var(--border-strong)]"></span>
          <p>Pune, India</p>
          <span className="hidden md:block h-3.5 w-px bg-[var(--border-strong)]"></span>
          <p className="font-mono text-xs tracking-wide">{time}</p>
        </div>

        {/* Right side: Socials */}
        <div className="flex gap-5">
          {SOCIALS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-[var(--fg-dim)] hover:text-[var(--accent)] transition-colors duration-300"
              aria-label={social.id}
            >
              <social.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
