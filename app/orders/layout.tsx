import { Suspense } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 md:py-1 md:pl-14">
        <Header />
        <div className="my-10"></div>
        {children}
      </div>
    </>
  );
}
