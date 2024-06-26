import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/auth(.*)',
]);

const isHaveStore = createRouteMatcher([
  '/product(.*)',
  '/dashboard(.*)',
  '/orders(.*)',
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  if (isHaveStore(request)) {
    const { userId } = auth();
    const { data } = await clerkClient.users.getOrganizationMembershipList({
      userId: userId || '',
    });
    if (data[0]) {
      const role = data[0].role || null;
      if ((!role && role !== 'org:staff') || (!role && role !== 'org:owner')) {
        return NextResponse.redirect(new URL('/store', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/store', request.url));
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
