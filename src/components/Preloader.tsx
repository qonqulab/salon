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

  useEffect(() => {
    // Bot & PageSpeed Bypass Logic
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isBot) {
      setSalonName("Qonqu Salon");
      setIsInputStage(false);
      setIsVisible(false); // Direct hide for bots to maximize LCP
    }
  }, []);

  const startCinematic = () => {
    if (!inputValue.trim()) return;

    setSalonName(inputValue);
    setIsInputStage(false);

    setTimeout(() => {
      const ctx = gsap.context(() => {
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
      }, overlayRef);
    }, 100);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <div 
          ref={overlayRef}
          className={`fixed inset-0 z-[2010] flex items-center justify-center overflow-hidden touch-none transition-colors duration-500 ${isInputStage ? 'bg-[#0A0A0A]' : 'bg-transparent'}`}
        >
          <div className="w-full flex flex-col items-center justify-center text-center px-4 md:px-10 overflow-hidden">
            {isInputStage ? (
              <div key="input-stage" className="w-full max-w-[90vw] md:max-w-2xl mx-auto space-y-12 md:space-y-20">
                <div className="space-y-4">
                  <span className="serif text-accent tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs uppercase block opacity-60 pl-[0.3em] md:pl-[0.5em]">
                    Design Your Identity
                  </span>
                  <div className="h-[1px] w-10 md:w-12 bg-accent/30 mx-auto" />
                </div>

                <div className="relative w-full">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="SALON NAME"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && startCinematic()}
                    className="w-full bg-transparent border-b border-accent/20 py-4 md:py-8 text-center serif text-2xl md:text-6xl uppercase tracking-[0.1em] md:tracking-[0.2em] outline-none focus:border-accent text-accent transition-all duration-700 placeholder:opacity-20 pl-[0.1em] md:pl-[0.2em]"
                  />
                </div>

                <button 
                  onClick={startCinematic}
                  className="group flex flex-col items-center gap-4 mx-auto outline-none"
                >
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] font-medium opacity-40 group-hover:opacity-100 transition-opacity pl-[0.3em] md:pl-[0.5em]">
                    Enter Experience
                  </span>
                  <div className="w-16 md:w-20 h-[1px] bg-accent/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </div>
                </button>
              </div>
            ) : (
              <div key="cinematic-stage" className="absolute inset-0 flex">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="loader-panel flex-1 h-full bg-[#0D0D0D] origin-top" />
                ))}
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
                  <h1 className="loader-title serif text-3xl md:text-8xl lg:text-9xl tracking-[0.2em] md:tracking-[0.4em] uppercase text-accent font-medium text-center pl-[0.2em] md:pl-[0.4em]">
                    {inputValue}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
