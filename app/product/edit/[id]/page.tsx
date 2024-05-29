'use client';
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchemaEdit, formSchema } from '@/utils/productFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import Loading from './loading';
export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaProduk: '',
      hargaProduk: 0,
      deskripsiProduk: '',
      stokProduk: 0,
      statusProduk: '',
      idToko: 1,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        const kode = params.id;
        res = await fetch(`/api/product/${kode}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { result } = await res.json();

        form.reset({
          namaProduk: result.nama_produk,
          hargaProduk: result.harga_produk,
          deskripsiProduk: result.deskripsi_produk,
          stokProduk: result.stok_produk,
          statusProduk: result.status_produk,
          idToko: result.id_toko,
          // fotoProduk: undefined,
        });
        setImageUrl(result.foto_produk);
      } catch (err: any) {
        throw new Error('Tidak dapat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      const kode = params.id;
      formData.append('namaProduk', data.namaProduk);
      formData.append('hargaProduk', data.hargaProduk.toString());
      formData.append('deskripsiProduk', data.deskripsiProduk);
      formData.append('status', data.statusProduk);
      formData.append('stokProduk', data.stokProduk.toString());
      formData.append('idToko', kode);
      formData.append('fotoProduk', data.fotoProduk[0]);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/katalogs/${kode}`,
        {
          method: 'PATCH',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.errors) {
        // const errors = responseData.errors;
        toast.error('Product Gagal Ditambahkan');
      } else {
        toast.success('Product Berhasil Ditambahkan');
        router.push('/product');
      }
    } catch (error) {
      toast.error('Product Gagal Ditambahkan');
    }
  };
  const onDelete = async () => {
    try {
      const kode = params.id;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/katalogs/${kode}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.errors) {
        // const errors = responseData.errors;
        toast.error('Product Gagal Dihapus');
      } else {
        toast.success('Product Berhasil Dihapus');
        router.push('/product');
      }
    } catch (error) {
      toast.error('Product Gagal Dihapus');
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="form-container flex gap-x-4 mx-8 rounded-lg border border-slate-100 shadow-sm p-4">
        <Image
          className="rounded-lg"
          width={'330'}
          alt={'gambar'}
          height={'440'}
          src={`${process.env.NEXT_PUBLIC_API_URL}/product_images/${imageUrl}`}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-2 grid grid-cols-2 w-full"
          >
            <FormField
              control={form.control}
              name="namaProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Nama Produk</FormLabel>
                  <FormControl>
                    <Input className="mt-0" placeholder="Produk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsiProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Deskripsi Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Deskripsi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stokProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Stok Produk</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hargaProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Harga Produk</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Rp0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Status Produk</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectGroup>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (day) => (
                            <SelectItem
                              key={day}
                              value={`Pre-Order ${day} Hari`}
                            >
                              {`Pre-Order ${day} Hari`}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div></div> */}
            <FormField
              control={form.control}
              name="fotoProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Foto Produk</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormDescription className="text-red-400">
                    Jika tidak ada perubahan pada foto, file tidak harus diinput
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idToko"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Simpan
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant={'secondary'} className="w-full">
                  Hapus
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah anda yakin ingin menghapus data ini?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </Form>
      </div>
    </>
  );
}
