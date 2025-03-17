import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  SlidersHorizontal, 
  TrendingUp, 
  ArrowDownUp,
  Search,
  Info
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PoolList } from "@/components/pools/pool-list";
import { cn } from "@/lib/utils";

const APR_RANGES = [
  { label: 'All APRs', value: 'all' },
  { label: '0-10%', value: '0-10' },
  { label: '10-20%', value: '10-20' },
  { label: '20-50%', value: '20-50' },
  { label: '50%+', value: '50-plus' }
];

export default function Pools() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<string>("apr");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [aprRange, setAprRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t('pools.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('pools.description')}
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by token name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={aprRange} onValueChange={setAprRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="APR Range" />
            </SelectTrigger>
            <SelectContent>
              {APR_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
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

      {/* Risk Level Filters */}
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
        <Tooltip>
          <TooltipTrigger asChild>
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
              <Info className="ml-1 h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {t('defi.terms.risk_note')}
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
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
              <Info className="ml-1 h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {t('defi.terms.risk_note')}
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
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
              <Info className="ml-1 h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {t('defi.terms.risk_note')}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Pool List Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PoolList 
          filterRisk={filterBy} 
          sortBy={sortBy}
          aprRange={aprRange}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}