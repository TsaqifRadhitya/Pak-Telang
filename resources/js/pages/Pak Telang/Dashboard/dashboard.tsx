import HeadingSmall from '@/components/heading-small';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { percentageCalculation } from '@/utils/persentageUtils';
import { useMemo } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import EWallet from '../../../components/ewallet';
import Heading from '../../../components/heading';

export type chartType = {
    bulan: string;
    'Produk Jadi': number;
    'Bahan Baku': number;
};

export type periodicType = {
    thisMonth: number;
    lastMonth: number;
};
export default function DashboardAdminPage({
    saldo,
    chart,
    productSold,
    mitra,
}: {
    saldo: number;
    chart: chartType[];
    productSold: periodicType;
    mitra: periodicType;
}) {
    const thisMonthIncome = useMemo(() => {
        const data = chart[chart.length - 1];
        return data['Bahan Baku'] + data['Produk Jadi'];
    }, [chart]);

    const lastMonthIncome = useMemo(() => {
        const data = chart[chart.length - 2];
        return data['Bahan Baku'] + data['Produk Jadi'];
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

    const productSoldAmount = useMemo(() => {
        return {
            persentage: new Intl.NumberFormat('id-Id', { style: 'percent' }).format(
                percentageCalculation(productSold.thisMonth, productSold.lastMonth),
            ),
            productSoldPersentage: {
                value: (productSold.thisMonth - productSold.lastMonth).toString() + ' Produk',
                profit: productSold.thisMonth >= productSold.lastMonth,
            },
        };
    }, [productSold]);

    const mitraAmount = useMemo(() => {
        return {
            persentage: new Intl.NumberFormat('id-Id', { style: 'percent' }).format(percentageCalculation(mitra.thisMonth, mitra.lastMonth)),
            mitraPersentage: {
                value: (mitra.thisMonth - mitra.lastMonth).toString() + ' Kota',
                profit: mitra.thisMonth >= mitra.lastMonth,
            },
        };
    }, [mitra]);
    return (
        <AdminPageLayout page="Dashboard">
            <main className="relative flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className="relative flex-1 space-y-5 p-5 lg:max-h-[80vh] lg:overflow-y-auto lg:p-10 lg:pt-5 lg:pb-1">
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:gap-10">
                        <EWallet type="Admin" saldo={saldo} className="flex h-auto w-full flex-col justify-center" />
                        <section className="w-full space-y-1 rounded-lg p-5 text-[#3B387E] ring ring-[#3B387E]">
                            <Heading className="text-md font-semibold" title="Produk Terjual" />
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold">{productSoldAmount.productSoldPersentage.value}</h1>
                                <div className="flex flex-col items-end gap-1.5">
                                    <p
                                        className={cn(
                                            'text-2xl font-semibold text-red-600',
                                            productSoldAmount.productSoldPersentage.profit && 'text-[#048730]',
                                        )}
                                    >
                                        {productSoldAmount.productSoldPersentage.profit && '+'}
                                        {productSoldAmount.persentage}
                                    </p>
                                    <p className={cn('text-sm text-red-600', productSoldAmount.productSoldPersentage.profit && 'text-[#048730]')}>
                                        {productSoldAmount.productSoldPersentage.profit ? '+' : '-'}
                                        {productSoldAmount.productSoldPersentage.value}
                                    </p>
                                </div>
                            </div>
                            <HeadingSmall className="text-sm font-semibold" title="Jumlah produk terjual 1 bulan ini" />
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
                                <Line type="monotone" dataKey="Bahan Baku" stroke="#82ca9d" />
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
                                    <p className={cn('text-2xl font-semibold text-red-600', pemasukan.omsetPersentage.profit && 'text-[#048730]')}>
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
                            <Heading className="text-md font-semibold" title="Jumlah Kota Mitra" />
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold">{mitraAmount.mitraPersentage.value}</h1>
                                <div className="flex flex-col items-end gap-1.5">
                                    <p className={cn('text-2xl font-semibold text-red-600', mitraAmount.mitraPersentage.profit && 'text-[#048730]')}>
                                        {mitraAmount.mitraPersentage.profit && '+'}
                                        {mitraAmount.persentage}
                                    </p>
                                    <p className={cn('text-sm text-red-600', mitraAmount.mitraPersentage.profit && 'text-[#048730]')}>
                                        {mitraAmount.mitraPersentage.profit ? '+' : '-'}
                                        {mitraAmount.mitraPersentage.value}
                                    </p>
                                </div>
                            </div>
                            <HeadingSmall className="text-sm font-semibold" title="Jumlah kota yang telah dijangkau Pak Telang" />
                        </section>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
