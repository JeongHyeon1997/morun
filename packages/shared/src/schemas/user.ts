import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(2).max(20),
  name: z.string().min(1).max(30),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10,11}$/),
  avatarUrl: z.string().url().nullable(),
  crewId: z.string().uuid().nullable(),
  isCrewLeader: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const signUpSchema = z
  .object({
    nickname: z.string().min(2).max(20),
    password: z.string().min(8).max(64),
    passwordConfirm: z.string(),
    name: z.string().min(1).max(30),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10,11}$/),
    crewName: z.string().optional(),
    avatarUrl: z.string().url().optional(),
  })
  .refine((v) => v.password === v.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export const signInSchema = z.object({
  nickname: z.string().min(2),
  password: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
