import { API_TOKO, HEADERS } from '@/config/kadobu-api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const response = await fetch(`${API_TOKO}/${params.id}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  if (status === 200) {
    delete res.result.katalog;
  }
  return NextResponse.json(
    { ...res, url: `${API_TOKO}/${params.id}` },
    { status },
  );
}
