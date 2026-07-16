import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ---- Card Root ---- */

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-gray-200 bg-white shadow-card",
          className
        )}
        {...props}
      />
    );
  }
);

/* ---- Card Header ---- */

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
      {...props}
    />
  );
});

/* ---- Card Title ---- */

const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function CardTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-xl font-semibold text-slate-900 tracking-tight",
        className
      )}
      {...props}
    />
  );
});

/* ---- Card Description ---- */

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-slate-500", className)}
      {...props}
    />
  );
});

/* ---- Card Content ---- */

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  );
});

/* ---- Card Footer ---- */

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
