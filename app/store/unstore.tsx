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
import {
  OrgMembershipRequestsParams,
  UserInvitationsParams,
  UserMembershipParams,
} from '@/utils/organizations';
import { useAuth, useOrganization, useOrganizationList } from '@clerk/nextjs';
import { StoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const { isLoaded, setActive, userInvitations, userMemberships } =
    useOrganizationList({
      ...UserInvitationsParams,
      ...UserMembershipParams,
    });
  const { userId } = useAuth();

  if (!isLoaded) {
    return <>Loading</>;
  }
  const acceptInviteHandler = async (mem: any) => {
    console.log(mem);
    try {
      const response = await fetch(
        `/api/penjual/${userId}?storeId=${mem.publicOrganizationData.id}`,
        {
          method: 'PUT',
        },
      );
      if (response.ok) {
        await mem.accept();
        await userMemberships.revalidate();
        await userInvitations.revalidate();
        toast.success('Terima Karyawan Berhasil');
        return;
      }
      toast.error('Terima Karyawan Gagal');
    } catch (error) {
      toast.error('Terima karyawan Gagal');
    }
  };

  return (
    <div className="main-container justify-center items-center flex flex-col px-8 gap-y-4 ">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="pt-4 text-primary">Kelola Toko</CardTitle>
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
        <CardHeader>
          <CardTitle className="text-primary">Undangan Toko</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Anda diundang untuk mengelola toko bersama! Accept undangan untuk
            menjadi karyawan tetap pada toko yang mengundang anda
          </CardDescription>
          <Separator className="my-4" />
          <ul>
            <div>
              {userInvitations.data?.length > 0 ? (
                userInvitations.data.map((mem) => (
                  <li
                    key={mem.id}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex">
                      <StoreIcon size={20} className="mr-2" />
                      <p className="font-semibold">
                        {mem.publicOrganizationData.name}
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={async () => {
                          await acceptInviteHandler(mem);
                        }}
                      >
                        Terima
                      </Button>
                    </div>
                  </li>
                ))
              ) : (
                <p>Tidak ada undangan!</p>
              )}
            </div>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
