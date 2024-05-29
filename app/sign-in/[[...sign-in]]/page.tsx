import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <>
      <div className="sign-in-container h-screen  flex flex-wrap flex-col content-center justify-center">
        <SignIn path="/sign-in" />
      </div>
    </>
  );
}
