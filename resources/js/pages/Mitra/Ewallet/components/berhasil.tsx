import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { props } from '../V_HalEwalletMitra';

export default function Berhasil() {
    const { mutations } = usePage<props>().props;
    const [buktiTransfer, setButktiTransfer] = useState<string>();
    const mutasiBerhasil = useMemo(() => mutations.filter((item) => item.finished && item.type === 'Penarikan'), [mutations]);

    return (
        <section className={cn('h-86 overflow-y-auto', mutasiBerhasil.length === 0 && 'flex items-center justify-center')}>
            {buktiTransfer && (
                <section
                    onClick={() => setButktiTransfer(undefined)}
                    className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50"
                >
                    <div className="flex flex-col items-center space-y-6 rounded-lg bg-white p-10 pt-5 shadow">
                        <Heading title="Bukti Transfer" className="underline decoration-[#B9BDFF] decoration-4 underline-offset-8" />
                        <img
                            className="aspect-auto max-h-[60vh] max-w-2/3 rounded-lg ring-[1.5px] ring-[#3B387E] lg:max-w-max"
                            src={buktiTransfer}
                            alt=""
                        />
                    </div>
                </section>
            )}
            {mutasiBerhasil.length > 0 ? (
                mutasiBerhasil.map((row) => (
                    <div key={row.id} className="flex items-center justify-between border-b-2 border-[#D9D9D9] p-5">
                        <div>
                            <Heading disableMb title="Pencairan Dana" className="text-md font-semibold" />
                            <p className="text-xs">{dateFormaterUtils(row.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Heading className="text-md" title={currencyConverter(row.nominal)} />
                            <Button
                                className="h-fit min-w-24 cursor-pointer rounded-sm bg-[#5961BE] py-1.5 text-xs text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                onClick={() => setButktiTransfer(row.bukti)}
                            >
                                Lihat
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="mx-auto my-auto w-fit">Data riwayat pencairan dana tidak tersedia</h1>
            )}
        </section>
    );
}
