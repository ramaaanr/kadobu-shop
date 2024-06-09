import { API_PRODUCT, API_TOKO, HEADERS } from '@/config/kadobu-api';
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
  const response = await fetch(`${API_TOKO}/${storeId}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  const responseData = response.ok
    ? {
        status: res.status,
        message: res.message,
        data: res.result.katalog,
      }
    : res;
  return NextResponse.json({ ...responseData }, { status });
}
export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: 'User Id Not Found' },
        { status: 400 },
      );
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
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { status: false, message: 'Invalid content type' },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const response = await fetch(`${API_PRODUCT}`, {
      method: 'POST',
      headers: HEADERS,
      body: formData,
      cache: 'no-cache',
    });

    const res = await response.json();
    const status = response.ok ? 200 : 400;
    return NextResponse.json({ ...res }, { status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
