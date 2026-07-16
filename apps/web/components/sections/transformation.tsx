"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FileText, Search, HelpCircle, GitBranch, Link2, MessageCircle } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const beforeItems = [
  { icon: FileText, label: "Documents in silos" },
  { icon: Search, label: "Knowledge locked in PDFs" },
  { icon: HelpCircle, label: "Answers take hours" },
];

const afterItems = [
  { icon: GitBranch, label: "Knowledge mapped automatically" },
  { icon: Link2, label: "Connections discovered by AI" },
  { icon: MessageCircle, label: "Answers in seconds" },
];

export function Transformation() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          label="The Shift"
          title="From scattered documents to connected intelligence."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ---- BEFORE Panel ---- */}
          <motion.div
            className="relative rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10 overflow-hidden"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-slate-400 mb-3">
              Before Athleia
            </p>
            <h3 className="text-xl font-semibold text-slate-900">
              Scattered. Silent. Disconnected.
            </h3>

            {/* Scattered document visualization */}
            <div className="mt-8 relative h-40 flex items-center justify-center">
              {[
                { rotate: -8, x: -60, y: -20 },
                { rotate: 4, x: 20, y: -30 },
                { rotate: -3, x: 80, y: 10 },
                { rotate: 6, x: -30, y: 20 },
                { rotate: -5, x: 60, y: -10 },
                { rotate: 2, x: -80, y: 0 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-14 h-18 rounded-md border border-gray-200 bg-white shadow-sm flex items-center justify-center"
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg)`,
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <FileText size={16} className="text-slate-300" />
                </motion.div>
              ))}
            </div>

            {/* Pain list */}
            <div className="mt-6 space-y-3">
              {beforeItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100">
                      <Icon size={14} className="text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-500">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ---- AFTER Panel ---- */}
          <motion.div
            className="relative rounded-2xl border border-indigo-100 bg-indigo-50/30 p-8 sm:p-10 overflow-hidden"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-indigo-500 mb-3">
              With Athleia
            </p>
            <h3 className="text-xl font-semibold text-slate-900">
              Connected. Alive. Answering.
            </h3>

            {/* Connected graph visualization */}
            <div className="mt-8 relative h-40 flex items-center justify-center">
              <svg
                viewBox="0 0 240 120"
                className="w-60 h-auto"
                fill="none"
                aria-hidden="true"
              >
                {/* Edges */}
                {[
                  [40, 35, 120, 20],
                  [120, 20, 200, 35],
                  [40, 35, 80, 85],
                  [120, 20, 120, 70],
                  [200, 35, 160, 85],
                  [80, 85, 120, 70],
                  [120, 70, 160, 85],
                  [80, 85, 160, 85],
                ].map(([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#a5b4fc"
                    strokeWidth={1.5}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease }}
                  />
                ))}
                {/* Nodes */}
                {[
                  [40, 35], [120, 20], [200, 35],
                  [80, 85], [120, 70], [160, 85],
                ].map(([cx, cy], i) => (
                  <motion.circle
                    key={i}
                    cx={cx} cy={cy} r={7}
                    fill="#eef2ff"
                    stroke="#818cf8"
                    strokeWidth={1.5}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease }}
                  />
                ))}
              </svg>
            </div>

            {/* Benefits list */}
            <div className="mt-6 space-y-3">
              {afterItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100">
                      <Icon size={14} className="text-indigo-600" />
                    </div>
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
