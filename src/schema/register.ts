import * as z from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty('Please Enter Name')
    .min(3, 'name must be at least 3 characters'),

  phone: z
    .string()
    .nonempty('Please Enter Your Phone')
    .regex(/^01[1250][0-9]{8}$/, 'Enter valid Egyptian phone number'),

  email: z
    .string()
    .nonempty('Enter valid email')
    .email('Enter valid email'),

  password: z
    .string()
    .nonempty('Please Enter your password')
    .min(8, 'password must be at least 8 characters'),

  age: z
    .coerce.number() // يحول من string ل number تلقائي
    .min(16, 'Age must be at least 16')
    .max(100, 'Age must be less than 100'),
});

export type registerSchemaType = z.infer<typeof registerSchema>;