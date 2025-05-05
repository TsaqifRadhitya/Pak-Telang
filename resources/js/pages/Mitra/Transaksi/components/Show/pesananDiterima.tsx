import { transactionType } from '@/types/transaction';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';

export default function PesananDiterima() {
    const { transaction } = usePage<{ transaction: transactionType }>().props;

    return (
        <section className="flex justify-between">
            <div className="space-y-2.5 flex-1/2">
                <p>Transaksi ID : {transaction.id}</p>
                <p>Waktu : {dateFormaterUtils(transaction.created_at)}</p>
            </div>
            <div className='flex-1/2'>
                <p>
                    Status : <span className="font-semibold text-[#FFA114]">{transaction.status}</span>
                </p>
            </div>
        </section>
    );
}
