import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function loggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!!session?.user?.id) {
    redirect('/my-account');
  }

  return children;
}
