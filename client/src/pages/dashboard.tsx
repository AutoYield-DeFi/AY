import { NoticeBoard } from "@/components/dashboard/notice-board";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { transactionHistory, pools, walletBalances } from "@/lib/mock-data";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

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
  const { t } = useTranslation();

  // Calculate wallet balance
  const solBalanceUSD = walletBalances.sol * walletBalances.solPrice;
  const usdcBalanceUSD = walletBalances.usdc * walletBalances.usdcPrice;
  const totalWalletBalance = solBalanceUSD + usdcBalanceUSD;

  // Calculate positions value
  const totalPositionsValue = 0; // Temporary until positions feature is implemented
  const positionsValue24hChange = 0;
  const positionsValue24hChangePercent = 0;

  // Calculate total portfolio value (wallet + positions)
  const totalPortfolioValue = totalWalletBalance + totalPositionsValue;

  // Performance data for the line chart
  const performanceData = [
    { date: '1 Mar', value: totalPortfolioValue * 0.9 },
    { date: '2 Mar', value: totalPortfolioValue * 0.95 },
    { date: '3 Mar', value: totalPortfolioValue * 0.97 },
    { date: '4 Mar', value: totalPortfolioValue * 0.98 },
    { date: '5 Mar', value: totalPortfolioValue * 0.99 },
    { date: '6 Mar', value: totalPortfolioValue },
  ];

  // Get recent transactions
  const recentTransactions = transactionHistory
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('dashboard.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('dashboard.description')}
        </p>
      </div>

      {/* Portfolio Overview */}
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t('portfolio.overview')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total Portfolio Value */}
          <div>
            <p className="text-sm text-muted-foreground">{t('portfolio.total_portfolio_value')}</p>
            <p className="text-2xl md:text-3xl font-bold mt-1">{formatCurrency(totalPortfolioValue)}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">{t('portfolio.available_balance')}</p>
                <p className="text-base md:text-lg font-medium">{formatCurrency(totalWalletBalance)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('portfolio.positions_value')}</p>
                <p className="text-base md:text-lg font-medium">{formatCurrency(totalPositionsValue)}</p>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="h-[200px] md:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#888', fontSize: 12 }} 
                  axisLine={{ stroke: '#444' }}
                />
                <YAxis 
                  tick={{ fill: '#888', fontSize: 12 }} 
                  axisLine={{ stroke: '#444' }}
                  tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), t('portfolio.value')]}
                  labelFormatter={(label: string) => `${label}`}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 3, fill: "var(--background)" }}
                  activeDot={{ stroke: "hsl(var(--primary))", strokeWidth: 2, r: 5, fill: "var(--background)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Recent Activity */}
          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  {t('dashboard.recent_activity')}
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                  <span>{t('dashboard.view_all_transactions')}</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => {
                  const pool = pools.find(p => p.id === tx.poolId);
                  const isDeposit = tx.type === "Deposit";

                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/20 hover:border-primary/20 hover:bg-background transition-all duration-200">
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
                            <Badge variant="secondary" className="px-1 py-0 text-xs">
                              {t(`history.transaction_type.${tx.type.toLowerCase()}`)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "font-medium text-sm",
                          isDeposit ? "text-green-500" : "text-red-500"
                        )}>
                          {isDeposit ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                        </p>
                        <div className="flex items-center gap-1 justify-end">
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