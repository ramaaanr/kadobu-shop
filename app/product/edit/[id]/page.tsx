'use client';
import React, { useEffect, useState } from 'react';
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
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/utils/productEditFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { API_PRODUCT, BASE_API, HEADERS_PUBLIC } from '@/config/kadobu-api';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
const fetchOrgId = async () => {
  const response = await fetch('/api/org-id');
  if (response.ok) {
    const { orgId } = await response.json();
    return orgId;
  }
  return '';
};
export default function Page({ params }: { params: { id: string } }) {
  const { isLoaded: isAuthLoaded, orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaProduk: '',
      hargaProduk: 0,
      deskripsiProduk: '',
      stokProduk: 0,
      statusProduk: '',
      idToko: 1,
      fotoProduk: undefined,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/product/${params.id}`);
      if (response.ok) {
        const res = await response.json();
        const { data } = res;
        form.reset({
          namaProduk: data.nama_produk,
          hargaProduk: data.harga_produk,
          deskripsiProduk: data.deskripsi_produk,
          stokProduk: data.stok_produk,
          statusProduk: data.status_produk,
          idToko: 1,
          fotoProduk: undefined,
        });
        setPreview(`${BASE_API}/product_images/${data.foto_produk}`);
        setLoading(false);
      } else {
        setError(true);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!isAuthLoaded) return null;
    const formData = new FormData();
    formData.append('namaProduk', data.namaProduk);
    formData.append('hargaProduk', data.hargaProduk.toString());
    formData.append('deskripsiProduk', data.deskripsiProduk);
    formData.append('status', data.statusProduk);
    formData.append('stokProduk', data.stokProduk.toString());
    formData.append('idToko', `${orgId || (await fetchOrgId())}`);
    formData.append('fotoProduk', data.fotoProduk ? data.fotoProduk[0] : '');

    const response = await fetch(`${API_PRODUCT}/${params.id}`, {
      method: 'PATCH',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
      body: formData,
    });

    if (!response.ok) {
      toast.error('Product Gagal Dirubah');
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    if (responseData.errors) {
      // const errors = responseData.errors;
      toast.error('Product Gagal Dirubah');
    } else {
      toast.success('Product Berhasil Dirubah');
      router.push('/product');
    }
  };

  const deleteHandler = async () => {
    const response = await fetch(`${API_PRODUCT}/${params.id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
    });

    if (response.ok) {
      router.push('/product');
    }
  };

  if (loading) return <>Loading</>;
  return (
    <>
      <div className="form-container flex gap-x-4 mx-8 rounded-lg border border-slate-100 shadow-sm p-4">
        <Image
          className="rounded-lg"
          width={'330'}
          alt={'gambar'}
          height={'440'}
          src={preview}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-2 grid grid-cols-2"
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
            <FormField
              control={form.control}
              name="fotoProduk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Foto Produk</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        if (e.target.files && e.target.files.length > 0) {
                          const image = e.target.files[0];
                          setPreview(URL.createObjectURL(image));
                        }
                      }}
                    />
                  </FormControl>
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
            <div className="button-container flex w-full col-span-2 gap-x-4">
              <Button className="w-full" type="submit">
                Submit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger className="w-full" asChild>
                  <Button
                    variant={'secondary'}
                    className="w-full"
                    type="button"
                  >
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah anda ingin menghapus Produk?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteHandler}>
                      Ya
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
