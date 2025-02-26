import { useState } from "react";
import { PoolList } from "@/components/pools/pool-list";
import { CreatePoolForm } from "@/components/pools/create-pool-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Pools() {
  const [isCreatePoolOpen, setIsCreatePoolOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Liquidity Pools</h2>
          <p className="text-muted-foreground">
            Manage your liquidity positions
          </p>
        </div>
        <Sheet open={isCreatePoolOpen} onOpenChange={setIsCreatePoolOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Pool
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Liquidity Pool</SheetTitle>
              <SheetDescription>
                Set up a new liquidity pool with your chosen tokens and parameters.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <CreatePoolForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="border rounded-lg">
        <PoolList />
      </div>
    </div>
  );
}