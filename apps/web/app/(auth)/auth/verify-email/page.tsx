"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { apiFetch, ApiError } from "@/lib/api";
import { CheckCircle2, XCircle } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing or invalid.");
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const res = await apiFetch<{ message: string }>(`/auth/verify-email?token=${token}`, {
          method: "GET",
        });
        if (!cancelled) {
          setStatus("success");
          setMessage(res.message || "Your email has been successfully verified!");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          if (err instanceof ApiError) {
            setMessage(err.data.message || "Failed to verify email.");
          } else {
            setMessage("Something went wrong while verifying your email.");
          }
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <AuthCard title="Email Verification">
      <div className="flex flex-col items-center justify-center text-center py-6 space-y-6">
        {status === "loading" && (
          <div className="flex flex-col items-center space-y-4">
            <Spinner size="lg" />
            <p className="text-sm text-slate-600">Verifying your email address...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={36} />
            </div>
            <p className="text-base font-medium text-slate-800">{message}</p>
            <div className="w-full pt-4">
              <Button href="/auth/login" className="w-full">
                Proceed to login
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <XCircle size={36} />
            </div>
            <Alert variant="error" className="w-full text-left">
              {message}
            </Alert>
            <div className="w-full pt-4 space-y-2">
              <Button href="/auth/login" variant="secondary" className="w-full">
                Back to login
              </Button>
            </div>
          </div>
        )}
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[300px] text-sm text-slate-500">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
