"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { KnowledgeFlow } from "./knowledge-flow";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      <Container size="default">
        <div className="flex flex-col items-center text-center">
          {/* ---- Overline badge ---- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
              Industrial Knowledge Intelligence Platform
            </span>
          </motion.div>

          {/* ---- Headline ---- */}
          <motion.h1
            className="mt-8 max-w-4xl text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-slate-900 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            Your engineering knowledge,{" "}
            <br className="hidden sm:block" />
            finally searchable, connected,{" "}
            <br className="hidden sm:block" />
            and{" "}
            <span className="text-indigo-600">intelligent</span>.
          </motion.h1>

          {/* ---- Subtitle ---- */}
          <motion.p
            className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            Athleia transforms scattered industrial documents into connected
            organizational intelligence — so your teams find answers, not files.
          </motion.p>

          {/* ---- CTAs ---- */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            <Button size="lg" href="/auth/register">
              Get Started
            </Button>
            <Button size="lg" variant="secondary" href="/auth/login">
              Sign in
              <ArrowRight size={16} />
            </Button>
          </motion.div>

          {/* ---- Hero Visual ---- */}
          <motion.div
            className="mt-16 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
          >
            <KnowledgeFlow />
          </motion.div>

          {/* ---- Social Proof ---- */}
          <motion.p
            className="mt-12 text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease }}
          >
            Trusted by engineering teams at industrial organizations worldwide
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
