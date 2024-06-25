'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BASE_API } from '@/config/kadobu-api';
import { rupiahFormatter, shortenProductName } from '@/utils/stringFormatter';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface Product {
  kode_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  stok_produk: number;
  harga_produk: number;
  status_produk: string;
  foto_produk: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/product');
      if (!response.ok) {
        setError(true);
      } else {
        const res = await response.json();
        setProducts(res.data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectHandler = (value: string) => {
    if (products.length > 0) {
      const foundProduct = products.find(
        (product) => product.kode_produk === value,
      );
      if (foundProduct) {
        setProduct(foundProduct);
        setQuantity(1);
        setPrice(foundProduct.harga_produk);
      }
    }
  };

  const checkoutHandler = async () => {
    if (!product) return null;
    const response = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        kode_produk: product.kode_produk,
        total_pesanan: quantity,
        catatan: catatan,
      }),
    });
    const res = await response.json();
    if (!response.ok) {
      toast.error('Penambahan Pesanan gagal');
      console.log(res.message);
    } else {
      toast.success('Penambahan Pesanan Berhasil');
      router.push('/orders');
    }
  };

  if (error) throw Error('Tambah Pesanan Bermasalah');

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Card className="ml-16 w-1/2">
        <CardHeader className="font-semibold">Tambah Pesanan</CardHeader>
        <CardContent>
          <Separator className="mb-2" />
          <Label>Pilih Produk Anda</Label>
          <Select onValueChange={selectHandler}>
            <SelectTrigger disabled={!products} className="w-full">
              <SelectValue className="" placeholder="Produk" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Pilih Produk Anda</SelectLabel>
                {products.map((product) => (
                  <SelectItem
                    key={product.kode_produk}
                    value={product.kode_produk}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex gap-x-2">
                            <Image
                              alt={product.nama_produk}
                              src={`${BASE_API}/product_images/${product.foto_produk}`}
                              height={25}
                              width={25}
                              className="rounded-sm"
                            />
                            <p className="text-lg">
                              {shortenProductName(product.nama_produk)}
                            </p>
                            <p className="text-lg text-gray-400">{`Stock: ${product.stok_produk}`}</p>
                            <p className="text-lg font-semibold">
                              {rupiahFormatter(product.harga_produk)}
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{product.nama_produk}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="counter-container w-full mt-4 flex">
            <div className="w-full quantity-container">
              <Label>Total Pesanan</Label>
              <div className="pesanan-button-container flex gap-x-2">
                <Button
                  onClick={() => {
                    const newQuantity = quantity + 1;
                    if (product) {
                      if (product.stok_produk < newQuantity) {
                        toast.warning(
                          'Total pesanan tidak boleh lebih dari stok',
                        );
                      } else {
                        setQuantity(newQuantity);
                        const sum = newQuantity * product.harga_produk;
                        setPrice(sum);
                      }
                    }
                  }}
                  disabled={!product}
                  size={'icon-sm'}
                  variant={'outline'}
                >
                  <PlusIcon size={16} />
                </Button>
                <Input
                  className="w-16 h-6"
                  type="number"
                  value={quantity}
                  disabled
                />
                <Button
                  onClick={() => {
                    const newQuantity = quantity - 1;
                    if (product) {
                      if (0 >= newQuantity) {
                        toast.warning(
                          'Total pesanan tidak boleh kurang dari 0',
                        );
                      } else {
                        setQuantity(newQuantity);
                        const sum = newQuantity * product.harga_produk;
                        setPrice(sum);
                      }
                    }
                  }}
                  disabled={!product}
                  size={'icon-sm'}
                  variant={'outline'}
                >
                  <MinusIcon size={16} />
                </Button>
              </div>
            </div>
            <div className="w-full price-container">
              <Label>Total Harga</Label>
              <p className="text-2xl font-bold">{rupiahFormatter(price)}</p>
            </div>
          </div>
          <div className="catatan-container w-full mt-4">
            <Label>Catatan</Label>
            <Input
              className="w-full"
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Tambahkan catatan untuk pesanan Anda"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="button-container w-full gap-x-2 flex">
            <Button
              className="w-full"
              onClick={() => router.push('/orders')}
              variant={'outline'}
            >
              Batal
            </Button>
            <Button
              onClick={checkoutHandler}
              className="w-full"
              disabled={!product || product?.stok_produk === 0}
            >
              Bayar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
