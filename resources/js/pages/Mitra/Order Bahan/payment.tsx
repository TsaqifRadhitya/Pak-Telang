import Countdown from '@/components/countDown';
import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';

export default function OrderBahanIndex({ transaction }: { transaction: transactionType }) {
    const handlePayment = () => {
        const script = document.createElement('script');
        const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.src = snapSrcUrl;
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_ID);
        script.async = true;

        script.onload = () => {
            if (window.snap) {
                window.snap.pay(transaction.snapToken, {
                    onClose: () => script.remove(),
                    onSuccess: () => router.get(route('mitra.transaksi.show', { id: transaction.id })),
                });
            } else {
                console.error('Midtrans snap not loaded properly');
            }
        };

        document.body.appendChild(script);
    };
    return (
        <MitraPageLayout page="Order Bahan">
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center justify-between border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-lg font-semibold lg:text-xl">Order Bahan</h1>
                    <Countdown updatedAt={transaction.updated_at} durationMinutes={720} className="lg:text-lg" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 lg:px-10">
                    <div className="space-y-10">
                        <div className="lg:flex">
                            <p className="flex-1/2 text-sm">
                                <span className="font-semibold">Alamat</span> : {transaction.address?.address}, {transaction.address?.districtName},{' '}
                                {transaction.address?.cityName}, {transaction.address?.province}, {transaction.address?.postalCode}
                            </p>
                            <p className="flex-1/2 lg:text-right">
                                <span className="font-semibold">Metode Pengiriman</span> : {transaction.metodePengiriman}
                            </p>
                        </div>
                        <table className="p w-full">
                            <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                <tr className="grid w-full grid-cols-4 text-left">
                                    <th className="text-center text-sm lg:text-base">Nama Produk</th>
                                    <th className="text-center text-sm lg:text-base">Quantity</th>
                                    <th className="text-center text-sm lg:text-base">Harga</th>
                                    <th className="text-center text-sm lg:text-base">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody className="block max-h-64 overflow-y-auto">
                                {transaction.detail_transaksis.map((item) => (
                                    <tr
                                        key={item.productId}
                                        className="grid w-full grid-cols-4 items-center border-b-[1.8px] border-[#D9D9D9] px-5 py-7 text-center"
                                    >
                                        <td className="text-xs lg:text-sm">{item.product?.productName}</td>
                                        <td className="text-xs lg:text-sm">{item.amount}</td>
                                        <td className="text-xs lg:text-sm">{currencyConverter(item.subTotal / item.amount)}</td>
                                        <td className="text-xs lg:text-sm">{currencyConverter(item.subTotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 space-y-5 font-semibold lg:mt-0">
                        <div className="flex justify-between px-2.5">
                            <p className="text-sm lg:text-lg">Subtotal</p>
                            <p className="text-sm lg:text-lg">{currencyConverter(transaction.Total)}</p>
                        </div>
                        <div className="flex justify-between px-2.5">
                            <p className="text-sm lg:text-lg">Ongkir</p>
                            <p className="text-sm lg:text-lg">{currencyConverter(transaction.ongkir ?? 0)}</p>
                        </div>
                        <div className="flex justify-between border-t-2 border-[#D9D9D9] px-2.5 pt-5 text-xl font-bold">
                            <p className="text-sm lg:text-xl">Total</p>
                            <p className="text-sm lg:text-xl">{currencyConverter(transaction.Total + (transaction.ongkir ?? 0))}</p>
                        </div>
                        <div className="flex justify-end pt-2.5">
                            <Button
                                onClick={handlePayment}
                                className="w-full cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:max-w-56"
                            >
                                Bayar Sekarang
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </MitraPageLayout>
    );
}
