import { z } from 'zod'

const emailSchema = z.string().email('PLease provide a valid email')

export const signupSchema = z.object({
    email: emailSchema,
    password:z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(12, "Password cannot exceed 12 characters")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .regex(/[0-9]/, "Password must contain atleast one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z
    .string()
    .min(1, "Password is required")
});

export const resetPasswordSchema = z.object({
    email: emailSchema
});

// task validator
export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  dueDate: z.string().min(1, "Due date is required"), 
  dueTime: z.string().min(1, "Due time is required"),
  priority: z.enum(["Low", "Medium", "High"]).default('Medium'),
  description: z.string().max(250, "Description cannot exceed 250 characters").optional(),
});

export const projectSchema = z.object({
    name: z.string().min(1, 'Project name is required').max(50, 'Project name cannot exceed 50 characters')
});