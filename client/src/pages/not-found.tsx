import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <Card className="w-full max-w-lg mx-4 bg-card/50 border-primary/5">
        <CardContent className="pt-6 p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 rounded-full bg-red-500/10">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Page Not Found
              </h1>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="default" className="bg-primary/90 hover:bg-primary">
                <Link href="/pools" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  View Pools
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}