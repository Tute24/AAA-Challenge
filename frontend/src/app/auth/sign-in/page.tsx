import { SignedOutHeader } from '@/views/common/components/headers/signed-out-header';
import { SignInForm } from '@/views/auth/components/forms/sign-in-form';

export default function SignInPage() {
  return (
    <>
      <SignedOutHeader />
      <main className="flex items-center justify-center min-h-[calc(100vh-70px)] px-4">
        <SignInForm />
      </main>
    </>
  );
}
