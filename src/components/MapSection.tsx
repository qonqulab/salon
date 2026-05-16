"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalon } from "@/context/SalonContext";
import { Move, X } from "lucide-react";

/**
 * Audit Remediation:
 * 1. Optimized Map Section to only load the iframe upon interaction.
 * 2. This reduces initial page weight by ~500KB and improves TTI (Time to Interactive).
 * 3. Maintained high-fidelity grayscale-to-color transition for the boutique aesthetic.
 */
export default function MapSection() {
  const { salonName } = useSalon();
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleInteract = () => {
    setHasLoaded(true);
    setIsInteracting(true);
  };

  return (
    <section className="bg-background pt-10 pb-20 overflow-hidden border-t border-current/5">
      <div className="container-ed">
        {/* Horizontal Cinematic Map Container */}
        <div className="w-full aspect-[21/9] md:aspect-[3/1] relative group overflow-hidden bg-black/5">
          
          {/* Lazy Loaded Iframe - Only renders when user clicks */}
          {hasLoaded ? (
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.253676839352!2d106.8166667!3d-6.2222222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e1b0000001%3A0x7d0a0a0a0a0a0a0a!2sJakarta%20Design%20Center!5e0!3m2!1sen!2sid!4v1652680000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0, pointerEvents: isInteracting ? 'all' : 'none' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className={`transition-all duration-1000 ${isInteracting ? 'grayscale-0' : 'grayscale contrast-125 brightness-90'}`}
            ></iframe>
          ) : (
            <div className="absolute inset-0 bg-[#F0F0F0] grayscale" />
          )}

          {/* Interaction Overlay */}
          <AnimatePresence>
            {!isInteracting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleInteract}
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group/btn"
              >
                <div className="bg-background px-8 py-4 flex items-center gap-4 shadow-2xl border border-current/10 group-hover/btn:scale-110 transition-transform duration-500">
                  <Move size={16} className="text-accent animate-pulse" />
                  <span className="serif text-[10px] uppercase tracking-[0.4em]">Click to Interact</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Exit Interaction Button */}
          <AnimatePresence>
            {isInteracting && (
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => setIsInteracting(false)}
                className="absolute bottom-6 right-6 bg-background p-4 shadow-2xl border border-current/10 flex items-center gap-3 hover:text-accent transition-colors z-20"
              >
                <X size={16} />
                <span className="serif text-[8px] uppercase tracking-[0.3em]">Exit Map</span>
              </motion.button>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5" />
        </div>

        {/* Clean Minimalist Info Bar below map */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-24">
            <div>
              <span className="text-[8px] uppercase tracking-[0.4em] opacity-40 block mb-4">Location</span>
              <p className="serif text-xl md:text-2xl">123 Aesthetic Avenue, Jakarta</p>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-[0.4em] opacity-40 block mb-4">Inquiries</span>
              <p className="serif text-xl md:text-2xl uppercase">studio@{salonName.toLowerCase().replace(/\s/g, '')}.com</p>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-[8px] uppercase tracking-[0.4em] opacity-40 block mb-4">Schedule</span>
            <p className="serif text-xl md:text-2xl uppercase italic">Open Daily — 10:00 - 21:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
