import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historicalPositions, transactionHistory, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function History() {
  const { t } = useTranslation();

  // Combine all interactions and sort by date
  const allInteractions = [
    ...transactionHistory.map(tx => ({
      ...tx,
      date: new Date(tx.timestamp),
      type: tx.type,
    })),
    ...historicalPositions.map(pos => ({
      ...pos,
      date: new Date(pos.exitDate),
      type: "Position Closed",
      amount: pos.exitValue,
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('history.title')}</h2>
        <p className="text-muted-foreground">
          {t('history.description')}
        </p>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{t('history.activity_log')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allInteractions.map((interaction, index) => {
              const pool = pools.find(p => p.id === interaction.poolId);
              const isDeposit = interaction.type === "Deposit";
              const isWithdraw = interaction.type === "Withdraw";
              const isPositionClosed = interaction.type === "Position Closed";

              // Calculate profit/loss for closed positions
              const pnl = isPositionClosed 
                ? Number(interaction.pnl)
                : null;
              const pnlPercentage = isPositionClosed
                ? (pnl / Number(interaction.amount)) * 100
                : null;

              return (
                <div key={`${interaction.type}-${index}`} className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-4">
                    {isDeposit ? (
                      <ArrowUpRight className="h-8 w-8 p-1.5 rounded-full bg-green-500/10 text-green-500" />
                    ) : isWithdraw ? (
                      <ArrowDownRight className="h-8 w-8 p-1.5 rounded-full bg-red-500/10 text-red-500" />
                    ) : (
                      <Clock className="h-8 w-8 p-1.5 rounded-full bg-blue-500/10 text-blue-500" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {t(`history.transaction_type.${interaction.type.toLowerCase().replace(' ', '_')}`)}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {pool?.name}
                        </span>
                      </div>
                      {isPositionClosed && (
                        <div className="mt-1 space-y-1 text-sm">
                          <p>{t('history.initial_investment')}: {formatCurrency(Number(interaction.amount))}</p>
                          <p>{t('history.duration')}: {format(new Date(interaction.entryDate), 'MMM d, yyyy')} - {format(interaction.date, 'MMM d, yyyy')}</p>
                          <p className={pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {t('history.profit_loss')}: {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
                            <span className="ml-1">
                              ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {isDeposit ? '+' : '-'}{formatCurrency(Number(interaction.amount))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(interaction.date, 'MMM d, yyyy HH:mm')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}