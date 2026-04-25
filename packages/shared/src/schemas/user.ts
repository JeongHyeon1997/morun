import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(2).max(20),
  name: z.string().min(1).max(30).nullable(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\d{10,11}$/)
    .nullable(),
  avatarUrl: z.string().url().nullable(),
  crewId: z.string().uuid().nullable(),
  isCrewLeader: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Minimal signup — only nickname/email/password. Name, phone, crew, avatar
// are collected post-signup. See feedback_signup_minimal.md.
export const signUpSchema = z.object({
  nickname: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export const signInSchema = z.object({
  nickname: z.string().min(2),
  password: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
