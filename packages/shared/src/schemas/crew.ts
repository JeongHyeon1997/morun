import { z } from 'zod';

export const crewSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(30),
  description: z.string().max(500).nullable(),
  leaderId: z.string().uuid(),
  memberCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
});

export const createCrewSchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().max(500).optional(),
});

export type Crew = z.infer<typeof crewSchema>;
export type CreateCrewInput = z.infer<typeof createCrewSchema>;
