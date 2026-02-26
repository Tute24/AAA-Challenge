'use client';

import { apiClient } from '@/utils/api-client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      if (!pathname.includes('dashboard')) return;

      setIsValidating(true);
      try {
        await apiClient({
          httpMethod: 'get',
          route: '/auth/validate',
        });
      } catch {
        router.push('/auth/sign-in');
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [pathname, router]);

  if (isValidating) return null;

  return <>{children}</>;
}
