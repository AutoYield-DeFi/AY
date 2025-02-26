import { Pool } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, ArrowUpRight, TrendingUp, AlertTriangle } from "lucide-react";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";
import { PoolAnalytics } from "./pool-analytics";
import { useState } from "react";

interface PoolCardProps {
  pool: Pool;
  onDeposit: (pool: Pool) => void;
}

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-6 w-6 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-6 w-6 text-blue-500" />;
    case 'SOL':
      return <CoinsIcon className="h-6 w-6 text-purple-500" />;
    default:
      return <CoinsIcon className="h-6 w-6 text-gray-500" />;
  }
};

const RiskBadge = ({ level }: { level: string }) => {
  const colors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level as keyof typeof colors]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </span>
  );
};

export function PoolCard({ pool, onDeposit }: PoolCardProps) {
  const { t } = useTranslation();
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 card-gradient">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-3">
              <TokenIcon symbol={pool.token0} />
              <TokenIcon symbol={pool.token1} />
            </div>
            <h3 className="text-lg font-semibold">{pool.name}</h3>
          </div>
          <RiskBadge level={pool.riskLevel} />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t('common.tvl')}</p>
            <p className="text-lg font-semibold">{formatCurrency(parseInt(pool.tvl))}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('common.apr')}</p>
            <p className="text-lg font-semibold text-green-500">{pool.apr}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <BarChart2 className="h-4 w-4" />
              <span>{t('pools.volume_24h')}</span>
            </div>
            <p className="text-sm font-medium">{formatCurrency(parseInt(pool.volume24h))}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{t('pools.utilization')}</span>
            </div>
            <p className="text-sm font-medium">{pool.utilizationRate}%</p>
          </div>
        </div>

        {parseFloat(pool.impermanentLoss) > 2 && (
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">High impermanent loss risk: {pool.impermanentLoss}%</span>
          </div>
        )}

        {showAnalytics && (
          <div className="pt-4">
            <PoolAnalytics pool={pool} />
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button className="flex-1" variant="outline" onClick={() => onDeposit(pool)}>
            {t('common.deposit')}
          </Button>
          <Button
            className="w-10 h-10 p-0"
            variant="outline"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}