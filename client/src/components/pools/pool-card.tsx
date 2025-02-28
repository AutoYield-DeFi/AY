import { Pool } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp } from "lucide-react";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";
import { useLocation } from "wouter";
import { DefiTooltip } from "@/components/ui/defi-tooltip";

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
    low: "bg-green-500/10 text-green-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-red-500/10 text-red-500",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level as keyof typeof colors]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </span>
  );
};

export function PoolCard({ pool, onDeposit }: PoolCardProps) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const dailyYield = Number(pool.dailyFees) / Number(pool.tvl) * 100;

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 card-gradient cursor-pointer" 
      onClick={() => setLocation(`/pools/${pool.id}`)}
    >
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
            <DefiTooltip term="tvl">
              <p className="text-sm text-muted-foreground">{t('common.tvl')}</p>
            </DefiTooltip>
            <p className="text-lg font-semibold">{formatCurrency(Number(pool.tvl))}</p>
          </div>
          <div>
            <DefiTooltip term="apr">
              <p className="text-sm text-muted-foreground">{t('common.apr')}</p>
            </DefiTooltip>
            <p className="text-lg font-semibold text-green-500">{pool.apr}%</p>
            <p className="text-xs text-muted-foreground">
              ~{dailyYield.toFixed(2)}% {t('common.daily')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <BarChart2 className="h-4 w-4" />
              <DefiTooltip term="liquidity">
                <span>{t('common.volume')} (24H)</span>
              </DefiTooltip>
            </div>
            <p className="text-sm font-medium">{formatCurrency(Number(pool.volume24h))}</p>
            <p className="text-xs text-muted-foreground">
              7D: {formatCurrency(Number(pool.volume7d))}
            </p>
          </div>
          <div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <DefiTooltip term="impermanent_loss">
                <span>{t('pools.impermanent_loss')}</span>
              </DefiTooltip>
            </div>
            <p className="text-sm font-medium">{pool.impermanentLoss}%</p>
            <p className="text-xs text-muted-foreground">
              {t('pools.utilization')}: {pool.utilizationRate}%
            </p>
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="outline" 
          onClick={(e) => {
            e.stopPropagation();
            onDeposit(pool);
          }}
        >
          {t('common.deposit')}
        </Button>
      </CardContent>
    </Card>
  );
}