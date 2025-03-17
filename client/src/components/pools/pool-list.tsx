import { useState, useMemo } from "react";
import { PoolCard } from "./PoolCard";
import { pools } from "@/lib/mock-data";

interface PoolListProps {
  filterRisk?: string;
  sortBy?: string;
  aprRange?: string;
  searchQuery?: string;
}

export function PoolList({ 
  filterRisk = "all", 
  sortBy = "apr",
  aprRange = "all",
  searchQuery = ""
}: PoolListProps) {
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null);

  // Filter and sort pools based on props
  const filteredAndSortedPools = useMemo(() => {
    let filteredPools = pools;

    // Filter by risk level
    if (filterRisk !== "all") {
      filteredPools = filteredPools.filter(pool => 
        pool.riskLevel.toLowerCase() === filterRisk
      );
    }

    // Filter by APR range
    if (aprRange !== "all") {
      filteredPools = filteredPools.filter(pool => {
        const apr = pool.apr;
        switch (aprRange) {
          case "0-10":
            return apr >= 0 && apr <= 10;
          case "10-20":
            return apr > 10 && apr <= 20;
          case "20-50":
            return apr > 20 && apr <= 50;
          case "50-plus":
            return apr > 50;
          default:
            return true;
        }
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredPools = filteredPools.filter(pool =>
        pool.name.toLowerCase().includes(query) ||
        pool.token1.toLowerCase().includes(query) ||
        pool.token2.toLowerCase().includes(query)
      );
    }

    // Sort based on criteria
    return filteredPools.sort((a, b) => {
      switch (sortBy) {
        case "apr":
          return b.apr - a.apr;
        case "tvl":
          return b.tvl - a.tvl;
        case "volume":
          return b.volume24h - a.volume24h;
        default:
          return b.apr - a.apr;
      }
    });
  }, [filterRisk, sortBy, aprRange, searchQuery]);

  return (
    <>
      {filteredAndSortedPools.length === 0 ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center">
          <p className="text-muted-foreground">No pools match your selected filters.</p>
        </div>
      ) : (
        filteredAndSortedPools.map((pool) => (
          <PoolCard
            key={pool.id}
            pool={pool}
          />
        ))
      )}
    </>
  );
}