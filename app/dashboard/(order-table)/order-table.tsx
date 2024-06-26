'use client';

import React, { useState, useEffect } from 'react';
import { columns, Order } from './column';
import { DataTable } from './data-table';
import { DataTableLoading } from './data-table-loading';

const OrderTable = () => {
  const [data, setData] = useState<Order[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/order');
      const res = await response.json();
      if (!response.ok) {
        setError(true);
        console.log(res.message);
      }
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error) {
    throw new Error('Halaman Order Bermasalah');
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

export default OrderTable;
