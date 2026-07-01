import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const createTaskSchema = z.object({
  title: z.string().min(3, "Title is required"),

  description: z.string().min(5, "Description is required"),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  dueDate: z.string().min(1, "Due date is required"),

  assignedUserIds: z.string().optional(),
});

export type CreateTaskFormData =
  z.infer<typeof createTaskSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;