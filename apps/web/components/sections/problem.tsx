"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FileX, Clock, UserX } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const painPoints = [
  {
    icon: FileX,
    stat: "70%",
    title: "Knowledge is undocumented",
    description:
      "Critical engineering knowledge lives in the heads of experienced staff — not in systems. When they leave, the knowledge leaves with them.",
  },
  {
    icon: Clock,
    stat: "30%",
    title: "Time lost searching",
    description:
      "Engineers spend nearly a third of their time searching for information across disconnected systems, shared drives, and email threads.",
  },
  {
    icon: UserX,
    stat: "$4.5M",
    title: "Cost of knowledge loss",
    description:
      "Large industrial facilities lose millions annually due to repeated incidents, re-work, and inability to access institutional knowledge.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionHeading
          label="The Problem"
          title="The knowledge problem costs industries billions."
          description="Industrial organizations generate mountains of engineering documents. But without connections, context, or intelligence — they remain silent."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease,
                }}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50">
                  <Icon size={20} className="text-red-500" />
                </div>

                {/* Stat */}
                <p className="mt-5 text-3xl font-semibold text-slate-900 tracking-tight">
                  {point.stat}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-base font-medium text-slate-900">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
