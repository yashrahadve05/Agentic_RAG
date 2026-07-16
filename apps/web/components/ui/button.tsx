"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-sm",
  secondary:
    "border border-gray-200 text-slate-700 bg-white hover:bg-gray-50 active:bg-gray-100",
  ghost: "text-slate-600 hover:text-slate-900 hover:bg-gray-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 h-9 gap-1.5",
  md: "text-sm px-6 py-2.5 h-10 gap-2",
  lg: "text-base px-8 py-3 h-12 gap-2.5",
};

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

/**
 * Polymorphic Button — renders as Next.js `<Link>` for internal navigation,
 * `<a>` for external navigation when `href` is provided,
 * otherwise renders as `<button>`. Follows shadcn/ui API conventions.
 */
const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, "variant" | "size">;
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        />
      );
    }
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      />
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as Omit<ButtonAsButton, "variant" | "size">)}
    />
  );
});

export { Button };
