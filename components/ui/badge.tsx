import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import orderStatus from '@/config/order-status';

// Define badge variants using cva
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-2xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        PENDING:
          'border-transparent bg-yellow-500 text-secondary-foreground hover:bg-yellow-500/80',
        PAID: 'border-transparent bg-indigo-500 text-secondary-foreground hover:bg-indigo-500/80',
        CANCELED:
          'border-transparent bg-red-500 text-secondary-foreground hover:bg-red-500/80',
        ACCEPT:
          'border-transparent bg-blue-500 text-secondary-foreground hover:bg-blue-500/80',
        ON_PROGRESS:
          'border-transparent bg-sky-500 text-secondary-foreground hover:bg-sky-500/80',
        READY:
          'border-transparent bg-lime-500 text-secondary-foreground hover:bg-lime-500/80',
        COMPLETE:
          'border-transparent bg-green-500 text-secondary-foreground hover:bg-green-500/80',
        highlight:
          'border-transparent bg-yellow-300 text-primary-foreground hover:bg-yellow-500/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component definition
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

// Mapping object to ensure the status matches one of the BadgeVariant values
const statusMap: { [key: string]: BadgeProps['variant'] } = {
  PENDING: 'PENDING',
  default: 'default',
  secondary: 'secondary',
  PAID: 'PAID',
  CANCELED: 'CANCELED',
  ACCEPT: 'ACCEPT',
  ON_PROGRESS: 'ON_PROGRESS',
  READY: 'READY',
  COMPLETE: 'COMPLETE',
  highlight: 'highlight',
  destructive: 'destructive',
  outline: 'outline',
};

// Component that uses the Badge component with a mapped variant
export const OrderStatusBadge = ({
  prevData,
}: {
  prevData: { status: string };
}) => {
  // Convert the status to a valid Badge variant
  const badgeVariant = statusMap[prevData.status] || 'default';

  return (
    <Badge variant={badgeVariant}>
      {orderStatus[prevData.status]?.text || 'Unknown Status'}
    </Badge>
  );
};
