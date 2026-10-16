"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  X,
  CheckCheck,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Truck,
  MessageCircle,
} from "lucide-react";

function WhatsAppChatContent() {
  const searchParams = useSearchParams();

  // Configurable options from query params or sensible defaults
  const phoneNumber = searchParams.get("phone") || "1234567890";
  const agentName = searchParams.get("name") || "FASCO Concierge";
  const agentRole = searchParams.get("role") || "Online Fashion Stylist";
  const defaultGreeting =
    searchParams.get("greeting") ||
    "Hello! 👋 Welcome to FASCO. How can our customer care team help you today?";

  const [message, setMessage] = useState("");
  const [timeString, setTimeString] = useState("Just now");

  useEffect(() => {
    const now = new Date();
    setTimeString(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, []);

  const quickQuestions = [
    {
      icon: <Truck className="w-3.5 h-3.5" />,
      text: "Track my order delivery",
      prompt: "Hi FASCO team, I'd like to check the status of my order.",
    },
    {
      icon: <ShoppingBag className="w-3.5 h-3.5" />,
      text: "Size & fit guidance",
      prompt: "Hello! I need some advice choosing the right size for an item.",
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5" />,
      text: "Current deals & promo codes",
      prompt: "Hi, are there any active promo codes or deals for my cart today?",
    },
    {
      icon: <HelpCircle className="w-3.5 h-3.5" />,
      text: "Returns & exchange inquiry",
      prompt: "Hello, I have a question regarding returns and exchange policy.",
    },
  ];

  const handleSend = (textToSend?: string) => {
    const queryText = (textToSend || message).trim();
    if (!queryText) return;

    // Clean phone number (strip spaces, dashes, parentheses)
    const cleanedPhone = phoneNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(queryText)}`;

    // Open WhatsApp in a new tab/window
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const handleClose = () => {
    // Post message to parent container to toggle/close the iframe widget
    if (typeof window !== "undefined" && window.parent) {
      window.parent.postMessage({ type: "FASCO_WHATSAPP_CLOSE" }, "*");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#EFEAE2] font-sans antialiased text-[#111B21] select-none overflow-hidden relative">
      {/* Background WhatsApp Doodle Pattern Simulation */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#128C7E 1.2px, transparent 1.2px), radial-gradient(#075E54 1.2px, #EFEAE2 1.2px)`,
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
      />

      {/* Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#075E54] text-white shadow-md">
        <div className="flex items-center gap-3">
          {/* Agent Avatar with Status Indicator */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-[#054c44] flex items-center justify-center font-display text-white font-bold text-base tracking-wider overflow-hidden">
                <span className="text-white font-semibold">FC</span>
              </div>
            </div>
            {/* Online Green Pulsing Indicator */}
            <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#075E54]">
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
            </span>
          </div>

          {/* Agent Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm leading-tight tracking-wide text-white">
                {agentName}
              </span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#25D366] text-[#075E54] rounded-full text-[9px] font-bold" title="Verified Store Support">
                ✓
              </span>
            </div>
            <span className="text-[11px] text-[#A7D7C5] leading-tight">
              {agentRole} • <span className="text-[#80f2ad] font-medium">Online</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close chat window"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Chat Messages Body */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Date Stamp Chip */}
        <div className="flex justify-center my-1">
          <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[11px] font-medium text-[#54656F] shadow-xs">
            Today
          </span>
        </div>

        {/* Support Welcome Bubble */}
        <div className="flex items-start gap-2 max-w-[88%]">
          <div className="bg-white rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-sm border border-black/5 text-[#111B21] text-[13px] leading-relaxed relative">
            <p className="font-medium text-[#075E54] text-xs mb-1">
              {agentName}
            </p>
            <p className="whitespace-pre-line text-[#3B4A54]">
              {defaultGreeting}
            </p>

            {/* Timestamp & read receipts */}
            <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] text-[#667781]">
              <span>{timeString}</span>
              <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-2">
          <p className="text-[11px] text-[#667781] font-medium uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-[#128C7E]" />
            Quick questions
          </p>
          <div className="flex flex-col gap-1.5">
            {quickQuestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMessage(item.prompt);
                  handleSend(item.prompt);
                }}
                className="flex items-center gap-2 px-3 py-2 text-left bg-white/95 hover:bg-white text-[#111B21] rounded-xl border border-black/5 shadow-2xs hover:shadow-xs hover:border-[#25D366]/40 transition text-xs font-medium group active:scale-[0.99]"
              >
                <span className="text-[#128C7E] group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="flex-1">{item.text}</span>
                <span className="text-[10px] text-[#8696A0] group-hover:text-[#128C7E]">
                  Send ➔
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Input / Send Area */}
      <footer className="relative z-10 p-3 bg-[#F0F2F5] border-t border-black/5 flex flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-white text-[#111B21] placeholder-[#8696A0] text-xs px-3.5 py-2.5 rounded-full border border-black/10 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition shadow-2xs"
            />
          </div>

          {/* Send on WhatsApp Button */}
          <button
            type="submit"
            aria-label="Send via WhatsApp"
            className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4 translate-x-0.5" />
          </button>
        </form>

        {/* Security / Powered by WhatsApp badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#667781]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
          <span>Powered by WhatsApp Direct Connect</span>
        </div>
      </footer>
    </div>
  );
}

export default function WhatsAppEmbedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#EFEAE2] text-[#075E54] text-xs">
          Loading WhatsApp Chat...
        </div>
      }
    >
      <WhatsAppChatContent />
    </Suspense>
  );
}
