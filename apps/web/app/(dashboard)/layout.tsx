"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LogOut, ShieldCheck, User as UserIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-4">
        <Spinner size="lg" />
        <p className="text-sm font-medium text-slate-600">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-lg font-semibold text-slate-900 tracking-tight"
            >
              Athleia
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">
              <ShieldCheck size={14} />
              Enterprise Intelligence Workspace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end text-sm">
              <span className="font-medium text-slate-800 leading-none">
                {user.name || user.email.split("@")[0]}
              </span>
              <span className="text-xs text-slate-500 mt-1">{user.email}</span>
            </div>

            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
              <UserIcon size={16} />
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                await logout();
                router.push("/auth/login");
              }}
              className="gap-1.5 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
