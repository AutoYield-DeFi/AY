import { Button } from "@/components/ui/button";
import { WalletIcon, LayoutDashboard, Database, Wallet, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { WalletStatus } from "./wallet-status";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'common.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'common.pools', href: '/pools', icon: Database },
  { name: 'common.portfolio', href: '/portfolio', icon: Wallet },
  { name: 'History', href: '/history', icon: Clock },
];

export function NavigationBar() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [location] = useLocation();
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
          <div className="flex items-center gap-8">
            <h2 className="text-lg font-bold gradient-text">AutoYield</h2>
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                      location === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name === 'History' ? item.name : t(item.name)}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <WalletStatus isConnected={isWalletConnected} />
            <Button
              variant={isWalletConnected ? "destructive" : "outline"}
              onClick={handleConnectWallet}
            >
              <WalletIcon className="mr-2 h-4 w-4" />
              {isWalletConnected ? t('common.disconnect_wallet') : t('common.connect_wallet')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}