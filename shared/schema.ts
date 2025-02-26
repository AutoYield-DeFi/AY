import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pools = pgTable("pools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  token0: text("token0").notNull(),
  token1: text("token1").notNull(),
  tvl: text("tvl").notNull(),
  apr: text("apr").notNull(),
  volume24h: text("volume_24h").notNull(),
  volume7d: text("volume_7d").notNull(),
  dailyFees: text("daily_fees").notNull(),
  weeklyFees: text("weekly_fees").notNull(),
  utilizationRate: text("utilization_rate").notNull(),
  impermanentLoss: text("impermanent_loss").notNull(),
  riskLevel: text("risk_level").notNull(),
  priceRatio: text("price_ratio").notNull(),
  token0Reserve: text("token0_reserve").notNull(),
  token1Reserve: text("token1_reserve").notNull(),
  token0Price: text("token0_price").notNull(),
  token1Price: text("token1_price").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const portfolioPositions = pgTable("portfolio_positions", {
  id: serial("id").primaryKey(),
  poolId: serial("pool_id").references(() => pools.id),
  amount: text("amount").notNull(),
  value: text("value").notNull(),
  pnl: text("pnl").notNull()
});

export const insertPoolSchema = createInsertSchema(pools).omit({ 
  id: true,
  createdAt: true 
});

export const insertPositionSchema = createInsertSchema(portfolioPositions).omit({
  id: true
});

export type Pool = typeof pools.$inferSelect;
export type InsertPool = z.infer<typeof insertPoolSchema>;
export type Position = typeof portfolioPositions.$inferSelect;
export type InsertPosition = z.infer<typeof insertPositionSchema>;