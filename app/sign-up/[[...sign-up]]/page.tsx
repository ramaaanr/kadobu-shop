import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <>
      <div className="sign-up-container h-screen  flex flex-wrap flex-col content-center justify-center">
        <SignUp path="/sign-up" />
      </div>
    </>
  );
}
