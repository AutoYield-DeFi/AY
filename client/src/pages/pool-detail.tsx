import { useRoute } from "wouter";
import { pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DepositDialog } from "@/components/pools/deposit-dialog";
import { useTranslation } from "react-i18next";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { CoinsIcon, AlertTriangle, TrendingUp, LineChart, Calendar, Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { cn } from "@/lib/utils";

const TokenIcon = ({ symbol, size = "small" }: { symbol: string; size?: "small" | "large" }) => {
  const sizeClass = size === "large" ? "h-8 w-8 md:h-10 md:w-10" : "h-5 w-5 md:h-6 md:w-6";

  switch (symbol?.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className={`${sizeClass} text-orange-500`} />;
    case 'ETH':
      return <SiEthereum className={`${sizeClass} text-blue-500`} />;
    case 'SOL':
      return <SiSolana className={`${sizeClass} text-purple-500`} />;
    default:
      return <CoinsIcon className={`${sizeClass} text-gray-500`} />;
  }
};

export default function PoolDetail() {
  const [, params] = useRoute("/pools/:id");
  const { t } = useTranslation();
  const [showDepositDialog, setShowDepositDialog] = useState(false);

  const pool = pools.find(p => p.id === Number(params?.id));

  if (!pool) {
    return (
      <div className="text-center py-12 bg-card/30 rounded-lg border border-border/30">
        <p className="text-sm text-muted-foreground">{t('pools.not_found')}</p>
      </div>
    );
  }

  const hasHighIL = Number(pool.impermanentLoss) > 2;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <TokenIcon symbol={pool.token0} size="large" />
            <TokenIcon symbol={pool.token1} size="large" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{pool.name}</h1>
            <p className="text-sm text-muted-foreground">
              {t('pools.details_description')}
            </p>
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => setShowDepositDialog(true)}
          className="w-full md:w-auto px-4 md:px-8"
        >
          {t('common.deposit')}
        </Button>
      </div>

      {hasHighIL && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 md:p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-500 flex items-center gap-2">
              <DefiTooltip term="impermanent_loss">
                {t('pools.high_il_warning_title')}
              </DefiTooltip>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t('pools.high_il_warning')}
            </p>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              <DefiTooltip term="apr">{t('common.apr')}</DefiTooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold text-green-500">
              {pool.apr}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('pools.annual_rate')}
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              {t('common.volume_24h')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold">
              {formatCurrency(Number(pool.volume24h))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('pools.trading_volume')}
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              {t('pools.daily_fees')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold">
              {formatCurrency(Number(pool.dailyFees))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('pools.earned_24h')}
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-3 md:p-4 pb-1 md:pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <LineChart className="h-4 w-4" />
              <DefiTooltip term="tvl">{t('common.tvl')}</DefiTooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 pt-0">
            <div className="text-xl font-bold">
              {formatCurrency(Number(pool.tvl))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('pools.total_locked')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Token Info & TVL History */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base md:text-lg">{t('pools.token_information')}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TokenIcon symbol={pool.token0} />
                  <div>
                    <h3 className="font-medium text-sm">{pool.token0}</h3>
                    <p className="text-xs text-muted-foreground">{t('pools.primary_token')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">{t('pools.current_price')}</p>
                    <p className="font-medium">{formatCurrency(Number(pool.token0Price))}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('pools.pool_reserve')}</p>
                    <p className="font-medium">{Number(pool.token0Reserve).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TokenIcon symbol={pool.token1} />
                  <div>
                    <h3 className="font-medium text-sm">{pool.token1}</h3>
                    <p className="text-xs text-muted-foreground">{t('pools.paired_token')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">{t('pools.current_price')}</p>
                    <p className="font-medium">{formatCurrency(Number(pool.token1Price))}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('pools.pool_reserve')}</p>
                    <p className="font-medium">{Number(pool.token1Reserve).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base md:text-lg">{t('pools.tvl_history')}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[200px] md:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pool.history}>
                  <defs>
                    <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), t('common.tvl')]}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tvl"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#tvlGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pool Metrics */}
      <Card className="card-gradient">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base md:text-lg">{t('pools.metrics')}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-sm mb-3">{t('pools.risk_profile')}</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{t('pools.risk_level')}</span>
                    <span className={cn(
                      "capitalize font-medium",
                      pool.riskLevel === "low" && "text-green-500",
                      pool.riskLevel === "medium" && "text-yellow-500",
                      pool.riskLevel === "high" && "text-red-500"
                    )}>
                      {t(`pools.${pool.riskLevel}`)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">{t('pools.impermanent_loss')}</span>
                    <span className={cn(
                      "font-medium",
                      Number(pool.impermanentLoss) > 2 ? "text-red-500" : "text-green-500"
                    )}>
                      {pool.impermanentLoss}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3">{t('pools.volume_metrics')}</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{t('pools.weekly_volume')}</span>
                    <span className="font-medium">{formatCurrency(Number(pool.volume7d))}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">{t('pools.weekly_fees')}</span>
                    <span className="font-medium">{formatCurrency(Number(pool.weeklyFees))}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="font-medium text-sm mb-3">{t('pools.pool_health')}</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{t('pools.utilization')}</span>
                    <span className={cn(
                      "font-medium",
                      Number(pool.utilizationRate) > 80 ? "text-yellow-500" :
                      Number(pool.utilizationRate) > 95 ? "text-red-500" : "text-green-500"
                    )}>
                      {pool.utilizationRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">{t('pools.price_ratio')}</span>
                    <span className="font-medium">{Number(pool.priceRatio).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDepositDialog && (
        <DepositDialog
          pool={pool}
          isOpen={showDepositDialog}
          onClose={() => setShowDepositDialog(false)}
        />
      )}
    </div>
  );
}