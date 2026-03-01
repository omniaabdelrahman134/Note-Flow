'use client';

import { Register } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, registerSchemaType } from '@/schema/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


export default function RegisterPage() {
  const router = useRouter();

  async function onSubmit(values: registerSchemaType) {
    const data = await Register(values);
    if (data.msg == 'done') router.push('/login');
    else toast.error(data.msg, { position: 'top-center' });
    console.log(data);
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      age: 24,
      phone: '',
    },
        resolver: zodResolver(registerSchema),

  });

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
  <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 shadow-2xl rounded-3xl border-0">
    
    <CardHeader className="space-y-2 text-center">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-purple-400 text-white text-2xl shadow-md">
        📝
      </div>
      <CardTitle className="text-3xl font-bold text-gray-800">
        Join NoteFlow
      </CardTitle>
      <p className="text-sm text-gray-500">
        Organize your thoughts. Capture ideas. Stay productive.
      </p>
    </CardHeader>

    <CardContent>
      <form className="space-y-4">
        
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            Full Name
          </Label>
          <Input
            {...register('name')}
            id="name"
            placeholder="Enter your name"
            className="rounded-xl focus-visible:ring-2 focus-visible:ring-purple-400"
          />
        </div>

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

        {/* Age + Phone Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-700">
              Age
            </Label>
            <Input
              {...register('age')}
              id="age"
              type="number"
              placeholder="21"
              className="rounded-xl focus-visible:ring-2 focus-visible:ring-purple-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              Phone
            </Label>
            <Input
              {...register('phone')}
              id="phone"
              type="tel"
              placeholder="010xxxxxxxx"
              className="rounded-xl focus-visible:ring-2 focus-visible:ring-purple-400"
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="w-full rounded-xl bg-purple-400 hover:bg-purple-500 text-white font-semibold shadow-lg transition-all duration-300"
        >
          Create Account
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-500 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </form>
    </CardContent>
  </Card>
</div>
  );
}
