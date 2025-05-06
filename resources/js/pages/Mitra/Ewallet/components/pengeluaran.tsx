import Heading from '@/components/heading';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { props } from '..';

export default function Pengeluaran() {
    const { mutations } = usePage<props>().props;
    console.log(mutations)
    return (
        <section className="max-h-[65vh] overflow-y-auto">
            {mutations
                .filter((item) => item.type === 'Pengeluaran')
                .map((row) => (
                    <div key={row.id} className="flex items-center justify-between border-b-2 border-[#D9D9D9] p-5">
                        <div>
                            <Heading disableMb title={row.transaksiId} className="text-md font-semibold" />
                            <p className="text-xs">{dateFormaterUtils(row.created_at)}</p>
                        </div>
                        <Heading className="text-md" title={currencyConverter(row.nominal)} />
                    </div>
                ))}
        </section>
    );
}
