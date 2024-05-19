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
      const product: Product = row.original;
      const {
        kode_produk,
        nama_produk,
        harga_produk,
        deskripsi_produk,
        foto_produk,
        status_produk,
        stok_produk,
      } = product;
      return (
        <div className="flex flex-col gap-y-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-12 p-0 text-slate-500 text-xs font-normal"
              >
                Detail
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detail Produk</DialogTitle>
                <DialogDescription asChild>
                  <div className="dialog-content-container flex gap-x-2">
                    <Image
                      width={180}
                      height={240}
                      className="rounded-lg"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${foto_produk}`}
                      alt="foto_produk"
                    />
                    <div className="dialog-content">
                      <div>
                        <div>{nama_produk}</div>
                        <div>{deskripsi_produk}</div>
                      </div>
                      <div className="divider border border-b-slate-100 w-full my-2"></div>
                      <div className="flex gap-x-1">
                        <div className="font-medium">Kode: </div>
                        <div>{kode_produk}</div>
                        <Button
                          variant="outline"
                          size={'icon-sm'}
                          onClick={() => {
                            navigator.clipboard.writeText(kode_produk);
                            toast('', {
                              description: 'Kode Produk Telah Disalin',
                            });
                          }}
                        >
                          <Copy size={12} />
                        </Button>
                      </div>
                      <div className="flex gap-x-1">
                        <div className="font-medium">Harga: </div>
                        <div>{rupiahFormatter(harga_produk)}</div>
                      </div>
                      <div className="flex gap-x-1">
                        <div className="font-medium">Total Stok: </div>
                        <div>{stok_produk}</div>
                      </div>
                      <div className="flex gap-x-1">
                        <div className="font-medium">Status: </div>
                        <div>{status_produk}</div>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-12 p-0 text-slate-500 text-xs font-normal"
              >
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: 'foto_produk',
    header: '',
    cell: ({ row }) => {
      const foto_produk = row.getValue('foto_produk');
      return (
        <Image
          width={64}
          height={64}
          className="rounded-lg"
          src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${foto_produk}`}
          alt="foto_produk"
        />
      );
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
