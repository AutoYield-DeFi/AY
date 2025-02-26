import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavigationBar } from "@/components/layout/navbar";
import { Suspense, lazy } from "react";
import { Loading } from "@/components/ui/loading";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Pools = lazy(() => import("@/pages/pools"));
const PoolDetail = lazy(() => import("@/pages/pool-detail"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const History = lazy(() => import("@/pages/history"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/pools" component={Pools} />
            <Route path="/pools/:id" component={PoolDetail} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/history" component={History} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;