import { Suspense } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col space-y-4">
        <Header />
        {children}
      </div>
    </>
  );
}
