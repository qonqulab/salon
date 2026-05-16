"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I define my aesthetic journey?",
    answer: "Every client begins with a sensorial consultation where we map your biological needs against your aesthetic aspirations. We don't just provide services; we design a lifestyle."
  },
  {
    question: "What products are used in the rituals?",
    answer: "We exclusively use our proprietary botanical formulations and curated organic brands that prioritize biocompatibility and sustainable luxury."
  },
  {
    question: "Are your artisans internationally trained?",
    answer: "Yes, our team consists of award-winning designers and aestheticians who undergo continuous training in global architecture-inspired beauty techniques."
  },
  {
    question: "Can I book a private studio session?",
    answer: "We offer private suites for a completely immersive and secluded experience. Please mention this preference during your reservation."
  },
  {
    question: "What is your philosophy on 'Life Design'?",
    answer: "Life Design is the art of curating your physical presence and environment to reflect your inner architecture. It's about coherence between your look, your space, and your soul."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-40 bg-background">
      <div className="container-ed">
        <div className="flex flex-col md:flex-row gap-10 md:gap-32">
          <div className="md:w-1/3">
            <span className="serif text-accent tracking-[0.4em] text-[10px] uppercase mb-8 block">Inquiries</span>
            <h2 className="serif text-5xl md:text-7xl">Frequently <br /> Asked</h2>
          </div>

          <div className="md:w-2/3 flex flex-col">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-current/10">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full py-8 flex justify-between items-center text-left group"
                >
                  <h3 className="serif text-xl md:text-2xl opacity-60 group-hover:pl-4 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">
                    {faq.question}
                  </h3>
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-current/20 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:border-accent group-hover:text-background">
                    {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-10 text-sm md:text-lg opacity-60 max-w-xl leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
