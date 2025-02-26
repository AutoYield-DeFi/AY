import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type { Pool } from "@shared/schema";
import { AlertTriangle, TrendingUp, DollarSign, ChartBar } from "lucide-react";

interface PoolAnalyticsProps {
  pool: Pool;
}

export function PoolAnalytics({ pool }: PoolAnalyticsProps) {
  const { t } = useTranslation();

  // Mock historical data - would come from API in production
  const historyData = [
    { date: '2024-02-20', tvl: 2400000 },
    { date: '2024-02-21', tvl: 2600000 },
    { date: '2024-02-22', tvl: 2900000 },
    { date: '2024-02-23', tvl: 2700000 },
    { date: '2024-02-24', tvl: 3100000 },
  ];

  const riskLevelColor = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500"
  };

  return (
    <div className="grid gap-4">
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{t('pools.analytics.volume_trend')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tvl"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('pools.analytics.performance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('pools.daily_fees')}</span>
                <span className="font-medium">{formatCurrency(Number(pool.dailyFees))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('pools.weekly_volume')}</span>
                <span className="font-medium">{formatCurrency(Number(pool.volume7d))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('pools.utilization')}</span>
                <span className="font-medium">{pool.utilizationRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t('pools.analytics.risk_metrics')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('pools.risk_level')}</span>
                <span className={`font-medium ${riskLevelColor[pool.riskLevel as keyof typeof riskLevelColor]}`}>
                  {t(`pools.${pool.riskLevel}`)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('pools.impermanent_loss')}</span>
                <span className="font-medium">{pool.impermanentLoss}%</span>
              </div>
            </div>
            {Number(pool.impermanentLoss) > 2 && (
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-500">
                  {t('pools.high_il_warning')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}