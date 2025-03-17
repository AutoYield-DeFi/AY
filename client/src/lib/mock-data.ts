import type { Pool, Position, HistoricalPosition } from "@/lib/types";

// Mock wallet balances
export const walletBalances = {
  sol: 45.8,
  usdc: 2150.25,
  solPrice: 142.30,
  usdcPrice: 1.00
};

// Transaction history mock data
export const transactionHistory = [
  {
    id: 1,
    poolId: "1",
    type: "Deposit",
    amount: "10000",
    timestamp: new Date("2024-03-15").toISOString()
  },
  {
    id: 2,
    poolId: "2",
    type: "Deposit",
    amount: "25000",
    timestamp: new Date("2024-03-16").toISOString()
  },
  {
    id: 3,
    poolId: "1",
    type: "Withdraw",
    amount: "16800",
    timestamp: new Date("2024-03-17").toISOString()
  }
];

// Pool data
export const pools: Pool[] = [
  {
    id: "1",
    name: "SOL-USDC",
    token1: "SOL",
    token2: "USDC",
    tvl: 2500000,
    apr: 25.5,
    volume24h: 750000,
    riskLevel: "medium",
    utilizationRate: 75.5,
    poolHealth: 85,
    fees24h: 2250
  },
  {
    id: "2",
    name: "SOL-PYTH",
    token1: "SOL",
    token2: "PYTH",
    tvl: 1800000,
    apr: 32.5,
    volume24h: 420000,
    riskLevel: "low",
    utilizationRate: 82.3,
    poolHealth: 92,
    fees24h: 1260
  },
  {
    id: "3",
    name: "SOL-RAY",
    token1: "SOL",
    token2: "RAY",
    tvl: 1200000,
    apr: 28.8,
    volume24h: 380000,
    riskLevel: "medium",
    utilizationRate: 68.5,
    poolHealth: 78,
    fees24h: 1140
  },
  {
    id: "4",
    name: "SOL-BONK",
    token1: "SOL",
    token2: "BONK",
    tvl: 900000,
    apr: 45.2,
    volume24h: 320000,
    riskLevel: "high",
    utilizationRate: 88.5,
    poolHealth: 65,
    fees24h: 960
  },
  {
    id: "5",
    name: "SOL-ORCA",
    token1: "SOL",
    token2: "ORCA",
    tvl: 1500000,
    apr: 22.4,
    volume24h: 280000,
    riskLevel: "low",
    utilizationRate: 71.2,
    poolHealth: 89,
    fees24h: 840
  },
  {
    id: "6",
    name: "SOL-MSOL",
    token1: "SOL",
    token2: "MSOL",
    tvl: 3200000,
    apr: 15.8,
    volume24h: 520000,
    riskLevel: "low",
    utilizationRate: 92.3,
    poolHealth: 95,
    fees24h: 1560
  }
];

// Portfolio positions
export const portfolioPositions: Position[] = [
  {
    id: "1",
    poolId: "1",
    amount: 10000,
    value: 12500,
    value24hAgo: 12000,
    pnl: 2500,
    pnl24h: 500,
    pnl7d: 1200,
    entryDate: new Date("2024-02-01").toISOString()
  },
  {
    id: "2",
    poolId: "2",
    amount: 25000,
    value: 28000,
    value24hAgo: 27500,
    pnl: 3000,
    pnl24h: 500,
    pnl7d: 1800,
    entryDate: new Date("2024-02-15").toISOString()
  }
];

// Historical positions
export const historicalPositions: HistoricalPosition[] = [
  {
    id: "1",
    poolId: "1",
    amount: 15000,
    exitValue: 16800,
    pnl: 1800,
    entryDate: new Date("2024-01-01").toISOString(),
    exitDate: new Date("2024-01-15").toISOString()
  },
  {
    id: "2",
    poolId: "3",
    amount: 5000,
    exitValue: 5300,
    pnl: 300,
    entryDate: new Date("2024-01-10").toISOString(),
    exitDate: new Date("2024-01-20").toISOString()
  }
];
