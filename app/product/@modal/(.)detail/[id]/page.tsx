'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { rupiahFormatter } from '@/utils/stringFormatter';
import _ from 'lodash';
import Modal from '@/components/modal';
import { Skeleton } from '@/components/ui/skeleton';
interface ProductProps {
  kode_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  stok_produk: number;
  harga_produk: number;
  status_produk: string;
  foto_produk: string;
  nama_toko: string;
  alamat_toko: string;
  id_toko: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kode = params.id;
        const res = await fetch(`/api/product/${kode}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { result } = await res.json();
        setProduct(result); // Set product data
        setLoading(false); // Set loading to false
      } catch (err: any) {
        setError(err.message);
        setLoading(false); // Set loading to false even on error
        throw new Error('Failed to fetch data');
      }
    };

    fetchData();
  }, [params.id]);

  if (error) return <Modal>Error</Modal>;
  if (loading) {
    return (
      <Modal>
        <div className="detail-container w-full flex gap-x-2 items-center">
          <Skeleton className="h-[150px] w-[200px] rounded-xl" />
          <div className="w-full flex flex-col gap-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Modal>
    ); // Fix loading message
  }

  // Check if product is not null before rendering
  if (!product) return <Modal>Cant Cathc Product</Modal>;

  return (
    <>
      <Modal>
        <div className="detail-container w-full flex gap-x-2 items-center">
          <Image
            className="rounded-lg"
            width={'150'}
            alt={'gambar'}
            height={'200'}
            src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${product.foto_produk}`}
          />
          <div className="text-container flex flex-col gap-x-2 w-full">
            <div className="property-container flex">
              <p className="text-xs text-gray-600 w-28">Kode Produk</p>
              <p className="text-xs text-gray-600 mr-2">:</p>
              <p className="text-xs font-semibold w-full">
                {product.kode_produk}
              </p>
            </div>
            <div className="property-container flex">
              <p className="text-xs text-gray-600 w-28">Nama Produk</p>
              <p className="text-xs text-gray-600 mr-2">:</p>
              <p className="text-xs font-semibold w-full">
                {product.nama_produk}
              </p>
            </div>

            <div className="property-container flex">
              <p className="text-xs text-gray-600 w-28">Status</p>
              <p className="text-xs text-gray-600 mr-2">:</p>
              <p className="text-xs font-semibold w-full">
                {product.status_produk}
              </p>
            </div>
            <div className="property-container flex">
              <p className="text-xs text-gray-600 w-28">Stok</p>
              <p className="text-xs text-gray-600 mr-2">:</p>
              <p className="text-xs font-semibold w-full">
                {product.stok_produk}
              </p>
            </div>
            <div className="property-container flex">
              <p className="text-xs text-gray-600 w-28">Harga</p>
              <p className="text-xs text-gray-600 mr-2">:</p>
              <p className="text-xs font-semibold w-full">
                {rupiahFormatter(product.harga_produk)}
              </p>
            </div>
            <div className="property-container flex">
              <p className="text-xs text-gray-600 w-28">Deskripsi</p>
              <p className="text-xs text-gray-600 mr-2">:</p>
              <p className="text-xs font-semibold w-full">
                {product.deskripsi_produk}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
