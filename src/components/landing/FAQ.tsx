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
    answer:
      "You earn rewards automatically by completing learning modules, passing quizzes, and actively participating in community challenges.",
  },
  {
    question: "Are certificates recognized?",
    answer:
      "Yes, our certificates are partnered with industry leaders and can be verified seamlessly for absolute authenticity.",
  },
  {
    question: "Is it free to use?",
    answer:
      "We offer a robust free tier to get you started, along with premium pathways for advanced certifications and higher earning potential.",
  },
  {
    question: "Do I need crypto knowledge?",
    answer:
      "Not at all! Our platform is designed to be incredibly user-friendly for beginners. Any technical aspects operate behind the scenes.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="flex w-full flex-col items-center bg-surface px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="flex w-full max-w-3xl flex-col space-y-3">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const cardClasses = isOpen
            ? "border-primary/60 bg-primary/10"
            : "border-border bg-surface";
          const titleClasses = isOpen ? "text-gray-900" : "text-gray-700";
          const iconClasses = isOpen ? "rotate-180 text-primary" : "text-gray-400";
          const panelClasses = isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0";

          return (
            <div
              key={`${item.question}-${index}`}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${cardClasses}`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="group flex w-full items-center justify-between p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className={`text-lg font-semibold ${titleClasses}`}>
                  {item.question}
                </span>

                <span className={`transition-transform duration-300 ${iconClasses}`}>
                  <ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                className={`grid transition-all duration-300 ease-in-out ${panelClasses}`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 text-base leading-relaxed text-gray-500">
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