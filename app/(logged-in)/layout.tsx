import { auth } from '@/auth';
import LogoutBtn from '@/components/logout-btn/LogoutBtn';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function loggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='bg-gray-200 flex justify-between p-4 items-center'>
        <ul>
          <li>
            <Link href='/my-account'>
              {session?.user?.email && <div>{session.user.email}</div>}
            </Link>
          </li>
          <li>
            <Link href='/change-password'>changed password</Link>
          </li>
        </ul>
        <div>
          <LogoutBtn />
        </div>
      </nav>
      <div className='flex flex-1 justify-center items-center'>{children}</div>
    </div>
  );
}
