"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { apiFetch, ApiError } from "@/lib/api";
import { forgotPasswordSchema } from "@/lib/validators";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = forgotPasswordSchema.safeParse({ email });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && typeof key === "string") {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: { email },
      });

      router.push("/auth/check-email?type=reset");
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.data.message || "Failed to process request.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email address and we'll send you a link to reset your password."
      footer={
        <>
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign in
          </Link>
        </>
      }
    >
      {serverError && (
        <Alert variant="error" className="mb-4">
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={isLoading}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Spinner size="sm" className="border-white border-t-white/30" />
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
