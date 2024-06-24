import { z } from 'zod';

const MAX_FILE_SIZE = 2000000; // 5MB
const ACCEPTED_IMAGE_TYPES: string[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  namaProduk: z.string().min(2).max(50),
  idKategori: z.string(),
  hargaProduk: z
    .any()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Stok Produk harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: 'Harga Produk tidak boleh negatif',
    }),
  deskripsiProduk: z.string().min(15).max(500),
  statusProduk: z
    .string()
    .refine((value) => value !== '', 'Pilih Status Terlebih dahulu'),
  stokProduk: z
    .any()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Stok Produk harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: 'Harga Produk tidak boleh negatif',
    }),
  idToko: z.number().min(0),
  fotoProduk: z
    .any()
    .refine(
      (file) =>
        file instanceof FileList && file !== undefined && file[0] !== undefined,
      'File gambar tidak dipilih',
    )
    .refine(
      (file) => file?.[0]?.size < MAX_FILE_SIZE,
      'Ukuran file gambar melebihi 2MB',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      'Format file gambar tidak didukung (harus .jpeg, .jpg, .png, atau .webp)',
    ),
});

export { formSchema };
