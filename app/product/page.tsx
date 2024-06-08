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
      const response = await fetch(`/api/product/`, {
        cache: 'no-cache',
      });

      const res = await response.json();
      if (!response.ok) {
        setError(true);
        console.log(res.message);
      } else {
        setData(res.data);
      }
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
    throw new Error('Halaman Produk Bermasalah');
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
