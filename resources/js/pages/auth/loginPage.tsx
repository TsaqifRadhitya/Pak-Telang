import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/authPageLayout';
import { router, useForm } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';
import { z } from 'zod';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const loginSchema = z.object({
    email: z.string({ message: 'Harap mengisi email' }).email('Email tidak valid'),
    password: z.string({ message: 'Harap mengisi password' }).min(8, 'Harap mengisi password'),
    remember: z.boolean().optional(),
});

export default function LoginPage() {
    const { post, data, errors, setData, setError, reset } = useForm<LoginForm>();
    console.log(Object.values(errors).filter((e) => typeof e === 'string')[0]);
    const handleSubmit = () => {
        const result = loginSchema.safeParse(data);
        if (!result.success) {
            setError('email', result.error?.format().email?._errors[0] as string);
            setError('password', result.error?.format().password?._errors[0] as string);
            return;
        }
        post(route('login'), { onSuccess: () => reset() });
    };
    return (
        <AuthLayout head="Login" type="login">
            <div className="flex flex-col gap-y-3">
                <Heading title="Welcome Back!" className="text-center text-4xl font-bold text-[#3B387E]" disableMb={true} />
                <HeadingSmall title="Silahkan melakukan login" className="text-center text-sm font-extralight text-[#3B387E]" />
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center rounded-xl border-[1.5px] border-[#5961BE] pl-5">
                    <Mail color="#3B387E" size={30} strokeWidth={1.5} />
                    <Input
                        type="email"
                        className="h-12 rounded-xl border-0 pl-2 font-medium text-[#3B387E] ring-0 placeholder:font-medium placeholder:text-[#3B387E] focus-visible:ring-0"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>
                <InputError message={errors.email === 'Required' ? 'Harap Mengisi Email' : errors.email} />
            </div>
            <div>
                <div className="flex items-center rounded-xl border-[1.5px] border-[#5961BE] pl-5">
                    <Lock color="#3B387E" size={30} strokeWidth={1.5} />
                    <Input
                        type="password"
                        className="h-12 rounded-xl border-0 pl-2 font-medium text-[#3B387E] ring-0 placeholder:font-medium placeholder:text-[#3B387E] focus-visible:ring-0"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </div>
                <InputError message={errors.password === 'Required' ? 'Harap Mengisi Password' : errors.password} />
            </div>
            <Button className="h-12 rounded-2xl bg-[#666FD5] text-xl text-white hover:cursor-pointer hover:bg-[#4e55a1]" onClick={handleSubmit}>
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
                    <span>
                        <img className="w-8" src="Asset\Icon\Google.png" alt="" />
                    </span>
                    login with <span className="font-bold">Google</span>
                </Button>
            </div>
        </AuthLayout>
    );
}
