import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container>
        {/* Link Columns */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold text-slate-900 tracking-tight"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Footer Sections */}
          {siteConfig.footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-slate-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Industrial Knowledge Intelligence Platform
          </p>
        </div>
      </Container>
    </footer>
  );
}
