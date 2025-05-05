import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { props } from '..';
import Heading from '../../../../components/heading';

export default function Pending() {
    const { mutations } = usePage<props>().props;
    return (
        <section className="max-h-86 overflow-y-auto">
            {mutations
                .filter((item) => !item.finished && item.type === 'Penarikan')
                .map((row) => (
                    <div className="flex items-center justify-between border-b-2 border-[#D9D9D9] p-5">
                        <div>
                            <Heading disableMb title="Pencairan Dana" className="text-md font-semibold" />
                            <p className="text-xs">{dateFormaterUtils(row.created_at)}</p>
                        </div>
                        <Heading className="text-md" title={currencyConverter(row.nominal)} />
                    </div>
                ))}
        </section>
    );
}
