'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { OrgInvitationsParams, OrgMembersParams } from '@/utils/organizations';
import { useOrganization, useUser } from '@clerk/nextjs';
import { FormEvent, FormEventHandler, useState } from 'react';
import { OrganizationCustomRoleKey } from '@clerk/types';
import { ContactRound, MessageSquareDiff, PersonStanding } from 'lucide-react';
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

interface StaffDetailProps {
  orgId: string;
}

const StaffDetail: React.FC<StaffDetailProps> = ({ orgId }) => {
  const { isLoaded, memberships, organization, invitations } = useOrganization({
    ...OrgInvitationsParams,
    ...OrgMembersParams,
  });
  const [emailAddress, setEmailAddress] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();

  if (!isLoaded) {
    return <>Loading</>;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (organization) {
      e.preventDefault();

      try {
        const submittedData = Object.fromEntries(
          new FormData(e.currentTarget).entries(),
        ) as {
          email: string | undefined;
        };

        if (!submittedData.email) {
          return;
        }

        setDisabled(true);
        await organization.inviteMember({
          emailAddress: submittedData.email,
          role: 'org:staff',
        });
        await invitations?.revalidate?.();
        setEmailAddress('');
        setDisabled(false);
        toast.success('Tambah Karyawan Berhasil');
      } catch (error) {
        toast.error('Tambah Karyawan Gagal');
        throw new Error('Halaman Toko Bermasalah');
      }
    }
  };

  if (!memberships) return null;
  const removeMemberHandler = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/penjual/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return true;
      }
      toast.error('Gagal menghapus Karyawan');
      return false;
    } catch (error) {
      toast.error('Gagal menghapus Karyawan');
      return false;
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-4">
      <Card className="w-full ">
        <CardHeader className="flex flex-col md:flex-row gap-x-3 justify-between items-center">
          <div className="flex items-center w-full md:w-fit">
            <ContactRound size={24} />
            <div className="text-2xl w-fit font-semibold text-primary">
              Data Karyawan
            </div>
          </div>
          <AlertDialog>
            {organization ? (
              <AlertDialogTrigger asChild>
                <Button className="w-full md:w-fit">Tambah Karyawan</Button>
              </AlertDialogTrigger>
            ) : (
              ''
            )}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tambah Email Karyawan</AlertDialogTitle>
              </AlertDialogHeader>
              <form onSubmit={onSubmit}>
                <Input
                  name="email"
                  type="text"
                  placeholder="Email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="mb-2"
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Back</AlertDialogCancel>
                  <Button type="submit" disabled={disabled}>
                    Invite
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent className="flex flex-col gap-x-2 min-h-[200px]">
          <Table>
            <TableCaption>List Karyawan</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships?.data?.map((mem) => (
                <TableRow key={mem.id}>
                  <TableCell>
                    {mem.publicUserData.identifier}{' '}
                    {mem.publicUserData.userId === user?.id && '(You)'}
                  </TableCell>
                  <TableCell>{mem.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {mem.publicUserData.userId !== user?.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={'outline'}>Remove</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Apakah Anda Ingin Menghapus Karyawan
                            </AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Back</AlertDialogCancel>
                            <Button
                              onClick={async () => {
                                const isRemoveSucces =
                                  await removeMemberHandler(
                                    mem.publicUserData.userId || '',
                                  );
                                if (isRemoveSucces) {
                                  await mem.destroy();
                                  await memberships?.revalidate();
                                  toast.success('Karyawan Dihapus');
                                }
                              }}
                              type="button"
                            >
                              Hapus
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-full ">
        <CardHeader className="flex flex-col md:flex-row gap-x-3 justify-between items-center">
          <div className="flex items-center w-full md:w-fit">
            <MessageSquareDiff size={24} />
            <div className="text-2xl w-fit font-semibold text-primary">
              Data Karyawan Yang Diundang
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-x-2 min-h-[200px]">
          <Table>
            <TableCaption>List Karyawan</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations?.data?.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{inv.emailAddress}</TableCell>
                  <TableCell>{inv.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={'outline'}>Remove</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Apakah Anda Ingin Menghapus Undangan
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Back</AlertDialogCancel>
                          <Button
                            onClick={async () => {
                              await inv.revoke();
                              await Promise.all([
                                memberships?.revalidate,
                                invitations?.revalidate,
                              ]);
                              toast.success('Undangan Dihapus');
                            }}
                            type="button"
                          >
                            Hapus
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDetail;
