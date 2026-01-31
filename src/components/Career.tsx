"use client";

import { useState } from "react";
import profile from "@/data/profile.json";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Career() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="career" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <FadeInSection>
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Career
          </h2>
        </FadeInSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-dark-border md:left-6" />

          {profile.career.map((item, index) => (
            <FadeInSection key={index}>
              <div className="relative mb-8 pl-12 md:pl-16">
                {/* Timeline dot */}
                <div
                  className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 md:left-4.5 ${
                    index === 0
                      ? "border-teal-400 bg-teal-500"
                      : "border-dark-border bg-dark-card"
                  }`}
                />

                {/* Card */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full cursor-pointer text-left rounded-2xl border border-dark-border bg-dark-card p-6 transition-colors hover:border-teal-500/30"
                >
                  <div className="mb-1 text-sm text-teal-400">
                    {item.period}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">{item.role}</p>

                  {/* Expand icon */}
                  <svg
                    className={`absolute right-6 top-6 h-5 w-5 text-gray-500 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded content */}
                {openIndex === index && (
                  <div className="mt-2 rounded-xl border border-dark-border bg-dark-card/50 p-6">
                    <p className="mb-4 text-sm leading-relaxed text-gray-300">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
