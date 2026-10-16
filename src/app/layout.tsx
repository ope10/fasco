import type { Metadata } from "next";
import { Poppins, Volkhov } from "next/font/google";
import "./globals.css";
import { MiniCart } from "@/components/shop/mini-cart";
import { WhatsAppFloatingWidget } from "@/components/chat/whatsapp-floating-widget";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const volkhov = Volkhov({
  variable: "--font-volkhov",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "FASCO - Official eCommerce Store",
  description: "FASCO Fashion & Online Shopping - Ultimate Sale, New Arrivals & Deals of the Month",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${volkhov.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#484848] font-sans">
        {children}
        <MiniCart />
        <WhatsAppFloatingWidget />
      </body>
    </html>
  );
}
