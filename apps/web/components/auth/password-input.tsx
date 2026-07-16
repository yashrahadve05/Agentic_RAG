"use client";

import { forwardRef, useState } from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<InputProps, "type" | "error"> {
  label: string;
  error?: string;
  id: string;
}

/**
 * Password input with visibility toggle.
 * The toggle button uses aria-label for accessibility.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ label, error, id, className, ...props }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            ref={ref}
            id={id}
            type={visible ? "text" : "password"}
            error={!!error}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className="pr-10"
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && (
          <p
            id={`${id}-error`}
            className="text-xs text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
