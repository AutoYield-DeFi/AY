import type { Pool, Position } from "@shared/schema";

export const pools: Pool[] = [
  {
    id: 1,
    name: "SOL-USDC",
    token0: "SOL",
    token1: "USDC",
    tvl: "2500000",
    apr: "25.5",
    volume24h: "750000",
    createdAt: new Date("2024-01-01")
  },
  {
    id: 2, 
    name: "ETH-USDC",
    token0: "ETH",
    token1: "USDC",
    tvl: "5000000",
    apr: "18.2",
    volume24h: "1200000",
    createdAt: new Date("2024-01-02")
  },
  {
    id: 3,
    name: "BTC-USDC",
    token0: "BTC",
    token1: "USDC", 
    tvl: "8000000",
    apr: "15.8",
    volume24h: "2000000",
    createdAt: new Date("2024-01-03")
  }
];

export const portfolioPositions: Position[] = [
  {
    id: 1,
    poolId: 1,
    amount: "10000",
    value: "12500",
    pnl: "2500"
  },
  {
    id: 2,
    poolId: 2,
    amount: "25000",
    value: "28000",
    pnl: "3000"
  }
];

export const overviewStats = {
  totalValueLocked: 15500000,
  totalPools: 3,
  activePositions: 2,
  totalYield: 5500,
  averageApr: 19.83
};

export const historicalYields = [
  { date: "2024-01-01", yield: 120 },
  { date: "2024-01-02", yield: 150 },
  { date: "2024-01-03", yield: 180 },
  { date: "2024-01-04", yield: 210 },
  { date: "2024-01-05", yield: 250 }
];