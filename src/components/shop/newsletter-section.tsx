"use client";

import { useState } from "react";
import Image from "next/image";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 border-t border-[#f5f5f5]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Model (as seen in Figma screenshots) */}
          <div className="hidden lg:block relative w-[240px] h-[440px] shrink-0">
            <Image
              src="/images/figma/image 2.svg"
              alt="Fashion model in trench coat"
              fill
              className="object-contain object-bottom"
            />
          </div>

          {/* Center Content */}
          <div className="max-w-xl text-center space-y-4 my-auto">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal leading-tight text-[#222222]">
              Subscribe To Our Newsletter
            </h2>
            <p className="mx-auto max-w-md text-xs sm:text-sm leading-relaxed text-[#777777]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
              ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </p>

            {subscribed ? (
              <div className="rounded-[10px] bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
                Thank you! You have successfully subscribed to the FASCO newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="michael@ymail.com"
                  required
                  className="w-full rounded-[10px] border border-[#e0e0e0] bg-white px-5 py-3.5 text-center text-sm text-[#222222] shadow-[0_4px_20px_rgba(0,0,0,0.03)] outline-none transition focus:border-black placeholder:text-[#999999]"
                />
                <button
                  type="submit"
                  className="rounded-[8px] bg-black px-10 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800 active:scale-95"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>

          {/* Right Model (as seen in Figma screenshots) */}
          <div className="hidden lg:block relative w-[240px] h-[440px] shrink-0">
            <Image
              src="/images/figma/image 3.svg"
              alt="Fashion model in overcoat"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
