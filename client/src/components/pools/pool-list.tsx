import { useState } from "react";
import { DepositDialog } from "./deposit-dialog";
import { PoolCard } from "./pool-card";
import { pools } from "@/lib/mock-data";

export function PoolList() {
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null);

  const handleDeposit = (pool: typeof pools[0]) => {
    setSelectedPool(pool);
  };

  return (
    <>
      {pools.map((pool) => (
        <PoolCard
          key={pool.id}
          pool={pool}
          onDeposit={handleDeposit}
        />
      ))}

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