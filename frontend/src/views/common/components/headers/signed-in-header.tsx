'use client';

import { House } from 'lucide-react';
import Link from 'next/link';
import { HeaderButton } from '../buttons/header-button';
import { useRouter } from 'next/navigation';
import { logoutAction } from '../../../../utils/logout-action';

export function SignedInHeader() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.replace('/auth/sign-in');
  }

  return (
    <header className="w-full h-17.5 bg-white flex items-center justify-between px-6 sm:px-10 shadow-sm">
      <Link href="/auth/sign-in">
        <House
          size={48}
          className="text-cyan-700 cursor-pointer hover:text-cyan-800"
        />
      </Link>
      <HeaderButton title="Log out" onClick={handleLogout} />
    </header>
  );
}
