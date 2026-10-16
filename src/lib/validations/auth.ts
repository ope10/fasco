import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Use a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Please enter your first name."),
    lastName: z.string().optional(),
    email: z.string().email("Use a valid email address."),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Use a valid email address."),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
