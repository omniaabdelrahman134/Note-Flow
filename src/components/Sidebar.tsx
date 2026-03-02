"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Menu } from "lucide-react";
import LogoutButton from "./LogoutBtn";
import favicon from "@/app/favicon.ico";
import Image from "next/image";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-500 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="cursor-pointer fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          h-screen w-64
          bg-gradient-to-b from-purple-400 to-purple-500
          text-white flex flex-col p-6
          rounded-r-3xl shadow-2xl
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
            <Image width={50} height={50} src={favicon} alt="icon" />
            <span>NoteFlow</span>
          </h1>
          <p className="text-xs text-purple-100 mt-1">
            Capture. Organize. Focus.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-sm font-medium transition hover:bg-white/30"
            onClick={() => setOpen(false)}
          >
            <Home size={18} />
            Home
          </Link>
        </nav>

        {/* Logout */}
        <div className="pt-6 mt-auto border-t cursor-pointer border-white/20">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}