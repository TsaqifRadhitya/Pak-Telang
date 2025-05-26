import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { addressFormater } from '@/utils/addressFormater';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';

export default function PesananDiterima() {
    const { transaction } = usePage<{ transaction: transactionType }>().props;

    return (
        <section className="flex flex-col justify-between lg:flex-row">
            <div className="flex-1/2 space-y-2.5">
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Transaksi ID</span> : {transaction.displayId}
                </p>
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Waktu</span> : {dateFormaterUtils(transaction.created_at)}
                </p>
                {transaction.type === 'Bahan Baku' && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">No Hp</span> : {transaction.user?.phonenumber}
                    </p>
                )}
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Alamat</span> : {addressFormater(transaction.address as addressType)}
                </p>
            </div>
            <div className="flex-1/2">
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Nama {transaction.type === 'Barang jadi' ? 'Cust' : 'Mitra'}</span> : {transaction.user?.name}
                </p>
                {transaction.type === 'Barang jadi' && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">No Hp</span> : {transaction.user?.phonenumber}
                    </p>
                )}
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Status</span> : <span className="font-semibold text-[#FFA114]">{transaction.status}</span>
                </p>
                {transaction.type === 'Bahan Baku' && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">No Resi</span> : {transaction.resi ? transaction.resi : '-'}
                    </p>
                )}
            </div>
        </section>
    );
}
