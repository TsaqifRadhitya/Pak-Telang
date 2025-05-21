import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { donasiType } from '@/types/donasi';
import { penyaluranDonasiType } from '@/types/penyaluranDonasi';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';
import { dateFormaterUtils } from '../../../utils/dateFormater';

export default function Index({
    donasiMasuk,
    Disalurkan,
    danaTersalur,
    totalDonasi,
}: {
    donasiMasuk: donasiType[];
    Disalurkan: penyaluranDonasiType[];
    danaTersalur: number;
    totalDonasi: number;
}) {
    return (
        <AdminPageLayout page="Donasi">
            <main className="relative z-0 flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Donasi</h1>
                </div>
                <div className="grid flex-1 grid-rows-8 gap-x-5 gap-y-7.5 p-10 lg:grid-cols-2 lg:grid-rows-4 lg:pb-0">
                    <div className="flex items-center justify-between rounded-lg p-5 py-3 ring ring-[#3B387E]">
                        <div className="flex flex-col justify-between">
                            <Heading title="Total Donasi" className="text-sm lg:text-lg" />
                            <Heading title={currencyConverter(totalDonasi)} className="text-2xl lg:text-3xl" />
                            <Heading title="Donasi yang belum disalurkan" className="lg:text-md mb-2 text-sm" />
                        </div>
                        <Button className="mb-2.5 min-h-0 cursor-pointer bg-[#3B387E] min-w-20 lg:min-w-32 text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E]">
                            Salurkan
                        </Button>
                    </div>
                    <div className="flex flex-col justify-between rounded-lg p-5 py-3 ring ring-[#3B387E]">
                        <Heading title="Donasi Telah Disalurkan" className="text-sm lg:text-lg" />
                        <Heading title={currencyConverter(danaTersalur)} className="text-2xl lg:text-3xl" />
                        <Heading title="Donasi yang telah disalurkan" className="lg:text-md mb-2 text-sm" />
                    </div>
                    <div className="row-span-3 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Donasi Masuk" className="text-lg" />
                        <div className="h-0.5 bg-[#D9D9D9]"></div>
                        <div className="max-h-[55vh] overflow-y-auto lg:max-h-[45vh]">
                            {donasiMasuk.map((i) => (
                                <div key={i.id}>
                                    <div className="flex items-center justify-between px-3 py-4">
                                        <div className="flex flex-col gap-y-2.5">
                                            <h1 className="font-semibold">{i.name ?? 'Anonim'}</h1>
                                            <p className="text-xs lg:text-sm">{i.email} Produk</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-y-2.5">
                                            <p className="text-right text-[0.6rem]">{dateFormaterUtils(i.created_at as Date)}</p>
                                            <Heading title={currencyConverter(i.nominal as number)} className="lg:text-md text-xs" />
                                        </div>
                                    </div>
                                    <div className="h-0.5 bg-[#D9D9D9]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row-span-3 space-y-1.5 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Disalurkan" className="text-lg" />
                        <div className="h-0.5 bg-[#D9D9D9]"></div>
                        <div className="max-h-[50vh] overflow-y-auto px-1 lg:max-h-[45vh]">
                            {Disalurkan.map((i) => (
                                <div key={i.id}>
                                    <div className="flex items-center justify-between px-3 py-4">
                                        <div className="flex flex-col gap-y-2.5">
                                            <h1 className="font-semibold">{i.namaPenyaluran}</h1>
                                            <p className="text-sm">{i.jumlahProduk} Produk</p>
                                        </div>
                                        <div className="flex items-center gap-x-5">
                                            <div className="flex flex-col items-end gap-y-2.5">
                                                <p className="text-right text-[0.6rem]">{dateFormaterUtils(i.created_at)}</p>
                                                <Heading title={currencyConverter(i.nominal)} className="text-md" />
                                            </div>
                                            <Button
                                                onClick={() => router.get(route('admin.konten.create', { slug: i.namaPenyaluran }))}
                                                className="hidden h-auto min-h-0 cursor-pointer bg-[#3B387E] px-3 py-1.5 text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:block"
                                            >
                                                Buat Konten
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => router.get(route('admin.konten.create', { slug: i.namaPenyaluran }))}
                                        className="mb-2.5 min-h-0 w-full cursor-pointer bg-[#3B387E] px-3 py-1.5 text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:hidden"
                                    >
                                        Buat Konten
                                    </Button>
                                    <div className="h-0.5 bg-[#D9D9D9]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
