'use client';

import { useState } from 'react';
import { useOrganizationList } from '@clerk/nextjs';
import { UserMembershipParams } from '@/utils/organizations';
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
import { formSchema } from '@/utils/storeFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { API_TOKO } from '@/config/kadobu-api';
import Loading from '../loading';

export default function Page() {
  const {
    isLoaded: isOrganizationLoaded,
    createOrganization,
    setActive,
    userMemberships,
  } = useOrganizationList(UserMembershipParams);
  const { isLoaded: isUserLoaded, userId, orgId } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaToko: '',
      deskripsiToko: '',
      alamatToko: '',
      fotoToko: undefined,
    },
  });

  if (orgId) {
    router.push('/store');
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!isOrganizationLoaded || !isUserLoaded) {
        return null;
      }
      const { namaToko, deskripsiToko, fotoToko, alamatToko } = data;
      setSubmitting(true);
      const organization = await createOrganization({
        name: namaToko,
      });
      void userMemberships?.revalidate();
      await setActive({ organization });
      const idToko = organization.id;

      const formData = new FormData();
      formData.append('idToko', idToko);
      formData.append('namaToko', namaToko);
      formData.append('deskripsiToko', deskripsiToko);
      formData.append('alamatToko', alamatToko);
      formData.append('idPenjual', `${userId}`);
      formData.append('fotoProfil', fotoToko[0]);
      setSubmitting(true);
      const res = await fetch(`${API_TOKO}`, {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: formData,
      });
      toast.success('Toko Berhasil Dibuat');
      router.push('/store');
    } catch (error: any) {
      console.log(error.message);
      toast.error('Toko Gagal Dibuat');
    } finally {
      setSubmitting(false);
    }
  };
  if (isUserLoaded && isOrganizationLoaded)
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
              <p className="text-gray-500 font-medium">Preview Gambar Toko</p>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-2 grid grid-cols-2"
            >
              <FormField
                control={form.control}
                name="namaToko"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nama Toko</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="mt-0"
                        placeholder="Nama"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deskripsiToko"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nama Toko</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="mt-0"
                        placeholder="Deskripsi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alamatToko"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Alamat Toko</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="mt-0"
                        placeholder="Alamat"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fotoToko"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Foto Toko</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Loading' : 'Buat Toko '}
              </Button>
            </form>
          </Form>
        </div>
      </>
    );

  return <Loading />;
}
