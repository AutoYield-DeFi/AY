import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { memo } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Wallet, 
  Clock 
} from "lucide-react";

const navigation = [
  { name: 'common.dashboard', href: '/', Icon: LayoutDashboard },
  { name: 'common.pools', href: '/pools', Icon: Database },
  { name: 'common.portfolio', href: '/portfolio', Icon: Wallet },
  { name: 'common.history', href: '/history', Icon: Clock },
];

export const BottomNav = memo(function BottomNav() {
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16">
        {navigation.map(({ name, href, Icon }) => (
          <Link key={href} href={href}>
            <a
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full p-2",
                location === href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">
                {t(name)}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
});