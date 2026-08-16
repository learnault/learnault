"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Learnault?",
    answer:
      "Learnault is a decentralized learn-to-earn platform built on the Stellar blockchain. We help users learn digital skills, earn token rewards for their progress, and receive verifiable on-chain credentials.",
  },
  {
    question: "How do I earn rewards?",
    answer: "You earn rewards automatically by completing learning modules, passing quizzes, and actively participating in community challenges.",
  },
  {
    question: "Are certificates recognized?",
    answer: "Yes, our certificates are partnered with industry leaders and can be verified seamlessly for absolute authenticity.",
  },
  {
    question: "Is it free to use?",
    answer: "We offer a robust free tier to get you started, along with premium pathways for advanced certifications and higher earning potential.",
  },
  {
    question: "Do I need crypto knowledge?",
    answer: "Not at all! Our platform is designed to be incredibly user-friendly for beginners. Any technical aspects operate behind the scenes.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section id="faq" className="w-full py-20 px-4 bg-white flex flex-col items-center">
    <section className="w-full py-20 px-4 bg-surface flex flex-col items-center">
      {/* Title with tighter tracking and specific Slate color to match Figma */}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center tracking-tight">
        Frequently Asked Questions
      </h2>

      <div className="w-full max-w-3xl flex flex-col space-y-3">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;

          return (
            <div
              key={index}
              className={`transition-all duration-300 border rounded-xl overflow-hidden ${
                isOpen 
                  ? "border-primary/60 bg-primary/10" // Gold border and soft yellow tint for active state
                  : "border-border bg-surface" // Subtle border for inactive
              }`}
            >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={`font-semibold text-lg ${isOpen ? "text-gray-900" : "text-gray-700"}`}>
                    {item.question}
                  </span>

                  <span
                    className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                </button>

              <div
                id={panelId}
                role="region"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 text-gray-500 leading-relaxed text-base">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;