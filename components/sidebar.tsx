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
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

// Konfigurasi font
const dsd = DSD({
  weight: ['400'],
  subsets: ['latin'],
});

// Komponen Sidebar
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1];
  const [loading, setLoading] = useState(false);

  // Fungsi untuk menentukan kelas aktif pada nav item
  const navItemClass = (path: string) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
      firstPath === path
        ? 'bg-accent text-accent-foreground hover:text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  const handleClick = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      {/* Overlay loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ClipLoader size={50} color="#ffffff" />
        </div>
      )}

      {/* Sidebar pada layar desktop */}
      <aside className="fixed top-0 left-0 bottom-0 z-40 hidden w-14 flex-col border-r bg-background md:flex">
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
                <Link href="/" className={navItemClass('dashboard')}>
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
                <Link href="/orders" className={navItemClass('orders')}>
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

      {/* App Bar pada layar mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background block md:hidden border-t py-2">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={navItemClass('dashboard')}
            onClick={() => handleClick('/')}
          >
            <Home className="h-6 w-6" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Link
            href="/orders"
            className={navItemClass('orders')}
            onClick={() => handleClick('/orders')}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Orders</span>
          </Link>
          <Link
            href="/product"
            className={navItemClass('product')}
            onClick={() => handleClick('/product')}
          >
            <Gift className="h-6 w-6" />
            <span className="sr-only">Products</span>
          </Link>
          <Link
            href="/store"
            className={navItemClass('store')}
            onClick={() => handleClick('/store')}
          >
            <Store className="h-6 w-6" />
            <span className="sr-only">Store</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
