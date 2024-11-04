// თუ მომხამრებელი არის ავტორიზირებული, არ შეუშვა შიგნით არსებულ როუთებზე.

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoggedOutLayout({
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
