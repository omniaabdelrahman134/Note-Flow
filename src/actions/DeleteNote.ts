'use server';

import { getToken } from 'next-auth/jwt';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function DeleteNote(id: string) {
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.AUTH_SECRET,
  });

  const res = await fetch(
    `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
    {
      method: 'DELETE',
      headers: {
        token: `3b8ny__${token?.token}`,
      },
    }
  );

  const payload = await res.json();

  revalidateTag('notes','max');

  return payload;
}