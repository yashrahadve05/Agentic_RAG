export const siteConfig = {
  name: "Athleia",
  tagline: "Industrial Knowledge Intelligence",
  description:
    "Athleia transforms scattered industrial documents into connected organizational intelligence — so your teams find answers, not files.",
  url: "https://athleia.com",

  navLinks: [
    { label: "Product", href: "#product" },
    { label: "Solutions", href: "#solutions" },
    { label: "Enterprise", href: "#enterprise" },
  ],

  footerSections: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#capabilities" },
        { label: "Use Cases", href: "#solutions" },
        { label: "Enterprise", href: "#enterprise" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Status", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ],
} as const;
