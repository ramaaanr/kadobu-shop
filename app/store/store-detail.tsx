'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { API_TOKO, BASE_API } from '@/config/kadobu-api';
import { useAuth } from '@clerk/nextjs';
import { Copy, Pencil, PenIcon, Store, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { toast } from 'sonner';
interface StoreDetailProps {
  orgId: string;
}
interface Store {
  id_toko: string;
  nama_toko: string;
  deskripsi_toko?: string;
  alamat_toko: string;
  telepon_toko: string;
  lokasi_toko: string;
  foto_profil: string;
}

const StoreDetail: React.FC<StoreDetailProps> = ({ orgId }) => {
  const { orgId: orgOwnerId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [namaToko, setNamaToko] = useState('');
  const [alamatToko, setAlamatToko] = useState('');
  const [deskripsiToko, setDeskripsiToko] = useState('');
  const [teleponToko, setTeleponToko] = useState('');
  const [lokasiToko, setLokasiToko] = useState('');
  const [store, setStore] = useState<Store | null>(null);
  const [fotoToko, setFotoToko] = useState<FileList | null>(null);
  const [previewFotoToko, setPreviewFotoToko] = useState('');
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`/api/store/${orgId}`);
    if (response.ok) {
      const res = await response.json();
      const { result } = res;
      setStore(result);
      setNamaToko(result.nama_toko);
      setAlamatToko(result.alamat_toko);
      setDeskripsiToko(result.deskripsi_toko);
      setLokasiToko(result.lokasi_toko);
      setTeleponToko(result.telepon_toko);
      setPreviewFotoToko(`${BASE_API}/store_images/${result.foto_profil}`);
      setLoading(false);
    } else {
      throw new Error('Fetchig Data Store Error');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const editHandler = async () => {
    const formData = new FormData();
    if (namaToko.length > 50 || namaToko.length < 5) {
      toast.warning('Nama Toko Harus Lebih dari 5 dan Kurang dari 50');
      return null;
    }
    if (alamatToko.length > 50 || alamatToko.length < 15) {
      toast.warning('Alamat Toko Harus Lebih dari 15 dan Kurang dari 50');
      return null;
    }
    if (deskripsiToko.length > 500 || deskripsiToko.length < 15) {
      toast.warning('Deskripsi Toko Harus Lebih dari 15 dan Kurang dari 500');
      return null;
    }
    if (!/^(?:\+62|62|0)8[1-9][0-9]{6,10}$/.test(teleponToko)) {
      toast.warning('Nomor Tidak Sesuai Format');
      return null;
    }
    if (
      !/^(https?:\/\/)?(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)\/[a-zA-Z0-9@:%._\+~#=]{2,256}$/.test(
        lokasiToko,
      )
    ) {
      toast.warning('Format Google Map Tidak Sesuai');
      return null;
    }
    if (fotoToko) {
      if (fotoToko?.[0]?.size > 2000000) {
        toast.warning('Foto profil harus kurang dari 2MB');
        return null;
      }
      if (
        !['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          fotoToko?.[0]?.type,
        )
      ) {
        toast.warning(
          'Format file gambar tidak didukung (harus .jpeg, .jpg, .png, atau .webp)',
        );
        return null;
      }
    }
    formData.append('namaToko', namaToko);
    formData.append('alamatToko', alamatToko);
    formData.append('deskripsiToko', deskripsiToko);
    formData.append('teleponToko', teleponToko);
    formData.append('lokasiToko', lokasiToko);
    formData.append('fotoProfil', fotoToko ? fotoToko[0] : '');
    const response = await fetch(`${API_TOKO}/${orgId}`, {
      method: 'PATCH',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    if (responseData.errors) {
      toast.error('Toko Gagal Dirubah');
    } else {
      toast.success('Toko Berhasil Dirubah');
      setStore({
        id_toko: orgId,
        nama_toko: namaToko,
        alamat_toko: alamatToko,
        deskripsi_toko: deskripsiToko,
        telepon_toko: teleponToko,
        lokasi_toko: lokasiToko,
        foto_profil: previewFotoToko,
      });
    }
    setIsEdit(false);
    await fetchData();
  };

  if (loading || !store)
    return (
      <Card className="w-full md:w-[298px] h-fit">
        <CardHeader className="flex flex-row gap-x-2 items-center">
          <Store size={24} />
          <div className="text-2xl w-fit font-semibold text-primary">
            Toko Anda
          </div>
          <Button disabled size={'icon-sm'} variant={'outline'}>
            <Pencil size={12} color="#aaa" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-x-2">
          <Skeleton className="w-[250px] h-[250px]" />

          <div className="detail-container pt-4">
            <p className="text-xs font-semibold">Nama Toko</p>
            <Skeleton className="w-3/4 h-6 mb-2" />
            <p className="text-xs font-semibold">Alamat Toko</p>
            <Skeleton className="w-full h-6 mb-2" />
            <p className="text-xs font-semibold">Deskripsi</p>
            <Skeleton className="w-2/3 h-6 mb-2" />
            <p className="text-xs font-semibold">No WA</p>
            <Skeleton className="w-1/2 h-6 mb-2" />
            <p className="text-xs font-semibold">Share Location</p>
            <Skeleton className="w-1/3 h-6" />
          </div>
        </CardContent>
      </Card>
    );
  return (
    <>
      <Card className="w-full md:w-[298px] h-fit">
        <CardHeader className="flex flex-row gap-x-2 items-center">
          <Store size={24} />
          <div className="text-2xl w-fit font-semibold text-primary">
            Toko Anda
          </div>
          {orgOwnerId ? (
            <Button
              onClick={() => setIsEdit(!isEdit)}
              size={'icon-sm'}
              variant={'outline'}
            >
              {isEdit ? (
                <XIcon size={12} color="#aaa" />
              ) : (
                <Pencil size={12} color="#aaa" />
              )}
            </Button>
          ) : (
            ''
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-x-2">
          <Image
            alt={store.nama_toko}
            height={250}
            width={250}
            className="text-center w-64 h-64 rounded-lg"
            src={
              isEdit
                ? previewFotoToko
                : `${BASE_API}/store_images/${store.foto_profil}`
            }
          />
          {isEdit ? (
            <Input
              type="file"
              onChange={(e) => {
                setFotoToko(e.target.files);
                if (e.target.files && e.target.files.length > 0) {
                  const image = e.target.files[0];
                  setPreviewFotoToko(URL.createObjectURL(image));
                }
              }}
              className="mt-2"
            />
          ) : (
            ''
          )}
          <div className="detail-container w-full pt-4">
            <p className="text-xs font-semibold">Nama Toko</p>
            {isEdit ? (
              <Input
                onChange={(e) => {
                  setNamaToko(e.target.value);
                }}
                type="text"
                value={namaToko}
                className="mb-2"
              />
            ) : (
              <p className="text-gray-400 pl-1 mb-2">{store.nama_toko}</p>
            )}

            <p className="text-xs font-semibold">Alamat Toko</p>
            {isEdit ? (
              <Input
                onChange={(e) => {
                  setAlamatToko(e.target.value);
                }}
                type="text"
                value={alamatToko}
                className="mb-2"
              />
            ) : (
              <p className="text-gray-400 pl-1 mb-2">{store.alamat_toko}</p>
            )}
            <p className="text-xs font-semibold">Deskripsi</p>
            {isEdit ? (
              <Input
                onChange={(e) => {
                  setDeskripsiToko(e.target.value);
                }}
                type="text"
                value={deskripsiToko}
                className="mb-2"
              />
            ) : (
              <p className="text-gray-400 pl-1 mb-2">{store.deskripsi_toko}</p>
            )}

            <p className="text-xs font-semibold">No WA</p>
            {isEdit ? (
              <Input
                onChange={(e) => {
                  setTeleponToko(e.target.value);
                }}
                type="text"
                value={teleponToko}
                className="mb-2"
              />
            ) : (
              <div className="flex  pl-1">
                <Link
                  target="_blank"
                  className="text-gray-400  hover:text-gray-800 mr-2"
                  href={store.telepon_toko.replace(/^0/, 'https://wa.me/62')}
                >
                  {store.telepon_toko}
                </Link>
                <Button
                  variant={'outline'}
                  size={'icon-sm'}
                  onClick={() => {
                    navigator.clipboard.writeText(`${store.telepon_toko}`);
                    toast.success('Telepon Berhasil Disalin');
                  }}
                >
                  <Copy size={16} />
                </Button>
              </div>
            )}

            <p className="text-xs font-semibold">Share Location</p>
            {isEdit ? (
              <Input
                onChange={(e) => {
                  setLokasiToko(e.target.value);
                }}
                type="text"
                value={lokasiToko}
                className="mb-2"
              />
            ) : (
              <div className="flex  pl-1">
                <Link
                  target={'_blank'}
                  className="text-gray-400  hover:text-gray-800 mr-2"
                  href={store.lokasi_toko}
                >
                  Lokasi
                </Link>
                <Button
                  variant={'outline'}
                  size={'icon-sm'}
                  onClick={() => {
                    navigator.clipboard.writeText(`${store.lokasi_toko}`);
                    toast.success('Lokasi Berhasil Disalin');
                  }}
                >
                  <Copy size={16} />
                </Button>
              </div>
            )}

            {isEdit ? (
              <Button onClick={editHandler} className="w-full">
                Simpan
              </Button>
            ) : (
              ''
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StoreDetail;
