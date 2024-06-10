import { z } from 'zod';

const MAX_FILE_SIZE = 2000000; // 5MB
const ACCEPTED_IMAGE_TYPES: string[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const formSchema = z.object({
  namaToko: z
    .string()
    .min(5, {
      message: 'Nama Toko Harus Lebih dari 5 Huruf',
    })
    .max(50, {
      message: 'Nama Toko Harus Kurang dari 50 Huruf',
    }),
  deskripsiToko: z
    .string()
    .min(15, {
      message: 'Nama Toko Harus Lebih dari 15 Huruf',
    })
    .max(500, {
      message: 'Nama Toko Harus Kurang dari 500 Huruf',
    }),
  alamatToko: z
    .string()
    .min(15, {
      message: 'Nama Toko Harus Lebih dari 15 Huruf',
    })
    .max(100, {
      message: 'Nama Toko Harus Kurang dari 100 Huruf',
    }),
  teleponToko: z.string().regex(/^(?:\+62|62|0)8[1-9][0-9]{6,10}$/, {
    message: 'Nomor Tidak Sesuai Format',
  }),
  lokasiToko: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)\/[a-zA-Z0-9@:%._\+~#=]{2,256}$/,
      {
        message: 'Format Google Map Tidak Sesuai',
      },
    ),
  fotoToko: z
    .any()
    .refine(
      (file: any) =>
        file instanceof FileList && file !== undefined && file[0] !== undefined,
      'File gambar tidak dipilih',
    )
    .refine(
      (file: any) => file?.[0]?.size < MAX_FILE_SIZE,
      'Ukuran file gambar melebihi 2MB',
    )
    .refine(
      (file: any) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      'Format file gambar tidak didukung (harus .jpeg, .jpg, .png, atau .webp)',
    ),
});
