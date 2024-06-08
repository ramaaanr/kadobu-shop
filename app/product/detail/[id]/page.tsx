'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { rupiahFormatter } from '@/utils/stringFormatter';
import _ from 'lodash';
import Loading from '../../loading';
import ProductImage from '@/components/product-image';
import { API_PRODUCT } from '@/config/kadobu-api';

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
  const [product, setProduct] = useState<ProductProps | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const kode = params.id;
        const res = await fetch(`/api/product/${kode}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setProduct(result.data); // Set product data
        setLoading(false); // Set loading to false
      } catch (err: any) {
        setError(err.message);
        setLoading(false); // Set loading to false even on error
        throw new Error('Detail Bermasalah');
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="form-container flex mx-auto w-[900px] rounded-lg border border-slate-100 shadow-sm p-4">
        <ProductImage
          width={330}
          height={440}
          foto_produk={product.foto_produk}
        />
        <div className="text-container flex flex-col gap-y-2 w-full px-8">
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
            <p className="text-xs text-gray-600 w-28">Stok</p>
            <p className="text-xs text-gray-600 mr-2">:</p>
            <div className="badge-container w-full">
              <Badge
                className=""
                variant={
                  _.includes(product.status_produk, 'Ready')
                    ? 'highlight'
                    : 'default'
                }
              >
                {product.status_produk}
              </Badge>
            </div>
          </div>
          <div className="property-container flex">
            <p className="text-xs text-gray-600 w-28">Harga</p>
            <p className="text-xs text-gray-600 mr-2">:</p>
            <p className="text-xs font-semibold w-full">
              {product.harga_produk}
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
    </>
  );
}
