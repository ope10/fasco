import Link from "next/link";
import { Globe, MessageCircle, Mail, Share2 } from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
  },
  // {
  //   title: "Support",
  //   links: [
  //     { label: "Help Center", href: "/help" },
  //     { label: "Contact Us", href: "/contact" },
  //     { label: "Returns & Exchanges", href: "/returns" },
  //     { label: "Shipping Info", href: "/shipping" },
  //     { label: "Size Guide", href: "/size-guide" },
  //   ],
  // },
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Deals & Offers", href: "/deals" },
      { label: "Packages", href: "/packages" },
      { label: "All Products", href: "/shop" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

const socials = [
  { icon: Globe, href: "https://fasco.com", label: "Website" },
  { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@fasco.com", label: "Email" },
  { icon: Share2, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#f0f0f0] bg-white text-[#484848]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 md:px-10">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand column: spans 2 columns on mobile/tablet */}
          <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-5">
            <Link
              href="/"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#222222] hover:opacity-80 transition"
            >
              FASCO
            </Link>
            <p className="text-sm text-[#8a8a8a] leading-relaxed max-w-xs">
              Premium clothing for the modern wardrobe. Effortless style, curated quality.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e8e8e8] text-[#484848] transition hover:border-black hover:text-black"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#222222]">
                {section.title}
              </p>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8a8a8a] transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#f2f2f2]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-[#8a8a8a] sm:flex-row md:px-10">
          <p>Copyright &copy; 2026 FASCO. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-black transition">Privacy</Link>
            <Link href="/terms" className="hover:text-black transition">Terms</Link>
            <Link href="/cookies" className="hover:text-black transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
