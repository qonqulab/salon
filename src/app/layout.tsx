import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SalonProvider } from "@/context/SalonContext";
import ThemeProvider from "@/components/ThemeProvider";
import GSAPRegister from "@/components/GSAPRegister";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Qonqu Salon | Life Design & Aesthetic Sanctuary",
  description: "A luxury life-design salon agency specializing in high-fidelity aesthetic experiences.",
  keywords: ["salon", "luxury", "beauty", "qonqu", "life design", "aesthetic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <SalonProvider>
          <ThemeProvider>
            <GSAPRegister />
            {children}
          </ThemeProvider>
        </SalonProvider>
      </body>
    </html>
  );
}
