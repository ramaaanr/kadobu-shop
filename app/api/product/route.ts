export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/katalogs/`, {
    next: { revalidate: 5 }, // Revalidate every 60 seconds
  });
  const data = await res.json();

  return Response.json(data);
}
