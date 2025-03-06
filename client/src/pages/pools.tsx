import { useState } from "react";
import { PoolList } from "@/components/pools/pool-list";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Info,
  SlidersHorizontal, 
  TrendingUp, 
  ArrowDownUp
} from "lucide-react";
import { DefiTooltip } from "@/components/ui/defi-tooltip";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Pools() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<string>("apr");
  const [filterBy, setFilterBy] = useState<string>("all");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('pools.title')}
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          {t('pools.description')}
        </p>
      </div>

      <Card className="bg-muted/30 border border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">New to DeFi pools?</h3>
              <p className="text-sm text-muted-foreground">
                Liquidity pools allow you to deposit tokens and earn yield from trading fees and rewards. 
                Look for pools with <DefiTooltip term="apr" className="text-sm font-medium text-primary">higher APR</DefiTooltip> for 
                better returns or <DefiTooltip term="utilization_rate" className="text-sm font-medium text-primary">higher utilization</DefiTooltip> for 
                more active pools. We recommend starting with low-risk pools.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterBy === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("all")}
            className={filterBy === "all" ? "bg-primary hover:bg-primary/90" : ""}
          >
            All Pools
          </Button>
          <Button 
            variant={filterBy === "low" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("low")}
            className={filterBy === "low" ? "bg-green-500 hover:bg-green-500/90 text-white" : ""}
          >
            Low Risk
          </Button>
          <Button 
            variant={filterBy === "medium" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("medium")}
            className={filterBy === "medium" ? "bg-yellow-500 hover:bg-yellow-500/90 text-white" : ""}
          >
            Medium Risk
          </Button>
          <Button 
            variant={filterBy === "high" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("high")}
            className={filterBy === "high" ? "bg-red-500 hover:bg-red-500/90 text-white" : ""}
          >
            High Risk
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apr">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Highest APR</span>
                </div>
              </SelectItem>
              <SelectItem value="tvl">
                <div className="flex items-center gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Highest TVL</span>
                </div>
              </SelectItem>
              <SelectItem value="volume">
                <div className="flex items-center gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Volume (24h)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PoolList filterRisk={filterBy} sortBy={sortBy} />
      </div>
    </div>
  );
}