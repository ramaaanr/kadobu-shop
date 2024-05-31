'use client';
import React, { useState } from 'react';
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
import { formSchema } from '@/utils/productFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';

export default function Page() {
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('namaProduk', data.namaProduk);
      formData.append('hargaProduk', data.hargaProduk.toString());
      formData.append('deskripsiProduk', data.deskripsiProduk);
      formData.append('status', data.statusProduk);
      formData.append('stokProduk', data.stokProduk.toString());
      formData.append('idToko', data.idToko.toString());
      formData.append('fotoProduk', data.fotoProduk[0]);
      console.log(formData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/katalogs`,
        {
          method: 'POST',
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
  return (
    <>
      <div className="form-container flex gap-x-4 mx-8 rounded-lg border border-slate-100 shadow-sm p-4">
        {preview ? (
          <Image
            className="rounded-lg"
            width={'330'}
            alt={'gambar'}
            height={'440'}
            src={preview}
          />
        ) : (
          <div className="preview-image w-[330px] h-[330px] rounded-lg flex flex-col justify-center items-center bg-gray-100">
            <ImagePlus size="180" color="#9aa0a6" />
            <p className="text-gray-500 font-medium">Preview Gambar Product</p>
          </div>
        )}
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
                        <SelectValue placeholder="Plih Status" />
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
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
