import { z } from 'zod';

const MAX_FILE_SIZE = 2000000; // 5MB
const ACCEPTED_IMAGE_TYPES: string[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const formSchema = z.object({
  namaToko: z.string().min(2).max(50),
  deskripsiToko: z.string().min(15).max(100),
  alamatToko: z.string().min(15).max(25),
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
