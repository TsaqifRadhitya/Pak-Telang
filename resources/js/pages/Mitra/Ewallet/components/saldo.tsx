import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WidrawEwalletType } from '@/types/wdEwallet';
import { currencyConverter } from '@/utils/currencyConverter';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import z from 'zod';
import { props } from '..';
import InputError from '../../../../components/input-error';
import ModalItemBank, { SetData } from './modalItemBank';
import ModalItemEwallet from './modalItemEwallet';

const validation = (data: WidrawEwalletType, saldo: number) => {
    const formValidition = z.object({
        nominal: z
            .number({ message: 'Harap memasukkan nominal pencairan' })
            .min(1000, `Minimum nominal penarikan adalah ${currencyConverter(1000)}`)
            .max(saldo, 'Nominal penarikan melebihi saldo anda'),
        OwneName: z.string({ message: 'Harap memasukkan nama pemilik' }).min(1, 'Harap memasukkan nama pemilik'),
        type: z.enum(['bank', 'e-Wallet'], { message: 'Harap memilih metode penarikan' }),
        provider: z.string({ message: `Harap memilih ${data.type}` }).min(1, `Harap memilih ${data.type}`),
        number: z
            .string({ message: `harap mengisi nomor ${data.type} dengan benar` })
            .min(data.type === 'bank' ? 10 : 12, `harap mengisi nomor ${data.type} dengan benar`),
    });

    const validition = formValidition.safeParse(data);
    return validition;
};

export default function Saldo() {
    const { auth } = usePage<props>().props;
    const [modal, setModal] = useState<boolean>(false);
    // const [submit, setSubmit] = useState<boolean>(false);
    const { data, setData, errors, setError, reset, clearErrors } = useForm<WidrawEwalletType>();
    const resetModal = () => {
        setError("OwneName","")
        clearErrors()
        reset();
        setModal(false);
    };

    const handleSubmitCheck = () => {
        const ress = validation(data,auth.user.saldo)
        console.log(ress)
    }
    return (
        <div className="space-y-1 rounded-lg border border-[#3B387E] p-5 py-2.5">
            {modal && (
                <section className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-10 pt-5 shadow lg:w-1/2">
                        <Heading title="Form Claim E-Wallet" className="underline decoration-[#B9BDFF] decoration-4 underline-offset-8" />
                        <div className="mt-3 w-full">
                            <Label className="text-md font-semibold">Nominal Withdraw</Label>
                            <Input
                                className="mt-0.5 border-[#B9BDFF] focus-visible:border-0 focus-visible:ring-[#B9BDFF]"
                                placeholder="Nominal Withdraw"
                                value={data.nominal}
                                type="number"
                                onChange={(e) => setData('nominal', parseInt(e.target.value))}
                            />
                            <InputError message={errors.number} />
                        </div>
                        <div className="w-full">
                            <Label className="text-md font-semibold">Pilih Metode</Label>
                            <div className="flex gap-28 px-2.5">
                                <div className="flex items-center gap-1">
                                    <Input
                                        className="h-fit w-fit"
                                        checked={data.type === 'bank'}
                                        id="bank"
                                        type="radio"
                                        name="metode"
                                        onClick={() => setData('type', 'bank')}
                                    />
                                    <label htmlFor="bank">Transfer Bank</label>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Input
                                        checked={data.type === 'e-Wallet'}
                                        id="wallet"
                                        type="radio"
                                        name="metode"
                                        className="h-fit w-fit"
                                        onClick={() => setData('type', 'e-Wallet')}
                                    />
                                    <label htmlFor="wallet">E-Wallet</label>
                                </div>
                            </div>
                            <InputError message={errors.type} />
                            {data.type === 'bank' && (
                                <ModalItemBank data={data} setData={setData as unknown as SetData<WidrawEwalletType>} error={errors} />
                            )}
                            {data.type === 'e-Wallet' && <ModalItemEwallet />}
                            <div className="flex justify-end gap-2.5">
                                <Button
                                    className="cursor-pointer px-7 text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:text-white"
                                    onClick={resetModal}
                                >
                                    Batal
                                </Button>
                                <Button onClick={handleSubmitCheck} className="cursor-pointer bg-[#5961BE] px-7 text-white ring ring-[#5961BE] hover:bg-transparent hover:text-[#5961BE]">
                                    Claim
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Heading className="text-md font-semibold" title="E-Wallet" />
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold">{currencyConverter(auth.user.saldo)}</h1>
                <Button
                    onClick={() => setModal(true)}
                    className="min-w-1/3 cursor-pointer bg-[#3B387E] text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E]"
                >
                    Tarik Saldo
                </Button>
            </div>
            <HeadingSmall className="text-sm font-semibold" title="Saldo Anda" />
        </div>
    );
}
