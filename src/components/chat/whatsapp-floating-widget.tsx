"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";

export interface WhatsAppFloatingWidgetProps {
  /**
   * Phone number including country code (e.g. "+1234567890" or "1234567890")
   */
  phoneNumber?: string;
  /**
   * Name of the customer support agent / team
   */
  agentName?: string;
  /**
   * Role or title displayed under the agent name
   */
  agentRole?: string;
  /**
   * Initial welcome greeting shown in the chat window
   */
  initialGreeting?: string;
  /**
   * Screen position: "bottom-right" or "bottom-left"
   */
  position?: "bottom-right" | "bottom-left";
  /**
   * Source for the iframe: can be "/embed/whatsapp" or "/whatsapp-widget.html"
   */
  iframeSource?: string;
}

export function WhatsAppFloatingWidget({
  phoneNumber = "+2348132700703",
  agentName = "FASCO Concierge",
  agentRole = "Online Fashion Stylist",
  initialGreeting = "Hello! 👋 Welcome to FASCO Luxury Fashion.\n\nHow can our styling team help you today? Inquire about sizing, discounts, or your orders!",
  position = "bottom-right",
  iframeSource = "/embed/whatsapp",
}: WhatsAppFloatingWidgetProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Do not render the floating widget inside iframe/embed routes
  if (pathname?.startsWith("/embed")) {
    return null;
  }

  // Mark unread as dismissed when opened
  const handleToggle = () => {
    if (!isOpen) {
      setHasUnread(false);
      setHasOpenedOnce(true);
    }
    setIsOpen(!isOpen);
  };

  // Close when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Listen to postMessage from the iframe (e.g. close button clicked inside iframe)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "FASCO_WHATSAPP_CLOSE") {
        setIsOpen(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Show a welcome tooltip after 4 seconds on initial load if user hasn't clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedOnce) {
        setShowTooltip(true);
      }
    }, 4000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [hasOpenedOnce]);

  // Construct iframe query URL
  const queryParams = new URLSearchParams({
    phone: phoneNumber,
    name: agentName,
    role: agentRole,
    greeting: initialGreeting,
  });
  const fullIframeSrc = `${iframeSource}?${queryParams.toString()}`;

  const positionClasses =
    position === "bottom-left"
      ? "left-3 sm:left-6 items-start"
      : "right-3 sm:right-6 items-end";

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-3 sm:bottom-6 z-50 flex flex-col ${positionClasses} pointer-events-none select-none`}
      aria-label="WhatsApp Chat Support Widget"
    >
      {/* 1. Chat Popup Window (containing the iframe) */}
      <div
        className={`pointer-events-auto mb-2.5 sm:mb-3 transition-all duration-300 ease-out origin-bottom-${
          position === "bottom-left" ? "left" : "right"
        } ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{
          width: "min(360px, calc(100vw - 24px))",
          height: "min(520px, calc(100vh - 90px))",
        }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 border border-black/5 bg-white flex flex-col">
          {/* Iframe embedding the WhatsApp Chat Widget */}
          <iframe
            src={fullIframeSrc}
            title="WhatsApp Live Chat Widget"
            className="w-full h-full border-0 rounded-2xl"
            loading="lazy"
            allow="clipboard-write"
          />
        </div>
      </div>

      {/* 2. Floating Action Button & Tooltip Bar */}
      <div className="relative flex items-center gap-3 pointer-events-auto">
        {/* Tooltip speech bubble */}
        {!isOpen && showTooltip && (
          <div
            className={`hidden sm:flex items-center gap-2 bg-white text-[#111B21] px-3.5 py-2 rounded-xl shadow-lg border border-black/10 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              position === "bottom-left" ? "order-last ml-2" : "order-first mr-2"
            }`}
          >
            <span>💬 Chat with a FASCO stylist</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-gray-400 hover:text-gray-600 transition ml-1"
              aria-label="Dismiss tooltip"
            >
              ×
            </button>
          </div>
        )}

        {/* The Floating WhatsApp Icon Button */}
        <button
          type="button"
          onClick={handleToggle}
          onMouseEnter={() => !isOpen && setShowTooltip(true)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className={`relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer transition-all duration-300 transform active:scale-95 ${
            isOpen
              ? "bg-[#1E293B] hover:bg-[#0F172A] shadow-black/20"
              : "bg-[#25D366] hover:bg-[#20bd5a] hover:scale-105 shadow-[#25D366]/40"
          }`}
        >
          {/* Subtle Radar Pulse Ring when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          )}

          {/* Unread Message Badge */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-md ring-2 ring-white">
              1
            </span>
          )}

          {/* Icon Animation Container */}
          <div className="relative w-7 h-7 flex items-center justify-center transition-transform duration-300">
            {isOpen ? (
              <X className="w-6 h-6 animate-in spin-in-90 duration-200" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-current transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.11l-.29-.17-3.02.79.81-2.94-.19-.3a8.196 8.196 0 01-1.25-4.48c0-4.54 3.7-8.24 8.24-8.24h-.48zm-3.6 3.82c-.2 0-.46.07-.7.34-.24.26-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.73.13.18 1.83 2.89 4.49 3.97.63.26 1.13.41 1.51.53.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.27.22-.63.22-1.16.16-1.27-.07-.12-.24-.18-.5-.31-.26-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.26-.69.87-.85 1.05-.16.18-.31.2-.58.07-.26-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.47-1.83-.16-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.98-.22-.52-.44-.45-.6-.46l-.52-.01z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
