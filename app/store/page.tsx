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
        const isCanManage =
          user.organizationMemberships[0]?.permissions.includes(
            'org:store:manage',
          );
        setCanManage(isCanManage);
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

  if (!canManage) return <Unstore />;

  return (
    <>
      <div className="store-container ml-4 pr-4 flex gap-x-4 min-h-screen">
        {user?.organizationMemberships?.length > 0 ? (
          <>
            <StoreDetail
              orgId={orgId || user.organizationMemberships[0].organization.id}
            />
            <StaffDetail orgId={orgId || user.organizationMemberships[0].id} />
          </>
        ) : (
          <p>No organization memberships found.</p> // Handle the case where there are no memberships
        )}
      </div>
    </>
  );
}
