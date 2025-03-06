import { Pool } from "@shared/schema";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/utils";
import { useLocation } from "wouter";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { Progress } from "@/components/ui/progress";

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
    low: "bg-green-500/10 text-green-600 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    high: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  const colorClass = colors[level.toLowerCase() as keyof typeof colors] || "bg-gray-500/10 text-gray-600 border-gray-500/20";

  return (
    <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${colorClass} border`}>
      <Shield className="h-3 w-3" />
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </div>
  );
};

export function PoolCard({ pool, onDeposit }: PoolCardProps) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  // Calculate utilization rate percentage for visualization
  const utilizationPercentage = Number(pool.utilizationRate);

  // Determine if the pool has high impermanent loss risk
  const hasHighIL = Number(pool.impermanentLoss) > 2;

  return (
    <Card 
      className="overflow-hidden border border-border/40 hover:border-primary/30 bg-card/80 hover:bg-card transition-all duration-300 h-full flex flex-col relative" 
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

      <CardContent className="grid gap-4 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DefiTooltip term="tvl" className="flex items-center">
              <p className="text-sm text-muted-foreground">{t('common.tvl')}</p>
            </DefiTooltip>
            <p className="text-lg font-semibold">{formatCurrency(Number(pool.tvl))}</p>
          </div>
          <div>
            <DefiTooltip term="apr" className="flex items-center">
              <p className="text-sm text-muted-foreground">{t('common.apr')}</p>
            </DefiTooltip>
            <p className="text-lg font-semibold text-green-500">{pool.apr}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <BarChart2 className="h-4 w-4" />
              <span>{t('common.volume_24h')}</span>
            </div>
            <p className="text-sm font-medium">{formatCurrency(Number(pool.volume24h))}</p>
          </div>
          <div>
            <DefiTooltip term="utilization_rate" className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{t('pools.utilization')}</span>
            </DefiTooltip>
            <div className="mt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{pool.utilizationRate}%</span>
              </div>
              <Progress value={utilizationPercentage} className="h-1.5" />
            </div>
          </div>
        </div>

        {hasHighIL && (
          <div className="absolute top-1 right-1 z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-yellow-500/70" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <DefiTooltip term="impermanent_loss" className="text-xs">
                    {t('pools.high_il_warning_short')}
                  </DefiTooltip>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-primary/90 hover:bg-primary" 
          onClick={(e) => {
            e.stopPropagation();
            onDeposit(pool);
          }}
        >
          {t('common.deposit')}
        </Button>
      </CardFooter>

      {/* Overlay for better hover effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
    </Card>
  );
}

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";