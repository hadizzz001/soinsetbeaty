"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "var(--color-body)" }}
    >
      <div className="container-site flex h-20 items-center justify-between md:h-24">
        <Link href="/" className="flex items-center gap-3">
          <img
            src={site.logo}
            alt={site.name}
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <WhatsAppLink
            event="Lead"
            content="Header — Book now"
            className="btn btn-primary"
          >
            Book now
          </WhatsAppLink>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-[1.5px] w-6 bg-[var(--color-text)] transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-[var(--color-text)] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-[var(--color-text)] transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          className="border-t border-[var(--color-line)] lg:hidden"
          style={{ backgroundColor: "var(--color-body)" }}
        >
          <nav className="container-site flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-line)] py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <WhatsAppLink
                event="Lead"
                content="Header — Book now"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Book now
              </WhatsAppLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
