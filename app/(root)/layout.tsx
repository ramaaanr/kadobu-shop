import { Suspense } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </>
  );
}
