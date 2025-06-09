import HeadingSmall from '@/components/heading-small';
import SinglePaginate from '@/components/singlePaginate';
import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { cn } from '@/lib/utils';
import { paginateType } from '@/types/paginate';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { router } from '@inertiajs/react';

type transactionPaginateType = {
    data: transactionType[];
} & paginateType;

export default function TransactionIndex({ transactions }: { transactions: transactionPaginateType }) {
    return (
        <CustomerPageLayout page="Riwayat">
            <section className="flex min-h-screen flex-col gap-5 bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] md:px-10">
                <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                    <h1 className="lg:text-md text-sm font-bold">Riwayat Trasaksi</h1>
                </div>
                <div className="flex w-full flex-1 flex-col rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 shadow lg:px-16">
                    <section className="flex-1 overflow-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="flex w-full justify-between px-5 pb-5">
                                <tr className="grid w-full grid-cols-6 text-center text-lg font-semibold">
                                    <td className="lg:text-md text-sm">Transaksi ID</td>
                                    <td className="lg:text-md text-sm">Items</td>
                                    <td className="lg:text-md text-sm">Dibuat Pada</td>
                                    <td className="lg:text-md text-sm">Status</td>
                                    <td className="lg:text-md text-sm">Sub-total</td>
                                    <td className="lg:text-md text-sm">Action</td>
                                </tr>
                            </thead>
                            <tbody className="block max-h-[60vh] overflow-y-auto p-1">
                                {transactions.data.map((item) => (
                                    <tr
                                        key={item.displayId}
                                        className="grid w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center break-words"
                                    >
                                        <td className="lg:text-md text-xs">{item.displayId}</td>
                                        <td className="lg:text-md text-xs">
                                            {item.detail_transaksis.map((detail, index) => {
                                                return (
                                                    <h1 key={index}>
                                                        {detail.product?.productName} : <span>{detail.amount}</span>
                                                    </h1>
                                                );
                                            })}
                                        </td>
                                        <td className="lg:text-md text-xs">{dateFormaterUtils(item.created_at)}</td>
                                        <td
                                            className={cn(
                                                'lg:text-md text-xs',
                                                item.status === 'Selesai' ? 'font-semibold text-[#048730]' : 'font-semibold text-[#FFA114]',
                                            )}
                                        >
                                            {item.status}
                                        </td>
                                        <td className="lg:text-md text-xs">
                                            {currencyConverter(item.ongkir ? item.Total + item.ongkir : item.Total)}
                                        </td>
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
                            {transactions.data.length === 0 && (
                                <HeadingSmall title="Data riwayat transaksi tidak tersedia" className="text-center text-xs lg:text-xl" />
                            )}
                        </table>
                        <SinglePaginate data={transactions} value={'transactions'} />
                    </section>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
