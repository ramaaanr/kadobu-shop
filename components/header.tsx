'use client';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './ui/breadcrumb';
const Header = () => {
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1];
  const secondPath = pathname.split('/')[2] || '';

  const oneBreadCrumb = (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbPage>{startCase(toLower(firstPath))}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
  const twoBreadCrumb = (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${firstPath}`}>
          {startCase(toLower(firstPath))}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{startCase(toLower(secondPath))}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );

  return (
    <>
      <header className="sticky justify-between top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb>
          {secondPath === '' ? oneBreadCrumb : twoBreadCrumb}
        </Breadcrumb>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
    </>
  );
};

export default Header;
