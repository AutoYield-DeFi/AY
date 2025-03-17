import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Pool } from "@/lib/types";
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
import { DepositDialog } from "./deposit-dialog";
import { useLocation } from "wouter";

interface PoolCardProps {
  pool: Pool;
}

const riskColors = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
} as const;

const healthColors = {
  high: 'text-green-600',
  medium: 'text-yellow-600',
  low: 'text-red-600'
} as const;

// Format large numbers with abbreviations
const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}M`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }
  return value.toLocaleString();
};

export function PoolCard({ pool }: PoolCardProps) {
  const { t } = useTranslation();
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [, setLocation] = useLocation();

  const getHealthStatus = (health: number = 100) => {
    if (health >= 80) return 'high';
    if (health >= 50) return 'medium';
    return 'low';
  };

  const healthStatus = getHealthStatus(pool.poolHealth);

  return (
    <>
      <Card className="relative overflow-hidden hover:shadow-md transition-all duration-200 bg-card/50">
        {/* Risk Level Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className={cn(
            "font-medium border",
            riskColors[pool.riskLevel]
          )}>
            {pool.riskLevel === 'low' ? 'Low Risk' : pool.riskLevel === 'medium' ? 'Medium Risk' : 'High Risk'}
          </Badge>
        </div>

        <div className="p-6 space-y-4">
          {/* Pool Name and Tokens */}
          <div>
            <h3 className="text-lg font-semibold mb-1 truncate">{pool.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{pool.token1}</Badge>
              <span className="text-muted-foreground">+</span>
              <Badge variant="secondary">{pool.token2}</Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Tooltip>
              <TooltipTrigger className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">APR</span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xl font-bold text-primary truncate">
                  {pool.apr}%
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Annual Percentage Rate - The yearly rate of return on your investment without compounding.
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">TVL</span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xl font-bold truncate">
                  ${formatLargeNumber(pool.tvl)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Total Value Locked - The total amount of assets currently in the pool.
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">24h Vol</span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xl font-bold truncate">
                  ${formatLargeNumber(pool.volume24h)}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">24-hour trading volume for this pool</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
            <Tooltip>
              <TooltipTrigger className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Utilization
                </span>
                <span className="font-medium">
                  {pool.utilizationRate}%
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">The percentage of pool assets currently being utilized</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Health
                </span>
                <span className={cn(
                  "font-medium",
                  healthColors[healthStatus]
                )}>
                  {pool.poolHealth}%
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Overall health and stability of the pool</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1 gap-2"
              size="lg"
              onClick={() => setShowDepositDialog(true)}
            >
              Deposit
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              size="lg"
              onClick={() => setLocation(`/pools/${pool.id}`)}
            >
              Details
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <DepositDialog
        pool={pool}
        isOpen={showDepositDialog}
        onClose={() => setShowDepositDialog(false)}
      />
    </>
  );
}