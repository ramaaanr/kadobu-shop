'use client';

import React, { useState, useEffect } from 'react';
import { columns, Order } from './column';
import { DataTable } from './data-table';
import { DataTableLoading } from './data-table-loading';

const orders: Order[] = [
  {
    id: 1,
    kode_pesanan: 'KDB12345',
    jenis_pembayaran: 'Kartu Kredit',
    status: 'pending',
    id_pelanggan: 101,
    nama_pelanggan: 'Aldo Pranata',
    id_produk: 1001,
    nama_produk: 'Buket Bunga Mawar',
    keterangan: 'Buket untuk pernikahan',
    total_pesanan: 2,
    total_harga: 500000,
    created_at: '2024-01-15T10:00:00.000Z',
  },
  {
    id: 2,
    kode_pesanan: 'KDB67890',
    jenis_pembayaran: 'Transfer Bank',
    status: 'completed',
    id_pelanggan: 102,
    nama_pelanggan: 'Rina Putri',
    id_produk: 1002,
    nama_produk: 'Buket Bunga Tulip',
    keterangan: 'Buket untuk ulang tahun',
    total_pesanan: 1,
    total_harga: 300000,
    created_at: '2024-01-16T14:30:00.000Z',
  },
  {
    id: 3,
    kode_pesanan: 'KDB54321',
    jenis_pembayaran: 'OVO',
    status: 'shipped',
    id_pelanggan: 103,
    nama_pelanggan: 'Budi Santoso',
    id_produk: 1003,
    nama_produk: 'Buket Bunga Lily',
    keterangan: 'Buket untuk anniversary',
    total_pesanan: 1,
    total_harga: 350000,
    created_at: '2024-01-17T08:45:00.000Z',
  },
  {
    id: 4,
    kode_pesanan: 'KDB98765',
    jenis_pembayaran: 'GoPay',
    status: 'canceled',
    id_pelanggan: 104,
    nama_pelanggan: 'Siti Aminah',
    id_produk: 1004,
    nama_produk: 'Buket Bunga Matahari',
    keterangan: 'Buket untuk wisuda',
    total_pesanan: 3,
    total_harga: 450000,
    created_at: '2024-01-18T12:00:00.000Z',
  },
  {
    id: 5,
    kode_pesanan: 'KDB24680',
    jenis_pembayaran: 'Kartu Debit',
    status: 'pending',
    id_pelanggan: 105,
    nama_pelanggan: 'Rian Saputra',
    id_produk: 1005,
    nama_produk: 'Buket Bunga Anggrek',
    keterangan: 'Buket untuk hadiah',
    total_pesanan: 2,
    total_harga: 600000,
    created_at: '2024-01-19T16:15:00.000Z',
  },
  {
    id: 6,
    kode_pesanan: 'KDB13579',
    jenis_pembayaran: 'Dana',
    status: 'completed',
    id_pelanggan: 106,
    nama_pelanggan: 'Dewi Lestari',
    id_produk: 1006,
    nama_produk: 'Buket Bunga Melati',
    keterangan: 'Buket untuk acara formal',
    total_pesanan: 1,
    total_harga: 250000,
    created_at: '2024-01-20T09:30:00.000Z',
  },
  {
    id: 7,
    kode_pesanan: 'KDB11223',
    jenis_pembayaran: 'Transfer Bank',
    status: 'shipped',
    id_pelanggan: 107,
    nama_pelanggan: 'Arif Nugroho',
    id_produk: 1007,
    nama_produk: 'Buket Bunga Teratai',
    keterangan: 'Buket untuk acara kantor',
    total_pesanan: 1,
    total_harga: 400000,
    created_at: '2024-01-21T11:45:00.000Z',
  },
  {
    id: 8,
    kode_pesanan: 'KDB44556',
    jenis_pembayaran: 'Kartu Kredit',
    status: 'completed',
    id_pelanggan: 108,
    nama_pelanggan: 'Fajar Pratama',
    id_produk: 1008,
    nama_produk: 'Buket Bunga Sakura',
    keterangan: 'Buket untuk dekorasi',
    total_pesanan: 1,
    total_harga: 300000,
    created_at: '2024-01-22T15:00:00.000Z',
  },
  {
    id: 9,
    kode_pesanan: 'KDB77889',
    jenis_pembayaran: 'GoPay',
    status: 'pending',
    id_pelanggan: 109,
    nama_pelanggan: 'Linda Kusuma',
    id_produk: 1009,
    nama_produk: 'Buket Bunga Anyelir',
    keterangan: 'Buket untuk acara perpisahan',
    total_pesanan: 2,
    total_harga: 350000,
    created_at: '2024-01-23T10:30:00.000Z',
  },
  {
    id: 10,
    kode_pesanan: 'KDB99001',
    jenis_pembayaran: 'Dana',
    status: 'canceled',
    id_pelanggan: 110,
    nama_pelanggan: 'Hariyanto Putra',
    id_produk: 1010,
    nama_produk: 'Buket Bunga Mawar Putih',
    keterangan: 'Buket untuk acara pernikahan',
    total_pesanan: 1,
    total_harga: 500000,
    created_at: '2024-01-24T17:00:00.000Z',
  },
];

const Page = () => {
  const [data, setData] = useState<Order[]>(orders);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const fetchKatalog = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/katalogs/`, {
  //       cache: 'no-cache',
  //     });

  //     if (!res.ok) {
  //       throw new Error('Failed to fetch data');
  //     }

  //     const result = await res.json();
  //     setData(result.data);
  //   } catch (error: any) {
  //     setError(true);
  //     console.log(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchKatalog();
  // }, []);

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

export default Page;
