"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ShieldCheck,
  KeyRound,
  Globe,
  Users,
  ClipboardList,
  Server,
  Lock,
  Activity,
} from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

const trustItems = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II",
    description: "Independently audited security controls and processes.",
  },
  {
    icon: KeyRound,
    title: "SSO & SAML",
    description: "Enterprise single sign-on with your identity provider.",
  },
  {
    icon: Globe,
    title: "Data Residency",
    description: "Choose where your data lives. Regional deployment options.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular permissions by team, project, and document.",
  },
  {
    icon: ClipboardList,
    title: "Audit Logging",
    description: "Complete audit trail for every query, access, and change.",
  },
  {
    icon: Server,
    title: "On-Premise Option",
    description: "Deploy within your infrastructure for full data control.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Data encrypted at rest and in transit. Zero-trust architecture.",
  },
  {
    icon: Activity,
    title: "99.9% Uptime SLA",
    description: "Enterprise-grade reliability with guaranteed availability.",
  },
];

export function EnterpriseTrust() {
  return (
    <section id="enterprise" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          label="Enterprise Ready"
          title="Security and compliance, built in."
          description="Athleia meets the security, privacy, and compliance requirements of the world\u2019s most regulated industries."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease,
                }}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50">
                  <Icon size={18} className="text-emerald-600" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
