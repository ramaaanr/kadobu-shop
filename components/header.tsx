'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

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

  // Function to generate breadcrumbs based on the current route
  const generateBreadcrumbs = () => {
    const pathParts = pathname.split('/').filter(Boolean);
    return pathParts.map((part, index) => ({
      name: part.charAt(0).toUpperCase() + part.slice(1),
      href: '/' + pathParts.slice(0, index + 1).join('/'),
    }));
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
      <header className="hidden md:flex justify-between items-center px-8 pl-24 h-16">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {generateBreadcrumbs().map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === generateBreadcrumbs().length - 1 ? (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={breadcrumb.href}>
                        {breadcrumb.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </header>
    </div>
  );
}
