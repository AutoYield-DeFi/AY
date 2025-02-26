import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { pools } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function PoolList() {
  const { toast } = useToast();

  const handleDeposit = (poolId: number) => {
    toast({
      title: "Deposit",
      description: `This is a demo - deposit to pool ${poolId} is not implemented`,
    });
  };

  return (
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
            <TableCell className="font-medium">{pool.name}</TableCell>
            <TableCell>{formatCurrency(pool.tvl)}</TableCell>
            <TableCell>{pool.apr}%</TableCell>
            <TableCell>{formatCurrency(pool.volume24h)}</TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDeposit(pool.id)}
              >
                Deposit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
