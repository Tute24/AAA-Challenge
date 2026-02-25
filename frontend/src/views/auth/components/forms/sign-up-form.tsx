'use client';

import { signUpSchema } from '@/schemas/sign-up-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { signUpRequest } from '../../api/sign-up-request';
import { useRouter } from 'next/navigation';

export type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const signUpResult = await signUpRequest(data);
    if (!signUpResult.success) {
      setErrorMessage(signUpResult.message);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-cyan-700 p-8 flex flex-col gap-6 border-2 border-cyan-700">
      <h1 className="font-display font-semibold text-2xl text-black text-center">
        Crie sua conta
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
            htmlFor="name"
            className="font-display font-semibold text-sm text-gray-700"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Seu primeiro nome"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm font-display outline-none focus:border-cyan-700 transition-colors duration-150"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
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

        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="font-display font-semibold text-sm text-gray-700"
          >
            Confirme a senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="••••••••"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm font-display outline-none focus:border-cyan-700 transition-colors duration-150"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-2 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-display font-semibold text-sm rounded-md cursor-pointer transition-colors duration-150"
        >
          {isSubmitting ? 'Registrando...' : 'Criar conta'}
        </button>
        {errorMessage && (
          <span className="text-red-500 text-sm text-center">
            {errorMessage}
          </span>
        )}
      </form>

      <p className="text-center text-sm font-display text-gray-700">
        Já possui conta?{' '}
        <Link
          href="/auth/sign-in"
          className="text-cyan-700 hover:underline font-semibold transition-all duration-150"
        >
          Entre!
        </Link>
      </p>
    </div>
  );
}
