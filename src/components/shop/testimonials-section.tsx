"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "James K.",
    role: "Traveler",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
  },
  {
    id: 2,
    name: "Helen W.",
    role: "Fashion Blogger",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    quote:
      "I love the fabric quality and the packaging details. FASCO is my new go-to brand for timeless wardrobe essentials.",
  },
  {
    id: 3,
    name: "Sarah M.",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    quote:
      "Every piece feels tailored and premium. Fast shipping, great customer service, and exquisite modern silhouettes.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : testimonialsData.length - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current < testimonialsData.length - 1 ? current + 1 : 0));
  };

  const currentItem = testimonialsData[activeIndex];
  const prevIndex = (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
  const nextIndex = (activeIndex + 1) % testimonialsData.length;

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center space-y-3 mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#222222]">
            This Is What Our Customers Say
          </h2>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-[#777777]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
          </p>
        </div>

        {/* 3-card stage with center featured card matching Figma Screenshot */}
        <div className="relative flex items-center justify-center">
          {/* Left Peeking Card */}
          <div
            onClick={prev}
            className="hidden md:flex absolute -left-12 lg:left-4 z-0 w-[380px] lg:w-[440px] scale-90 opacity-40 blur-[0.5px] cursor-pointer transition-all duration-500 hover:opacity-60 items-center gap-5 rounded-[16px] border border-[#e5e5e5] bg-white p-6 shadow-sm"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[12px] bg-[#f0f0f0]">
              <Image
                src={testimonialsData[prevIndex].avatar}
                alt={testimonialsData[prevIndex].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1 overflow-hidden">
              <p className="line-clamp-2 text-xs text-[#666666] italic">
                "{testimonialsData[prevIndex].quote}"
              </p>
              <h4 className="text-sm font-bold text-[#222222]">
                {testimonialsData[prevIndex].name}
              </h4>
            </div>
          </div>

          {/* Active Center Card (Elevated & Detailed) */}
          <div className="relative z-10 w-full max-w-[620px] rounded-[16px] border border-[#f0f0f0] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all duration-500">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Customer Avatar photo */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-[12px] bg-[#f2f2f2] shadow-sm">
                <Image
                  src={currentItem.avatar}
                  alt={currentItem.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Review content */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#555555]">
                  "{currentItem.quote}"
                </p>

                {/* 5 Rating Stars */}
                <div className="mt-3.5 flex items-center justify-center sm:justify-start gap-1 text-[#FCA120]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" stroke="none" />
                  ))}
                </div>

                {/* Divider Line */}
                <div className="my-3.5 h-[1.5px] w-20 bg-[#e0e0e0] mx-auto sm:mx-0" />

                {/* Author Name & Role */}
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#222222]">
                    {currentItem.name}
                  </h4>
                  <p className="text-xs text-[#888888] font-normal">
                    {currentItem.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Peeking Card */}
          <div
            onClick={next}
            className="hidden md:flex absolute -right-12 lg:right-4 z-0 w-[380px] lg:w-[440px] scale-90 opacity-40 blur-[0.5px] cursor-pointer transition-all duration-500 hover:opacity-60 items-center gap-5 rounded-[16px] border border-[#e5e5e5] bg-white p-6 shadow-sm"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[12px] bg-[#f0f0f0]">
              <Image
                src={testimonialsData[nextIndex].avatar}
                alt={testimonialsData[nextIndex].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1 overflow-hidden">
              <p className="line-clamp-2 text-xs text-[#666666] italic">
                "{testimonialsData[nextIndex].quote}"
              </p>
              <h4 className="text-sm font-bold text-[#222222]">
                {testimonialsData[nextIndex].name}
              </h4>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons & Dots */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#444444] shadow-sm transition hover:bg-black hover:text-white"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === idx ? "w-7 bg-black" : "w-2.5 bg-[#d0d0d0]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#444444] shadow-sm transition hover:bg-black hover:text-white"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
