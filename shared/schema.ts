import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pools = pgTable("pools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  token0: text("token0").notNull(),
  token1: text("token1").notNull(),
  tvl: numeric("tvl").notNull(),
  apr: numeric("apr").notNull(),
  volume24h: numeric("volume_24h").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const portfolioPositions = pgTable("portfolio_positions", {
  id: serial("id").primaryKey(),
  poolId: serial("pool_id").references(() => pools.id),
  amount: numeric("amount").notNull(),
  value: numeric("value").notNull(),
  pnl: numeric("pnl").notNull()
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
