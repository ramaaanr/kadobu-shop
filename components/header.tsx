'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to determine the page title based on the current route
  const getPageTitle = () => {
    if (pathname.includes('store')) return 'Toko';
    if (pathname.includes('product')) return 'Produk';
    if (pathname.includes('orders')) return 'Pesanan';
    return 'Halaman Utama'; // Default title
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      {/* TopBar for mobile screens */}
      <div className="flex md:hidden justify-between px-4 pr-4 items-center h-16">
        <div className="flex">
          <Button
            variant={'ghost'}
            className="mr-2"
            onClick={() => router.back()}
          >
            <ArrowLeft />
          </Button>
          <div className="font-semibold pt-1 text-xl">{getPageTitle()}</div>
        </div>
        <UserButton />
      </div>

      {/* Header for desktop screens (md and above) */}
      <header className="hidden md:flex justify-between items-center  px-8 pl-24 h-16">
        <p className="font-semibold text-xl">{getPageTitle()}</p>
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </header>
    </div>
  );
}
