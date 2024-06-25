import { Suspense } from 'react';
import Loading from './loading';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { Protect } from '@clerk/nextjs';

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <div className="my-10"></div>

        {children}
      </div>
    </>
  );
}
