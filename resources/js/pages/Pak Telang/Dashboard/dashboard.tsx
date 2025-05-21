import AdminPageLayout from '@/layouts/adminPageLayout';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import EWallet from '../../../components/ewallet';
import Heading from '../../../components/heading';

export default function dashboardAdminPage({ saldo }: { saldo: number }) {
    console.log(saldo);
    const data = [
        {
            name: 'Januari',
            'Produk Jadi': 4000,
            'Bahan Baku': 2400,
            amt: 2400,
        },
        {
            name: 'Februari',
            'Produk Jadi': 3000,
            'Bahan Baku': 1398,
            amt: 2210,
        },
        {
            name: 'Maret',
            'Produk Jadi': 2000,
            'Bahan Baku': 9800,
            amt: 2290,
        },
        {
            name: 'April',
            'Produk Jadi': 2780,
            'Bahan Baku': 3908,
            amt: 2000,
        },
        {
            name: 'Mei',
            'Produk Jadi': 1890,
            'Bahan Baku': 4800,
            amt: 2181,
        },
        {
            name: 'Juni',
            'Produk Jadi': 2390,
            'Bahan Baku': 3800,
            amt: 2500,
        },
    ];

    return (
        <AdminPageLayout page="Dashboard">
            <main className="relative flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className="relative flex-1 space-y-5 p-5 pb-0 lg:max-h-[80vh] lg:overflow-y-auto lg:p-10 lg:pt-5 lg:pb-0">
                    <EWallet type="Admin" saldo={saldo} className="w-full lg:w-2/5" />
                    <div className="h-[60%] w-full space-y-5 rounded-2xl border border-[#3B387E] p-5">
                        <Heading title="Grafik Perbandingan Penjualan" className="text-md" />
                        <ResponsiveContainer height="90%">
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Produk Jadi" stroke="#8884d8" />
                                <Line type="monotone" dataKey="Bahan Baku" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
