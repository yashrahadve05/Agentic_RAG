"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { apiFetch, ApiError } from "@/lib/api";
import { resetPasswordSchema } from "@/lib/validators";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    if (!token) {
      setServerError("Reset token is missing or invalid.");
      return;
    }

    const result = resetPasswordSchema.safeParse({ password, confirmPassword });

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
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.data.message || "Failed to reset password.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <AuthCard title="Password reset successfully">
        <Alert variant="success" className="mb-6">
          Your password has been reset. Redirecting you to sign in...
        </Alert>
        <Button href="/auth/login" className="w-full">
          Sign in now
        </Button>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set a new password"
      description="Choose a strong password with at least 6 characters."
      footer={
        <>
          Remembered your old password?{" "}
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
        <PasswordInput
          id="password"
          label="New Password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={isLoading}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Repeat new password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <Button type="submit" className="w-full" disabled={isLoading || !token}>
          {isLoading ? (
            <Spinner size="sm" className="border-white border-t-white/30" />
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[300px] text-sm text-slate-500">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
