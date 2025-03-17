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
  Clock,
  PieChart,
  CircleDollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  CartesianGrid,
  Pie,
  Cell,
  Legend
} from "recharts";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol?.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-5 w-5 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-5 w-5 text-blue-500" />;
    case 'SOL':
      return <SiSolana className="h-5 w-5 text-[#14F195]" />;
    default:
      return <CoinsIcon className="h-5 w-5 text-primary" />;
  }
};

export default function Dashboard() {
  // Calculate wallet balance
  const solBalanceUSD = walletBalances.sol * walletBalances.solPrice;
  const usdcBalanceUSD = walletBalances.usdc * walletBalances.usdcPrice;
  const totalWalletBalance = solBalanceUSD + usdcBalanceUSD;

  // Calculate positions value
  const totalPositionsValue = transactionHistory.reduce((sum, tx) => 
    tx.type === "Deposit" ? sum + Number(tx.amount) : sum - Number(tx.amount), 0);
  const positionsValue24hChange = totalPositionsValue * 0.05; // Mock 5% daily change
  const positionsValue24hChangePercent = (positionsValue24hChange / totalPositionsValue) * 100;

  // Calculate total portfolio value
  const totalPortfolioValue = totalWalletBalance + totalPositionsValue;

  // Performance data with multiple metrics
  const performanceData = [
    { date: '1 Mar', value: totalPortfolioValue * 0.9, tvl: totalPortfolioValue * 0.85, yield: totalPortfolioValue * 0.01 },
    { date: '2 Mar', value: totalPortfolioValue * 0.95, tvl: totalPortfolioValue * 0.9, yield: totalPortfolioValue * 0.012 },
    { date: '3 Mar', value: totalPortfolioValue * 0.97, tvl: totalPortfolioValue * 0.95, yield: totalPortfolioValue * 0.015 },
    { date: '4 Mar', value: totalPortfolioValue * 0.98, tvl: totalPortfolioValue * 0.97, yield: totalPortfolioValue * 0.018 },
    { date: '5 Mar', value: totalPortfolioValue * 0.99, tvl: totalPortfolioValue * 0.99, yield: totalPortfolioValue * 0.02 },
    { date: '6 Mar', value: totalPortfolioValue, tvl: totalPortfolioValue, yield: totalPortfolioValue * 0.022 },
  ];

  // Portfolio composition data
  const portfolioComposition = [
    { name: 'SOL', value: solBalanceUSD },
    { name: 'USDC', value: usdcBalanceUSD },
    { name: 'Staked', value: totalPositionsValue }
  ];

  const COLORS = ['#14F195', '#2775CA', '#5C69FF'];

  // Recent activity
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

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
            <div className={cn(
              "flex items-center gap-1 mt-1 text-sm",
              positionsValue24hChange >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {positionsValue24hChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : 
                                          <ArrowDownRight className="h-4 w-4" />}
              {positionsValue24hChange >= 0 ? '+' : ''}{formatCurrency(positionsValue24hChange)}
              <span className="text-muted-foreground ml-1">24h</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-primary" />
              Available Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{formatCurrency(totalWalletBalance)}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-muted/50">SOL: {walletBalances.sol.toFixed(2)}</Badge>
              <Badge variant="outline" className="bg-muted/50">USDC: {walletBalances.usdc.toFixed(2)}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Staked Value
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{formatCurrency(totalPositionsValue)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Across {transactionHistory.length} positions
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Monthly Yield
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold text-green-500">
              +{formatCurrency(totalPositionsValue * 0.15)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Average APR: 15.2%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        {/* Performance Chart */}
        <Card className="lg:col-span-8 bg-card/50 border-primary/5">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Portfolio Performance
                </CardTitle>
                <CardDescription>Track your portfolio value and yields over time</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary mr-1" />
                  Value
                </Badge>
                <Badge variant="outline" className="bg-green-500/10">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                  Yield
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
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
                              {payload[2] && (
                                <div className="flex items-center gap-2 text-sm">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  <span>Yield: +{formatCurrency(payload[2].value)}</span>
                                </div>
                              )}
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
                    dataKey="yield"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#colorYield)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Composition */}
        <Card className="lg:col-span-4 bg-card/50 border-primary/5">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Asset Allocation
            </CardTitle>
            <CardDescription>Distribution of your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioComposition}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value, entry) => {
                      const item = portfolioComposition.find(i => i.name === value);
                      return <span className="text-sm">{value}: {formatCurrency(item?.value || 0)}</span>;
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/50 border-primary/5">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest transactions and updates</CardDescription>
              </div>
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
          <CardContent className="p-4">
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => {
                const pool = pools.find(p => p.id === tx.poolId);
                const isDeposit = tx.type === "Deposit";

                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/20 hover:border-primary/20 hover:bg-background transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-full shrink-0",
                        isDeposit ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {isDeposit ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center flex-wrap gap-2">
                          <p className="font-medium">{pool?.name}</p>
                          <Badge variant="secondary" className="px-1.5 py-0 text-xs">
                            {isDeposit ? 'Deposit' : 'Withdraw'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Clock className="h-4 w-4" />
                          {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-lg font-medium",
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

        {/* Noticeboard */}
        <div className="lg:col-span-1">
          <NoticeBoard />
        </div>
      </div>
    </div>
  );
}