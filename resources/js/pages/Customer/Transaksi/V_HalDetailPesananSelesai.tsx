import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { addressFormater } from '@/utils/addressFormater';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';

export default function TransaksiShow({ transactions }: { transactions: transactionType }) {
    return (
        <CustomerPageLayout page="Riwayat">
            <section className="flex flex-col gap-5 bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] md:px-10 lg:min-h-screen">
                <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                    <h1 className="font-bold">Riwayat Trasaksi</h1>
                </div>
                <div className="w-full flex-1 space-y-10 overflow-x-auto rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 shadow lg:px-16">
                    <div className="space-y-2.5">
                        <div className="flex justify-between">
                            <p className="flex-1/2">
                                <span className="font-semibold">Transaksi ID</span> : {transactions.id}
                            </p>
                            <p className="flex-1/2">
                                <span className="font-semibold">Status</span> : {' '}
                                <span className="font-semibold text-[#048730]">{transactions.status}</span>
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="flex-1/2">
                                <span className="font-semibold">Waktu</span> : {dateFormaterUtils(transactions.created_at)}
                            </p>
                            <p className="flex-1/2">
                                <span className="font-semibold">Alamat</span> : {addressFormater(transactions.address as addressType)}
                            </p>
                        </div>
                    </div>
                    <table className="w-full">
                        <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-10 pb-2">
                            <tr className="grid w-full grid-cols-4 text-left">
                                <th>Nama Produk</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Harga</th>
                                <th className="text-end">Sub-total</th>
                            </tr>
                        </thead>
                        {<tbody className="block max-h-[60vh] overflow-y-auto p-1">
                            {transactions.detail_transaksis.map((item) => (
                                <tr
                                    key={item.productId}
                                    className="grid w-full grid-cols-4 items-center border-b-[1.8px] border-[#D9D9D9] px-10 py-7 text-center"
                                >
                                    <td className="text-start">{item.product?.productName}</td>
                                    <td>{item.amount}</td>
                                    <td>{currencyConverter(item.subTotal / item.amount)}</td>
                                    <td className="text-end">{currencyConverter(item.subTotal)}</td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                    <div className="space-y-5 font-semibold">
                        <div className="flex justify-between px-10">
                            <p>Subtotal</p>
                            <p>{currencyConverter(transactions.Total)}</p>
                        </div>
                        <div className="flex justify-between px-10">
                            <p>Ongkir</p>
                            <p>{currencyConverter(transactions.ongkir ?? 0)}</p>
                        </div>
                        <div className="flex justify-between border-t-2 border-[#D9D9D9] px-10 pt-5 text-xl font-bold">
                            <p>Total</p>
                            <p>{currencyConverter(transactions.Total + (transactions.ongkir ?? 0))}</p>
                        </div>
                    </div>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
