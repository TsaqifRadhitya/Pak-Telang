import AdminPageLayout from '@/layouts/adminPageLayout';
import { donasiType } from '@/types/donasi';

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
    console.log(donasiMasuk,Disalurkan,danaTersalur,totalDonasi);
    return (
        <AdminPageLayout page="Donasi">
            <main className="relative z-0 flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Donasi</h1>
                </div>
                <div className="grid-cols-2 grid-rows-2 lg:grid"></div>
            </main>
        </AdminPageLayout>
    );
}
