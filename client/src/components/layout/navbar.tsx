import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { WalletStatus } from "./wallet-status";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export function NavigationBar() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);

    toast({
      title: isWalletConnected ? t('common.disconnect_wallet') : t('common.connect_wallet'),
      description: "This is a demo - wallet connection is not implemented",
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-lg font-bold gradient-text">AutoYield</a>
          </Link>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="hidden md:block">
              <WalletStatus isConnected={isWalletConnected} />
            </div>
            <Button
              variant={isWalletConnected ? "destructive" : "outline"}
              onClick={handleConnectWallet}
              size="sm"
              className="md:flex"
            >
              <WalletIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">
                {isWalletConnected ? t('common.disconnect_wallet') : t('common.connect_wallet')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}