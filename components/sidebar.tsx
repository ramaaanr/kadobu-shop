'use client';
import { DM_Serif_Display as DSD } from 'next/font/google';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@radix-ui/react-tooltip';
import { Home, ShoppingCart, Gift, Store } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

const Sidebar = () => {
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1];

  const navItemClass = (path: string) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
      firstPath === path
        ? 'bg-accent text-accent-foreground hover:text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <span
              className={`${dsd.className} transition-all text-center group-hover:scale-125`}
            >
              K
            </span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard" className={navItemClass('dashboard')}>
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/order" className={navItemClass('order')}>
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/product" className={navItemClass('product')}>
                  <Gift className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/store" className={navItemClass('store')}>
                  <Store className="h-5 w-5" />
                  <span className="sr-only">Store</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Store</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;