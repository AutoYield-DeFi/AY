import { NoticeBoard } from "@/components/dashboard/notice-board";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ArrowUpRight, ArrowDownRight, TrendingUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { portfolioPositions, transactionHistory, pools, overviewStats } from "@/lib/mock-data";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { Badge } from "@/components/ui/badge";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol?.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-5 w-5 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-5 w-5 text-blue-500" />;
    case 'SOL':
      return <CoinsIcon className="h-5 w-5 text-purple-500" />;
    default:
      return <CoinsIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function Dashboard() {
  const { t } = useTranslation();

  // Calculate total portfolio value and daily change
  const totalValue = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value), 0);
  const totalValue24hAgo = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value24hAgo || 0), 0);
  const valueChange = totalValue - totalValue24hAgo;
  const valueChangePercent = (valueChange / totalValue24hAgo) * 100;

  // Get recent transactions
  const recentTransactions = transactionHistory
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('dashboard.title')}
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          {t('dashboard.description')}
        </p>
      </div>

      {/* Stats cards section with improved styling */}
      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>

      {/* Main dashboard content with improved layout */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border border-border/40 bg-card/80 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{t('dashboard.market_overview')}</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                  <span>{t('dashboard.more_details')}</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>
        </div>
        <div>
          <NoticeBoard />
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Recent Activity Card */}
        <Card className="border border-border/40 bg-card/80 hover:bg-card hover:border-primary/30 transition-colors duration-200">
          <CardHeader className="p-4 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('dashboard.recent_activity')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="space-y-3 md:space-y-4">
              {recentTransactions.map((tx, index) => {
                const pool = pools.find(p => p.id === tx.poolId);
                const isDeposit = tx.type === "Deposit";

                return (
                  <div key={index} className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-background/50 border border-border/20 hover:border-primary/20 hover:bg-background transition-all duration-200">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full ${isDeposit ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} shrink-0`}>
                        {isDeposit ? (
                          <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center flex-wrap gap-1 md:gap-2">
                          <p className="font-medium text-sm md:text-base">{pool?.name}</p>
                          <Badge variant="secondary" className="px-1 py-0 text-xs hidden sm:inline-flex">
                            {t(`history.transaction_type.${tx.type.toLowerCase()}`)}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium text-sm md:text-base ${isDeposit ? 'text-green-500' : 'text-red-500'}`}>
                        {isDeposit ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        <div className="flex -space-x-1 mr-1">
                          <TokenIcon symbol={pool?.token0 || ""} />
                          <TokenIcon symbol={pool?.token1 || ""} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button variant="outline" size="sm" className="w-full text-center text-xs md:text-sm">
                {t('dashboard.view_all_transactions')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Summary Card */}
        <Card className="border border-border/40 bg-card/80 hover:bg-card hover:border-primary/30 transition-colors duration-200">
          <CardHeader className="p-4 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('dashboard.portfolio_summary')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">{t('dashboard.total_value')}</p>
                  <DefiTooltip term="tvl" className="text-xs">
                    {t('common.tvl')}
                  </DefiTooltip>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 md:gap-2 mt-1">
                  <p className="text-xl md:text-2xl font-bold">{formatCurrency(totalValue)}</p>
                  <p className={`text-xs md:text-sm ${valueChange >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                    {valueChange >= 0 ? <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" /> : <ArrowDownRight className="h-3 w-3 md:h-4 md:w-4" />}
                    {valueChange >= 0 ? '+' : ''}{formatCurrency(valueChange)} (24h)
                    <span className="ml-1">
                      ({valueChangePercent >= 0 ? '+' : ''}{valueChangePercent.toFixed(2)}%)
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-3 md:pt-4 border-t border-border/30">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm text-muted-foreground">{t('dashboard.average_apr')}</p>
                      <DefiTooltip term="apr" className="text-xs">
                        {t('defi.terms.apr')}
                      </DefiTooltip>
                    </div>
                    <p className="text-base md:text-lg font-medium text-green-500 mt-1">
                      {overviewStats.averageApr}%
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm text-muted-foreground">{t('dashboard.total_yield')}</p>
                      <DefiTooltip term="yield_farming" className="text-xs">
                        {t('defi.terms.yield_farming')}
                      </DefiTooltip>
                    </div>
                    <p className="text-base md:text-lg font-medium text-green-500 mt-1">
                      +{formatCurrency(overviewStats.totalYield)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 md:pt-4 border-t border-border/30">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{t('dashboard.top_performing_assets')}</p>
                <div className="space-y-2">
                  {portfolioPositions
                    .sort((a, b) => Number(b.pnl) - Number(a.pnl))
                    .slice(0, 2)
                    .map((position) => {
                      const pool = pools.find(p => p.id === position.poolId);
                      return (
                        <div key={position.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1">
                              <TokenIcon symbol={pool?.token0 || ""} />
                              <TokenIcon symbol={pool?.token1 || ""} />
                            </div>
                            <span className="font-medium text-xs md:text-sm">{pool?.name}</span>
                          </div>
                          <span className="text-green-500 text-xs md:text-sm font-medium">
                            +{formatCurrency(Number(position.pnl))}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}