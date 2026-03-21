import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const { projectId, dataset } = client.config();
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;
const urlFor = (source: any) => (builder ? builder.image(source) : null);

export async function generateMetadata(): Promise<Metadata> {
  const query = `*[_type == "resume"][0]{ siteTitle, favicon }`;
  const siteConfig = await client.fetch(query, {}, { next: { revalidate: 0 } });

  const faviconUrl = siteConfig?.favicon
    ? urlFor(siteConfig.favicon)?.width(64).height(64).url()
    : "/favicon.ico";

  return {
    title: siteConfig?.siteTitle || "Orven Casido | Portfolio",
    description: "Personal Portfolio and Resume",
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
  };
}


import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider defaultTheme="system">
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>

  );
}

