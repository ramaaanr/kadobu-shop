import { Suspense } from 'react';
import Loading from './loading';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </>
  );
}
