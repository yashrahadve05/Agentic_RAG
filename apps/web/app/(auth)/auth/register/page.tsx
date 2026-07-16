"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SocialLogin } from "@/components/auth/social-login";
import { FormField } from "@/components/auth/form-field";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { apiFetch, ApiError } from "@/lib/api";
import { registerSchema } from "@/lib/validators";
import type { RegisterResponse } from "@/types";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = registerSchema.safeParse({
      name,
      email,
      password,
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
      await apiFetch<RegisterResponse>("/auth/register", {
        method: "POST",
        body: {
          name,
          email,
          password,
        },
      });

      router.push("/auth/check-email?type=verify");
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.data.message || "Failed to register. Please try again.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create an account"
      description="Start transforming your industrial documents into intelligence."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SocialLogin />

      {serverError && (
        <Alert variant="error" className="mb-4">
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="name"
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          disabled={isLoading}
        />
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
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={isLoading}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Spinner size="sm" className="border-white border-t-white/30" />
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
