'use server';

import { NewNote } from '@/types/NewNote';
import { getToken } from 'next-auth/jwt';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function AddNotes(values: NewNote) {
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.AUTH_SECRET,
  });
  const res = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes`, {
    method: 'POST',
    headers: {
      token: `3b8ny__${token?.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  const payload = await res.json();
  revalidateTag('notes', 'max');
  return payload;
}
