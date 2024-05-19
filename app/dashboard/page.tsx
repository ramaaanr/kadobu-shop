import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

const Page = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
      </div>
    </>
  );
};

export default Page;
