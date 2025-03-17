import { NoticeBoard } from "@/components/dashboard/notice-board";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Activity, 
  ExternalLink,
  LineChart,
  Wallet,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, cn } from "@/lib/utils";
import { transactionHistory, pools, walletBalances } from "@/lib/mock-data";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol?.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-5 w-5 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-5 w-5 text-blue-500" />;
    case 'SOL':
      return <SiSolana className="h-5 w-5 text-purple-500" />;
    default:
      return <CoinsIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function Dashboard() {
  // Calculate wallet balance
  const solBalanceUSD = walletBalances.sol * walletBalances.solPrice;
  const usdcBalanceUSD = walletBalances.usdc * walletBalances.usdcPrice;
  const totalWalletBalance = solBalanceUSD + usdcBalanceUSD;

  // Calculate positions value
  const totalPositionsValue = 0; // Temporary until positions feature is implemented
  const positionsValue24hChange = 0;
  const positionsValue24hChangePercent = 0;

  // Calculate total portfolio value
  const totalPortfolioValue = totalWalletBalance + totalPositionsValue;

  // Performance data
  const performanceData = [
    { date: '1 Mar', value: totalPortfolioValue * 0.9, tvl: totalPortfolioValue * 0.85 },
    { date: '2 Mar', value: totalPortfolioValue * 0.95, tvl: totalPortfolioValue * 0.9 },
    { date: '3 Mar', value: totalPortfolioValue * 0.97, tvl: totalPortfolioValue * 0.95 },
    { date: '4 Mar', value: totalPortfolioValue * 0.98, tvl: totalPortfolioValue * 0.97 },
    { date: '5 Mar', value: totalPortfolioValue * 0.99, tvl: totalPortfolioValue * 0.99 },
    { date: '6 Mar', value: totalPortfolioValue, tvl: totalPortfolioValue },
  ];

  // Get recent transactions
  const recentTransactions = transactionHistory
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your portfolio performance and market activity
        </p>
      </div>

      {/* Portfolio Overview */}
      <Card className="bg-card/50 border-primary/5 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Total Portfolio Value */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(totalPortfolioValue)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-muted/50">
                    <Wallet className="h-3 w-3 mr-1" />
                    {formatCurrency(totalWalletBalance)}
                  </Badge>
                  <Badge variant="outline" className="bg-muted/50">
                    <LineChart className="h-3 w-3 mr-1" />
                    {formatCurrency(totalPositionsValue)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <div className={cn(
                  "flex items-center gap-1 justify-end text-sm",
                  positionsValue24hChange >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {positionsValue24hChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : 
                                              <ArrowDownRight className="h-4 w-4" />}
                  {positionsValue24hChange >= 0 ? '+' : ''}{formatCurrency(positionsValue24hChange)} (24h)
                </div>
                <div className="text-sm text-muted-foreground">
                  {positionsValue24hChangePercent >= 0 ? '+' : ''}{positionsValue24hChangePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTVL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3 space-y-1">
                          <p className="text-sm font-medium">{payload[0].payload.date}</p>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span>Value: {formatCurrency(payload[0].value)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span>TVL: {formatCurrency(payload[1].value)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
                <Area
                  type="monotone"
                  dataKey="tvl"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorTVL)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Recent Activity */}
          <Card className="bg-card/50 border-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex items-center gap-1"
                  asChild
                >
                  <a href="/history">
                    View All
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => {
                  const pool = pools.find(p => p.id === tx.poolId);
                  const isDeposit = tx.type === "Deposit";

                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/20 hover:border-primary/20 hover:bg-background transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex items-center justify-center h-8 w-8 rounded-full shrink-0",
                          isDeposit ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        )}>
                          {isDeposit ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <p className="font-medium text-sm">{pool?.name}</p>
                            <Badge variant="secondary" className="px-1.5 py-0 text-xs">
                              {isDeposit ? 'Deposit' : 'Withdraw'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "font-medium text-sm",
                          isDeposit ? "text-green-500" : "text-red-500"
                        )}>
                          {isDeposit ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                        </p>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <div className="flex -space-x-1">
                            <TokenIcon symbol={pool?.token1 || ""} />
                            <TokenIcon symbol={pool?.token2 || ""} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Noticeboard */}
        <div className="lg:col-span-1">
          <NoticeBoard />
        </div>
      </div>
    </div>
  );
}