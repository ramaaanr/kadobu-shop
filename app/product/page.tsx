'use client';

import React, { useState, useEffect } from 'react';
import { columns, Product } from './column';
import { DataTable } from './data-table';
import { DataTableLoading } from './data-table-loading';

const Page = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchKatalog = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/katalogs/`, {
        cache: 'no-cache',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await res.json();
      setData(result.data);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKatalog();
  }, []);

  if (error) {
    throw new Error('Halaman PRoduk Bermasalah');
  }

  return (
    <>
      {loading ? (
        <DataTableLoading columns={columns} data={data} />
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </>
  );
};

export default Page;
