import { NoticeBoard } from "@/components/dashboard/notice-board";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { portfolioPositions, transactionHistory, pools, overviewStats } from "@/lib/mock-data";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  // Calculate total portfolio value and daily change
  const totalValue = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value), 0);
  const totalValue24hAgo = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value24hAgo), 0);
  const valueChange = totalValue - totalValue24hAgo;
  const valueChangePercent = (valueChange / totalValue24hAgo) * 100;

  // Get recent transactions
  const recentTransactions = transactionHistory
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h2>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <OverviewChart />
        <div className="lg:col-span-1">
          <NoticeBoard />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => {
                const pool = pools.find(p => p.id === tx.poolId);
                const isDeposit = tx.type === "Deposit";

                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {isDeposit ? (
                        <ArrowUpRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{pool?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {isDeposit ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t(`history.transaction_type.${tx.type.toLowerCase()}`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t('dashboard.portfolio_summary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium">{t('dashboard.total_value')}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                  <p className={`text-sm ${valueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {valueChange >= 0 ? '+' : ''}{formatCurrency(valueChange)} (24h)
                    <span className="ml-1">
                      ({valueChangePercent >= 0 ? '+' : ''}{valueChangePercent.toFixed(2)}%)
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dashboard.average_apr')}</p>
                    <p className="text-lg font-medium text-green-500">
                      {overviewStats.averageApr}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('dashboard.total_yield')}</p>
                    <p className="text-lg font-medium text-green-500">
                      +{formatCurrency(overviewStats.totalYield)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}