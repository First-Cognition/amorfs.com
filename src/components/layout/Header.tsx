"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const handleLangChange = (lang: string) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
  };

  return (
    <header className="relative z-50 flex w-full items-center justify-between px-6 py-2 sm:px-8 md:px-10">
      {/* Logo */}
      <div className="flex items-center gap-[5px]" suppressHydrationWarning>
        <Image
          src="/full-horizontal-white.svg"
          alt="Amorfs Logo"
          width={170}
          height={50}
          className="h-10 w-auto sm:h-[50px]"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="hidden items-center gap-4 md:flex" suppressHydrationWarning>
        <a
          href="#pricing"
          className="text-center text-sm leading-[1.5em] text-white/88 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-manrope)" }}
          suppressHydrationWarning
        >
          Pricing
        </a>
        <a
          href="#technology"
          className="text-center text-sm leading-[1.5em] text-white/88 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-manrope)" }}
          suppressHydrationWarning
        >
          Technology
        </a>
        <a
          href="#blog"
          className="text-center text-sm leading-[1.5em] text-white/88 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-manrope)" }}
          suppressHydrationWarning
        >
          Blog
        </a>
        <a
          href="#faq"
          className="text-center text-sm leading-[1.5em] text-white/88 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-manrope)" }}
          suppressHydrationWarning
        >
          FAQ
        </a>
        <a
          href="#contact"
          className="text-center text-sm leading-[1.5em] text-white/88 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-manrope)" }}
          suppressHydrationWarning
        >
          Contact
        </a>

        {/* Language Selector */}
        <div className="relative">
          <button
            className="flex items-center justify-center gap-1 transition-opacity hover:opacity-100"
            aria-label="Language selector"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            {/* Globe Icon with matching color */}
            <svg
              className="h-4 w-4 text-white/88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <g clipPath="url(#a)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h16v16H0z" />
                </clipPath>
              </defs>
            </svg>
            <span
              className="text-center text-sm leading-[1.5em] text-white/88"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {currentLang}
            </span>
            <svg
              className={`h-4 w-4 text-white/88 transition-transform ${
                isLangOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isLangOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
              />
              
              {/* Dropdown */}
              <div
                className="absolute right-0 top-full z-50 mt-2 w-24 overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-lg backdrop-blur-md"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                <button
                  onClick={() => handleLangChange("EN")}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/20 ${
                    currentLang === "EN"
                      ? "bg-white/15 text-white"
                      : "text-white/88"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLangChange("VI")}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/20 ${
                    currentLang === "VI"
                      ? "bg-white/15 text-white"
                      : "text-white/88"
                  }`}
                >
                  VI
                </button>
              </div>
            </>
          )}
        </div>

        {/* Install Extension Button */}
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-full border border-white/55 bg-white/11 px-4 py-2 transition-all hover:bg-white/20"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <span className="text-center text-sm font-semibold leading-[1.71em] tracking-[-0.02em] text-white">
            Install Extension
          </span>
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="flex items-center justify-center md:hidden"
        aria-label="Menu"
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}

