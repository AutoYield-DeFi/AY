import { PoolList } from "@/components/pools/pool-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Pools() {
  const { toast } = useToast();

  const handleCreatePool = () => {
    toast({
      title: "Create Pool",
      description: "This is a demo - pool creation is not implemented",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Liquidity Pools</h2>
          <p className="text-muted-foreground">
            Manage your liquidity positions
          </p>
        </div>
        <Button onClick={handleCreatePool}>
          <Plus className="mr-2 h-4 w-4" />
          Create Pool
        </Button>
      </div>

      <div className="border rounded-lg">
        <PoolList />
      </div>
    </div>
  );
}
