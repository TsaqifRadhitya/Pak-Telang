import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { addressFormater } from '@/utils/addressFormater';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';

export default function PesananMasuk() {
    const { transaction } = usePage<{ transaction: transactionType }>().props;

    return (
        <section className="flex justify-between">
            <div className="flex-1/2 space-y-2.5">
                <p>
                    <span className="font-semibold">Transaksi ID</span> : {transaction.displayId}
                </p>
                <p>
                    <span className="font-semibold">Waktu</span> : {dateFormaterUtils(transaction.created_at)}
                </p>
            </div>
            <div className="flex-1/2">
                <p>
                    <span className="font-semibold">Alamat</span> : {addressFormater(transaction.address as addressType)}
                </p>
            </div>
        </section>
    );
}
