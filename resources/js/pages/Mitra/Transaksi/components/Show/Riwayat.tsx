import { transactionType } from '@/types/transaction';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';

export default function Riwayat() {
    const { transaction } = usePage<{ transaction: transactionType }>().props;
    return (
        <section className="flex justify-between">
            <div className="flex-1/2 space-y-2.5">
                <p>Transaksi ID : {transaction.id}</p>
                <p>Waktu : {dateFormaterUtils(transaction.created_at)}</p>
                {transaction.type === 'Bahan Baku' && (
                    <p>
                        Kategori : <span className="text-[#FFA114] font-semibold">Pesanan Keluar</span>
                    </p>
                )}
            </div>
            <div className="flex-1/2">
                {transaction.type === 'Barang jadi' && (
                    <p>
                        Kategori : <span className="text-[#048730] font-semibold">Pesanan Masuk</span>
                    </p>
                )}
                {transaction.type === 'Bahan Baku' && transaction.resi && (
                    <div className="flex items-center justify-end gap-10">
                        <h1>No. Resi</h1>
                        <div
                            onClick={() => navigator.clipboard.writeText(transaction.resi as string)}
                            className="flex cursor-pointer items-center justify-end gap-1"
                        >
                            <p>: {transaction.resi}</p>
                            <svg
                                onClick={() => navigator.clipboard.writeText(transaction.resi as string)}
                                width="13"
                                height="15"
                                viewBox="0 0 13 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="3.39474"
                                    y="0.394737"
                                    width="8.68421"
                                    height="11.7366"
                                    rx="1.18421"
                                    stroke="#3B387E"
                                    stroke-width="0.789474"
                                />
                                <rect
                                    x="0.394737"
                                    y="2.39474"
                                    width="8.68421"
                                    height="11.7366"
                                    rx="1.18421"
                                    fill="white"
                                    stroke="#3B387E"
                                    stroke-width="0.789474"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
