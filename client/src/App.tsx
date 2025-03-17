import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavigationBar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Suspense, lazy, memo } from "react";
import { Loading } from "@/components/ui/loading";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Lazy load pages with more granular chunks and proper error boundaries
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Pools = lazy(() => import("@/pages/pools"));
const PoolDetail = lazy(() => import("@/pages/pool-detail"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const History = lazy(() => import("@/pages/history"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Page wrapper component for consistent error boundaries and loading states
const PageWrapper = memo(function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loading size="lg" />
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
});

// Router component with consistent error handling
const Router = memo(function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationBar />
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 md:pb-8">
        <Switch>
          <Route path="/">
            {() => (
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            )}
          </Route>

          <Route path="/pools">
            {() => (
              <PageWrapper>
                <Pools />
              </PageWrapper>
            )}
          </Route>

          <Route path="/pools/:id">
            {(params) => (
              <PageWrapper>
                <PoolDetail />
              </PageWrapper>
            )}
          </Route>

          <Route path="/portfolio">
            {() => (
              <PageWrapper>
                <Portfolio />
              </PageWrapper>
            )}
          </Route>

          <Route path="/history">
            {() => (
              <PageWrapper>
                <History />
              </PageWrapper>
            )}
          </Route>

          <Route>
            {() => (
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            )}
          </Route>
        </Switch>
      </main>
      <BottomNav />
    </div>
  );
});

// Root App component with proper error handling
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