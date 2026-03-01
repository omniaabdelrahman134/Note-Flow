import Link from "next/link";
import { Home, LogOut } from "lucide-react";
import LogoutButton from "./LogoutBtn";
import favicon from '@/app/favicon.ico'
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-purple-400 to-purple-500 text-white flex flex-col p-6 rounded-r-3xl shadow-2xl">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <Image width={50} height={50} src = {favicon}  alt ='icon'></Image> <span>NoteFlow</span>
        </h1>
        <p className="text-xs text-purple-100 mt-1">
          Capture. Organize. Focus.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-sm font-medium transition hover:bg-white/30"
        >
          <Home size={18} />
          Home
        </Link>
      </nav>

      {/* Logout */}
      <div className="pt-6 mt-auto border-t border-white/20">
                <LogoutButton/>

      </div>

    </aside>
  );
}