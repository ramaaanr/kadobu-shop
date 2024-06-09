import { API_PENJUAL, HEADERS } from '@/config/kadobu-api';
import { NextResponse } from 'next/server';

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
    const response = await fetch(`${API_PENJUAL}/${params.kode_pesanan}`, {
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
