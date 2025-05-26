import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { addressFormater } from '@/utils/addressFormater';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';

export default function Riwayat({ role = 'Mitra' }: { role: 'Admin' | 'Mitra' }) {
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
                {transaction.type === 'Bahan Baku' && role === 'Mitra' && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">Kategori</span> : <span className="font-semibold text-[#FFA114]">Pesanan Keluar</span>
                    </p>
                )}
                {transaction.type === 'Bahan Baku' && transaction.resi && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">Alamat</span> : {addressFormater(transaction.address as addressType)}
                    </p>
                )}
            </div>
            <div className="flex-1/2">
                {transaction.type === 'Barang jadi' && role === 'Mitra' && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">Kategori</span> : <span className="font-semibold text-[#048730]">Pesanan Masuk</span>
                    </p>
                )}
                {transaction.type === 'Barang jadi' && (
                    <p className="text-xs lg:text-base">
                        <span className="font-semibold">Alamat</span> : {addressFormater(transaction.address as addressType)}
                    </p>
                )}
                {transaction.type === 'Bahan Baku' && transaction.resi && (
                    <div className="flex items-center justify-end gap-10">
                        <h1 className="text-xs font-semibold lg:text-base">No. Resi</h1>
                        <div
                            onClick={() => navigator.clipboard.writeText(transaction.resi as string)}
                            className="flex cursor-pointer items-center justify-end gap-1"
                        >
                            <p className="text-xs lg:text-base">: {transaction.resi}</p>
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
