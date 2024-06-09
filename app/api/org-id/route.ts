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
  return NextResponse.json(
    { message: 'Store Id Found', orgId: storeId },
    { status: 200 },
  );
}
