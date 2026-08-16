"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; 

const navItems = [
  { label: "Why Learnault", href: "#why-learnault" },
  { label: "Learning Paths", href: "#learning-paths" },
  { label: "FAQ", href: "#faq" },
];

const GlobalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable || focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3 rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B42A] focus-visible:ring-offset-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F5ED] ring-1 ring-[#E7D3A3]">
            <Image
              src="/assets/logo-icon.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#1E1F24]">
            Learnault
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#565B63] transition hover:text-[#1E1F24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B42A] focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Button size="lg" className="rounded-full px-6">
            Start Learning
          </Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5EAF0] bg-white text-[#1E1F24] shadow-sm transition hover:bg-[#F8F9FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B42A] focus-visible:ring-offset-2 lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <>
          <div className="fixed inset-0 z-50 bg-[#0F172A]/45 lg:hidden" aria-hidden="true" />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-y-0 right-0 z-[60] flex w-[85vw] max-w-sm flex-col border-l border-[#E5EAF0] bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden"
            ref={drawerRef}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F5ED] ring-1 ring-[#E7D3A3]">
                  <Image src="/assets/logo-icon.svg" alt="" width={24} height={24} aria-hidden="true" />
                </div>
                <span id={titleId} className="text-lg font-semibold tracking-tight text-[#1E1F24]">
                  Learnault
                </span>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5EAF0] bg-white text-[#1E1F24] transition hover:bg-[#F8F9FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B42A] focus-visible:ring-offset-2"
                aria-label="Close navigation menu"
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <X size={18} />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-[#1E1F24] transition hover:bg-[#F8F9FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B42A] focus-visible:ring-offset-2"
                  onClick={() => {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Button size="lg" className="w-full justify-center rounded-full">
                Start Learning
              </Button>
              <a
                href="#top"
                className="text-center text-sm font-medium text-[#565B63] transition hover:text-[#1E1F24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B42A] focus-visible:ring-offset-2"
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                Back to top
              </a>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
};

export default GlobalNav;
