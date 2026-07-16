"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Droplets, Zap, Factory, FlaskConical } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const useCases = [
  {
    icon: Droplets,
    industry: "Oil & Gas",
    description:
      "Connect P&IDs, maintenance logs, and safety procedures across upstream and downstream operations. Reduce incident response time by surfacing relevant precedents instantly.",
    highlight: "Incident response",
  },
  {
    icon: Zap,
    industry: "Power & Energy",
    description:
      "Link equipment specifications, outage reports, and regulatory filings into a unified knowledge base. Ensure compliance continuity across plant turnarounds.",
    highlight: "Compliance continuity",
  },
  {
    icon: Factory,
    industry: "Manufacturing",
    description:
      "Bridge SOPs, quality records, and equipment manuals to reduce downtime and improve consistency. Surface root cause patterns across production lines.",
    highlight: "Root cause analysis",
  },
  {
    icon: FlaskConical,
    industry: "Pharmaceuticals",
    description:
      "Connect batch records, validation protocols, and regulatory submissions for complete knowledge traceability. Accelerate deviation investigations.",
    highlight: "Deviation investigations",
  },
];

export function UseCases() {
  return (
    <section id="solutions" className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionHeading
          label="Industries"
          title="Built for industrial complexity."
          description="Athleia is purpose-built for industries where engineering knowledge is mission-critical and document volumes are massive."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.industry}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50">
                    <Icon size={22} className="text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {useCase.industry}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {useCase.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
