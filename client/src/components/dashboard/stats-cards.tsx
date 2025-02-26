import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { overviewStats } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function StatsCards() {
  return (
    <>
      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Value Locked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(overviewStats.totalValueLocked)}
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Pools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {overviewStats.totalPools}
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average APR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {overviewStats.averageApr}%
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Yield
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(overviewStats.totalYield)}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
