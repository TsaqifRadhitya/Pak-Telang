import AdminPageLayout from '@/layouts/adminPageLayout';
import { donasiType } from '@/types/donasi';
import { currencyConverter } from '@/utils/currencyConverter';
import Heading from '../../../components/heading';

export default function Index({
    donasiMasuk,
    Disalurkan,
    danaTersalur,
    totalDonasi,
}: {
    donasiMasuk: donasiType[];
    Disalurkan: donasiType[];
    danaTersalur: number;
    totalDonasi: number;
}) {
    return (
        <AdminPageLayout page="Donasi">
            <main className="relative z-0 flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Donasi</h1>
                </div>
                <div className="grid flex-1 grid-rows-8 gap-x-5 gap-y-7.5 p-10 pb-0 lg:grid-cols-2 lg:grid-rows-4">
                    <div className="flex flex-col justify-between rounded-lg p-5 py-3 ring ring-[#3B387E]">
                        <Heading title="Total Donasi" className="text-lg" />
                        <Heading title={currencyConverter(totalDonasi)} className="text-3xl" />
                        <Heading title="Donasi yang belum disalurkan" className="text-md mb-2" />
                    </div>
                    <div className="flex flex-col justify-between rounded-lg p-5 py-3 ring ring-[#3B387E]">
                        <Heading title="Donasi Telah Disalurkan" className="text-lg" />
                        <Heading title={currencyConverter(danaTersalur)} className="text-3xl" />
                        <Heading title="Donasi yang telah disalurkan" className="text-md mb-2" />
                    </div>
                    <div className="row-span-3 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Donasi Masuk" className="text-lg" />
                    </div>
                    <div className="row-span-3 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Disalurkan" className="text-lg" />
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
