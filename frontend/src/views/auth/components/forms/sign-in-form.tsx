'use client';

import { signInSchema } from '@/schemas/sign-in-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { signInRequest } from '../../api/sign-in-request';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const signInResult = await signInRequest(data);
    if (!signInResult.success) {
      setErrorMessage(signInResult.message);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-cyan-700 p-8 flex flex-col gap-6 border-2 border-cyan-700">
      <h1 className="font-display font-semibold text-2xl text-black text-center">
        Faça Log In
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="font-display font-semibold text-sm text-gray-700"
          >
            E-mail
          </label>
          <input
            id="email"
            type="text" //preferi colocar o type como text aqui e deixar o zod cuidar da validação e resposta de erro
            {...register('email')}
            placeholder="seu@email.com"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm font-display outline-none focus:border-cyan-700 transition-colors duration-150"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="font-display font-semibold text-sm text-gray-700"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm font-display outline-none focus:border-cyan-700 transition-colors duration-150"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-2 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-display font-semibold text-sm rounded-md cursor-pointer transition-colors duration-150"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
        {errorMessage && (
          <span className="text-red-500 text-sm text-center">
            {errorMessage}
          </span>
        )}
      </form>

      <p className="text-center text-sm font-display text-gray-700">
        Ainda não possui conta?{' '}
        <Link
          href="/auth/sign-up"
          className="text-cyan-700 hover:underline font-semibold transition-all duration-150"
        >
          Registre-se!
        </Link>
      </p>
    </div>
  );
}
