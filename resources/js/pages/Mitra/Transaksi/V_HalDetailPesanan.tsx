import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { distaceCalculationService } from '@/services/distanceCalculation';
import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import ContainerProvider, { sectionType } from './components/Index/containerProvider';
import Dipesan from './components/Show/Dipesan';
import PesananDiterima from './components/Show/pesananDiterima';
import PesananMasuk from './components/Show/pesananMasuk';
import Riwayat from './components/Show/Riwayat';

export default function TransactionShow({
    section,
    transaction,
    providerAddress,
}: {
    section: sectionType;
    transaction: transactionType;
    providerAddress: addressType;
}) {
    const [submit, setSubmit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const handleSubmit = async () => {
        if (section === 'Dipesan') {
            const routeName = 'mitra.order bahan.update';
            setSubmit(true);
            setModal(false);
            router.patch(route(routeName, { id: transaction.id }));
        } else {
            const routeName = 'mitra.transaksi.update';
            if (!transaction.providerId) {
                const price = await distaceCalculationService({ from: transaction.address as addressType, to: providerAddress });
                setSubmit(true);
                setModal(false);
                router.patch(route(routeName, { id: transaction.id }), { ongkir: price });
                return;
            }
            setSubmit(true);
            setModal(false);
            router.patch(route(routeName, { id: transaction.id }));
            return;
        }
    };
    return (
        <MitraPageLayout page="Transaksi">
            <ContainerProvider section={section}>
                {modal && (
                    <section id="alertDelete" className="fixed top-0 left-0 z-[999] h-full w-full bg-black/50">
                        <article className="absolute top-1/2 left-1/2 flex w-full max-w-sm lg:max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                            <div className="flex w-full flex-1/2 items-center gap-x-4">
                                <img
                                    src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                    alt=""
                                />
                                <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                            </div>
                            <DotLottieReact
                                loop
                                className="w-1/2"
                                src="https://lottie.host/0d4d6ac7-6c39-410c-beae-8b835e7e6790/PrUVLgMZXE.lottie"
                                autoplay
                            />
                            <Heading
                                title={
                                    section === 'Dipesan'
                                        ? 'Apakah Anda yakin mau menyelesaikan transaksi'
                                        : section === 'Pesanan Diterima' && transaction.providerId
                                          ? 'Apakah Anda Yakin Mau Mengubah Status Pesanan ?'
                                          : 'Apakah Anda Yakin Mau Mengambil Pesanan ?'
                                }
                                className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                            />

                            <div className="flex w-2/3 lg:w-1/2 justify-center gap-x-2.5">
                                <Button
                                    className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                    onClick={() => setModal(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="w-1/2 cursor-pointer bg-[#8A7300] text-white ring ring-[#8A7300] hover:bg-transparent hover:font-semibold hover:text-[#8A7300]"
                                    onClick={handleSubmit}
                                >
                                    Yakin
                                </Button>
                            </div>
                        </article>
                    </section>
                )}
                <div className="space-y-10">
                    {section === 'Dipesan' && <Dipesan />}
                    {section === 'Pesanan Diterima' && <PesananDiterima />}
                    {section === 'Pesanan Masuk' && <PesananMasuk />}
                    {section === 'Riwayat' && <Riwayat role="Mitra" />}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px]">
                            <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                <tr className="grid w-full grid-cols-4 text-left">
                                    <th className="text-center text-sm lg:text-base">Nama Produk</th>
                                    <th className="text-center text-sm lg:text-base">Quantity</th>
                                    <th className="text-center text-sm lg:text-base">Harga</th>
                                    <th className="text-center text-sm lg:text-base">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody className="block max-h-56 overflow-y-auto">
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
                </div>
                <div className="mt-10 space-y-5 font-semibold">
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
                        {section === 'Dipesan' && transaction.status === 'Sedang Dikirim' && (
                            <Button
                                disabled={submit}
                                onClick={() => setModal(true)}
                                className="w-full lg:max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Selesaikan
                            </Button>
                        )}

                        {section === 'Pesanan Diterima' && transaction.status === 'Sedang Diproses' && (
                            <Button
                                disabled={submit}
                                onClick={() => setModal(true)}
                                className="w-full lg:max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Ubah Status
                            </Button>
                        )}

                        {section === 'Pesanan Masuk' && (
                            <Button
                                disabled={!!transaction.providerId || submit}
                                onClick={() => setModal(true)}
                                className="w-full lg:max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Konfirmasi Pesanan
                            </Button>
                        )}
                    </div>
                </div>
            </ContainerProvider>
        </MitraPageLayout>
    );
}
