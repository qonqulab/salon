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
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
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
      <SalonProvider>
        <head>
          <SEOData />
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
                    document.body.setAttribute('data-theme', theme);
                  } catch (e) {}
                })();
              `,
            }}
          />
        </head>
        <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} antialiased opacity-0 transition-opacity duration-300`}>
          <ThemeProvider>
            <GSAPRegister />
            {children}
          </ThemeProvider>
        </body>
      </SalonProvider>
    </html>
  );
}
