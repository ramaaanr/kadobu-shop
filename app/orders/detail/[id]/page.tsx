'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { dateFormatter, rupiahFormatter } from '@/utils/stringFormatter';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

interface OrderDetail {
  id: number;
  kode_pesanan: string;
  created_at: string;
  status: string;
  id_produk: number;
  nama_produk: string;
  total_pesanan: number;
  total_harga: number;
  jenis_pembayaran: string;
  id_pelanggan: number;
  nama_pelanggan: string;
  email_pelanggan: string;
  keterangan: string;
}
export default function Page() {
  const order: OrderDetail = {
    id: 1,
    kode_pesanan: 'KDB12345',
    jenis_pembayaran: 'Kartu Kredit',
    status: 'pesanan dibayarkan',
    id_pelanggan: 101,
    nama_pelanggan: 'Aldo Pranata',
    email_pelanggan: 'aldopranata@gmail.com',
    id_produk: 1001,
    nama_produk: 'Buket Bunga Mawar',
    keterangan: 'Buket untuk pernikahan',
    total_pesanan: 2,
    total_harga: 500000,
    created_at: '2024-01-15T10:00:00.000Z',
  };
  return (
    <>
      <Card className="w-2/5 mx-auto">
        <CardHeader>
          <div className="card-header-container flex flex-col">
            <div className="w-full">
              <div className="font-bold text-2xl">
                Pesanan: {order.kode_pesanan}
              </div>
              <div>{dateFormatter(order.created_at)}</div>
            </div>
            <div className=" w-full pt-2">
              <div className="pl-2 text-xs font-semibold mb-1">Status</div>
              <Select>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder={order.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Dibayarkan</SelectItem>
                    <SelectItem value="apple">Dibatalkan</SelectItem>
                    <SelectItem value="apple">Siap Diambil</SelectItem>
                    <SelectItem value="apple">Selesai</SelectItem>
                    <SelectItem value="apple">Diproses</SelectItem>
                    <SelectItem value="apple">Diterima</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="mt-4" />
        </CardHeader>
        <CardContent>
          <div className="card-content-container flex flex-col gap-x-6">
            <div className="product-container w-full">
              <div className="label font-semibold text-sm">Detail</div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">{`${order.nama_produk} x ${order.total_pesanan}`}</div>
                <div className="number text-right w-24 text-sm">
                  {rupiahFormatter(order.total_harga)}
                </div>
              </div>
              <Separator className="my-2" />
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">
                  Subtotal
                </div>
                <div className="number text-right w-24 text-sm">
                  {rupiahFormatter(order.total_harga)}
                </div>
              </div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">
                  Pengiriman
                </div>
                <div className="number text-right w-24 text-sm">Rp 0</div>
              </div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">
                  Tambahan
                </div>
                <div className="number text-right w-24 text-sm">Rp 0</div>
              </div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 font-semibold w-full">
                  Total
                </div>
                <div className="number text-right w-24 text-sm font-bold">
                  {rupiahFormatter(order.total_harga)}
                </div>
              </div>
            </div>
            <Separator className="my-2" />

            <div className="payment-container w-full">
              <div className="label font-semibold text-sm">Pembeli</div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">
                  Username
                </div>
                <div className="number text-right w-72 text-sm">
                  {order.nama_pelanggan}
                </div>
              </div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">Email</div>
                <div className="number text-right w-64 text-sm">
                  {order.email_pelanggan}
                </div>
              </div>
              <Separator className="my-2" />
              <div className="label font-semibold text-sm">Pembeli</div>
              <div className="detail-row flex">
                <div className="detail text-sm text-gray-500 w-full">
                  Pembayaran
                </div>
                <div className="number text-right w-64 text-sm">
                  {order.jenis_pembayaran}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
