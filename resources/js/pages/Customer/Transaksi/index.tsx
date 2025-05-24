import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { router } from '@inertiajs/react';

export default function TransactionIndex({ transactions }: { transactions: transactionType[] }) {
    return (
        <CustomerPageLayout page="Riwayat">
            <section className="flex flex-col gap-5 bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] md:px-10 lg:min-h-screen">
                <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                    <h1 className="font-bold">Riwayat Trasaksi</h1>
                </div>
                <div className="w-full flex-1 overflow-x-auto rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 pb-0 shadow lg:px-16">
                    <table className="w-full">
                        <thead className="flex w-full justify-between px-5 pb-5">
                            <tr className="grid w-full grid-cols-6 text-center text-lg font-semibold">
                                <td>Transaksi ID</td>
                                <td>Items</td>
                                <td>Dibuat Pada</td>
                                <td>Status</td>
                                <td>Sub-total</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className='block overflow-y-auto p-1 max-h-[60vh]'>
                            {transactions.map((item) => (
                                <tr
                                    key={item.id}
                                    className="grid break-words w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center"
                                >
                                    <td>{item.id}</td>
                                    <td>
                                        {item.detail_transaksis.map((detail) => {
                                            return (
                                                <h1>
                                                    {detail.product?.productName} : <span>{detail.amount}</span>
                                                </h1>
                                            );
                                        })}
                                    </td>
                                    <td>{dateFormaterUtils(item.created_at)}</td>
                                    <td className={item.status === "Selesai" ? "text-[#048730] font-semibold" : "text-[#FFA114] font-semibold"}>{item.status}</td>
                                    <td>{currencyConverter(item.ongkir ? item.Total +  item.ongkir : item.Total)}</td>
                                    <td>
                                        <Button
                                            onClick={() => router.get(route('customer.transaksi.show', { id: item.id }))}
                                            className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                        >
                                            Lihat
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
