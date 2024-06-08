import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = await request.blob();
    const data = {
      namaToko: formData.get('namaToko'),
      deskripsiToko: formData.get('deskripsiToko'),
      alamatToko: formData.get('alamatToko'),
      penjualId: formData.get('penjualId'),
      fotoToko: file,
    };
    return Response.json({
      status: true,
      data: data,
    });
  } catch (error: any) {
    return Response.json({
      status: false,
      error: error.message,
    });
  }
}
