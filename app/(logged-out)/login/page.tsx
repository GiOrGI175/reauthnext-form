'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormProvider } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { passwordSchema } from '@/validation/passwordSchema';
import { LoginWithCredentials } from './action';

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  //   password: z.string().min(5).max(50),
  //   passwordConfirm: z.string(),
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await LoginWithCredentials({
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      form.setError('root', {
        type: 'manual',
        message: response.message,
      });
    } else {
      router.push('/my-account');
    }

    console.log(data);
  };

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email Field */}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='gap-5 flex flex-col'
            >
              <fieldset
                className='gap-5 flex flex-col'
                disabled={form.formState.isSubmitting}
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='password'
                          {...field}
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}
                <Button type='submit'>Login</Button>
              </fieldset>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <div className='text-sm text-muted-foreground'>
            Don't have an account ?{' '}
            <Link href='/register' className='underline'>
              register
            </Link>
          </div>
          <div className='text-sm text-muted-foreground'>
            Forgot password?{' '}
            <Link href='/reset-password' className=' underline'>
              Reset password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
