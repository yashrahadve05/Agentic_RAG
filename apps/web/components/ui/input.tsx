import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, type, ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error
          ? "border-red-300 focus-visible:ring-red-500"
          : "border-gray-200 focus-visible:ring-indigo-600",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Input };
