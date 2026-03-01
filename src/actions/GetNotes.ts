'use server'
import { Note } from '@/types/noteCardType';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GetNotes() {
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.AUTH_SECRET,
  });
  const res = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes`, {
    next: { tags: ['notes'] },
    headers: {
      token: `3b8ny__${token?.token}`,
      'Content-Type': 'application/json',
    },
  });

  const payload = await res.json();
  const notes: null | Note[] = payload.msg === 'done' ? payload.notes : null;

  return notes;
}
