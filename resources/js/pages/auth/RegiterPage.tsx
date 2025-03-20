import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth/auth';
import { useForm } from '@inertiajs/react';
import z from 'zod';
import InputError from '../../components/input-error';

const RegisterValidation = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
});

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function registerPage() {
    // window.addEventListener('load', () => document.querySelector('#app')?.removeAttribute('data-page'));
    const { data, setData, errors, setError, post } = useForm<RegisterForm>();

    const handleSubmit = () => {
        const validation = RegisterValidation.safeParse(data);
        if (validation) {
            setError('name', validation.error?.format().name?._errors[0] as string);
            setError('email', validation.error?.format().email?._errors[0] as string);
            setError('password', validation.error?.format().password?._errors[0] as string);
            setError('password_confirmation', validation.error?.format().password_confirmation?._errors[0] as string);
            if (!(errors.password && errors.password)) {
                if (data.password != data.password_confirmation) {
                    setError('password_confirmation', 'Password tidak sama');
                    setData('password', '');
                    setData('password_confirmation', '');
                }
            }
            return;
        }
        // post(route('register'))
    };
    return (
        <AuthLayout head="Register">
            <div className="flex flex-col gap-y-3">
                <Heading title="Hii there, Welcome!" className="text-center text-4xl font-[1000] text-[#3B387E]" disableMb={true} />
                <HeadingSmall title="Please fill out form to register" className="text-center text-sm font-extralight text-[#3B387E]" />
            </div>
            <div className="flex flex-col gap-y-2">
                <Input
                    type="text"
                    className="h-12 rounded-xl border-[#666FD5] placeholder:font-black placeholder:text-[#3B387E] focus-visible:ring-[#666FD5]"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name === 'Required' ? 'Harap Mengisi Nama' : errors.name} />
            </div>
            <div className="flex flex-col gap-y-2">
                <Input
                    type="email"
                    className="h-12 rounded-xl border-[#666FD5] placeholder:font-black placeholder:text-[#3B387E] focus-visible:ring-[#666FD5]"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email === 'Required' ? 'Harap Mengisi Email' : errors.email} />
            </div>
            <div className="flex flex-col gap-y-2">
                <Input
                    type="password"
                    className="h-12 rounded-xl border-[#666FD5] placeholder:font-black placeholder:text-[#3B387E] focus-visible:ring-[#666FD5]"
                    placeholder="Password"
                    onChange={(e) => setData('password', e.target.value)}
                    value={data.password}
                />
                <InputError message={errors.password === 'Required' ? 'Harap Mengisi Password' : errors.password} />
            </div>
            <div className="flex flex-col gap-y-2">
                <Input
                    type="password"
                    className="h-12 rounded-xl border-[#666FD5] placeholder:font-black placeholder:text-[#3B387E] focus-visible:ring-[#666FD5]"
                    placeholder="Confirm Password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    value={data.password_confirmation}
                />
                <InputError
                    message={errors.password_confirmation === 'Required' ? 'Harap Mengisi Konfirmasi Password' : errors.password_confirmation}
                />
            </div>

            <Button className="h-12 rounded-2xl bg-[#666FD5] text-xl hover:cursor-pointer hover:bg-[#4e55a1]" onClick={handleSubmit}>
                Register
            </Button>
            <div className="flex flex-row items-center gap-x-1">
                <HeadingSmall title="Already registered?" className="text-sm font-extralight text-[#3B387E]" />
                <a href={route('login.new')} className="text-md mb-0.5 font-semibold text-[#3B387E]">
                    Sign Up
                </a>
            </div>
            <div className="flex flex-row items-center gap-x-5">
                <div className="h-0.5 flex-1/2 bg-black"></div>
                <HeadingSmall title="OR" className="text-sm font-extralight text-[#3B387E]" />
                <div className="h-0.5 flex-1/2 bg-black"></div>
            </div>
            <div className="relative flex h-12 flex-row justify-between gap-x-5 text-sm">
                <Button className="h-full w-1/2 rounded-2xl border-1 border-[#666FD5] bg-transparent font-extralight text-[#3B387E] hover:cursor-pointer hover:bg-[#4e55a1]">
                    login with <span className="font-black">google</span>
                </Button>
                <Button className="h-full w-1/2 rounded-2xl border-1 border-[#666FD5] bg-transparent text-[#3B387E] hover:cursor-pointer hover:bg-[#4e55a1]">
                    login with <span className="font-black">Facebook</span>
                </Button>
            </div>
        </AuthLayout>
    );
}
