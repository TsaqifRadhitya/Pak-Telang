import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { sectionType } from '@/pages/Mitra/Transaksi/components/Index/containerProvider';
import PesananDiterima from '@/pages/Mitra/Transaksi/components/Show/pesananDiterima';
import PesananMasuk from '@/pages/Mitra/Transaksi/components/Show/pesananMasuk';
import Riwayat from '@/pages/Mitra/Transaksi/components/Show/Riwayat';
import { distaceCalculationService } from '@/services/distanceCalculation';
import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import ContainerProvider from './components/containerProvider';

export default function TransactionShow({
    section,
    transaction,
    providerAddress,
}: {
    section: sectionType;
    transaction: transactionType;
    providerAddress: addressType;
}) {
    const [resi, setResi] = useState<string>();
    const [err, setErr] = useState<string>();
    const [submit, setSubmit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    useEffect(() => {
        if (!!resi?.length && err) {
            setErr(undefined);
        }
    }, [resi]);
    const handleSubmit = async () => {
        const routeName = 'admin.transaksi.update';
        if (transaction.type === 'Bahan Baku') {
            if (!resi?.length) {
                setErr('Harap mengisi nomor resi');
                return;
            }

            if (resi && resi.length < 10) {
                setErr('Harap memasukkan resi dengan benar');
                return;
            }
        }

        if (!transaction.providerId) {
            const price = await distaceCalculationService({ from: transaction.address as addressType, to: providerAddress });
            setSubmit(true);
            setModal(false);
            router.patch(route(routeName, { id: transaction.id }), { ongkir: price });
            return;
        }
        setSubmit(true);
        setModal(false);
        router.patch(route(routeName, { id: transaction.id, resi: resi }));
        return;
    };
    return (
        <AdminPageLayout page="Transaksi">
            <ContainerProvider section={section}>
                {modal && (
                    <section id="alertDelete" className="fixed top-0 left-0 z-[999] h-full w-full bg-black/50">
                        <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
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
                                    section === 'Pesanan Diterima' && transaction.providerId
                                        ? 'Apakah Anda Yakin Mau Mengubah Status Pesanan Menjadi Dikirim ?'
                                        : 'Apakah Anda Yakin Mau Mengambil Pesanan ?'
                                }
                                className={cn(
                                    'text-md line mx-auto w-2/3 text-center leading-5 font-medium text-[#8A7300]',
                                    transaction.type === 'Bahan Baku' && 'font-bold',
                                )}
                            />

                            {transaction.type === 'Bahan Baku' && (
                                <div className="w-full">
                                    <HeadingSmall title="No. Resi" className="text-lg font-semibold text-[#8A7300]" />
                                    <Input
                                        onChange={(e) => setResi(e.target.value)}
                                        value={resi ?? ''}
                                        type="number"
                                        placeholder="Stok Produk"
                                        className="border-0 text-[#8A7300] ring ring-[#8A7300] placeholder:text-[#8A7300]/50 focus-visible:ring-3 focus-visible:ring-[#8A7300]"
                                    />
                                    {err && <p className="text-sm text-red-500">{err}</p>}
                                </div>
                            )}

                            <div className={cn('flex w-1/2 justify-center gap-x-2.5', transaction.type === 'Bahan Baku' && 'ml-auto justify-end')}>
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
                    {section === 'Pesanan Diterima' && <PesananDiterima />}
                    {section === 'Pesanan Masuk' && <PesananMasuk />}
                    {section === 'Riwayat' && <Riwayat role="Admin" />}
                    <table className="p w-full">
                        <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                            <tr className="grid w-full grid-cols-4 text-left">
                                <th className="text-center">Nama Produk</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Harga</th>
                                <th className="text-center">Sub-total</th>
                            </tr>
                        </thead>
                        <tbody className="block max-h-56 overflow-y-auto">
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
                <div className="mt-10 space-y-5 font-semibold">
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
                        {section === 'Pesanan Diterima' && transaction.status === 'Sedang Diproses' && (
                            <Button
                                disabled={submit}
                                onClick={() => setModal(true)}
                                className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Ubah Status
                            </Button>
                        )}

                        {section === 'Pesanan Masuk' && (
                            <Button
                                disabled={!!transaction.providerId || submit}
                                onClick={() => setModal(true)}
                                className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Konfirmasi Pesanan
                            </Button>
                        )}
                    </div>
                </div>
            </ContainerProvider>
        </AdminPageLayout>
    );
}
