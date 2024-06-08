'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface StaffDetailProps {
  orgId: string;
}

const StaffDetail: React.FC<StaffDetailProps> = ({ orgId }) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="">Staff Detail</CardHeader>
        <CardContent />
      </Card>
    </>
  );
};

export default StaffDetail;
