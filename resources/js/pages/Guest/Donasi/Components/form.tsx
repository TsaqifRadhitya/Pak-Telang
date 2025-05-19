import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { donasiType } from '@/types/donasi';
import { useForm } from '@inertiajs/react';
import { z } from 'zod';

const inputValidation = z.object({
    nominal: z.number().min(10000),
});

export default function Form() {
    const { data, errors, setData, setError, post } = useForm<donasiType>();

    const handleSubmit = () => {
        const validate = inputValidation.safeParse(data);
        if (!validate.success) {
            const err = validate.error.format();
            setError('nominal', err.nominal?._errors[0] as string);
            return;
        }
        post('donasi.store');
    };
    return (
        <div className="flex w-full flex-col justify-center space-y-5 rounded-xl bg-white p-10 shadow-sm">
            <div className="mx-auto max-w-xs">
                <Heading title="Form Donasi" className="self-center px-5 text-center text-3xl font-black" />
                <div className="mt-1 h-1.5 rounded-full bg-[#B9BDFF]"></div>
            </div>
            <div className="w-full space-y-5">
                <div className="w-full">
                    <Heading title="Nominal" className="text-md text-[#3B387E]" />
                    <Input
                        onChange={(e) => setData('nominal', parseInt(e.target.value))}
                        value={data.nominal}
                        type="number"
                        placeholder="Nominal"
                        className="mt-1 w-full rounded-sm border-0 p-2.5 py-1 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                    />
                    {errors.nominal && <p className="text-sm text-red-600">{errors.nominal}</p>}
                    <div className="mt-5 flex gap-2.5">
                        <Button
                            onClick={() => setData('nominal', 10000)}
                            className="w-28 cursor-pointer bg-[#1DAE4E] text-white shadow-md ring ring-[#1DAE4E] hover:bg-transparent hover:font-semibold hover:text-[#1DAE4E]"
                        >
                            10K
                        </Button>
                        <Button
                            onClick={() => setData('nominal', 25000)}
                            className="w-28 cursor-pointer bg-[#FFAB15] text-white shadow-md ring ring-[#FFAB15] hover:bg-transparent hover:font-semibold hover:text-[#FFAB15]"
                        >
                            25K
                        </Button>
                        <Button
                            onClick={() => setData('nominal', 50000)}
                            className="w-28 cursor-pointer bg-[#175FD8] text-white shadow-md ring ring-[#175FD8] hover:bg-transparent hover:font-semibold hover:text-[#175FD8]"
                        >
                            50K
                        </Button>
                        <Button
                            onClick={() => setData('nominal', 100000)}
                            className="w-28 cursor-pointer bg-[#27AAE2] text-white shadow-md ring ring-[#27AAE2] hover:bg-transparent hover:font-semibold hover:text-[#27AAE2]"
                        >
                            100K
                        </Button>
                    </div>
                </div>
                <div className="w-full">
                    <Heading title="Nama" className="text-md text-[#3B387E]" />
                    <Input
                        onChange={(e) => setData('name', e.target.value)}
                        value={data.name}
                        type="text"
                        placeholder="Nama Lengkap"
                        className="mt-1 w-full rounded-sm border-0 p-2.5 py-1 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>
                <div className="w-full">
                    <Heading title="Email" className="text-md text-[#3B387E]" />
                    <Input
                        onChange={(e) => setData('email', e.target.value)}
                        value={data.email}
                        type="email"
                        placeholder="Email"
                        className="mt-1 w-full rounded-sm border-0 p-2.5 py-1 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="w-full">
                    <Heading title="Pesan" className="text-md text-[#3B387E]" />
                    <Textarea
                        onChange={(e) => setData('pesan', e.target.value)}
                        value={data.pesan}
                        placeholder="Pesan"
                        className="mt-1 h-24 w-full rounded-sm border-0 p-2.5 py-1 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                    />
                    {errors.pesan && <p className="text-sm text-red-600">{errors.pesan}</p>}
                </div>
            </div>
            <Button
                onClick={handleSubmit}
                className="mx-auto mt-5 w-64 cursor-pointer bg-[#5961BE] text-white shadow-md ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
            >
                Kirim Donasi
            </Button>
        </div>
    );
}
