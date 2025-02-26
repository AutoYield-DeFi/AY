import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { WalletStatus } from "./wallet-status";

export function NavigationBar() {
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Toggle wallet connection state for demo
    setIsWalletConnected(!isWalletConnected);

    toast({
      title: isWalletConnected ? "Wallet Disconnected" : "Wallet Connected",
      description: "This is a demo - wallet connection is not implemented",
    });
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold gradient-text">AutoYield</h2>
          </div>
          <div className="flex items-center space-x-4">
            <WalletStatus isConnected={isWalletConnected} />
            <Button 
              variant={isWalletConnected ? "destructive" : "outline"}
              onClick={handleConnectWallet}
            >
              <WalletIcon className="mr-2 h-4 w-4" />
              {isWalletConnected ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}