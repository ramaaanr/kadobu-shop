'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { rupiahFormatter } from '@/utils/stringFormatter';
import {} from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';
import { Copy, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductActions from '@/components/product-actions';
import ProductImage from '@/components/product-image';

export type Product = {
  nama_produk: string;
  harga_produk: number;
  kode_produk: string;
  foto_produk: string;
  deskripsi_produk: string;
  status_produk: string;
  stok_produk: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const kodeProduk: string = row.getValue('kode_produk');
      return <ProductActions productCode={kodeProduk} />;
    },
  },
  {
    accessorKey: 'foto_produk',
    header: '',
    cell: ({ row }) => {
      const foto_produk: string = row.getValue('foto_produk');

      return <ProductImage height={64} width={64} foto_produk={foto_produk} />;
    },
  },
  {
    accessorKey: 'kode_produk',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Kode Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'nama_produk',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'stok_produk',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status_produk',
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
      const status_produk: string = row.getValue('status_produk');
      return (
        <Badge
          variant={_.includes(status_produk, 'Ready') ? 'highlight' : 'default'}
        >
          {status_produk}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'harga_produk',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: number = row.getValue('harga_produk');
      const formatedPrice = rupiahFormatter(price);
      return <div className="text-left">{formatedPrice}</div>;
    },
  },
];
