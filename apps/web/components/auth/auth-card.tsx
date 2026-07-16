"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const ease = [0.25, 0.4, 0.25, 1] as const;

/**
 * Branded card wrapper used by all auth pages.
 * Displays the Athleia wordmark, a page title, optional description,
 * and wraps the form content in a consistent container.
 */
export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <motion.div
      className={cn("w-full max-w-[420px]", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Wordmark */}
      <div className="text-center mb-8">
        <Link
          href="/"
          className="text-xl font-semibold text-slate-900 tracking-tight"
        >
          Athleia
        </Link>
      </div>

      <Card>
        <CardHeader className="text-center pb-2">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
        </CardHeader>
        <CardContent className="pt-4">{children}</CardContent>
      </Card>

      {/* Footer links (e.g. "Don't have an account? Register") */}
      {footer && (
        <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
      )}
    </motion.div>
  );
}
