"use client";

import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import MenuSection from "@/components/MenuSection";
import TeamSection from "@/components/TeamSection";
import JournalSection from "@/components/JournalSection";
import BookingSection from "@/components/BookingSection";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Button from "@/components/Button";
import EditorialQuote from "@/components/EditorialQuote";
import FaqSection from "@/components/FaqSection";
import MapSection from "@/components/MapSection";
import { useSalon } from "@/context/SalonContext";

export default function Home() {
  const { salonName } = useSalon();
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <CustomCursor />
        <Preloader />
        <Navbar />
        <Hero />
        
        <AboutSection />

        <EditorialQuote />
        
        <ServicesGrid />

        <section id="menu">
          <MenuSection />
        </section>

        <section id="team">
          <TeamSection />
        </section>

        <section id="journal">
          <JournalSection />
        </section>

        <FaqSection />

        <BookingSection />

        <MapSection />

        <footer className="py-20 border-t border-current/10">
          <div className="container-ed grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="serif text-4xl mb-10">Experience <br /> {salonName}</h2>
              <p className="text-sm opacity-60 max-w-xs mb-8">
                Located in the heart of the city, {salonName} is an urban sanctuary for the modern individual.
              </p>
              <Button href="#booking" className="mt-8">
                Book an Appointment
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-10 text-[10px] uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-4">
                <span className="opacity-40">Follow</span>
                <span>Instagram</span>
                <span>Behance</span>
                <span>Pinterest</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="opacity-40">Contact</span>
                <span>info@{salonName.toLowerCase().replace(/\s/g, '')}.com</span>
                <span>+62 812 3456 7890</span>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
          <div className="mt-20 container-ed flex justify-between items-center text-[8px] opacity-30 uppercase tracking-widest">
            <span>© 2026 {salonName}. All Rights Reserved.</span>
            <a href="https://qonqu.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-accent transition-all duration-500">
              Designed by Qonqu Agency
            </a>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
