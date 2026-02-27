import { SignUpForm } from '@/views/auth/components/forms/sign-up-form';
import { SignedOutHeader } from '@/views/common/components/headers/signed-out-header';

export default function SignUpPage() {
  return (
    <>
      <SignedOutHeader />
      <main className="flex items-center justify-center min-h-[calc(100vh-70px)] px-4 pt-4">
        <SignUpForm />
      </main>
    </>
  );
}
