"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch, ApiError } from "@/lib/api";
import { refreshAccessToken } from "@/lib/auth";
import type { LoginResponse, MeResponse } from "@/types";

function GoogleCallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function processCallback() {
      try {
        if (code) {
          // Scenario 1: Frontend received the code directly from Google
          const data = await apiFetch<LoginResponse>(`/auth/google/callback?code=${encodeURIComponent(code)}`, {
            method: "GET",
          });
          if (!cancelled) {
            login(data.accessToken, data.user);
            router.push("/dashboard");
          }
        } else {
          // Scenario 2: Backend already processed callback and set refresh cookie
          const newToken = await refreshAccessToken();
          if (newToken && !cancelled) {
            const meData = await apiFetch<MeResponse>("/user/me");
            login(newToken, meData.user);
            router.push("/dashboard");
          } else if (!cancelled) {
            setError("Google authentication failed or session expired.");
          }
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiError) {
            setError(err.data.message || "Failed to complete Google sign-in.");
          } else {
            setError("Something went wrong during Google sign-in.");
          }
        }
      } finally {
        if (!cancelled) {
          setIsProcessing(false);
        }
      }
    }

    processCallback();
    return () => {
      cancelled = true;
    };
  }, [code, login, router]);

  return (
    <AuthCard title="Google Authentication">
      <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
        {isProcessing && !error && (
          <div className="flex flex-col items-center space-y-4">
            <Spinner size="lg" />
            <p className="text-sm text-slate-600">Completing your sign-in with Google...</p>
          </div>
        )}

        {error && (
          <div className="w-full space-y-4">
            <Alert variant="error">{error}</Alert>
            <Button href="/auth/login" variant="secondary" className="w-full">
              Back to login
            </Button>
          </div>
        )}
      </div>
    </AuthCard>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[300px] text-sm text-slate-500">Loading...</div>}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
