import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { distaceCalculationService } from '@/services/distanceCalculation';
import { addressType } from '@/types/address';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { stockChecker } from '@/utils/stockChecker';
import { Deferred, router, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useMemo, useState } from 'react';
import { props } from '../../V_HalPesanan';

export default function PesananMasukComponent({ role }: { role: 'admin' | 'mitra' }) {
    const { pesananMasuk, stock, providerAddress } = usePage<props>().props;
    const [selectedTransaction, setSelectedTransaction] = useState<transactionType>();
    const [isOpen, setOpen] = useState<boolean>();

    const pesanaMasukFilteredByStocks = useMemo(() => pesananMasuk && stockChecker(pesananMasuk?.data, stock), [pesananMasuk]);

    const handleSubmit = async () => {
        const ongkir = await distaceCalculationService({ from: selectedTransaction?.address as addressType, to: providerAddress });
        if (role === 'admin') {
            router.patch(route('admin.transaksi.update', { id: selectedTransaction?.id, ongkir: ongkir }));
            setOpen(false);
            return;
        }
        router.patch(route('mitra.transaksi.update', { id: selectedTransaction?.id, ongkir: ongkir }));
        setOpen(false);
    };

    const chooseTransaction = (param: transactionType) => {
        setOpen(true);
        setSelectedTransaction(param);
    };

    const handleCancel = () => {
        setOpen(false);
        setSelectedTransaction(undefined);
    };
    return (
        <>
            {isOpen && selectedTransaction && (
                <section id="alertDelete" className="fixed top-0 left-0 z-[999] h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-sm -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10 lg:max-w-xl">
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
                            title="Apakah Anda yakin untuk menerima pesanan ini?"
                            className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                        />

                        <div className="flex w-2/3 justify-center gap-x-2.5 lg:w-1/2">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={handleCancel}
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
            <table className={cn('w-full', !!pesananMasuk && 'min-w-[600px]')}>
                <thead className="flex w-full justify-between px-5 pb-5">
                    <tr className="grid w-full grid-cols-6 text-center font-semibold">
                        <td className="text-sm lg:text-base">Transaksi ID</td>
                        <td className="text-sm lg:text-base">Items</td>
                        <td className="text-sm lg:text-base">Dibuat Pada</td>
                        <td className="text-sm lg:text-base">Alamat Tujuan</td>
                        <td className="text-sm lg:text-base">Sub-total</td>
                        <td className="text-sm lg:text-base">Action</td>
                    </tr>
                </thead>
                <Deferred data={['pesananDiterima', 'providerAddress', 'stock']} fallback={<Loading />}>
                    {pesanaMasukFilteredByStocks && pesanaMasukFilteredByStocks?.length > 0 ? (
                        <tbody className="block max-h-[70vh] overflow-y-auto">
                            {pesanaMasukFilteredByStocks.map((item) => (
                                <tr
                                    key={item.displayId}
                                    className="grid w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center text-sm"
                                >
                                    <td className="text-xs break-words lg:text-sm">{item.displayId}</td>
                                    <td>
                                        {item.detail_transaksis.map((detail) => {
                                            return (
                                                <h1>
                                                    {detail.product?.productName} : <span>{detail.amount}</span>
                                                </h1>
                                            );
                                        })}
                                    </td>
                                    <td className="text-xs lg:text-sm">{dateFormaterUtils(item.created_at)}</td>
                                    <td className="text-xs lg:text-sm">{item.status}</td>
                                    <td className="text-xs lg:text-sm">{currencyConverter(item.Total)}</td>
                                    <td className="flex gap-2">
                                        <Button
                                            disabled={!!selectedTransaction}
                                            onClick={() =>
                                                router.get(route(role === 'mitra' ? 'mitra.transaksi.show' : 'admin.transaksi.show', { id: item.id }))
                                            }
                                            className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                        >
                                            Lihat
                                        </Button>
                                        <Button
                                            disabled={!!selectedTransaction}
                                            onClick={() => chooseTransaction(item)}
                                            className="w-1/2 cursor-pointer bg-[#5961BE] px-0 py-0 text-xs font-normal text-white ring ring-[#5961BE] hover:bg-white hover:font-semibold hover:text-[#5961BE]"
                                        >
                                            Terima
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <HeadingSmall title="Data transaksi masuk tidak tersedia" className="text-center text-xs lg:text-lg" />
                    )}
                </Deferred>
            </table>
        </>
    );
}
