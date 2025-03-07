import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historicalPositions, transactionHistory, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Clock, Filter, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function History() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  // Calculate totals
  const totalDeposits = transactionHistory
    .filter(tx => tx.type === "Deposit")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalWithdrawals = transactionHistory
    .filter(tx => tx.type === "Withdraw")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalPnL = historicalPositions
    .reduce((sum, pos) => sum + Number(pos.pnl), 0);

  // Combine and filter transactions
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

  // Filter based on active tab
  const filteredInteractions = allInteractions.filter(interaction => {
    if (activeTab === "all") return true;
    if (activeTab === "deposits") return interaction.type === "Deposit";
    if (activeTab === "withdrawals") return interaction.type === "Withdraw";
    if (activeTab === "closed") return interaction.type === "Position Closed";
    return true;
  });

  // Further filter by time
  const timeFilteredInteractions = filteredInteractions.filter(interaction => {
    if (timeFilter === "all") return true;

    const now = new Date();
    const interactionDate = new Date(interaction.date);

    if (timeFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return interactionDate >= weekAgo;
    }

    if (timeFilter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return interactionDate >= monthAgo;
    }

    return true;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('history.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('history.description')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{t('history.total_deposits')}</p>
              <p className="text-xl font-bold text-green-500">
                +{formatCurrency(totalDeposits)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{t('history.total_withdrawals')}</p>
              <p className="text-xl font-bold text-red-500">
                -{formatCurrency(totalWithdrawals)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">{t('history.profit_loss')}</p>
              <p className={cn(
                "text-xl font-bold",
                totalPnL >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="text-xs">{t('history.all_activity')}</TabsTrigger>
            <TabsTrigger value="deposits" className="text-xs">{t('common.deposit')}</TabsTrigger>
            <TabsTrigger value="withdrawals" className="text-xs">{t('common.withdraw')}</TabsTrigger>
            <TabsTrigger value="closed" className="text-xs">{t('history.closed_positions')}</TabsTrigger>
          </TabsList>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="h-3.5 w-3.5 mr-1" />
                {timeFilter === "all" ? t('history.all_time') : 
                 timeFilter === "week" ? t('history.past_week') : t('history.past_month')}
                <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeFilter("all")}>
                {t('history.all_time')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("week")}>
                {t('history.past_week')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("month")}>
                {t('history.past_month')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="all" className="mt-4">
          <ActivityLog interactions={timeFilteredInteractions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ActivityLog({ interactions }: { interactions: any[] }) {
  const { t } = useTranslation();

  if (interactions.length === 0) {
    return (
      <div className="text-center py-12 bg-card/30 rounded-lg border border-border/30">
        <p className="text-sm text-muted-foreground">{t('history.no_transactions')}</p>
      </div>
    );
  }

  return (
    <Card className="card-gradient">
      <CardContent className="p-4 space-y-3">
        {interactions.map((interaction, index) => {
          const pool = pools.find(p => p.id === interaction.poolId);
          const isDeposit = interaction.type === "Deposit";
          const isWithdraw = interaction.type === "Withdraw";
          const isPositionClosed = interaction.type === "Position Closed";

          const pnl = isPositionClosed ? Number(interaction.pnl || 0) : null;
          const pnlPercentage = isPositionClosed && pnl !== null && Number(interaction.amount) !== 0
            ? (pnl / Number(interaction.amount)) * 100
            : null;

          // Group by date
          const currentDate = format(interaction.date, 'MMM d, yyyy');
          const previousDate = index > 0 
            ? format(interactions[index-1].date, 'MMM d, yyyy')
            : null;
          const showDateHeader = index === 0 || currentDate !== previousDate;

          return (
            <div key={`${interaction.type}-${index}`}>
              {showDateHeader && (
                <div className="flex items-center gap-2 py-2 mb-2 border-b border-border/30">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">{currentDate}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between p-3 rounded-lg bg-card/80 border border-border/20 hover:border-primary/20 hover:bg-card transition-all duration-200 gap-3">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "h-8 w-8 flex items-center justify-center rounded-full shrink-0",
                    isDeposit && "bg-green-500/10 text-green-500",
                    isWithdraw && "bg-red-500/10 text-red-500",
                    isPositionClosed && "bg-blue-500/10 text-blue-500"
                  )}>
                    {isDeposit ? <ArrowUpRight className="h-4 w-4" /> :
                     isWithdraw ? <ArrowDownRight className="h-4 w-4" /> :
                     <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h3 className="text-sm font-medium">
                        {t(`history.transaction_type.${interaction.type.toLowerCase().replace(' ', '_')}`)}
                      </h3>
                      {pool && (
                        <Badge variant="secondary" className="w-fit flex items-center gap-1 text-xs">
                          <div className="flex -space-x-1 mr-1">
                            <TokenIcon symbol={pool.token0} />
                            <TokenIcon symbol={pool.token1} />
                          </div>
                          {pool.name}
                        </Badge>
                      )}
                    </div>
                    {isPositionClosed && interaction.entryDate && (
                      <div className="mt-2 space-y-1 text-xs">
                        <p>{t('history.initial_investment')}: {formatCurrency(Number(interaction.amount))}</p>
                        <p>{t('history.duration')}: {format(new Date(interaction.entryDate), 'MMM d, yyyy')} - {format(interaction.date, 'MMM d, yyyy')}</p>
                        {pnl !== null && (
                          <p className={pnl >= 0 ? "text-green-500" : "text-red-500"}>
                            {t('history.profit_loss')}: {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
                            {pnlPercentage !== null && (
                              <span className="ml-1">
                                ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0">
                  <div className="text-sm font-medium">
                    {isDeposit ? '+' : '-'}{formatCurrency(Number(interaction.amount))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(interaction.date, 'HH:mm')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}