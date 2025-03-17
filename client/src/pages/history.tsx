import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";

const TokenIcon = ({ symbol, size = "small" }: { symbol: string; size?: "small" | "large" }) => {
  const sizeClass = size === "large" ? "h-8 w-8" : "h-5 w-5";

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

  // Filter based on active tab and search
  const filteredInteractions = allInteractions.filter(interaction => {
    const matchesSearch = searchQuery.toLowerCase() === "" || 
      pools.find(p => p.id === interaction.poolId)?.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Transaction History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your deposits, withdrawals, and position closures
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-card/50 border-primary/5">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Deposits</span>
            </div>
            <p className="text-2xl font-bold text-green-500">
              +{formatCurrency(totalDeposits)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Withdrawals</span>
            </div>
            <p className="text-2xl font-bold text-red-500">
              -{formatCurrency(totalWithdrawals)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/5">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total P&L</span>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              totalPnL >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs">All Activity</TabsTrigger>
              <TabsTrigger value="deposits" className="text-xs">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals" className="text-xs">Withdrawals</TabsTrigger>
              <TabsTrigger value="closed" className="text-xs">Closed Positions</TabsTrigger>
            </TabsList>

            <div className="relative flex-1 sm:w-[200px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by pool name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs h-9">
                <Filter className="h-3.5 w-3.5 mr-1" />
                {timeFilter === "all" ? "All Time" : 
                 timeFilter === "week" ? "Past Week" : "Past Month"}
                <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeFilter("all")}>
                All Time
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("week")}>
                Past Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("month")}>
                Past Month
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="all" className="mt-6">
          <ActivityLog interactions={timeFilteredInteractions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ActivityLog({ interactions }: { interactions: any[] }) {
  if (interactions.length === 0) {
    return (
      <div className="text-center py-12 bg-card/30 rounded-lg border border-border/30">
        <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <Card className="bg-card/50 border-primary/5">
      <CardContent className="p-4 space-y-4">
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
                <div className="flex items-center gap-2 py-2 mb-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{currentDate}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between p-4 rounded-lg bg-card/80 border border-border/20 hover:border-primary/20 hover:bg-card transition-all duration-200 gap-4">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-full shrink-0",
                    isDeposit && "bg-green-500/10 text-green-500",
                    isWithdraw && "bg-red-500/10 text-red-500",
                    isPositionClosed && "bg-blue-500/10 text-blue-500"
                  )}>
                    {isDeposit ? <ArrowUpRight className="h-5 w-5" /> :
                     isWithdraw ? <ArrowDownRight className="h-5 w-5" /> :
                     <Activity className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-sm font-medium">
                        {isDeposit ? "Deposit" :
                         isWithdraw ? "Withdrawal" :
                         "Position Closed"}
                      </h3>
                      {pool && (
                        <Badge variant="secondary" className="w-fit flex items-center gap-1 text-xs">
                          <div className="flex -space-x-1 mr-1">
                            <TokenIcon symbol={pool.token1} />
                            <TokenIcon symbol={pool.token2} />
                          </div>
                          {pool.name}
                        </Badge>
                      )}
                    </div>
                    {isPositionClosed && interaction.entryDate && (
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>Initial: {formatCurrency(Number(interaction.amount))}</span>
                          <span>•</span>
                          <span>{format(new Date(interaction.entryDate), 'MMM d')} - {format(interaction.date, 'MMM d')}</span>
                        </div>
                        {pnl !== null && (
                          <p className={cn(
                            "font-medium",
                            pnl >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            P&L: {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
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
                    isDeposit && "text-green-500",
                    isWithdraw && "text-red-500"
                  )}>
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