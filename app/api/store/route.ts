import { API_TOKO, HEADERS } from '@/config/kadobu-api';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { orgId } = auth();
  if (!orgId) {
    return NextResponse.json(
      { status: false, message: "User don't have a Store" },
      { status: 400 },
    );
  }
  const response = await fetch(`${API_TOKO}/${orgId}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  if (status === 200) {
    delete res.result.katalog;
  }
  return NextResponse.json({ ...res }, { status });
}
