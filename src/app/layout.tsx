import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { siteMeta } from "@/content/portfolio";

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} - Product + Analytics`,
    template: `%s | ${siteMeta.name}`,
  },
  description:
    "Recruiter-first portfolio for Brayden Cherry, focused on product judgment, analytics systems, and measurable operating impact.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteNav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
