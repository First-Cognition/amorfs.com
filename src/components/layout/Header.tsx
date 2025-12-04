"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { getFontFamily } from "@/lib/utils/fonts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = language.toUpperCase();

  const handleLangChange = (lang: "en" | "vi") => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="relative z-50 flex w-full items-center justify-between px-6 py-2 sm:px-8 md:px-10">
      {/* Logo */}
      <a href="/" className="flex items-center gap-[5px]" suppressHydrationWarning>
        <Image
          src="/full-horizontal-white.svg"
          alt="Amorfs Logo"
          width={170}
          height={50}
          className="h-10 w-auto sm:h-[50px]"
          priority
        />
      </a>

      {/* Navigation */}
      <nav className="hidden items-center gap-4 md:flex" suppressHydrationWarning>
        {/* Pricing Button with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-center text-base leading-[1.5em] text-white/88 transition-colors hover:text-white cursor-pointer"
              style={{ fontFamily: getFontFamily(language, "manrope") }}
            >
              {t("header.nav.pricing")}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
          >
            {t("header.comingSoon")}
          </TooltipContent>
        </Tooltip>

        {/* Technology Button with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-center text-base leading-[1.5em] text-white/88 transition-colors hover:text-white cursor-pointer"
              style={{ fontFamily: getFontFamily(language, "manrope") }}
            >
              {t("header.nav.technology")}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
          >
            {t("header.comingSoon")}
          </TooltipContent>
        </Tooltip>
        {/* News Button with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-center text-base leading-[1.5em] text-white/88 transition-colors hover:text-white cursor-pointer"
              style={{ fontFamily: getFontFamily(language, "manrope") }}
            >
              {t("header.nav.blog")}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
          >
            {t("header.comingSoon")}
          </TooltipContent>
        </Tooltip>

        {/* FAQ Button with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-center text-base leading-[1.5em] text-white/88 transition-colors hover:text-white cursor-pointer"
              style={{ fontFamily: getFontFamily(language, "manrope") }}
            >
              {t("header.nav.faq")}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
          >
            {t("header.comingSoon")}
          </TooltipContent>
        </Tooltip>

        {/* Contact Dropdown */}
        <div className="relative">
          <button
            className="text-center text-base leading-[1.5em] text-white/88 transition-colors hover:text-white flex items-center gap-1"
            style={{ fontFamily: getFontFamily(language, "manrope") }}
            onClick={() => setIsContactOpen(!isContactOpen)}
          >
            {t("header.nav.contact")}
            <svg
              className={`h-4 w-4 text-white/88 transition-transform ${isContactOpen ? "rotate-180" : ""
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

          {isContactOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsContactOpen(false)}
              />
              <div
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-lg backdrop-blur-md"
                style={{ fontFamily: getFontFamily(language, "manrope") }}
              >
                <div className="px-4 py-3 text-sm text-white/88 border-b border-white/10 cursor-default">
                  {t("contact.email")}
                </div>
                <a
                  href="https://x.com/AmorfsHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-3 text-left text-sm text-white/88 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {t("contact.twitter")}
                </a>
              </div>
            </>
          )}
        </div>

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
              style={{ fontFamily: getFontFamily(language, "manrope") }}
            >
              {currentLang}
            </span>
            <svg
              className={`h-4 w-4 text-white/88 transition-transform ${isLangOpen ? "rotate-180" : ""
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
                style={{ fontFamily: getFontFamily(language, "manrope") }}
              >
                <button
                  onClick={() => handleLangChange("en")}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/20 ${currentLang === "Tiếng Anh"
                    ? "bg-white/15 text-white"
                    : "text-white/88"
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLangChange("vi")}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/20 whitespace-nowrap ${currentLang === "Tiếng Việt"
                    ? "bg-white/15 text-white"
                    : "text-white/88"
                    }`}
                >
                  Tiếng Việt
                </button>
              </div>
            </>
          )}
        </div>

        {/* Install Extension Button */}
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-full border border-white/55 bg-white/11 px-4 py-2 transition-all hover:bg-white/20"
          style={{ fontFamily: getFontFamily(language, "manrope") }}
        >
          <span className="text-center text-sm font-semibold leading-[1.71em] tracking-[-0.02em] text-white">
            {t("header.installExtension")}
          </span>
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="flex items-center justify-center md:hidden"
        aria-label="Menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
        )}
      </button>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[rgba(15,64,143,0.95)] backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
              <Image
                src="/full-horizontal-white.svg"
                alt="Amorfs Logo"
                width={140}
                height={40}
                className="h-8 w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                aria-label="Close menu"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
              {/* Pricing Button with Tooltip - Mobile */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded-lg px-4 py-3 text-base font-medium leading-[1.5em] text-white/88 transition-colors hover:bg-white/10 hover:text-white text-left w-full"
                    style={{ fontFamily: getFontFamily(language, "manrope") }}
                  >
                    {t("header.nav.pricing")}
                  </button>
                </TooltipTrigger>
                  <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
                >
                  {t("header.comingSoon")}
                </TooltipContent>
              </Tooltip>

              {/* Technology Button with Tooltip - Mobile */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded-lg px-4 py-3 text-base font-medium leading-[1.5em] text-white/88 transition-colors hover:bg-white/10 hover:text-white text-left w-full"
                    style={{ fontFamily: getFontFamily(language, "manrope") }}
                  >
                    {t("header.nav.technology")}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
                >
                  {t("header.comingSoon")}
                </TooltipContent>
              </Tooltip>
              {/* News Button with Tooltip - Mobile */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded-lg px-4 py-3 text-base font-medium leading-[1.5em] text-white/88 transition-colors hover:bg-white/10 hover:text-white text-left w-full"
                    style={{ fontFamily: getFontFamily(language, "manrope") }}
                  >
                    {t("header.nav.blog")}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
                >
                  {t("header.comingSoon")}
                </TooltipContent>
              </Tooltip>

              {/* FAQ Button with Tooltip - Mobile */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded-lg px-4 py-3 text-base font-medium leading-[1.5em] text-white/88 transition-colors hover:bg-white/10 hover:text-white text-left w-full"
                    style={{ fontFamily: getFontFamily(language, "manrope") }}
                  >
                    {t("header.nav.faq")}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="bg-white/95 text-emerald-600 font-medium px-4 py-2 text-sm rounded-lg shadow-lg border border-emerald-200"
                >
                  {t("header.comingSoon")}
                </TooltipContent>
              </Tooltip>
              <a
                href="#contact"
                className="rounded-lg px-4 py-3 text-base font-medium leading-[1.5em] text-white/88 transition-colors hover:bg-white/10 hover:text-white"
                style={{ fontFamily: getFontFamily(language, "manrope") }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.nav.contact")}
              </a>
            </nav>

            {/* Language Selector & Install Button */}
            <div className="border-t border-white/20 px-4 py-6 space-y-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-white/10 px-4 py-3 transition-colors hover:bg-white/20"
                  aria-label="Language selector"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                >
                  <div className="flex items-center gap-2">
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
                      className="text-base font-medium leading-[1.5em] text-white/88"
                      style={{ fontFamily: getFontFamily(language, "manrope") }}
                    >
                      {currentLang}
                    </span>
                  </div>
                  <svg
                    className={`h-4 w-4 text-white/88 transition-transform ${isLangOpen ? "rotate-180" : ""
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

                {/* Language Dropdown */}
                {isLangOpen && (
                  <div className="mt-2 overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md">
                    <button
                      onClick={() => handleLangChange("en")}
                      className={`w-full px-4 py-3 text-left text-base transition-colors hover:bg-white/20 ${currentLang === "Tiếng Anh"
                        ? "bg-white/15 text-white"
                        : "text-white/88"
                        }`}
                      style={{ fontFamily: getFontFamily(language, "manrope") }}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLangChange("vi")}
                      className={`w-full px-4 py-3 text-left text-base transition-colors hover:bg-white/20 whitespace-nowrap ${currentLang === "Tiếng Việt"
                        ? "bg-white/15 text-white"
                        : "text-white/88"
                        }`}
                      style={{ fontFamily: getFontFamily(language, "manrope") }}
                    >
                      Tiếng Việt
                    </button>
                  </div>
                )}
              </div>

              {/* Install Extension Button */}
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/55 bg-white/11 px-4 py-3 transition-all hover:bg-white/20"
                style={{ fontFamily: getFontFamily(language, "manrope") }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-center text-base font-semibold leading-[1.71em] tracking-[-0.02em] text-white">
                  {t("header.installExtension")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

