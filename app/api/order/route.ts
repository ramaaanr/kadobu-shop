import { API_ORDER, HEADERS } from '@/config/kadobu-api';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'User Id Not Found' }, { status: 400 });
  }
  const { data } = await clerkClient.users.getOrganizationMembershipList({
    userId: userId || '',
  });
  if (!data || data.length <= 0) {
    return NextResponse.json(
      { message: 'Store Id Not Found' },
      { status: 400 },
    );
  }
  const storeId = data[0].organization.id;
  const response = await fetch(`${API_ORDER}?storeId=${storeId}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}

export async function POST(request: Request) {
  const formData = await request.json();
  const response = await fetch(`${API_ORDER}?isGuest=true`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      idPembeli: 'kadobu-guest',
      listKeranjang: [],
      ...formData,
    }),
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
