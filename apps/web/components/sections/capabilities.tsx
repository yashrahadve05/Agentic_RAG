"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Layers,
  Tags,
  Network,
  MessageCircle,
  Quote,
  ShieldCheck,
} from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const capabilities = [
  {
    icon: Layers,
    title: "Knowledge Extraction",
    description:
      "Automatically extract entities, specifications, and procedures from engineering documents. No manual tagging required — AI handles the heavy lifting.",
  },
  {
    icon: Tags,
    title: "Entity Resolution",
    description:
      "Identify and resolve equipment tags, component references, and technical terms across thousands of documents into a unified vocabulary.",
  },
  {
    icon: Network,
    title: "Relationship Discovery",
    description:
      "Uncover connections between equipment, procedures, incidents, and specifications that manual review would miss across your entire corpus.",
  },
  {
    icon: MessageCircle,
    title: "AI Copilot",
    description:
      "Ask questions in plain language and get grounded answers backed by your organization\u2019s actual documentation. No hallucinations — only sourced responses.",
  },
  {
    icon: Quote,
    title: "Citation Engine",
    description:
      "Every AI response links back to source documents with page-level citations. Full traceability for audits, compliance reviews, and engineering decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Tracking",
    description:
      "Monitor regulatory requirements against your documentation. Get alerts when knowledge gaps affect compliance status or when standards change.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          label="Capabilities"
          title="Everything your engineering teams need."
          description="Six core capabilities that transform how industrial organizations capture, connect, and access their engineering knowledge."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-card hover:shadow-float hover:border-gray-300 transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease,
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                  <Icon size={20} className="text-indigo-600" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-900">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
