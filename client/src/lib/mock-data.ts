import type { Pool } from "@/lib/types";

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
    poolId: "1", // Changed to string to match Pool type
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