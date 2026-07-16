"use client";

import { useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TwoFactorInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const CODE_LENGTH = 6;

/**
 * 6-digit OTP input. Each digit gets its own input box.
 * Supports:
 *  - Auto-advance on digit entry
 *  - Backspace to go back
 *  - Paste a full 6-digit code
 */
export function TwoFactorInput({
  value,
  onChange,
  error,
  className,
  disabled,
}: TwoFactorInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.padEnd(CODE_LENGTH, "").slice(0, CODE_LENGTH).split("");

  const focusInput = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, CODE_LENGTH - 1));
    inputRefs.current[clamped]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, char: string) => {
      if (!/^\d$/.test(char)) return;

      const newDigits = [...digits];
      newDigits[index] = char;
      const newValue = newDigits.join("");
      onChange(newValue.slice(0, CODE_LENGTH));

      if (index < CODE_LENGTH - 1) {
        focusInput(index + 1);
      }
    },
    [digits, onChange, focusInput]
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newDigits = [...digits];
        if (newDigits[index]) {
          newDigits[index] = "";
          onChange(newDigits.join(""));
        } else if (index > 0) {
          newDigits[index - 1] = "";
          onChange(newDigits.join(""));
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft") {
        focusInput(index - 1);
      } else if (e.key === "ArrowRight") {
        focusInput(index + 1);
      }
    },
    [digits, onChange, focusInput]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
      if (pasted.length > 0) {
        onChange(pasted.slice(0, CODE_LENGTH));
        focusInput(Math.min(pasted.length, CODE_LENGTH) - 1);
      }
    },
    [onChange, focusInput]
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Authentication code</Label>
      <div className="flex gap-2 justify-center">
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit || ""}
            disabled={disabled}
            error={!!error}
            className="w-11 h-12 text-center text-lg font-mono px-0"
            aria-label={`Digit ${index + 1} of ${CODE_LENGTH}`}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && (
        <p className="text-xs text-red-600 text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
