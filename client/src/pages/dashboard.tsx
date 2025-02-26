import { OverviewChart } from "@/components/dashboard/overview-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your AutoYield performance
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <OverviewChart />
      </div>
    </div>
  );
}
