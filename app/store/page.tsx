'use client';

import { useAuth, useOrganizationList, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Unstore from './unstore';
import { UserMembershipParams } from '@/utils/organizations';

export default function Page() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const { isLoaded: isAuthLoaded, has } = useAuth();
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    if (isAuthLoaded && user) {
      const checkPermissions = async () => {
        const result = await has({ permission: 'org:sys_memberships:manage' });
        setCanManage(result);
      };
      checkPermissions();
    }
  }, [isAuthLoaded, user]);

  if (!isUserLoaded || !isAuthLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }

  if (canManage) {
    return <>Store</>;
  } else {
    return <Unstore />;
  }
}
