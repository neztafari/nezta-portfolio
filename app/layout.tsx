import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

// Fonts are stored in app/fonts so the site builds without calling Google Fonts.
const unbounded = localFont({
  src: [
    { path: "./fonts/unbounded-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/unbounded-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/unbounded-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-display",
});

const geist = localFont({
  src: [
    { path: "./fonts/geist-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/geist-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-sans",
});

const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
});

const title = "Nezta Misgi Febyandanu · Software Engineer";
const description =
  "Portfolio of Nezta Misgi Febyandanu, a software engineer building mobile, web and Unity WebGL applications.";

// The preview image comes from app/opengraph-image.tsx; Next adds it to openGraph and twitter.
export const metadata: Metadata = {
  metadataBase: new URL("https://neztanez.netlify.app"),
  title,
  description,
  openGraph: { type: "website", url: "/", siteName: "Nezta Misgi Febyandanu", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
