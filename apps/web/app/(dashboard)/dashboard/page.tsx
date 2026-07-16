"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { TwoFactorInput } from "@/components/auth/two-factor-input";
import { apiFetch, ApiError } from "@/lib/api";
import type { TwoFASetupResponse, TwoFAVerifyResponse } from "@/types";
import {
  ShieldAlert,
  ShieldCheck,
  Key,
  CheckCircle2,
  Lock,
  Mail,
  UserCheck,
  Cpu,
} from "lucide-react";

export default function DashboardPage() {
  const { user, setUser, refreshUser } = useAuth();

  const [isSettingUp2FA, setIsSettingUp2FA] = useState(false);
  const [setupData, setSetupData] = useState<TwoFASetupResponse | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [setupError, setSetupError] = useState("");
  const [setupSuccess, setSetupSuccess] = useState("");
  const [isLoadingSetup, setIsLoadingSetup] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!user) return null;

  async function handleStart2FASetup() {
    setSetupError("");
    setSetupSuccess("");
    setIsLoadingSetup(true);

    try {
      const res = await apiFetch<TwoFASetupResponse>("/auth/2fa/setup", {
        method: "POST",
      });
      setSetupData(res);
      setIsSettingUp2FA(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setSetupError(err.data.message || "Failed to initialize 2FA setup.");
      } else {
        setSetupError("Something went wrong during 2FA initialization.");
      }
    } finally {
      setIsLoadingSetup(false);
    }
  }

  async function handleVerify2FA(e: React.FormEvent) {
    e.preventDefault();
    setSetupError("");
    setSetupSuccess("");

    if (verificationCode.length !== 6) {
      setSetupError("Please enter a valid 6-digit verification code.");
      return;
    }

    setIsVerifying(true);

    try {
      const res = await apiFetch<TwoFAVerifyResponse>("/auth/2fa/verify", {
        method: "POST",
        body: { code: verificationCode },
      });

      if (res.twoFactorEnabled) {
        setSetupSuccess("Two-factor authentication successfully enabled!");
        setIsSettingUp2FA(false);
        setSetupData(null);
        setVerificationCode("");
        // Update user state locally and re-fetch from server
        if (user) {
          setUser({ ...user, twoFactorEnabled: true });
        }
        await refreshUser();
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setSetupError(err.data.message || "Invalid verification code.");
      } else {
        setSetupError("Something went wrong while verifying code.");
      }
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Welcome, {user.name || user.email.split("@")[0]}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your Athleia industrial intelligence workspace and security settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 uppercase tracking-wider border border-slate-200">
            <UserCheck size={14} />
            Role: {user.role}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Session Active
          </span>
        </div>
      </div>

      {/* Security Alerts */}
      {setupSuccess && (
        <Alert variant="success" className="mb-4">
          {setupSuccess}
        </Alert>
      )}

      {setupError && (
        <Alert variant="error" className="mb-4">
          {setupError}
        </Alert>
      )}

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Account Security</CardTitle>
              {user.twoFactorEnabled ? (
                <ShieldCheck size={20} className="text-emerald-600" />
              ) : (
                <ShieldAlert size={20} className="text-amber-500" />
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-semibold text-slate-900">
              {user.twoFactorEnabled ? "Protected (2FA)" : "Basic Protection"}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {user.twoFactorEnabled
                ? "Your account is secured with multi-factor authentication."
                : "We strongly recommend enabling 2FA for enterprise accounts."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Email Status</CardTitle>
              <Mail size={20} className="text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
              Verified
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Intelligence Core</CardTitle>
              <Cpu size={20} className="text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-2xl font-semibold text-slate-900">v4.2 Active</div>
            <p className="text-xs text-slate-500 mt-1">
              Connected to enterprise knowledge graphs and RAG pipelines.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2FA Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="text-indigo-600" size={20} />
            <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          </div>
          <CardDescription>
            Add an extra layer of security to your account by requiring a time-based one-time password (TOTP) during login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.twoFactorEnabled ? (
            <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Two-Factor Authentication is Enabled</div>
                  <div className="text-xs text-emerald-700 mt-0.5">
                    Your account is protected against unauthorized access.
                  </div>
                </div>
              </div>
            </div>
          ) : !isSettingUp2FA ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-gray-200">
              <div className="flex items-start gap-3">
                <Key size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm text-slate-800">
                    Set up Authenticator App
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Use Google Authenticator, 1Password, or Authy to generate secure verification codes.
                  </div>
                </div>
              </div>
              <Button
                onClick={handleStart2FASetup}
                disabled={isLoadingSetup}
                size="sm"
              >
                {isLoadingSetup ? (
                  <Spinner size="sm" className="border-white border-t-white/30" />
                ) : (
                  "Configure 2FA"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 rounded-xl border border-indigo-100 bg-indigo-50/30 p-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900">Step 1: Link your authenticator app</h3>
                <p className="text-xs text-slate-600">
                  Scan the secret URI or enter the manual setup key below into your authenticator app.
                </p>
              </div>

              {setupData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-white p-4 rounded-xl border border-gray-200">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Manual Setup Key
                    </span>
                    <div className="font-mono text-sm bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 text-slate-800 select-all break-all">
                      {setupData.secret}
                    </div>
                    <p className="text-xs text-slate-400">
                      If your app supports URI links, you can also use:
                    </p>
                    <a
                      href={setupData.otpAuthUrl}
                      className="text-xs text-indigo-600 hover:underline font-mono break-all block"
                    >
                      {setupData.otpAuthUrl}
                    </a>
                  </div>
                </div>
              )}

              <Separator label="Then verify code" />

              <form onSubmit={handleVerify2FA} className="space-y-4 max-w-sm mx-auto">
                <div className="space-y-1 text-center">
                  <h3 className="font-semibold text-slate-900">Step 2: Enter verification code</h3>
                  <p className="text-xs text-slate-500">
                    Enter the 6-digit code currently displayed in your authenticator app.
                  </p>
                </div>

                <TwoFactorInput
                  value={verificationCode}
                  onChange={setVerificationCode}
                  disabled={isVerifying}
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      setIsSettingUp2FA(false);
                      setSetupData(null);
                      setVerificationCode("");
                    }}
                    disabled={isVerifying}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isVerifying || verificationCode.length !== 6}>
                    {isVerifying ? (
                      <Spinner size="sm" className="border-white border-t-white/30" />
                    ) : (
                      "Verify & Enable"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
