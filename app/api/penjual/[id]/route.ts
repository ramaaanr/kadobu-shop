import { API_PENJUAL, HEADERS } from '@/config/kadobu-api';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const storeId = searchParams.get('storeId') || '';
    const body = {
      idToko: storeId,
      role: 'Karyawan',
    };
    const response = await fetch(`${API_PENJUAL}/${params.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    const res = await response.json();

    const resStatus = response.ok ? 200 : 400;

    return NextResponse.json({ ...res }, { status: resStatus });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = {
      idToko: null,
      role: null,
    };
    const response = await fetch(`${API_PENJUAL}/${params.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    const res = await response.json();

    const resStatus = response.ok ? 200 : 400;

    return NextResponse.json({ ...res }, { status: resStatus });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
