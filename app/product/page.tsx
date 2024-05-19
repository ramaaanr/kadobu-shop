// 'use client';

import { columns, Product } from '../product/column';
import { DataTable } from '../product/data-table';
// Fetch data from your API here.

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

async function getKatalog() {
  console.log();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/katalogs/`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Page = async () => {
  const { data } = await getKatalog();
  return (
    <>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Page;
