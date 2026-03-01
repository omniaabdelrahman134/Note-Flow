'use server';

import { RegisterType } from '@/types/registerType';

export async function Register(values: RegisterType) {
  const res = await fetch(
      'https://note-sigma-black.vercel.app/api/v1/users/signUp',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    },
  );
  const payload = await res.json();
  return payload;
}
