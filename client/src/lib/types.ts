import { z } from "zod";

export const poolSchema = z.object({
  id: z.string(),
  name: z.string(),
  token1: z.string(),
  token2: z.string(),
  apr: z.number(),
  tvl: z.number(),
  volume24h: z.number(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  utilizationRate: z.number().optional(),
  poolHealth: z.number().optional(),
  fees24h: z.number().optional(),
});

export type Pool = z.infer<typeof poolSchema>;
