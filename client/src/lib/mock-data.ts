import type { Pool, Position } from "@shared/schema";

// Add historical data for pool charts
const historyData = [
  { date: '2024-02-20', tvl: 2400000 },
  { date: '2024-02-21', tvl: 2600000 },
  { date: '2024-02-22', tvl: 2900000 },
  { date: '2024-02-23', tvl: 2700000 },
  { date: '2024-02-24', tvl: 3100000 },
];

interface PoolWithHistory extends Pool {
    history?: {date: string, tvl: number}[]
}

export const pools: PoolWithHistory[] = [
  {
    id: 1,
    name: "SOL-USDC",
    token0: "SOL",
    token1: "USDC",
    tvl: "2500000",
    apr: "25.5",
    volume24h: "750000",
    volume7d: "4500000",
    dailyFees: "2250",
    weeklyFees: "15750",
    utilizationRate: "75.5",
    impermanentLoss: "2.3",
    riskLevel: "medium",
    priceRatio: "25.50",
    token0Reserve: "50000",
    token1Reserve: "1275000",
    token0Price: "25.50",
    token1Price: "1.00",
    createdAt: new Date("2024-01-01"),
    history: historyData
  },
  {
    id: 2,
    name: "SOL-PYTH",
    token0: "SOL",
    token1: "PYTH",
    tvl: "1800000",
    apr: "32.5",
    volume24h: "420000",
    volume7d: "2800000",
    dailyFees: "1260",
    weeklyFees: "8400",
    utilizationRate: "82.3",
    impermanentLoss: "1.8",
    riskLevel: "low",
    priceRatio: "0.15",
    token0Reserve: "40000",
    token1Reserve: "266667",
    token0Price: "25.50",
    token1Price: "3.82",
    createdAt: new Date("2024-01-02"),
    history: historyData
  },
  {
    id: 3,
    name: "SOL-RAY",
    token0: "SOL",
    token1: "RAY",
    tvl: "1200000",
    apr: "28.8",
    volume24h: "380000",
    volume7d: "2400000",
    dailyFees: "1140",
    weeklyFees: "7200",
    utilizationRate: "68.5",
    impermanentLoss: "2.1",
    riskLevel: "medium",
    priceRatio: "12.75",
    token0Reserve: "35000",
    token1Reserve: "446250",
    token0Price: "25.50",
    token1Price: "2.00",
    createdAt: new Date("2024-01-03"),
    history: historyData
  },
  {
    id: 4,
    name: "SOL-BONK",
    token0: "SOL",
    token1: "BONK",
    tvl: "900000",
    apr: "45.2",
    volume24h: "320000",
    volume7d: "1950000",
    dailyFees: "960",
    weeklyFees: "5850",
    utilizationRate: "88.5",
    impermanentLoss: "3.2",
    riskLevel: "high",
    priceRatio: "0.000001",
    token0Reserve: "30000",
    token1Reserve: "30000000000",
    token0Price: "25.50",
    token1Price: "0.0000255",
    createdAt: new Date("2024-01-04"),
    history: historyData
  },
  {
    id: 5,
    name: "SOL-ORCA",
    token0: "SOL",
    token1: "ORCA",
    tvl: "1500000",
    apr: "22.4",
    volume24h: "280000",
    volume7d: "1680000",
    dailyFees: "840",
    weeklyFees: "5040",
    utilizationRate: "71.2",
    impermanentLoss: "1.5",
    riskLevel: "low",
    priceRatio: "5.1",
    token0Reserve: "45000",
    token1Reserve: "229500",
    token0Price: "25.50",
    token1Price: "5.00",
    createdAt: new Date("2024-01-05"),
    history: historyData
  },
  {
    id: 6,
    name: "SOL-MSOL",
    token0: "SOL",
    token1: "MSOL",
    tvl: "3200000",
    apr: "15.8",
    volume24h: "520000",
    volume7d: "3120000",
    dailyFees: "1560",
    weeklyFees: "9360",
    utilizationRate: "92.3",
    impermanentLoss: "0.8",
    riskLevel: "low",
    priceRatio: "1.05",
    token0Reserve: "80000",
    token1Reserve: "84000",
    token0Price: "25.50",
    token1Price: "26.77",
    createdAt: new Date("2024-01-06"),
    history: historyData
  }
];

export const portfolioPositions: Position[] = [
  {
    id: 1,
    poolId: 1,
    amount: "10000",
    value: "12500",
    pnl: "2500",
    value24hAgo: "12000",
    pnl24h: "500",
    pnl7d: "1200",
    entryDate: new Date("2024-02-01").toISOString()
  },
  {
    id: 2,
    poolId: 2,
    amount: "25000",
    value: "28000",
    pnl: "3000",
    value24hAgo: "27500",
    pnl24h: "500",
    pnl7d: "1800",
    entryDate: new Date("2024-02-15").toISOString()
  }
];

export const historicalPositions = [
  {
    id: 1,
    poolId: 1,
    amount: "15000",
    exitValue: "16800",
    pnl: "1800",
    entryDate: new Date("2024-01-01").toISOString(),
    exitDate: new Date("2024-01-15").toISOString(),
    type: "Closed Position"
  },
  {
    id: 2,
    poolId: 3,
    amount: "5000",
    exitValue: "5300",
    pnl: "300",
    entryDate: new Date("2024-01-10").toISOString(),
    exitDate: new Date("2024-01-20").toISOString(),
    type: "Closed Position"
  }
];

export const transactionHistory = [
  {
    id: 1,
    poolId: 1,
    type: "Deposit",
    amount: "10000",
    timestamp: new Date("2024-02-01").toISOString()
  },
  {
    id: 2,
    poolId: 2,
    type: "Deposit",
    amount: "25000",
    timestamp: new Date("2024-02-15").toISOString()
  },
  {
    id: 3,
    poolId: 1,
    type: "Withdraw",
    amount: "16800",
    timestamp: new Date("2024-01-15").toISOString()
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