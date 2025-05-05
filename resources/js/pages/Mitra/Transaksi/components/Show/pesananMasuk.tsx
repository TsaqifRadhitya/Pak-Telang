import { transactionType } from '@/types/transaction';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';

export default function PesananMasuk() {
    const { transaction } = usePage<{ transaction: transactionType }>().props;

    return (
        <section className="flex justify-between">
            <div className="space-y-2.5">
                <p>Transaksi ID : {transaction.id}</p>
                <p>Waktu : {dateFormaterUtils(transaction.created_at)}</p>
            </div>
            <div className="text-right">
                <p>Status : <span className='text-[#FFA114] font-semibold'>{transaction.status}</span></p>
            </div>
        </section>
    );
}
