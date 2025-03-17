import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { historicalPositions, transactionHistory, pools } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  ChevronDown,
  Clock,
  Activity,
  CircleDollarSign,
  Wallet,
  TrendingUp,
  Search
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiSolana } from "react-icons/si";
import { CoinsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const TokenIcon = ({ symbol }: { symbol: string }) => {
  if (symbol === 'SOL') {
    return <SiSolana className="h-5 w-5 text-[#14F195]" />;
  }
  return <CoinsIcon className="h-5 w-5 text-primary" />;
};

const TransactionIcon = ({ type }: { type: string }) => {
  const icons = {
    Deposit: <ArrowUpRight className="h-5 w-5" />,
    Withdraw: <ArrowDownRight className="h-5 w-5" />,
    "Position Closed": <Activity className="h-5 w-5" />
  };

  const colors = {
    Deposit: "text-green-500 bg-green-500/10",
    Withdraw: "text-red-500 bg-red-500/10",
    "Position Closed": "text-blue-500 bg-blue-500/10"
  };

  return (
    <div className={cn(
      "h-10 w-10 flex items-center justify-center rounded-full",
      colors[type as keyof typeof colors]
    )}>
      {icons[type as keyof typeof icons] || <Activity className="h-5 w-5" />}
    </div>
  );
};

export default function History() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Calculate totals
  const totalDeposits = transactionHistory
    .filter(tx => tx.type === "Deposit")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalWithdrawals = transactionHistory
    .filter(tx => tx.type === "Withdraw")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalPnL = historicalPositions
    .reduce((sum, pos) => sum + Number(pos.pnl), 0);

  const depositCount = transactionHistory.filter(tx => tx.type === "Deposit").length;
  const withdrawalCount = transactionHistory.filter(tx => tx.type === "Withdraw").length;
  const closedPositionsCount = historicalPositions.length;

  // Combine and filter transactions
  const allTransactions = [
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

  // Filter based on search and tab
  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch = searchQuery === "" || 
      pools.find(p => p.id === tx.poolId)?.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeTab) {
      case "deposits": return tx.type === "Deposit";
      case "withdrawals": return tx.type === "Withdraw";
      case "closed": return tx.type === "Position Closed";
      default: return true;
    }
  });

  // Time filter
  const filteredByTime = filteredTransactions.filter(tx => {
    if (timeFilter === "all") return true;

    const now = new Date();
    const txDate = new Date(tx.date);
    const days = timeFilter === "week" ? 7 : 30;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return txDate >= cutoff;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('history.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('history.description')}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t('stats.total_deposits')}</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-500">
                +{formatCurrency(totalDeposits)}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('stats.deposits_count', { count: depositCount })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t('stats.total_withdrawals')}</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-red-500">
                -{formatCurrency(totalWithdrawals)}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('stats.withdrawals_count', { count: withdrawalCount })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5 hover:border-primary/20 transition-colors">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t('stats.profit_loss')}</span>
            </div>
            <div className="space-y-1">
              <p className={cn(
                "text-2xl font-bold",
                totalPnL >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('stats.positions_closed', { count: closedPositionsCount })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <TabsList className="h-10">
              <TabsTrigger value="all" className="text-sm">
                {t('history.all_activity')}
              </TabsTrigger>
              <TabsTrigger value="deposits" className="text-sm">
                {t('actions.deposit')}
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="text-sm">
                {t('actions.withdraw')}
              </TabsTrigger>
              <TabsTrigger value="closed" className="text-sm">
                {t('stats.positions_closed', { count: '' })}
              </TabsTrigger>
            </TabsList>

            <div className="relative flex-1 sm:w-[240px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('history.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm h-10">
                <Filter className="h-4 w-4 mr-2" />
                {t(`history.filters.${timeFilter}`)}
                <ChevronDown className="h-4 w-4 ml-2 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(t('history.filters', { returnObjects: true })).map(([key, label]) => (
                <DropdownMenuItem key={key} onClick={() => setTimeFilter(key)}>
                  {label as string}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="all" className="mt-6">
          <TransactionList transactions={filteredByTime} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TransactionList({ transactions }: { transactions: any[] }) {
  const { t } = useTranslation();

  if (transactions.length === 0) {
    return (
      <Card className="bg-card/50 border-primary/5 p-12">
        <div className="text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-1">{t('history.no_transactions')}</p>
          <p className="text-sm text-muted-foreground">
            {t('history.try_filtering')}
          </p>
        </div>
      </Card>
    );
  }

  const groupedByDate = transactions.reduce((groups, tx) => {
    const date = format(tx.date, 'MMM d, yyyy');
    if (!groups[date]) groups[date] = [];
    groups[date].push(tx);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <Card className="bg-card/50 border-primary/5">
      <CardContent className="p-6 space-y-6">
        {Object.entries(groupedByDate).map(([date, txs]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-2 py-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{date}</span>
            </div>

            <div className="space-y-4">
              {txs.map((tx, idx) => {
                const pool = pools.find(p => p.id === tx.poolId);
                const pnl = tx.type === "Position Closed" ? Number(tx.pnl) : null;
                const pnlPercentage = pnl !== null && tx.amount !== 0
                  ? (pnl / Number(tx.amount)) * 100
                  : null;

                return (
                  <div
                    key={`${tx.type}-${idx}`}
                    className="flex flex-col sm:flex-row sm:items-start justify-between p-4 rounded-lg bg-background/50 border border-border/20 hover:border-primary/20 hover:bg-background transition-all duration-200 gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <TransactionIcon type={tx.type} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <h3 className="text-base font-medium">
                            {t(`history.transaction_types.${tx.type.toLowerCase().replace(" ", "_")}`)}
                          </h3>
                          {pool && (
                            <Badge variant="secondary" className="w-fit flex items-center gap-1">
                              <div className="flex -space-x-1 mr-1">
                                <TokenIcon symbol={pool.token1} />
                                <TokenIcon symbol={pool.token2} />
                              </div>
                              {pool.name}
                            </Badge>
                          )}
                        </div>

                        {tx.type === "Position Closed" && tx.entryDate && (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{t('history.details.initial')}: {formatCurrency(Number(tx.amount))}</span>
                              <span>•</span>
                              <span>{t('history.details.duration', {
                                start: format(new Date(tx.entryDate), 'MMM d'),
                                end: format(tx.date, 'MMM d')
                              })}</span>
                            </div>
                            {pnl !== null && (
                              <p className={cn(
                                "font-medium",
                                pnl >= 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {t('stats.profit_loss')}: {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
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

                    <div className="text-right space-y-1">
                      <div className={cn(
                        "text-lg font-medium",
                        tx.type === "Deposit" ? "text-green-500" : "text-red-500"
                      )}>
                        {tx.type === "Deposit" ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                      </div>
                      {pool && (
                        <div className="text-sm text-muted-foreground">
                          {t('stats.average_apr', { value: pool.apr })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}