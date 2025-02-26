import { useState } from "react";
import { AssetsChart } from "@/components/portfolio/assets-chart";
import { WithdrawDialog } from "@/components/portfolio/withdraw-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioPositions, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Wallet2 } from "lucide-react";
import type { Position } from "@shared/schema";

export default function Portfolio() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const totalValue = portfolioPositions.reduce((sum, pos) => sum + pos.value, 0);
  const totalPnL = portfolioPositions.reduce((sum, pos) => sum + pos.pnl, 0);
  const pnlPercentage = (totalPnL / (totalValue - totalPnL)) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
        <p className="text-muted-foreground">
          Track your liquidity positions and returns
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet2 className="h-5 w-5" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalValue)}
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
              Total P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
              <span className="text-sm ml-2">
                ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <AssetsChart />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Active Positions</h3>
          <Button variant="outline" size="sm" disabled>
            Add Position
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolioPositions.map(position => {
            const pool = pools.find(p => p.id === position.poolId);
            const pnlPercentage = (position.pnl / (position.value - position.pnl)) * 100;

            return (
              <Card key={position.id} className="card-gradient">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-lg">{pool?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Value: {formatCurrency(position.amount)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPosition(position)}
                      >
                        Withdraw
                      </Button>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-medium">{formatCurrency(position.value)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">P&L</p>
                        <p className={`font-medium ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                          <span className="text-xs ml-1">
                            ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(1)}%)
                          </span>
                        </p>
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