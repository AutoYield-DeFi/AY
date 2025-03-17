import { Link, useLocation } from "wouter";
import { LayoutDashboard, Wallet, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Pools', href: '/pools', icon: Database },
  { name: 'Portfolio', href: '/portfolio', icon: Wallet },
];

export function NavigationSidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#5C69FF"/>
            <path d="M23 12.5L16 8L9 12.5V21.5L16 26L23 21.5V12.5Z" stroke="white" strokeWidth="2"/>
            <path d="M16 15V19M16 15L20 13M16 15L12 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="logo-text">AutoYield</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className={cn(
                          location === item.href
                            ? 'bg-[#5C69FF]/10 text-[#5C69FF]'
                            : 'text-muted-foreground hover:text-[#5C69FF] hover:bg-[#5C69FF]/10',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}