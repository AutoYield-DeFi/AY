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

export const positionSchema = z.object({
  id: z.string(),
  poolId: z.string(),
  amount: z.number(),
  value: z.number(),
  value24hAgo: z.number().optional(),
  pnl: z.number(),
  pnl24h: z.number().optional(),
  pnl7d: z.number().optional(),
  entryDate: z.string()
});

export type Position = z.infer<typeof positionSchema>;

export const historicalPositionSchema = z.object({
  id: z.string(),
  poolId: z.string(),
  amount: z.number(),
  exitValue: z.number(),
  pnl: z.number(),
  entryDate: z.string(),
  exitDate: z.string()
});

export type HistoricalPosition = z.infer<typeof historicalPositionSchema>;