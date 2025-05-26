import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { addressFormater } from '@/utils/addressFormater';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dipesan() {
    const { transaction } = usePage<{ transaction: transactionType }>().props;
    const [copied, setCopied] = useState(false);
    return (
        <section className="flex flex-col justify-between lg:flex-row">
            <div className="space-y-2.5">
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Transaksi ID</span> : {transaction.displayId}
                </p>
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Nama</span> : {transaction.user?.name}
                </p>
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">No Hp</span> : {transaction.user?.phonenumber}
                </p>
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Waktu</span> : {dateFormaterUtils(transaction.created_at)}
                </p>
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Status</span> : <span className="font-semibold text-[#048730]">{transaction.status}</span>
                </p>
                <p className="text-xs lg:text-base">
                    <span className="font-semibold">Alamat</span> : {addressFormater(transaction.address as addressType)}
                </p>
            </div>
            <div className="text-right text-xs lg:text-base">
                <div className="relative flex items-center gap-10 lg:justify-end">
                    <h1 className="text-xs font-semibold lg:text-base">No. Resi</h1>
                    <div className="relative flex items-center justify-end gap-1">
                        <p className="text-xs lg:text-base">: {transaction.resi || '-'}</p>
                        {transaction.resi && (
                            <svg
                                onClick={() => {
                                    navigator.clipboard.writeText(transaction.resi as string);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 1000); // 2 detik tooltip
                                }}
                                width="13"
                                className="cursor-pointer"
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
                                    strokeWidth="0.789474"
                                />
                                <rect
                                    x="0.394737"
                                    y="2.39474"
                                    width="8.68421"
                                    height="11.7366"
                                    rx="1.18421"
                                    fill="white"
                                    stroke="#3B387E"
                                    strokeWidth="0.789474"
                                />
                            </svg>
                        )}

                        {copied && (
                            <span className="absolute -top-7 right-0 rounded bg-[#3B387E] px-2 py-1 text-xs whitespace-nowrap text-white shadow">
                                Disalin!
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
