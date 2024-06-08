import { API_PRODUCT, HEADERS } from '@/config/kadobu-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { product_code: string } },
) {
  const product_code = params.product_code;
  const response = await fetch(`${API_PRODUCT}/${product_code}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;

  return NextResponse.json({ ...res }, { status });
}
