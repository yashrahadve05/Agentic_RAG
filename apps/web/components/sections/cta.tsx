"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function CTA() {
  return (
    <section id="get-started" className="py-24 sm:py-32 bg-navy-950 relative overflow-hidden">
      {/* Subtle radial gradient accent */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.15), transparent)",
        }}
        aria-hidden="true"
      />

      <Container size="narrow">
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-indigo-400 mb-4">
            Get Started
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
            Your engineering knowledge
            <br className="hidden sm:block" />
            deserves to be intelligent.
          </h2>

          <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
            Stop losing knowledge. Start building organizational intelligence.
            Athleia is ready for your documents.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              href="/auth/register"
              className="bg-white text-slate-900 hover:bg-gray-100 active:bg-gray-200"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href="/auth/login"
              className="border-slate-700 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              Sign in
              <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
