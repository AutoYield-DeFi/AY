import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DepositDialog } from "./deposit-dialog";
import { pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { CoinsIcon } from "lucide-react";

// Token icon mapping
const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol.toUpperCase()) {
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

export function PoolList() {
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null);

  const handleDeposit = (pool: typeof pools[0]) => {
    setSelectedPool(pool);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pool</TableHead>
            <TableHead>TVL</TableHead>
            <TableHead>APR</TableHead>
            <TableHead>24h Volume</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.map((pool) => (
            <TableRow key={pool.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <TokenIcon symbol={pool.token0} />
                  <TokenIcon symbol={pool.token1} />
                  <span>{pool.name}</span>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(pool.tvl)}</TableCell>
              <TableCell>
                <span className="text-green-500">{pool.apr}%</span>
              </TableCell>
              <TableCell>{formatCurrency(pool.volume24h)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeposit(pool)}
                >
                  Deposit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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