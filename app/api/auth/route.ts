import { API_PENJUAL } from '@/config/kadobu-api';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Error: No signed in user' },
      { status: 401 },
    );
  }

  const user: any = await currentUser();
  const { id, username, emailAddresses } = user;
  const formData = {
    id,
    username,
    email: emailAddresses[0].emailAddress,
  };

  const resUserById = await fetch(`${API_PENJUAL}/${id}`);
  if (resUserById.ok) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const resPostUser = await fetch(`${API_PENJUAL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type to application/json
    },
    body: JSON.stringify(formData), // Convert the formData object to a JSON string
  });

  if (!resPostUser.ok) {
    const resPost = await resPostUser.json();
    return NextResponse.json(
      {
        status: false,
        messsage: `Error: Fail to Signed to Database`,
        error: resPost.errors,
        formData,
      },
      { status: 400 },
    );
  }

  return NextResponse.redirect(new URL('/', request.url));
}
