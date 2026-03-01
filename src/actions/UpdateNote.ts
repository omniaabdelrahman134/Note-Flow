'use server';

import { NewNote } from '@/types/NewNote';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function UpdateNote(values: NewNote, id: string) {
  // get token from cookies
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.AUTH_SECRET,
  });

  // PUT request with note ID in URL
  const res = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `3b8ny__${token?.token}`,
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update note: ${error}`);
  }

  const payload = await res.json();

  // revalidate notes cache for immediate UI update
  revalidateTag('notes','max');

  return payload;
}