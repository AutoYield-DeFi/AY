import { useState, useMemo } from "react";
import { DepositDialog } from "./deposit-dialog";
import { PoolCard } from "./pool-card";
import { pools } from "@/lib/mock-data";

interface PoolListProps {
  filterRisk?: string;
  sortBy?: string;
}

export function PoolList({ filterRisk = "all", sortBy = "apr" }: PoolListProps) {
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null);

  const handleDeposit = (pool: typeof pools[0]) => {
    setSelectedPool(pool);
  };

  // Filter and sort pools based on props
  const filteredAndSortedPools = useMemo(() => {
    // First filter by risk level if needed
    let filteredPools = pools;
    if (filterRisk !== "all") {
      filteredPools = pools.filter(pool => pool.riskLevel.toLowerCase() === filterRisk);
    }

    // Then sort based on criteria
    return filteredPools.sort((a, b) => {
      switch (sortBy) {
        case "apr":
          return Number(b.apr) - Number(a.apr);
        case "tvl":
          return Number(b.tvl) - Number(a.tvl);
        case "volume":
          return Number(b.volume24h) - Number(a.volume24h);
        default:
          return Number(b.apr) - Number(a.apr);
      }
    });
  }, [filterRisk, sortBy]);

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
            onDeposit={handleDeposit}
          />
        ))
      )}

      {selectedPool && (
        <DepositDialog
          pool={selectedPool}
          isOpen={!!selectedPool}
          onClose={() => setSelectedPool(null)}
        />
      )}
    </>
  );
}