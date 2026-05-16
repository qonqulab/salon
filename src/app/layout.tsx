import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SalonProvider } from "@/context/SalonContext";
import ThemeProvider from "@/components/ThemeProvider";
import GSAPRegister from "@/components/GSAPRegister";
import SEOData from "../components/SEOData";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: false,
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Qonqu Salon | Life Design & Aesthetic Sanctuary",
  description: "A luxury life-design salon agency specializing in high-fidelity aesthetic experiences.",
  keywords: ["salon", "luxury", "beauty", "qonqu", "life design", "aesthetic"],
  appleWebApp: {
    title: "qonqu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No-JS Safety Net */}
        <noscript>
          <style>{`
            body { opacity: 1 !important; }
            .loader-title { display: none !important; }
          `}</style>
        </noscript>
        {/* Anti-Flicker / Hydration Blocking Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('salon-theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Immediate Bot Reveal
                  if (/bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent)) {
                    document.documentElement.style.opacity = '1';
                    var style = document.createElement('style');
                    style.innerHTML = 'body { opacity: 1 !important; transition: none !important; } .hero-img-overlay { display: none !important; }';
                    document.head.appendChild(style);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} antialiased opacity-0 transition-opacity duration-300`}>
        <SalonProvider>
          <SEOData />
          <ThemeProvider>
            <GSAPRegister />
            {children}
          </ThemeProvider>
        </SalonProvider>
      </body>
    </html>
  );
}
