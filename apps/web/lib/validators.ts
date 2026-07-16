import { z } from "zod";

/**
 * Client-side validation schemas — mirrors backend Zod rules exactly.
 * password: min 6, name: min 3, email: valid format.
 */

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  twoFactorCode: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
