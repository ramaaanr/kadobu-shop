'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

interface ProductActionsProps {
  productCode: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({ productCode }) => {
  const router = useRouter();

  const navigateToDetailProduct = () => {
    router.push(`/product/detail/${productCode}`);
  };

  const navigateToEditProduct = () => {
    router.push(`/product/edit/${productCode}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={navigateToDetailProduct}>
          Detail
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={navigateToEditProduct}>
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActions;
