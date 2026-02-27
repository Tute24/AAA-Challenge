import { House } from 'lucide-react';
import Link from 'next/link';
import { HeaderButton } from '../buttons/header-button';

export function SignedOutHeader() {
  return (
    <header className="w-full h-17.5 bg-white flex items-center justify-between px-6 sm:px-10 shadow-sm">
      <Link href="/auth/sign-in">
        <House
          size={48}
          className="text-cyan-700 cursor-pointer hover:text-cyan-800"
        />
      </Link>
      <HeaderButton title="Criar conta" href="/auth/sign-up" />
    </header>
  );
}
