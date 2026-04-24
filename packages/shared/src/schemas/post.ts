import { z } from 'zod';

export const postScopeSchema = z.enum(['crew', 'public']);

export const postSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  crewId: z.string().uuid().nullable(),
  scope: postScopeSchema,
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(10_000),
  imageUrls: z.array(z.string().url()).default([]),
  likeCount: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createPostSchema = z.object({
  scope: postScopeSchema,
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(10_000),
  imageUrls: z.array(z.string().url()).optional(),
});

export type PostScope = z.infer<typeof postScopeSchema>;
export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
