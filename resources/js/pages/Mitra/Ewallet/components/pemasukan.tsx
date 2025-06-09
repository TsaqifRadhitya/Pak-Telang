import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { props } from '../V_HalEwalletMitra';

export default function Pemasukan() {
    const { mutations } = usePage<props>().props;
    const pemasukan = useMemo(() => mutations.filter((item) => item.type === 'Pemasukan'), [mutations]);
    return (
        <section className={cn('h-[65vh] overflow-y-auto', pemasukan.length === 0 && 'flex items-center justify-center')}>
            {pemasukan.length > 0 ? (
                pemasukan.map((row) => (
                    <div key={row.id} className="flex items-center justify-between border-b-2 border-[#D9D9D9] p-5">
                        <div>
                            <Heading disableMb title={row.transaksiId} className="text-md font-semibold" />
                            <p className="text-xs">{dateFormaterUtils(row.created_at)}</p>
                        </div>
                        <Heading className="text-md" title={currencyConverter(row.nominal)} />
                    </div>
                ))
            ) : (
                <h1 className="mx-auto my-auto w-fit">Data pemasukan e-wallet tidak tersedia</h1>
            )}
        </section>
    );
}
