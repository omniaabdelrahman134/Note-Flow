'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, loginSchemaType } from '@/schema/login';
import { LoginType } from '@/types/loginTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginForm() {
  const router = useRouter();
    const searchParams = useSearchParams();

    const callBackUrl = searchParams.get('callBackUrl');


  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginType) {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: callBackUrl ?? '/',

      redirect: false,
    });
    if (res?.ok) {
      router.push('/');
    } else {
      toast.error(res?.error, { position: 'top-center' });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 shadow-2xl rounded-3xl border-0">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-purple-400 text-white text-2xl shadow-md">
            📝
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Login Now!
          </CardTitle>
          <p className="text-sm text-gray-500">
            Organize your thoughts. Capture ideas. Stay productive.
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="user@domain.com"
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="********"
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-purple-400"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-purple-400 hover:bg-purple-500 text-white font-semibold shadow-lg transition-all duration-300"
            >
              Sign in
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="text-purple-500 font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
