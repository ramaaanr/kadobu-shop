'use client';

import { Button } from '@/components/ui/button';
import orderStatus from '@/config/order-status';
import { encryptId } from '@/utils/encryption';
import {
  capitalCaseAndRemoveUnderscore,
  dateFormatter,
  rupiahFormatter,
} from '@/utils/stringFormatter';
import {} from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
export interface Order {
  id_order: number;
  id_keranjang: number;
  kode_pesanan: string;
  jenis_pembayaran: string | null;
  status: string;
  total_pesanan: number;
  total_harga: number;
  keterangan: string;
  created_at: string; // Consider using Date if you parse the string into a Date object
  snap_token: string;
  nama_toko: string;
  id_toko: string;
  kode_produk: string;
  nama_produk: string;
  foto_produk: string;
  id_pembeli: string;
  username: string;
  email: string;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id_keranjang',
    header: '',
    cell: (row: any) => {
      const keranjang = row.getValue('id_keranjang');
      return (
        <Link
          className="text-xs focus:cursor-wait text-purple-400 hover:text-purple-600"
          href={`/orders/detail/${keranjang}`}
        >
          Kelola
        </Link>
      );
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pengguna
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
    accessorKey: 'status',
    header: ({ column }) => {
      return '';
    },
    cell: ({ row }) => {
      return '';
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
