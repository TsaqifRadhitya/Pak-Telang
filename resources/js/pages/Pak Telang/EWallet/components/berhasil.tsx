import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { props } from '..';

export default function Berhasil() {
    const { mutations } = usePage<props>().props;
    const [buktiTransfer, setButktiTransfer] = useState<string>();

    return (
        <>
            {buktiTransfer && (
                <section
                    onClick={() => setButktiTransfer(undefined)}
                    className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50"
                >
                    <div className="flex flex-col items-center space-y-6 rounded-lg bg-white p-10 pt-5 shadow">
                        <Heading title="Bukti Transfer" className="underline decoration-[#B9BDFF] decoration-4 underline-offset-8" />
                        <img
                            className="aspect-auto max-h-[60vh] rounded-lg ring-[1.5px] ring-[#3B387E]"
                            src={buktiTransfer}
                            alt=""
                        />
                    </div>
                </section>
            )}
            {mutations
                .filter((filter) => filter.finished)
                .map((mutation) => (
                    <section className="flex justify-between border-b-2 border-[#D9D9D9] p-5 px-7">
                        <div>
                            <h1 className="font-semibold">{mutation.user?.name}</h1>
                            <h1 className="text-xs">
                                {mutation.payment?.type === 'bank' ? 'Transfer Bank' : 'Transfer E-Wallet'} - {mutation.payment?.provider} -{' '}
                                {mutation.payment?.number}
                            </h1>
                        </div>
                        <div className="flex items-center gap-10">
                            <div>
                                <p className="text-xs">{dateFormaterUtils(mutation.created_at)}</p>
                                <p className="text-right font-semibold">{currencyConverter(mutation.nominal)}</p>
                            </div>
                            <Button
                                onClick={() => setButktiTransfer(mutation.bukti)}
                                className="h-fit w-20 cursor-pointer rounded-sm bg-[#5961BE] py-1 text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Lihat
                            </Button>
                        </div>
                    </section>
                ))}
        </>
    );
}
