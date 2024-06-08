'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <div className="main-container w-[450px] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Kelola Toko</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Memulai toko online Anda sendiri sekarang lebih mudah dari
            sebelumnya. Dengan platform kami, Anda bisa mengatur produk,
            mengelola inventaris, dan melacak penjualan dengan mudah. Klik
            tombol di bawah ini untuk memulai petualangan bisnis Anda!
            <br />
            <span className="text-red-500 text-2xs">
              *Anda Tidak dapat akses fitur lainnya sebelum memiliki atau
              diundang untuk mengelola toko!
            </span>
          </CardDescription>
          <Separator className="my-4" />
          <Button
            variant={'secondary'}
            onClick={() => router.push('/store/create')}
          >
            Buat Toko
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
