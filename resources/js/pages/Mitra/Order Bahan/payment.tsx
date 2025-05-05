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
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Order Bahan</h1>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 lg:px-10">
                    <div className='space-y-10'>
                        <div className="flex">
                            <p className="flex-1/2">
                                {' '}
                                Alamat : {transaction.address?.address}, {transaction.address?.districtName}, {transaction.address?.cityName},{' '}
                                {transaction.address?.province}, {transaction.address?.postalCode}
                            </p>
                            <p className="flex-1/2 text-right">Metode Pengiriman : {transaction.metodePengiriman}</p>
                        </div>
                        <table className="p w-full">
                            <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                <tr className="grid w-full grid-cols-4 text-left">
                                    <th className="text-center">Nama Produk</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Harga</th>
                                    <th className="text-center">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody className='block max-h-64 overflow-y-auto'>
                                {transaction.detail_transaksis.map((item) => (
                                    <tr
                                        key={item.productId}
                                        className="grid w-full grid-cols-4 items-center border-b-[1.8px] border-[#D9D9D9] px-5 py-7 text-center"
                                    >
                                        <td>{item.product?.productName}</td>
                                        <td>{item.amount}</td>
                                        <td>{currencyConverter(item.subTotal / item.amount)}</td>
                                        <td>{currencyConverter(item.subTotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-5 font-semibold">
                        <div className="flex justify-between px-2.5">
                            <p>Subtotal</p>
                            <p>{currencyConverter(transaction.Total)}</p>
                        </div>
                        <div className="flex justify-between px-2.5">
                            <p>Ongkir</p>
                            <p>{currencyConverter(transaction.ongkir ?? 0)}</p>
                        </div>
                        <div className="flex justify-between border-t-2 border-[#D9D9D9] px-2.5 pt-5 text-xl font-bold">
                            <p>Total</p>
                            <p>{currencyConverter(transaction.Total + (transaction.ongkir ?? 0))}</p>
                        </div>
                        <div className="flex justify-end pt-2.5">
                            <Button
                                onClick={handlePayment}
                                className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
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
