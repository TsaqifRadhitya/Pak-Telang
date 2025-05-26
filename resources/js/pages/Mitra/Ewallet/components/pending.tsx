import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { props } from '..';
import Heading from '../../../../components/heading';

export default function Pending() {
    const { mutations } = usePage<props>().props;
    const mutasiPending = useMemo(() => mutations.filter((item) => !item.finished && item.type === 'Penarikan'), [mutations]);
    return (
        <section className={cn('h-86 overflow-y-auto', mutasiPending.length === 0 && 'flex items-center justify-center')}>
            {mutasiPending.length > 0 ? (
                mutasiPending.map((row) => (
                    <div key={row.id} className="flex items-center justify-between border-b-2 border-[#D9D9D9] p-5">
                        <div>
                            <Heading disableMb title="Pencairan Dana" className="text-md font-semibold" />
                            <p className="text-xs">{dateFormaterUtils(row.created_at)}</p>
                        </div>
                        <Heading className="text-md" title={currencyConverter(row.nominal)} />
                    </div>
                ))
            ) : (
                <h1 className="mx-auto my-auto w-fit">Data pending pencairan dana tidak tersedia</h1>
            )}
        </section>
    );
}
