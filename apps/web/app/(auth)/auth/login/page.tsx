"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SocialLogin } from "@/components/auth/social-login";
import { FormField } from "@/components/auth/form-field";
import { PasswordInput } from "@/components/auth/password-input";
import { TwoFactorInput } from "@/components/auth/two-factor-input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch, ApiError } from "@/lib/api";
import { loginSchema } from "@/lib/validators";
import type { LoginResponse } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [needs2FA, setNeeds2FA] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // Client-side validation
    const result = loginSchema.safeParse({
      email,
      password,
      twoFactorCode: needs2FA ? twoFactorCode : undefined,
    });

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
      const data = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: {
          email,
          password,
          ...(needs2FA && twoFactorCode ? { twoFactorCode } : {}),
        },
      });

      login(data.accessToken, data.user);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        const msg = err.data.message;

        // Backend signals that 2FA is required
        if (
          err.status === 400 &&
          msg.toLowerCase().includes("two factor code is required")
        ) {
          setNeeds2FA(true);
          return;
        }

        // Unverified email
        if (err.status === 403) {
          setServerError(
            "Please verify your email before logging in. Check your inbox."
          );
          return;
        }

        setServerError(msg);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title={needs2FA ? "Two-factor authentication" : "Welcome back"}
      description={
        needs2FA
          ? "Enter the 6-digit code from your authenticator app."
          : "Sign in to your Athleia account."
      }
      footer={
        !needs2FA && (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Register
            </Link>
          </>
        )
      }
    >
      {!needs2FA && <SocialLogin />}

      {serverError && (
        <Alert variant="error" className="mb-4">
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {needs2FA ? (
          <TwoFactorInput
            value={twoFactorCode}
            onChange={setTwoFactorCode}
            error={errors.twoFactorCode}
            disabled={isLoading}
          />
        ) : (
          <>
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
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-xs text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="sm" className="border-white border-t-white/30" />
          ) : needs2FA ? (
            "Verify"
          ) : (
            "Sign in"
          )}
        </Button>

        {needs2FA && (
          <button
            type="button"
            onClick={() => {
              setNeeds2FA(false);
              setTwoFactorCode("");
              setServerError("");
            }}
            className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Back to login
          </button>
        )}
      </form>
    </AuthCard>
  );
}
