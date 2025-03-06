import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historicalPositions, transactionHistory, pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Clock, Filter, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol?.toUpperCase()) {
    case 'BTC':
      return <SiBitcoin className="h-5 w-5 text-orange-500" />;
    case 'ETH':
      return <SiEthereum className="h-5 w-5 text-blue-500" />;
    case 'SOL':
      return <CoinsIcon className="h-5 w-5 text-purple-500" />;
    default:
      return <CoinsIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function History() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

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

  // Filter interactions based on active tab
  const filteredInteractions = allInteractions.filter(interaction => {
    if (activeTab === "all") return true;
    if (activeTab === "deposits") return interaction.type === "Deposit";
    if (activeTab === "withdrawals") return interaction.type === "Withdraw";
    if (activeTab === "closed") return interaction.type === "Position Closed";
    return true;
  });

  // Further filter by time if needed
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

  // Calculate total values for summary
  const totalDeposits = transactionHistory
    .filter(tx => tx.type === "Deposit")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalWithdrawals = transactionHistory
    .filter(tx => tx.type === "Withdraw")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalPnL = historicalPositions
    .reduce((sum, pos) => sum + Number(pos.pnl), 0);

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('history.title')}
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          {t('history.description')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-card/80 border border-border/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-muted-foreground">{t('history.total_deposits', 'Total Deposits')}</p>
              <p className="text-xl md:text-2xl font-bold text-green-500">
                +{formatCurrency(totalDeposits)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 border border-border/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-muted-foreground">{t('history.total_withdrawals', 'Total Withdrawals')}</p>
              <p className="text-xl md:text-2xl font-bold text-red-500">
                -{formatCurrency(totalWithdrawals)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 border border-border/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm text-muted-foreground">{t('portfolio.profit_loss', 'Realized P&L')}</p>
              <p className={`text-xl md:text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <TabsList className="mb-3 sm:mb-0">
              <TabsTrigger value="all">{t('history.all_activity', 'All Activity')}</TabsTrigger>
              <TabsTrigger value="deposits">{t('common.deposit', 'Deposits')}</TabsTrigger>
              <TabsTrigger value="withdrawals">{t('common.withdraw', 'Withdrawals')}</TabsTrigger>
              <TabsTrigger value="closed">{t('history.closed_positions', 'Closed Positions')}</TabsTrigger>
            </TabsList>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm">
                  <Filter className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  {timeFilter === "all" ? t('history.all_time', 'All Time') : 
                   timeFilter === "week" ? t('history.past_week', 'Past Week') : t('history.past_month', 'Past Month')}
                  <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5 ml-1 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTimeFilter("all")}>
                  {t('history.all_time', 'All Time')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter("week")}>
                  {t('history.past_week', 'Past Week')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter("month")}>
                  {t('history.past_month', 'Past Month')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="all" className="mt-4 md:mt-6">
            <ActivityLog interactions={timeFilteredInteractions} />
          </TabsContent>

          <TabsContent value="deposits" className="mt-4 md:mt-6">
            <ActivityLog interactions={timeFilteredInteractions} />
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-4 md:mt-6">
            <ActivityLog interactions={timeFilteredInteractions} />
          </TabsContent>

          <TabsContent value="closed" className="mt-4 md:mt-6">
            <ActivityLog interactions={timeFilteredInteractions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

type Interaction = {
  id: number;
  poolId: number;
  date: Date;
  type: string;
  amount: string;
  pnl?: string;
  entryDate?: string;
  exitDate?: string;
  timestamp?: string;
  exitValue?: string;
};

function ActivityLog({ interactions }: { interactions: Interaction[] }) {
  const { t } = useTranslation();

  if (interactions.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 bg-card/30 rounded-lg border border-border/30">
        <p className="text-muted-foreground">{t('history.no_transactions', 'No transactions found for the selected filters.')}</p>
      </div>
    );
  }

  return (
    <Card className="card-gradient border-border/40">
      <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
        {interactions.map((interaction, index) => {
          const pool = pools.find(p => p.id === interaction.poolId);
          const isDeposit = interaction.type === "Deposit";
          const isWithdraw = interaction.type === "Withdraw";
          const isPositionClosed = interaction.type === "Position Closed";

          // Calculate profit/loss for closed positions
          const pnl = isPositionClosed 
            ? Number(interaction.pnl || 0)
            : null;
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
                  <span className="text-xs md:text-sm font-medium">{currentDate}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between p-3 mb-3 md:mb-4 rounded-lg bg-card/80 border border-border/20 hover:border-primary/20 hover:bg-card transition-all duration-200 gap-3 md:gap-4">
                <div className="flex items-start gap-3 md:gap-4">
                  {isDeposit ? (
                    <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-green-500/10 text-green-500 shrink-0">
                      <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                  ) : isWithdraw ? (
                    <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 shrink-0">
                      <ArrowDownRight className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-500 shrink-0">
                      <Clock className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h3 className="text-sm md:text-base font-medium">
                        {t(`history.transaction_type.${interaction.type.toLowerCase().replace(' ', '_')}`)}
                      </h3>
                      <Badge variant="secondary" className="w-fit flex items-center gap-1 text-xs">
                        {pool && (
                          <>
                            <div className="flex -space-x-1 mr-1">
                              <TokenIcon symbol={pool.token0} />
                              <TokenIcon symbol={pool.token1} />
                            </div>
                            {pool.name}
                          </>
                        )}
                      </Badge>
                    </div>
                    {isPositionClosed && interaction.entryDate && (
                      <div className="mt-2 space-y-1 text-xs md:text-sm">
                        <p>{t('history.initial_investment')}: {formatCurrency(Number(interaction.amount))}</p>
                        <p>{t('history.duration')}: {format(new Date(interaction.entryDate), 'MMM d, yyyy')} - {format(interaction.date, 'MMM d, yyyy')}</p>
                        {pnl !== null && (
                          <p className={pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
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
                  <div className="text-sm md:text-base font-medium">
                    {isDeposit ? '+' : '-'}{formatCurrency(Number(interaction.amount))}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
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