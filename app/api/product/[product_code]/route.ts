import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { product_code: string } },
) {
  const { searchParams } = new URL(request.url);
  const product_code = params.product_code;
  if (!product_code) {
    return new NextResponse(
      JSON.stringify({ error: 'Product code is missing' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/katalogs/${product_code}`,
    {
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch product data' }),
      {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
