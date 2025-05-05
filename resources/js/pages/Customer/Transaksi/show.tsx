import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import LandingPageLayout from '@/layouts/landingPageLayout';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Status, { statusComponent } from './component/status';

export default function TransaksiShow({ transactions }: { transactions: transactionType }) {
    const handlePayment = () => {
        const script = document.createElement('script');
        const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.src = snapSrcUrl;
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_ID);
        script.async = true;

        script.onload = () => {
            if (window.snap) {
                window.snap.pay(transactions.snapToken, {
                    onClose: () => script.remove(),
                    onSuccess: () => router.get(route('customer.transaksi.show', { id: transactions.id })),
                });
            } else {
                console.error('Midtrans snap not loaded properly');
            }
        };

        document.body.appendChild(script);
    };

    const handleStatusToko = () => {
        router.patch(
            route('customer.transaksi.update', {
                id: transactions.id,
            }),
            {},
            {
                onStart: () => setSubmited(true),
                onFinish: () => {
                    setSubmited(false);
                },
            },
        );
        setOpen(false);
    };
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isSubmited, setSubmited] = useState<boolean>(false);
    return (
        <>
            {isOpen && (
                <section id="alertDelete" className="z-[999] fixed h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full flex-1/2 items-center gap-x-4">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                        </div>

                        <img className="aspect-square max-w-32" src={window.location.origin + '/Asset/Image/image.png'} alt="" />
                        <Heading
                            title="Apakah Anda yakin telah menerima pesanan Anda?"
                            className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                        />

                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-[#8A7300] text-white ring ring-[#8A7300] hover:bg-transparent hover:font-semibold hover:text-[#8A7300]"
                                onClick={handleStatusToko}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            <LandingPageLayout>
                <section className="flex flex-col bg-[#EBEFFF] p-5 py-20 text-[#3B387E] md:px-10 lg:min-h-screen">
                    <Heading title="Transaksi" disableMb className="text-3xl" />
                    <div className="p1 mt-5 flex flex-1 flex-col-reverse gap-10 px-5 lg:flex-row">
                        <div className="flex flex-3/5 flex-col justify-between gap-20 rounded-xl bg-white p-5 shadow-sm">
                            <table className="w-full">
                                <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                    <tr className="grid w-full grid-cols-4 text-left">
                                        <th className="text-center">Nama Produk</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Harga</th>
                                        <th className="text-center">Sub-total</th>
                                    </tr>
                                </thead>
                                <tbody className="block max-h-64 overflow-y-auto">
                                    {transactions.detail_transaksis.map((item) => (
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
                            <div className="space-y-5 font-semibold">
                                <div className="flex justify-between px-2.5">
                                    <p>Subtotal</p>
                                    <p>{currencyConverter(transactions.Total)}</p>
                                </div>
                                <div className="flex justify-between px-2.5">
                                    <p>Ongkir</p>
                                    <p className={transactions.ongkir ? '' : 'text-[#FFA114]'}>
                                        {transactions.ongkir ? currencyConverter(transactions.ongkir) : 'Pending'}
                                    </p>
                                </div>
                                <div className="flex justify-between border-t-2 border-[#D9D9D9] px-2.5 pt-5 text-xl font-bold">
                                    <p>Total</p>
                                    <p className={transactions.ongkir ? '' : 'text-[#FFA114]'}>
                                        {currencyConverter(transactions.Total + (transactions.ongkir ?? 0))}
                                    </p>
                                </div>
                                {transactions.status === 'Menunggu Pembayaran' && (
                                    <div className="flex justify-end pt-2.5">
                                        <Button
                                            onClick={handlePayment}
                                            className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                        >
                                            Bayar Sekarang
                                        </Button>
                                    </div>
                                )}
                                {transactions.status === 'Sedang DiProses' && (
                                    <div className="flex justify-end pt-2.5">
                                        <Button
                                            disabled={isSubmited}
                                            onClick={() => setOpen(true)}
                                            className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                        >
                                            Selesaikan
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Status params={transactions.status as statusComponent} />
                    </div>
                </section>
            </LandingPageLayout>
        </>
    );
}
