'use client'
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // prevents automatic redirect
    router.push('/login'); // manually redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-left font-medium transition hover:bg-white/20">
          <LogOut size={18} />
      Logout
    </button>
  );
}