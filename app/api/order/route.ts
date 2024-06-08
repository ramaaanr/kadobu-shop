import { API_ORDER, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { orgId } = auth();
  if (!orgId) {
    return NextResponse.json(
      { status: false, message: "User don't have a Store" },
      { status: 400 },
    );
  }
  const response = await fetch(`${API_ORDER}?storeId=${orgId}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}

export async function POST(request: Request) {
  const { kode_produk, total_pesanan } = await request.json();
  const response = await fetch(`${API_ORDER}?isGuest=true`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      kodeProduk: kode_produk,
      totalPesanan: total_pesanan,
      keterangan: 'Pembelian Ditempat',
      idPembeli: 'kadobu-guest',
    }),
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
