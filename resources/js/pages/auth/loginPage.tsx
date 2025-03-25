import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth/auth';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { z } from 'zod';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    remember: z.boolean().optional(),
});

export default function loginPage() {
    const page = usePage().props;

    console.log(page.errors);

    useEffect(() => {
        if(page.errors.email)setError('email', page.errors.email[0]);
    }, []);

    const { post, data, errors, setData, setError, reset } = useForm<LoginForm>();
    const handleSubmit = () => {
        const result = loginSchema.safeParse(data);
        if (!result.success) {
            setError('email', result.error?.format().email?._errors[0] as string);
            setError('password', result.error?.format().password?._errors[0] as string);
            return;
        }
        post(route('login'), { onFinish: () => reset('password') });
    };
    return (
        <AuthLayout head="Login">
            <div className="flex flex-col gap-y-3">
                <Heading title="Welcome Back!" className="text-center text-4xl font-[1000] text-[#3B387E]" disableMb={true} />
                <HeadingSmall title="Silahkan melakukan login" className="text-center text-sm font-extralight text-[#3B387E]" />
            </div>
            <div className="flex flex-col gap-y-2">
                <Input
                    type="email"
                    className="h-12 rounded-xl border-[#666FD5] font-medium text-[#3B387E] placeholder:font-black placeholder:text-[#3B387E] focus-visible:ring-[#666FD5]"
                    placeholder="Email"
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email === 'Required' ? 'Harap Mengisi Email' : errors.email} />
            </div>
            <div>
                <Input
                    type="password"
                    className="h-12 rounded-xl border-[#666FD5] font-medium text-[#3B387E] placeholder:font-black placeholder:text-[#3B387E] focus-visible:ring-[#666FD5]"
                    placeholder="Password"
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password === 'Required' ? 'Harap Mengisi Password' : errors.password} />
            </div>
            <Button className="h-12 rounded-2xl bg-[#666FD5] text-xl hover:cursor-pointer hover:bg-[#4e55a1]" onClick={handleSubmit}>
                Login
            </Button>
            <div className="flex flex-row items-center gap-x-1">
                <HeadingSmall title="Dont have an account ?" className="text-sm font-extralight text-[#3B387E]" />
                <a href={route('register')} className="text-md mb-0.5 font-semibold text-[#3B387E]">
                    Register
                </a>
            </div>
            <div className="flex flex-row items-center gap-x-5">
                <div className="h-0.5 flex-1/2 bg-black"></div>
                <HeadingSmall title="OR" className="text-sm font-extralight text-[#3B387E]" />
                <div className="h-0.5 flex-1/2 bg-black"></div>
            </div>
            <div className="relative flex h-12 flex-row justify-between gap-x-5 text-sm">
                <Button
                    onClick={() => router.get(route('oauth.login'))}
                    className="h-full w-full rounded-2xl border-1 border-[#666FD5] bg-transparent font-extralight text-[#3B387E] hover:cursor-pointer hover:bg-[#4e55a1]"
                >
                    login with <span className="font-black">google</span>
                </Button>
            </div>
        </AuthLayout>
    );
}
