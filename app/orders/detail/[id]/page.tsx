'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  capitalCaseAndRemoveUnderscore,
  dateFormatter,
  rupiahFormatter,
} from '@/utils/stringFormatter';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Order } from '../../column';
import { useEffect, useState } from 'react';
import orderStatus from '@/config/order-status';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import { BASE_API } from '@/config/kadobu-api';
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface statusKet {
  status: string;
  keterangan: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [prevData, setPrevData] = useState<statusKet | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/order/${params.id}`);
      if (!response.ok) {
        setError(true);
      }
      const res = await response.json();
      setData(res.data);
      setStatus(res.data.status);
      setKeterangan(res.data.keterangan);
      setLoading(false);
      setPrevData({
        status: res.data.status,
        keterangan: res.data.keterangan,
      });
    };
    fetchData();
  }, []);

  const selectHandler = (value: any) => {
    setStatus(value);
    setKeterangan(orderStatus[value].keterangan);
  };

  const textAreaHandler = (event: any) => {
    setKeterangan(event.target.value);
  };

  const updateHandler = async () => {
    const response = await fetch(`/api/order/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
        keterangan,
      }),
    });
    if (response.ok) {
      setPrevData({
        status,
        keterangan,
      });
      toast.success('Pesanan Telah Diupdate');
    } else {
      setError(true);
      toast.error('Pesanan Gagal Diupdate');
    }
  };

  if (loading) return <div>Loading</div>;

  if (error) throw Error('Detail Order Bermasalah');

  return (
    <>
      {data && prevData ? (
        <Card className="w-2/5 mx-auto">
          <CardHeader>
            <div className="card-header-container flex gap-x-4 ">
              <div>
                <Image
                  src={`${BASE_API}/product_images/${data.foto_produk}`}
                  alt={data.nama_produk}
                  height={75}
                  width={75}
                  className="rounded-lg"
                />
              </div>
              <div>
                <div className="w-full">
                  <div className="font-bold text-2xl">{data.kode_pesanan}</div>
                </div>
                <div className=" w-full flex gap-x-2 items-center">
                  <div className="font-semibold">
                    {dateFormatter(data.created_at)}
                  </div>
                  <div className="">Status</div>
                  <div
                    className={`py-1 px-2 h-fit ${
                      orderStatus[prevData.status].color
                    } text-white rounded-md text-xs`}
                  >
                    {orderStatus[prevData.status].text}
                  </div>

                  {data.status === 'PENDING' ? (
                    ''
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant={'outline'} size={'icon-sm'}>
                          <PencilIcon size={12} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Ubah Status Dan Keterangan Pesanan
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div>
                          <Label>Plih Status</Label>
                          <Select
                            onValueChange={selectHandler}
                            defaultValue={status}
                          >
                            <SelectTrigger className="w-[240px]">
                              <SelectValue
                                placeholder={orderStatus[data.status].text}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="PAID">Dibayarkan</SelectItem>
                                <SelectItem value="ACCEPT">Diterima</SelectItem>
                                <SelectItem value="ON_PROGRESS">
                                  Diproses
                                </SelectItem>
                                <SelectItem value="READY">
                                  Siap Diambil
                                </SelectItem>
                                <SelectItem value="COMPLETE">
                                  Selesai
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Label>Keterangan</Label>
                          <Textarea
                            onChange={textAreaHandler}
                            value={keterangan}
                            placeholder=""
                          />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={updateHandler}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </div>
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent>
            <div className="card-content-container flex flex-col gap-x-6">
              <div className="product-container w-full">
                <div className="label font-semibold text-sm">Detail</div>
                <div className="detail-row flex">
                  <div className="detail text-sm text-gray-500 w-full">{`${data.nama_produk} x ${data.total_pesanan}`}</div>
                  <div className="number text-right w-24 text-sm">
                    {rupiahFormatter(data.total_harga)}
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="detail-row flex">
                  <div className="detail text-sm text-gray-500 w-full">
                    Subtotal
                  </div>
                  <div className="number text-right w-24 text-sm">
                    {rupiahFormatter(data.total_harga)}
                  </div>
                </div>
                <div className="detail-row flex">
                  <div className="detail text-sm text-gray-500 w-full">
                    Pengiriman
                  </div>
                  <div className="number text-right w-24 text-sm">Rp 0</div>
                </div>
                <div className="detail-row flex">
                  <div className="detail text-sm text-gray-500 w-full">
                    Tambahan
                  </div>
                  <div className="number text-right w-24 text-sm">Rp 0</div>
                </div>
                <div className="detail-row flex">
                  <div className="detail text-sm text-gray-500 font-semibold w-full">
                    Total
                  </div>
                  <div className="number text-right w-24 text-sm font-bold">
                    {rupiahFormatter(data.total_harga)}
                  </div>
                </div>
              </div>
              <Separator className="my-2" />

              <div className="payment-container w-full">
                {data.id_pembeli === 'kadobu-guest' ? (
                  <>
                    <div className="label font-semibold text-sm">Pembeli</div>
                    <div className="detail-row flex">
                      <div className="detail text-sm text-gray-500 w-full">
                        Guest
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="label font-semibold text-sm">Pembeli</div>
                    <div className="detail-row flex">
                      <div className="detail text-sm text-gray-500 w-full">
                        Username
                      </div>
                      <div className="number text-right w-72 text-sm">
                        {data.username}
                      </div>
                    </div>
                    <div className="detail-row flex">
                      <div className="detail text-sm text-gray-500 w-full">
                        Email
                      </div>
                      <div className="number text-right w-64 text-sm">
                        {data.email}
                      </div>
                    </div>
                  </>
                )}

                <Separator className="my-2" />
                <div className="label font-semibold text-sm">Pembayaran</div>
                <div className="detail-row flex">
                  <div className="detail text-sm text-gray-500 w-full">
                    Pembayaran
                  </div>
                  <div className="number text-right w-64 text-sm">
                    {data.jenis_pembayaran
                      ? capitalCaseAndRemoveUnderscore(data.jenis_pembayaran)
                      : 'Belum Dibayar'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
    </>
  );
}