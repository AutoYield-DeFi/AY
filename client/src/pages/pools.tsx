import { useState } from "react";
import { PoolList } from "@/components/pools/pool-list";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  SlidersHorizontal, 
  TrendingUp, 
  ArrowDownUp
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function Pools() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<string>("apr");
  const [filterBy, setFilterBy] = useState<string>("all");

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t('pools.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('pools.description')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterBy === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("all")}
            className={cn(
              "text-xs",
              filterBy === "all" && "bg-primary hover:bg-primary/90"
            )}
          >
            {t('pools.all_pools')}
          </Button>
          <Button 
            variant={filterBy === "low" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("low")}
            className={cn(
              "text-xs",
              filterBy === "low" && "bg-green-500 hover:bg-green-500/90 text-white"
            )}
          >
            {t('pools.low_risk')}
          </Button>
          <Button 
            variant={filterBy === "medium" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("medium")}
            className={cn(
              "text-xs",
              filterBy === "medium" && "bg-yellow-500 hover:bg-yellow-500/90 text-white"
            )}
          >
            {t('pools.medium_risk')}
          </Button>
          <Button 
            variant={filterBy === "high" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterBy("high")}
            className={cn(
              "text-xs",
              filterBy === "high" && "bg-red-500 hover:bg-red-500/90 text-white"
            )}
          >
            {t('pools.high_risk')}
          </Button>
        </div>

        <div className="flex gap-2 items-center shrink-0">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] text-xs">
              <SelectValue placeholder={t('pools.sort_by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apr">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{t('pools.highest_apr')}</span>
                </div>
              </SelectItem>
              <SelectItem value="tvl">
                <div className="flex items-center gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  <span>{t('pools.highest_tvl')}</span>
                </div>
              </SelectItem>
              <SelectItem value="volume">
                <div className="flex items-center gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  <span>{t('pools.volume_24h')}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PoolList filterRisk={filterBy} sortBy={sortBy} />
      </div>
    </div>
  );
}