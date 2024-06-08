import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/auth(.*)',
]);

const isHaveStore = createRouteMatcher(['/', '/product(.*)', '/orders(.*)']);

export default clerkMiddleware((auth, request: NextRequest) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  if (isHaveStore(request)) {
    console.log('cek auth');
    auth().protect(
      (has) => {
        return has({ permission: 'org:store:own' });
      },
      {
        unauthorizedUrl: `${new URL('/store', request.url)}`,
      },
    );
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
