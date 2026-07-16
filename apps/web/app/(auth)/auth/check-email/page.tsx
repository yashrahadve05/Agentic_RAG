"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isReset = type === "reset";
  const title = isReset ? "Check your email" : "Verify your email";
  const description = isReset
    ? "If an account with that email exists, we have sent you a link to reset your password."
    : "We have sent a verification link to your email address. Please click the link to activate your account.";

  return (
    <AuthCard title={title} description={description}>
      <div className="flex flex-col items-center justify-center text-center py-4 space-y-6">
        <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Mail size={32} />
        </div>

        <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
          Didn&apos;t receive the email? Check your spam folder or try signing in again to request a new link.
        </p>

        <div className="w-full pt-2">
          <Button href="/auth/login" variant="secondary" className="w-full">
            Back to login
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[300px] text-sm text-slate-500">Loading...</div>}>
      <CheckEmailContent />
    </Suspense>
  );
}
