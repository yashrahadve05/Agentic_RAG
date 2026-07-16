import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps extends Omit<InputProps, "error"> {
  label: string;
  error?: string;
  id: string;
}

/**
 * Compound form field: Label + Input + error message.
 * Reduces boilerplate across all auth forms.
 */
export function FormField({
  label,
  error,
  id,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        error={!!error}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
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
