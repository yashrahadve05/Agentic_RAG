"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FileText, GitFork, MessageSquareText, ExternalLink } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

/**
 * Stylized product mockup — built entirely with HTML/CSS.
 * Shows a sidebar with navigation, a knowledge graph view,
 * and an AI answer panel with a citation link.
 */
export function ProductExperience() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          label="The Product"
          title="See Athleia in action."
          description="A unified workspace where your documents become searchable knowledge, your knowledge forms a living graph, and your questions get grounded answers."
        />

        {/* Browser frame mockup */}
        <motion.div
          className="mt-16 rounded-2xl border border-gray-200 bg-white shadow-float overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
        >
          {/* ---- Title bar ---- */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-xs text-slate-400 bg-gray-100 rounded-md px-4 py-1">
                app.athleia.com
              </div>
            </div>
            <div className="w-[52px]" /> {/* Spacer for symmetry */}
          </div>

          {/* ---- App content ---- */}
          <div className="flex min-h-[420px] sm:min-h-[480px]">
            {/* Sidebar */}
            <div className="hidden sm:flex flex-col w-52 border-r border-gray-100 bg-gray-50/30 p-4 gap-1">
              <div className="text-sm font-semibold text-slate-900 mb-4 px-2">
                Athleia
              </div>
              {[
                { icon: FileText, label: "Documents", active: false },
                { icon: GitFork, label: "Knowledge Graph", active: true },
                { icon: MessageSquareText, label: "Ask AI", active: false },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-slate-500 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </div>
                );
              })}
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              {/* Graph view */}
              <div className="flex-1 p-6 sm:p-8 flex items-center justify-center relative">
                <svg
                  viewBox="0 0 400 200"
                  className="w-full max-w-md h-auto"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Graph edges */}
                  {[
                    [60, 50, 160, 30],
                    [160, 30, 260, 50],
                    [260, 50, 340, 90],
                    [60, 50, 100, 120],
                    [160, 30, 200, 100],
                    [260, 50, 200, 100],
                    [100, 120, 200, 100],
                    [200, 100, 300, 140],
                    [100, 120, 200, 170],
                    [200, 170, 300, 140],
                    [340, 90, 300, 140],
                  ].map(([x1, y1, x2, y2], i) => (
                    <motion.line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#c7d2fe"
                      strokeWidth={1.2}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease }}
                    />
                  ))}
                  {/* Graph nodes */}
                  {[
                    { cx: 60, cy: 50, r: 8, label: "PRV-102" },
                    { cx: 160, cy: 30, r: 10, label: "SOP-041" },
                    { cx: 260, cy: 50, r: 8, label: "ML-2024" },
                    { cx: 340, cy: 90, r: 7, label: "P&ID" },
                    { cx: 100, cy: 120, r: 7, label: "Pump" },
                    { cx: 200, cy: 100, r: 12, label: "" },
                    { cx: 300, cy: 140, r: 8, label: "Insp." },
                    { cx: 200, cy: 170, r: 7, label: "Spec" },
                  ].map((node, i) => (
                    <motion.g
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease }}
                    >
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        fill={i === 5 ? "#eef2ff" : "#f8fafc"}
                        stroke={i === 5 ? "#6366f1" : "#94a3b8"}
                        strokeWidth={i === 5 ? 2 : 1.2}
                      />
                      {node.label && (
                        <text
                          x={node.cx}
                          y={node.cy + node.r + 14}
                          textAnchor="middle"
                          className="text-[9px]"
                          fill="#94a3b8"
                        >
                          {node.label}
                        </text>
                      )}
                    </motion.g>
                  ))}
                </svg>
              </div>

              {/* AI Answer panel */}
              <motion.div
                className="border-t border-gray-100 p-5 sm:p-6 bg-gray-50/30"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0, ease }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquareText size={14} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      &ldquo;The pressure relief valve <span className="font-medium text-slate-900">PRV-102</span> was last
                      inspected on <span className="font-medium text-slate-900">March 2024</span> per maintenance log
                      ML-2024-0847. The inspection found all parameters within
                      acceptable limits per SOP-041.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1 font-medium">
                        <ExternalLink size={10} />
                        ML-2024-0847.pdf, Page 12
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1 font-medium">
                        <ExternalLink size={10} />
                        SOP-041.pdf, Page 3
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
