import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavigationBar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Suspense, lazy, memo } from "react";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Lazy load pages with more granular chunks
const Dashboard = lazy(() => import("@/pages/dashboard" /* webpackChunkName: "dashboard" */));
const Pools = lazy(() => import("@/pages/pools" /* webpackChunkName: "pools" */));
const PoolDetail = lazy(() => import("@/pages/pool-detail" /* webpackChunkName: "pool-detail" */));
const Portfolio = lazy(() => import("@/pages/portfolio" /* webpackChunkName: "portfolio" */));
const History = lazy(() => import("@/pages/history" /* webpackChunkName: "history" */));
const NotFound = lazy(() => import("@/pages/not-found" /* webpackChunkName: "not-found" */));

// Memoize the router component to prevent unnecessary re-renders
const Router = memo(function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 md:pb-8">
        <ErrorBoundary>
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
        </ErrorBoundary>
      </main>
      <BottomNav />
    </div>
  );
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;