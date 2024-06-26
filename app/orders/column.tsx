import { OrderStatusBadge } from '@/components/ui/badge';
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
  status: string;
  created_at: string;
  jumlah_pesanan: number;
  total_harga: number;
  catatan: string;
  nama_produk: string;
  foto_produk: string;
  status_produk: string;
  kode_produk: string;
  id_toko: string;
  nama_toko: string;
  username: string;
  email: string;
  jenis_pembayaran: string;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id_keranjang',
    header: '',
    cell: (row: any) => {
      const keranjang = encryptId(row.getValue('id_keranjang'));
      return (
        <Link
          className="text-xs focus:cursor-wait text-purple-400 hover:text-purple-600"
          href={`/orders/detail/${keranjang}`}
        >
          Edit & Detail
        </Link>
      );
    },
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
    accessorKey: 'username',
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
    cell: ({ row }) => {
      const getPembayaran: string = row.getValue('jenis_pembayaran');
      const pembayaran: string = getPembayaran || 'Belum Dibayarkan';

      return (
        <div className={`${getPembayaran ? '' : 'text-gray-500'}`}>
          {capitalCaseAndRemoveUnderscore(pembayaran)}
        </div>
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
    cell: ({ row }) => {
      const status: string = row.getValue('status');

      return <OrderStatusBadge prevData={{ status }} />;
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
];
