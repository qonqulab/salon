"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { useSalon } from "@/context/SalonContext";

/**
 * Audit Remediation:
 * 1. Implemented explicit ID-Label associations for high-fidelity accessibility (WCAG).
 * 2. Added cleanup logic for the submission timeout to prevent memory leaks.
 * 3. Standardized input transitions for a smoother tactile feel.
 */
export default function BookingSection() {
  const { salonName } = useSalon();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Hair Design",
    date: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSubmitting) {
      timeout = setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isSubmitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <section id="booking" className="py-40 bg-background">
      <div className="container-ed">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="serif text-accent tracking-[0.4em] text-xs uppercase mb-8 block">Reservations</span>
          <h2 className="serif text-4xl md:text-6xl">Secure Your Moment</h2>
        </div>

        <div className="max-w-xl mx-auto bg-background p-10 md:p-20 shadow-2xl border border-current/5">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="booking-name" className="text-[10px] uppercase tracking-widest opacity-40">Full Name</label>
                  <input 
                    id="booking-name"
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="bg-transparent border-b border-current/10 py-2 focus:border-accent outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="booking-email" className="text-[10px] uppercase tracking-widest opacity-40">Email Address</label>
                  <input 
                    id="booking-email"
                    required
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-transparent border-b border-current/10 py-2 focus:border-accent outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="booking-service" className="text-[10px] uppercase tracking-widest opacity-40">Service</label>
                    <select 
                      id="booking-service"
                      className="border-b border-current/10 py-2 focus:border-accent outline-none bg-transparent"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option className="bg-background text-foreground">Hair Design</option>
                      <option className="bg-background text-foreground">Skin Therapy</option>
                      <option className="bg-background text-foreground">Aesthetic Rituals</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="booking-date" className="text-[10px] uppercase tracking-widest opacity-40">Preferred Date</label>
                    <input 
                      id="booking-date"
                      required
                      type="date" 
                      className="bg-transparent border-b border-current/10 py-2 focus:border-accent outline-none"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full py-6"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-20"
              >
                <div className="h-20 w-20 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="serif text-3xl mb-4">Request Received</h3>
                <p className="text-sm opacity-60">We will contact you shortly to confirm your appointment at {salonName}.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-10 text-[10px] uppercase tracking-widest border-b border-black pb-1"
                >
                  Book another session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
