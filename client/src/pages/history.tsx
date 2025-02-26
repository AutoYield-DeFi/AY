import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historicalPositions, transactionHistory, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

export default function History() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">History</h2>
        <p className="text-muted-foreground">
          View your past transactions and closed positions
        </p>
      </div>

      <div className="space-y-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Closed Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicalPositions.map(position => {
                const pool = pools.find(p => p.id === position.poolId);
                const pnlPercentage = (Number(position.pnl) / (Number(position.amount))) * 100;

                return (
                  <div key={position.id} className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{pool?.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(position.entryDate), 'MMM d, yyyy')} - {format(new Date(position.exitDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>Initial: {formatCurrency(Number(position.amount))}</p>
                        <p>Exit Value: {formatCurrency(Number(position.exitValue))}</p>
                      </div>
                    </div>
                    <div className={`text-right ${Number(position.pnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="font-medium">
                        {Number(position.pnl) >= 0 ? '+' : ''}{formatCurrency(Number(position.pnl))}
                      </div>
                      <div className="text-sm">
                        ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactionHistory.map(transaction => {
                const pool = pools.find(p => p.id === transaction.poolId);
                const isDeposit = transaction.type === "Deposit";

                return (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      {isDeposit ? (
                        <ArrowUpRight className="h-8 w-8 p-1.5 rounded-full bg-green-500/10 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-8 w-8 p-1.5 rounded-full bg-red-500/10 text-red-500" />
                      )}
                      <div>
                        <h3 className="font-medium">{transaction.type}</h3>
                        <p className="text-sm text-muted-foreground">{pool?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatCurrency(Number(transaction.amount))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(transaction.timestamp), 'MMM d, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
