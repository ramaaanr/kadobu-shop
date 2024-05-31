'use client';

import { Button } from '@/components/ui/button';
import { dateFormatter, rupiahFormatter } from '@/utils/stringFormatter';
import {} from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

export type Order = {
  id: number;
  kode_pesanan: string;
  jenis_pembayaran: string;
  id_pelanggan: number;
  nama_pelanggan: string;
  id_produk: number;
  nama_produk: string;
  keterangan: string;
  total_pesanan: number;
  total_harga: number;
  status: string;
  created_at: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: '',
    cell: (row: any) => (
      <Link
        className="text-xs text-purple-400 hover:text-purple-600"
        href={`/orders/detail/${row.getValue('kode_produk')}`}
      >
        Edit & Detail
      </Link>
    ),
  },
  {
    accessorKey: 'kode_pesanan',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Kode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'nama_pelanggan',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pelanggan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'jenis_pembayaran',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pembayaran
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return dateFormatter(row.getValue('created_at'));
    },
  },
  {
    accessorKey: 'total_harga',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row: any) => (
      <div>{rupiahFormatter(row.getValue('total_harga'))}</div>
    ),
  },
  // {
  //   accessorKey: 'nama_produk',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Nama Produk
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'stok_produk',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Stok
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'status_produk',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const status_produk: string = row.getValue('status_produk');
  //     return (
  //       <Badge
  //         variant={_.includes(status_produk, 'Ready') ? 'highlight' : 'default'}
  //       >
  //         {status_produk}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'harga_produk',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Harga
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const price: number = row.getValue('harga_produk');
  //     const formatedPrice = rupiahFormatter(price);
  //     return <div className="text-left">{formatedPrice}</div>;
  //   },
  // },
];
