"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useSalon } from "@/context/SalonContext";

export default function Preloader() {
  const [isInputStage, setIsInputStage] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { setSalonName, theme } = useSalon();
  const overlayRef = useRef(null);

  const startCinematic = () => {
    if (!inputValue.trim()) return;
    
    setSalonName(inputValue);
    setIsInputStage(false);

    setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
        },
      });

      tl.fromTo(".loader-title", 
        { y: 100, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: "expo.out" }
      );

      tl.to(".loader-title", {
        scale: 1.2,
        letterSpacing: "1em",
        opacity: 0,
        duration: 2,
        ease: "power4.inOut"
      }, "+=0.5");

      tl.to(".loader-panel", {
        scaleY: 0,
        duration: 1.5,
        stagger: {
          amount: 0.8,
          from: "edges"
        },
        ease: "power4.inOut",
      }, "-=1.5");
      
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        pointerEvents: "none"
      }, "-=0.5");
    }, 100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[2000] overflow-hidden"
        >
          {isInputStage ? (
            <motion.div 
              key="input-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#121212] flex items-center justify-center z-[2010]"
            >
              <div className="w-full max-w-md px-10 text-center">
                <span className="serif text-accent tracking-[0.4em] text-[10px] uppercase mb-10 block">Design Your Identity</span>
                <input 
                  autoFocus
                  type="text" 
                  placeholder="ENTER SALON NAME"
                  className="w-full bg-transparent border-b border-white/20 py-4 text-center serif text-white outline-none focus:border-accent transition-colors uppercase placeholder:text-white/20"
                  style={{ fontSize: 'clamp(1.5rem, 8vw, 3rem)' }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && startCinematic()}
                />
                <button 
                  onClick={startCinematic}
                  className="mt-12 text-[10px] text-white uppercase tracking-[0.5em] border-b border-white/20 pb-2 hover:border-accent transition-all duration-500"
                >
                  Enter Experience
                </button>
              </div>
            </motion.div>
          ) : (
            <div key="cinematic-stage" className="absolute inset-0 flex z-[2005]">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="loader-panel flex-1 h-full bg-[#1A1A1A] origin-top" />
              ))}
              
              <div className="absolute inset-0 flex items-center justify-center z-[2006] pointer-events-none">
                <h1 
                  className="loader-title serif text-[#F8F5F2] uppercase text-center px-10 whitespace-nowrap"
                  style={{ fontSize: 'clamp(2rem, 10vw, 6rem)' }}
                >
                  {inputValue}
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
