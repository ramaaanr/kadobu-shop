import { API_ORDER, HEADERS } from '@/config/kadobu-api';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { kode_pesanan: string } },
) {
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
  const response = await fetch(
    `${API_ORDER}/${params.kode_pesanan}?storeId=${storeId}`,
    {
      headers: HEADERS,
      cache: 'no-cache',
    },
  );
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}

export async function PUT(
  request: Request,
  { params }: { params: { kode_pesanan: string } },
) {
  try {
    const body = await request.json();
    const status = body.status;
    const keterangan = body.keterangan;
    const formData = {
      status,
      keterangan,
    };
    const response = await fetch(`${API_ORDER}/${params.kode_pesanan}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(formData),
    });

    const res = await response.json();

    const resStatus = response.ok ? 200 : 400;

    return NextResponse.json({ ...res, formData }, { status: resStatus });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
