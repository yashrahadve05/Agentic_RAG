"use client";

import { motion } from "framer-motion";

/**
 * Animated SVG visualization for the Hero section.
 *
 * Shows the Athleia transformation flow:
 *   Documents → Understanding → Knowledge Graph → Grounded Answer
 *
 * Built as pure SVG with Framer Motion for line-drawing and
 * node-reveal animations. Uses the design system's indigo, slate,
 * and emerald palette.
 */

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ---- Document node positions (top row) ---- */
const docs = [
  { x: 160, y: 40 },
  { x: 310, y: 28 },
  { x: 460, y: 40 },
  { x: 610, y: 28 },
  { x: 760, y: 40 },
];

/* ---- Graph node positions (middle layer) ---- */
const nodes = [
  { x: 240, y: 160 },
  { x: 390, y: 140 },
  { x: 540, y: 160 },
  { x: 690, y: 140 },
  { x: 310, y: 240 },
  { x: 460, y: 220 },
  { x: 610, y: 240 },
];

/* ---- Edges between graph nodes ---- */
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3],
  [0, 4], [1, 5], [2, 5], [2, 6], [3, 6],
  [4, 5], [5, 6],
];

/* ---- Lines from docs to nearest graph nodes ---- */
const docToNode: [number, number][] = [
  [0, 0], [1, 1], [2, 2], [3, 3], [4, 3],
];

export function KnowledgeFlow() {
  return (
    <div className="w-full max-w-3xl mx-auto" aria-hidden="true">
      <svg
        viewBox="0 0 920 380"
        fill="none"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ---- Doc-to-node connection lines ---- */}
        {docToNode.map(([di, ni], i) => {
          const doc = docs[di];
          const node = nodes[ni];
          if (!doc || !node) return null;
          return (
            <motion.line
              key={`d2n-${i}`}
              x1={doc.x + 30}
              y1={doc.y + 36}
              x2={node.x}
              y2={node.y}
              stroke="#c7d2fe"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease }}
            />
          );
        })}

        {/* ---- Graph edges ---- */}
        {edges.map(([a, b], i) => {
          const nodeA = nodes[a];
          const nodeB = nodes[b];
          if (!nodeA || !nodeB) return null;
          return (
            <motion.line
              key={`edge-${i}`}
              x1={nodeA.x}
              y1={nodeA.y}
              x2={nodeB.x}
              y2={nodeB.y}
              stroke="#a5b4fc"
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.06, ease }}
            />
          );
        })}

        {/* ---- Document cards (top row) ---- */}
        {docs.map((d, i) => (
          <motion.g
            key={`doc-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease }}
          >
            <rect
              x={d.x}
              y={d.y}
              width={60}
              height={36}
              rx={6}
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            {/* File icon lines */}
            <rect x={d.x + 10} y={d.y + 10} width={20} height={2} rx={1} fill="#cbd5e1" />
            <rect x={d.x + 10} y={d.y + 16} width={28} height={2} rx={1} fill="#cbd5e1" />
            <rect x={d.x + 10} y={d.y + 22} width={16} height={2} rx={1} fill="#cbd5e1" />
            {/* File corner fold */}
            <path
              d={`M${d.x + 47} ${d.y} L${d.x + 60} ${d.y + 10}`}
              stroke="#e2e8f0"
              strokeWidth={1}
              fill="none"
            />
          </motion.g>
        ))}

        {/* ---- Graph nodes ---- */}
        {nodes.map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r={8}
            fill="#eef2ff"
            stroke="#818cf8"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.0 + i * 0.08, ease }}
          />
        ))}

        {/* ---- Center "Answer" card ---- */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 2.0, ease }}
        >
          {/* Connection line from graph to answer */}
          <motion.line
            x1={460}
            y1={240}
            x2={460}
            y2={310}
            stroke="#6ee7b7"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.8, ease }}
          />

          {/* Answer card */}
          <rect
            x={350}
            y={310}
            width={220}
            height={50}
            rx={10}
            fill="#ecfdf5"
            stroke="#6ee7b7"
            strokeWidth={1.5}
          />

          {/* Answer text */}
          <text
            x={460}
            y={332}
            textAnchor="middle"
            className="text-[11px] font-medium"
            fill="#059669"
          >
            Grounded Answer
          </text>
          <text
            x={460}
            y={348}
            textAnchor="middle"
            className="text-[10px]"
            fill="#64748b"
          >
            with source citations
          </text>

          {/* Subtle pulse ring */}
          <motion.circle
            cx={460}
            cy={335}
            r={36}
            fill="none"
            stroke="#6ee7b7"
            strokeWidth={1}
            initial={{ scale: 0.9, opacity: 0.4 }}
            animate={{
              scale: [0.9, 1.1, 0.9],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
