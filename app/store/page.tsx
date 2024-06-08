'use client';

import { useAuth, useOrganizationList, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Unstore from './unstore';
import Loading from './loading';
import { Card, CardHeader } from '@/components/ui/card';
import StoreDetail from './store-detail';
import StaffDetail from './staff-detail';

export default function Page() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const { isLoaded: isAuthLoaded, has, orgId } = useAuth();
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoaded && user) {
      const checkPermissions = async () => {
        const result = await has({ permission: 'org:store:own' });
        setCanManage(result);
        setLoading(false);
      };
      checkPermissions();
    }
  }, [has, isAuthLoaded, user]);

  if (!isUserLoaded || !isAuthLoaded || loading) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }

  if (!canManage || !orgId) return <Unstore />;

  return (
    <>
      <div className="store-container ml-4 flex gap-x-4 min-h-screen">
        <StoreDetail orgId={orgId} />
        <StaffDetail orgId={orgId} />
      </div>
    </>
  );
}
