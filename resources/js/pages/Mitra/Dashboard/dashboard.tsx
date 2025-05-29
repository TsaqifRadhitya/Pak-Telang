import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { cn } from '@/lib/utils';
import { chartType, periodicType } from '@/pages/Pak Telang/Dashboard/dashboard';
import { SharedData } from '@/types';
import { currencyConverter } from '@/utils/currencyConverter';
import { percentageCalculation } from '@/utils/persentageUtils';
import { router, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import EWallet from '../../../components/ewallet';

export default function DashboardMitraPage({
    statusToko,
    chart,
    productBought,
}: {
    statusToko: boolean;
    chart: chartType[];
    productBought: periodicType;
}) {
    const {
        auth: {
            user: { saldo },
        },
    } = usePage<SharedData>().props;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [isSubmited, setSubmited] = useState<boolean>(false);

    const handleStatusToko = () => {
        router.post(
            route('mitra.status.update', {
                status: !statusToko,
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

    const thisMonthIncome = useMemo(() => {
        const data = chart[chart.length - 1];
        return data['Produk Jadi'];
    }, [chart]);

    const lastMonthIncome = useMemo(() => {
        const data = chart[chart.length - 2];
        return data['Produk Jadi'];
    }, [chart]);

    const pemasukan = useMemo(() => {
        return {
            persentage: new Intl.NumberFormat('id-Id', { style: 'percent' }).format(percentageCalculation(thisMonthIncome, lastMonthIncome)),
            omsetPersentage: {
                value: currencyConverter(thisMonthIncome - lastMonthIncome),
                profit: thisMonthIncome >= lastMonthIncome,
            },
        };
    }, [lastMonthIncome, thisMonthIncome]);

    const pengeluaran = useMemo(() => {
        return {
            persentage: new Intl.NumberFormat('id-Id', { style: 'percent' }).format(
                percentageCalculation(productBought.thisMonth, productBought.lastMonth),
            ),
            omsetPersentage: {
                value: currencyConverter(productBought.thisMonth),
                profit: productBought.thisMonth >= productBought.lastMonth,
            },
        };
    }, [productBought]);
    return (
        <>
            {isOpen && (
                <section id="alertDelete" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-sm -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10 lg:max-w-xl">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex w-full flex-1/2 items-center gap-x-4">
                                <img
                                    src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                    alt=""
                                />
                                <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                            </div>
                            <p className="flex-1/2 text-right text-xs text-[#8A7300]">Note : Status toko dapat diubah kapanpun</p>
                        </div>
                        <DotLottieReact
                            loop
                            className="w-1/2"
                            src="https://lottie.host/0d4d6ac7-6c39-410c-beae-8b835e7e6790/PrUVLgMZXE.lottie"
                            autoplay
                        />
                        <Heading
                            title={`Apakah anda yakin untuk ${statusToko ? 'menutup' : 'membuka'} toko?`}
                            className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                        />

                        <div className="flex w-2/3 justify-center gap-x-2.5 lg:w-1/2">
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
            <MitraPageLayout page="Dashboard">
                <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                    <div className="relative flex-1 space-y-5 p-5 lg:max-h-[80vh] lg:overflow-y-auto lg:p-10 lg:pt-5 lg:pb-1">
                        <div className="flex w-full flex-col gap-5 lg:flex-row lg:gap-10">
                            <EWallet type="Mitra" saldo={saldo} className="w-full lg:w-fit lg:flex-1/2" />
                            <section className="space-y-1 rounded-lg p-5 text-[#3B387E] ring ring-[#3B387E] lg:flex-1/2">
                                <Heading className="text-md font-semibold" title="Status Toko" />
                                <div className="flex items-center justify-between">
                                    <h1 className={cn('text-2xl font-semibold', statusToko ? 'text-[#048730]' : 'text-red-500')}>
                                        {statusToko ? 'Active' : 'Inactive'}
                                    </h1>
                                    <Button
                                        disabled={isSubmited}
                                        onClick={() => setOpen(true)}
                                        className="cursor-pointer bg-[#3B387E] px-10 text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E]"
                                    >
                                        Ubah
                                    </Button>
                                </div>
                                <HeadingSmall
                                    className="text-sm font-semibold"
                                    title={`${!statusToko ? 'Tidak' : ''} Dapat Menerima Pesanan Dari Pembeli`}
                                />
                            </section>
                        </div>
                        <div className="aspect-square w-full rounded-2xl border border-[#3B387E] p-5 lg:aspect-auto lg:h-[60%]">
                            <Heading title="Grafik Perbandingan Penjualan" className="text-md mb-5" />
                            <ResponsiveContainer height="80%">
                                <LineChart data={chart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="bulan" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Produk Jadi" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                            <section className="mt-2.5 ml-2.5 flex w-full gap-x-5 text-black">
                                <div className="flex items-center gap-x-2.5 text-[#8784D2]">
                                    <div className="h-1.5 w-6 bg-[#8784D2]"></div>
                                    <h4>Produk Jadi</h4>
                                </div>
                                <div className="flex items-center gap-x-2.5 text-[#92C8A0]">
                                    <div className="h-1.5 w-6 bg-[#92C8A0]"></div>
                                    <h4>Bahan Baku</h4>
                                </div>
                            </section>
                        </div>
                        <div className="flex flex-col justify-between gap-10 lg:flex-row">
                            <section className="w-full space-y-1 rounded-lg p-5 text-[#3B387E] ring ring-[#3B387E]">
                                <Heading className="text-md font-semibold" title="Pemasukan" />
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-semibold">{currencyConverter(thisMonthIncome)}</h1>
                                    <div className="flex flex-col items-end gap-1.5">
                                        <p
                                            className={cn(
                                                'text-2xl font-semibold text-red-600',
                                                pemasukan.omsetPersentage.profit && 'text-[#048730]',
                                            )}
                                        >
                                            {pemasukan.omsetPersentage.profit && '+'}
                                            {pemasukan.persentage}
                                        </p>
                                        <p className={cn('text-sm text-red-600', pemasukan.omsetPersentage.profit && 'text-[#048730]')}>
                                            {pemasukan.omsetPersentage.profit ? '+' : '-'}
                                            {pemasukan.omsetPersentage.value}
                                        </p>
                                    </div>
                                </div>
                                <HeadingSmall className="text-sm font-semibold" title="Pemasukan Anda bulan ini" />
                            </section>
                            <section className="w-full space-y-1 rounded-lg p-5 text-[#3B387E] ring ring-[#3B387E]">
                                <Heading className="text-md font-semibold" title="Pengeluaran" />
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-semibold">{pengeluaran.omsetPersentage.value}</h1>
                                    <div className="flex flex-col items-end gap-1.5">
                                        <p
                                            className={cn(
                                                'text-2xl font-semibold text-red-600',
                                                pengeluaran.omsetPersentage.profit && 'text-[#048730]',
                                            )}
                                        >
                                            {pengeluaran.omsetPersentage.profit && '+'}
                                            {pengeluaran.persentage}
                                        </p>
                                        <p className={cn('text-sm text-red-600', pengeluaran.omsetPersentage.profit && 'text-[#048730]')}>
                                            {pengeluaran.omsetPersentage.profit ? '+' : '-'}
                                            {pengeluaran.omsetPersentage.value}
                                        </p>
                                    </div>
                                </div>
                                <HeadingSmall className="text-sm font-semibold" title="Pengeluaran Anda bulan ini" />
                            </section>
                        </div>
                    </div>
                </main>
            </MitraPageLayout>
        </>
    );
}
