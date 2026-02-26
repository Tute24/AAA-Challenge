import { DailySalesHistoryResponseElement } from '@/types/daily-sales/daily-sales-history-response';
import { SignedInHeader } from '@/views/common/components/headers/signed-in-header';
import { DashboardView } from '@/views/dashboard/components/dashboard-view';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/auth/sign-in');

  const response = await fetch(`${process.env.API_URL}/daily-sales`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) redirect('/auth/sign-in'); //qualquer erro aqui na requsição, que majoritariamente vai ser um 401 ou 500, redireciona o usuário para login. É uma simplificação, mas evita que o usuário fique com uma tela quebrada caso haja algum problema na requisição.

  const { dailySalesFormattedHistory } = (await response.json()) as {
    dailySalesFormattedHistory: DailySalesHistoryResponseElement[];
  };

  return (
    <>
      <SignedInHeader />
      <DashboardView dailySalesDataHistory={dailySalesFormattedHistory} />
    </>
  );
}
