import { useState } from "react";
import { AssetsChart } from "@/components/portfolio/assets-chart";
import { WithdrawDialog } from "@/components/portfolio/withdraw-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Wallet2, Clock } from "lucide-react";
import type { Position } from "@shared/schema";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export default function Portfolio() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const { t } = useTranslation();

  const totalValue = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value), 0);
  const totalValue24hAgo = portfolioPositions.reduce((sum, pos) => sum + Number(pos.value24hAgo), 0);
  const value24hChange = totalValue - totalValue24hAgo;
  const value24hChangePercent = (value24hChange / totalValue24hAgo) * 100;

  const totalPnL = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl), 0);
  const totalPnL24h = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl24h), 0);
  const totalPnL7d = portfolioPositions.reduce((sum, pos) => sum + Number(pos.pnl7d), 0);
  const pnlPercentage = (totalPnL / (totalValue - totalPnL)) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('portfolio.title')}</h2>
        <p className="text-muted-foreground">
          {t('portfolio.description')}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet2 className="h-5 w-5" />
              {t('portfolio.current_value')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalValue)}
            </div>
            <div className={`text-sm mt-1 ${value24hChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {value24hChange >= 0 ? '+' : ''}{formatCurrency(value24hChange)} (24h)
              <span className="ml-1">
                ({value24hChangePercent >= 0 ? '+' : ''}{value24hChangePercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {totalPnL >= 0 ? (
                <ArrowUpRight className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-500" />
              )}
              {t('portfolio.performance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
              <span className="text-sm ml-2">
                ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%) total
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div>
                <span className="text-muted-foreground">24h P&L: </span>
                <span className={totalPnL24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {totalPnL24h >= 0 ? '+' : ''}{formatCurrency(totalPnL24h)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">7d P&L: </span>
                <span className={totalPnL7d >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {totalPnL7d >= 0 ? '+' : ''}{formatCurrency(totalPnL7d)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <AssetsChart />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{t('portfolio.active_positions')}</h3>
          <Button variant="outline" size="sm" disabled>
            {t('portfolio.add_position')}
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolioPositions.map(position => {
            const pool = pools.find(p => p.id === position.poolId);
            const pnlPercentage = (Number(position.pnl) / (Number(position.value) - Number(position.pnl))) * 100;
            const dailyFees = Number(pool?.dailyFees) * (Number(position.value) / Number(pool?.tvl));

            return (
              <Card key={position.id} className="card-gradient">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-lg">{pool?.name}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>{t('portfolio.initial')}: {formatCurrency(Number(position.amount))}</p>
                          <p>{t('portfolio.pool_share')}: {((Number(position.value) / Number(pool?.tvl)) * 100).toFixed(2)}%</p>
                          <p className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(position.entryDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedPosition(position)}
                      >
                        {t('common.withdraw')}
                      </Button>
                    </div>

                    <div className="space-y-3 pt-2 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('portfolio.current_value')}</p>
                        <p className="font-medium">{formatCurrency(Number(position.value))}</p>
                        <p className={`text-xs ${Number(position.value) - Number(position.value24hAgo) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {Number(position.value) - Number(position.value24hAgo) >= 0 ? '+' : ''}
                          {formatCurrency(Number(position.value) - Number(position.value24hAgo))} (24h)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('portfolio.daily_yield')}</p>
                        <p className="font-medium text-green-500">+{formatCurrency(dailyFees)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('portfolio.performance')}</p>
                        <p className={`font-medium ${Number(position.pnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {Number(position.pnl) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl))}
                          <span className="text-xs ml-1">
                            ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(1)}%)
                          </span>
                        </p>
                        <div className="text-xs space-x-2">
                          <span className={Number(position.pnl24h) >= 0 ? 'text-green-500' : 'text-red-500'}>
                            24h: {Number(position.pnl24h) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl24h))}
                          </span>
                          <span className={Number(position.pnl7d) >= 0 ? 'text-green-500' : 'text-red-500'}>
                            7d: {Number(position.pnl7d) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl7d))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('common.apr')}</span>
                        <span className="font-medium text-green-500">{pool?.apr}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedPosition && (
        <WithdrawDialog
          position={selectedPosition}
          isOpen={!!selectedPosition}
          onClose={() => setSelectedPosition(null)}
        />
      )}
    </div>
  );
}