import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className="form-container flex gap-x-4 mx-8 rounded-lg border border-slate-100 shadow-sm p-4">
      <Skeleton className="h-[330px] w-[440px] rounded-xl" />
      <div className="gap-2 grid grid-cols-2 w-full">
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default Loading;
