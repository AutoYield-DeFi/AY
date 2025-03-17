import { useTranslation } from 'react-i18next';
import { Info, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PoolCardProps {
  pool: {
    id: string;
    name: string;
    token1: string;
    token2: string;
    apr: number;
    tvl: number;
    volume24h: number;
    riskLevel: 'low' | 'medium' | 'high';
    utilizationRate?: number;
    poolHealth?: number;
    fees24h?: number;
  }
}

const riskColors = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

const healthColors = {
  high: 'text-green-600',
  medium: 'text-yellow-600',
  low: 'text-red-600'
};

export function PoolCard({ pool }: PoolCardProps) {
  const { t } = useTranslation();

  const getHealthStatus = (health: number = 100) => {
    if (health >= 80) return 'high';
    if (health >= 50) return 'medium';
    return 'low';
  };

  const healthStatus = getHealthStatus(pool.poolHealth);

  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Risk Level Badge */}
      <div className="absolute top-4 right-4">
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className={cn(
              "font-medium border",
              riskColors[pool.riskLevel]
            )}>
              {t(`pools.${pool.riskLevel}_risk`)}
              <AlertTriangle className="ml-1 h-3 w-3" />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent align="end" className="w-80">
            <div className="space-y-2">
              <h4 className="font-semibold">{t('pools.risk_profile')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('defi.terms.risk_note')}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="p-6 space-y-6">
        {/* Pool Name and Tokens */}
        <div>
          <h3 className="text-lg font-semibold mb-1">{pool.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{pool.token1}</Badge>
            <span className="text-muted-foreground">+</span>
            <Badge variant="secondary">{pool.token2}</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <Tooltip>
            <TooltipTrigger className="text-left space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">APR</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-primary">
                {pool.apr.toLocaleString()}%
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                {t('defi.terms.apr')}
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="text-left space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">TVL</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">
                ${pool.tvl.toLocaleString()}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                {t('defi.terms.tvl')}
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="text-left space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">24h Vol</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">
                ${pool.volume24h.toLocaleString()}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{t('pools.volume_metrics')}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <Tooltip>
            <TooltipTrigger className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t('pools.utilization')}
              </span>
              <span className="font-medium">
                {pool.utilizationRate?.toFixed(1)}%
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{t('defi.terms.utilization_rate')}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t('pools.pool_health')}
              </span>
              <span className={cn(
                "font-medium",
                healthColors[healthStatus]
              )}>
                {pool.poolHealth}%
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{t('pools.health_metrics')}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 gap-2" size="lg">
            {t('common.deposit')}
            <TrendingUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex-1 gap-2" size="lg">
            {t('common.details')}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}