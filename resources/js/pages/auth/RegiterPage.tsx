import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/authPageLayout';
import { router, useForm } from '@inertiajs/react';
import { Lock, Mail, UserIcon } from 'lucide-react';
import z from 'zod';
import InputError from '../../components/input-error';

const RegisterValidation = z.object({
    name: z.string({ message: 'Harap mengisi nama' }).min(1, 'Harap mengisi nama'),
    email: z.string({ message: 'Harap mengisi email' }).email('Harap mengisi email dengan format yang benar'),
    password: z.string({ message: 'Harap mengisi password' }).min(8, 'Password minimal 8 karakter'),
    password_confirmation: z.string({ message: 'Harap mengisi konfirmasi password' }).min(8, 'Konfirmasi password minimal 8 karakter'),
});

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterPage() {
    const { data, setData, errors, setError, post } = useForm<RegisterForm>();

    const handleSubmit = () => {
        const validation = RegisterValidation.safeParse(data);
        if (!validation.success) {
            setError('name', validation.error?.format().name?._errors[0] as string);
            setError('email', validation.error?.format().email?._errors[0] as string);
            setError('password', validation.error?.format().password?._errors[0] as string);
            setError('password_confirmation', validation.error?.format().password_confirmation?._errors[0] as string);
            if (!(errors.password && errors.password)) {
                if (data.password != data.password_confirmation) {
                    setError('password_confirmation', 'Password tidak sama');
                }
            }
            return;
        }
        post(route('register'));
    };
    return (
        <AuthLayout head="Register" type="register">
            <div className="flex flex-col gap-y-3">
                <Heading title="Hii there, Welcome!" className="text-center text-4xl font-bold text-[#3B387E]" disableMb={true} />
                <HeadingSmall title="Please fill out form to register" className="text-center text-sm font-extralight text-[#3B387E]" />
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center rounded-xl border-[1.5px] border-[#5961BE] pl-4">
                    <UserIcon color="#3B387E" size={30} strokeWidth={1.5} />
                    <Input
                        type="text"
                        className="h-12 rounded-xl border-0 pl-2 font-medium text-[#3B387E] ring-0 placeholder:font-medium placeholder:text-[#3B387E] focus-visible:ring-0"
                        placeholder="Name"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>
                <InputError message={errors.name === 'Required' ? 'Harap Mengisi Nama' : errors.name} />
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center rounded-xl border-[1.5px] border-[#5961BE] pl-4">
                    <Mail color="#3B387E" size={30} strokeWidth={1.5} />
                    <Input
                        type="email"
                        className="h-12 rounded-xl border-0 pl-2 font-medium text-[#3B387E] ring-0 placeholder:font-medium placeholder:text-[#3B387E] focus-visible:ring-0"
                        placeholder="Email"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>
                <InputError message={errors.email === 'Required' ? 'Harap Mengisi Email' : errors.email} />
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center rounded-xl border-[1.5px] border-[#5961BE] pl-4">
                    <Lock color="#3B387E" size={30} strokeWidth={1.5} />
                    <Input
                        type="password"
                        className="h-12 rounded-xl border-0 pl-2 font-medium text-[#3B387E] ring-0 placeholder:font-medium placeholder:text-[#3B387E] focus-visible:ring-0"
                        placeholder="Password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </div>
                <InputError message={errors.password === 'Required' ? 'Harap Mengisi Password' : errors.password} />
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center rounded-xl border-[1.5px] border-[#5961BE] pl-4">
                    <Lock color="#3B387E" size={30} strokeWidth={1.5} />
                    <Input
                        type="password"
                        className="h-12 rounded-xl border-0 pl-2 font-medium text-[#3B387E] ring-0 placeholder:font-medium placeholder:text-[#3B387E] focus-visible:ring-0"
                        placeholder="Confirm Password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                </div>
                <InputError
                    message={errors.password_confirmation === 'Required' ? 'Harap Mengisi Konfirmasi Password' : errors.password_confirmation}
                />
            </div>

            <Button className="h-12 rounded-2xl bg-[#666FD5] text-xl text-white hover:cursor-pointer hover:bg-[#4e55a1]" onClick={handleSubmit}>
                Register
            </Button>
            <div className="flex flex-row items-center gap-x-1">
                <HeadingSmall title="Already registered?" className="text-sm font-extralight text-[#3B387E]" />
                <a href={route('login')} className="text-md mb-0.5 font-semibold text-[#3B387E]">
                    Login
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
                    register with <span className="font-black">google</span>
                </Button>
            </div>
        </AuthLayout>
    );
}
