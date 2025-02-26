import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Database, Wallet, Clock } from "lucide-react";

const navigation = [
  { name: 'common.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'common.pools', href: '/pools', icon: Database },
  { name: 'common.portfolio', href: '/portfolio', icon: Wallet },
  { name: 'History', href: '/history', icon: Clock },
];

export function BottomNav() {
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full p-2",
                location === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium truncate">
                {item.name === 'History' ? item.name : t(item.name)}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
