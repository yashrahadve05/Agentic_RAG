import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

type AlertVariant = "success" | "error" | "info";

interface AlertProps {
  variant: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-indigo-50 border-indigo-200 text-indigo-800",
};

const icons: Record<AlertVariant, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export function Alert({ variant, children, className }: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <Icon size={18} className="flex-shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}
