import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { WalletStatus } from "./wallet-status";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'common.dashboard', href: '/' },
  { name: 'common.pools', href: '/pools' },
  { name: 'common.portfolio', href: '/portfolio' },
  { name: 'History', href: '/history' },
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
            <Link href="/">
              <a className="text-lg font-bold gradient-text">AutoYield</a>
            </Link>
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
                    {item.name === 'History' ? item.name : t(item.name)}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="hidden md:block">
              <WalletStatus isConnected={isWalletConnected} />
            </div>
            <Button
              variant={isWalletConnected ? "destructive" : "outline"}
              onClick={handleConnectWallet}
              size="sm"
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