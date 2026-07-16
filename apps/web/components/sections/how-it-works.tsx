"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Upload, Brain, GitFork, MessageSquareText } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Ingest",
    description:
      "Upload engineering documents, P&IDs, SOPs, maintenance logs, and inspection reports. Athleia handles PDFs, scanned documents, spreadsheets, and structured data — no reformatting required.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Understand",
    description:
      "AI reads every document, extracts technical entities — equipment tags, procedures, specifications, failure modes — and maps their relationships automatically. No manual tagging.",
  },
  {
    number: "03",
    icon: GitFork,
    title: "Connect",
    description:
      "A living knowledge graph forms across your entire document corpus. Every piece of knowledge is linked to its source, context, and related concepts across thousands of documents.",
  },
  {
    number: "04",
    icon: MessageSquareText,
    title: "Answer",
    description:
      "Ask questions in plain language. Get grounded answers with citations to source documents. Every response is traceable, verifiable, and backed by your organization\u2019s actual documentation.",
  },
];

export function HowItWorks() {
  return (
    <section id="product" className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionHeading
          label="How It Works"
          title="Four steps to organizational intelligence."
          description="From raw documents to grounded answers — Athleia automates the entire knowledge pipeline."
        />

        <div className="mt-20 relative">
          {/* Vertical connector line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                >
                  <div
                    className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content side */}
                    <div
                      className={`flex-1 ${
                        isEven ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-3 ${
                          isEven
                            ? "lg:flex-row-reverse"
                            : "lg:flex-row"
                        }`}
                      >
                        <span className="text-xs font-mono font-medium text-indigo-500">
                          {step.number}
                        </span>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-md inline-block">
                        {step.description}
                      </p>
                    </div>

                    {/* Center node (desktop) */}
                    <div className="hidden lg:flex items-center justify-center relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-card flex items-center justify-center">
                        <Icon size={20} className="text-indigo-600" />
                      </div>
                    </div>

                    {/* Mobile icon */}
                    <div className="lg:hidden absolute -left-0 top-0">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <Icon size={18} className="text-indigo-600" />
                      </div>
                    </div>

                    {/* Empty side for balance */}
                    <div className="flex-1 hidden lg:block" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
