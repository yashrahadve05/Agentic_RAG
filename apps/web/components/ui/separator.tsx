import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  label?: string;
}

export function Separator({ className, label }: SeparatorProps) {
  if (label) {
    return (
      <div className={cn("relative flex items-center", className)}>
        <div className="flex-1 border-t border-gray-200" />
        <span className="px-4 text-xs text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 border-t border-gray-200" />
      </div>
    );
  }

  return (
    <div
      className={cn("border-t border-gray-200", className)}
      role="separator"
    />
  );
}
