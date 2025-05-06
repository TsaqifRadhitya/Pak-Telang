import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WidrawEwalletType } from '@/types/wdEwallet';
import { currencyConverter } from '@/utils/currencyConverter';
import { useForm, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
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
        ownerName: z.string({ message: 'Harap memasukkan nama pemilik ' + data.type }).min(1, 'Harap memasukkan nama pemilik ' + data.type),
        type: z.enum(['bank', 'e-Wallet'], { message: 'Harap memilih metode penarikan' }),
        provider: z.string({ message: `Harap memilih ${data.type}` }).min(1, `Harap memilih ${data.type}`),
        number: z
            .string({ message: `harap mengisi nomor ${data.type}` })
            .min(data.type === 'bank' ? 10 : 12, `harap mengisi nomor ${data.type} dengan benar`),
    });

    const validition = formValidition.safeParse(data);
    return validition;
};

export default function Saldo() {
    const { auth } = usePage<props>().props;
    const [modal, setModal] = useState<boolean>(false);
    const [konfirmasi, setKonfirmasi] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    const { data, setData, post, errors, setError, reset, clearErrors } = useForm<WidrawEwalletType>();

    const resetModal = () => {
        clearErrors();
        reset();
        setModal(false);
    };

    useEffect(() => {
        if (konfirmasi) {
            setModal(false);
        }
    }, [konfirmasi]);

    const handleSubmitCheck = () => {
        const ress = validation(data, auth.user.saldo);
        clearErrors();
        if (!ress.success) {
            const err = ress.error.format();
            setError('ownerName', err.ownerName?._errors[0] as string);
            setError('nominal', err.nominal?._errors[0] as string);
            setError('number', err.number?._errors[0] as string);
            setError('provider', err.provider?._errors[0] as string);
            setError('type', err.type?._errors[0] as string);
            return;
        }
        setKonfirmasi(true);
    };

    const handleSubmit = () => {
        post(route('mitra.ewallet.store'), {
            onStart: () => {
                setSubmit(true);
                setKonfirmasi(false)
                resetModal();
            },
            onFinish: () => setSubmit(false),
        });
    };

    useEffect(() => {
        // reset('ownerName', 'number', 'provider');
        clearErrors('ownerName', 'number', 'provider');
    }, [data.type]);
    return (
        <div className="space-y-1 rounded-lg border border-[#3B387E] p-5 py-2.5">
            {konfirmasi && (
                <section id="alertDelete" className="fixed top-0 left-0 z-[999] h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full flex-1/2 items-center gap-x-4">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                        </div>
                        <DotLottieReact
                            loop
                            className="w-1/2"
                            src="https://lottie.host/0d4d6ac7-6c39-410c-beae-8b835e7e6790/PrUVLgMZXE.lottie"
                            autoplay
                        />
                        <Heading
                            title="Apakah Anda yakin melakukan penarikan saldo?"
                            className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                        />

                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={() => {
                                    setModal(true); setKonfirmasi(false);
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-[#8A7300] text-white ring ring-[#8A7300] hover:bg-transparent hover:font-semibold hover:text-[#8A7300]"
                                onClick={handleSubmit}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            {modal && (
                <section className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-10 pt-5 shadow lg:w-1/2">
                        <Heading title="Form Claim E-Wallet" className="underline decoration-[#B9BDFF] decoration-4 underline-offset-8" />
                        <div className="mt-3 w-full">
                            <Label className="text-md font-semibold">Nominal Withdraw</Label>
                            <Input
                                className="mt-0.5 border-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:border-0 focus-visible:ring-[#B9BDFF]"
                                placeholder="Nominal Withdraw"
                                value={data.nominal ?? 0}
                                type="number"
                                onChange={(e) => setData('nominal', parseInt(e.target.value))}
                            />
                            <InputError message={errors.nominal} />
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
                                        onChange={() => setData('type', 'bank')}
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
                                        onChange={() => setData('type', 'e-Wallet')}
                                    />
                                    <label htmlFor="wallet">E-Wallet</label>
                                </div>
                            </div>
                            <InputError message={errors.type} />
                            {data.type === 'bank' && (
                                <ModalItemBank data={data} setData={setData as unknown as SetData<WidrawEwalletType>} error={errors} />
                            )}
                            {data.type === 'e-Wallet' && (
                                <ModalItemEwallet error={errors} setData={setData as unknown as SetData<WidrawEwalletType>} data={data} />
                            )}
                            <div className="mt-2.5 flex justify-end gap-2.5">
                                <Button
                                    className="cursor-pointer px-7 text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:text-white"
                                    onClick={resetModal}
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={handleSubmitCheck}
                                    className="cursor-pointer bg-[#5961BE] px-7 text-white ring ring-[#5961BE] hover:bg-transparent hover:text-[#5961BE]"
                                >
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
                    disabled={submit}
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
