import type { FooterColumn, NavItem } from "@/types/navigation";

export const generalNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Packages", href: "/packages" },
];

export const shopNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Products", href: "/shop" },
  { label: "Pages", href: "#" },
];

export const pagesDropdown: NavItem[] = [
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Packages", href: "/packages" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Support",
    links: [
      { label: "Support Center", href: "/" },
      { label: "Invoicing", href: "/" },
      { label: "Contract", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Blog", href: "/" },
      { label: "FAQ,s", href: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Return Policy", href: "/" },
      { label: "Shipping Policy", href: "/" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Men's Fashion", href: "/shop" },
      { label: "Women's Fashion", href: "/shop" },
      { label: "Accessories", href: "/shop" },
      { label: "Discount Deals", href: "/deals" },
    ],
  },
];
