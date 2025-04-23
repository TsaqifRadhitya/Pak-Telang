import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import mitra from '../../../types/mitra';

export type prop = {
    mitra: mitra[];
    pengajuanMitra: mitra[];
    category: string;
    search: string;
};
export default function MitraAdminPage() {
    const [isloading, setIsloading] = useState<boolean>(false);
    const { category, search, mitra } = usePage<prop>().props;
    const [data, setData] = useState<{ category: string; search: string }>({
        category: category ?? 'default',
        search: search ?? '',
    });
    console.log(data.category);
    const handleFilterSearch = (param?: string) => {
        if (param) {
            setData((prev) => ({ ...prev, category: param }));
            router.reload({
                only: ['category', 'search', 'mitra'],
                onStart: () => setIsloading(true),
                onFinish: () => setIsloading(false),
                data: {
                    search: data.search,
                    category: param !== 'default' ? param : null,
                },
            });
            return;
        }
        router.reload({
            only: ['category', 'search', 'mitra'],
            onStart: () => setIsloading(true),
            onFinish: () => setIsloading(false),
            data: {
                search: data.search,
                category: data.category !== 'default' ? data.category : null,
            },
        });
    };
    return (
        <AdminPageLayout page="Mitra">
            <main className="h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex flex-row-reverse items-center justify-end gap-x-4 border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="cursor-pointer text-xl font-semibold">Mitra</h1>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFilterSearch();
                    }}
                    className="flex flex-col-reverse gap-2.5 px-10 pt-5 lg:flex-row"
                >
                    <select
                        value={data.category}
                        disabled={isloading}
                        onChange={(e) => handleFilterSearch(e.target.value)}
                        className="w-full flex-1/4 cursor-pointer rounded-lg bg-white p-2 ring ring-[#AFB3FF] focus-visible:ring-3"
                    >
                        <option value={'default'}>Category</option>
                        <option value={'pengajuan'}>Pengajuan</option>
                        <option value={'aktif'}>Aktif</option>
                        <option value={'tidak aktif'}>Tidak Aktif</option>
                    </select>
                    <Input
                        className="border-0 bg-white ring ring-[#AFB3FF] placeholder:text-[#AFB3FF] focus-visible:ring-[#AFB3FF]"
                        type="text"
                        placeholder="Search"
                        disabled={isloading}
                        value={data.search}
                        onChange={(e) => setData((prev) => ({ ...prev, search: e.target.value }))}
                    />
                </form>
                <section
                    className={cn(
                        'w-full gap-10 overflow-y-auto p-5 px-10 pt-2.5 md:h-[74vh] md:grid-cols-2 lg:pt-10 xl:grid-cols-3',
                        !isloading && mitra.length > 0 && 'grid',
                    )}
                >
                    {!isloading ? (
                        mitra.length > 0 ? (
                            mitra.map((mitra) => (
                                <article
                                    key={mitra.id}
                                    onClick={() => router.get(route('admin.mitra.pengajuan.index', { id: mitra.id }))}
                                    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-between rounded-lg px-7.5 py-5 shadow ring ring-[#AFB3FF]"
                                >
                                    <img
                                        src={mitra.user.profile_picture}
                                        className="aspect-square w-1/2 rounded-full object-cover object-center"
                                        alt=""
                                    />
                                    <div className="w-full">
                                        <h1 className="w-full text-start text-xl font-black">{mitra.user.name}</h1>
                                        <div className="flex w-full items-center justify-between gap-x-1.5 text-[0.65rem]">
                                            <p className="flex-1/2">{mitra.user.email}</p>
                                            <p className="flex-1/2 text-end">{mitra.user.phonenumber}</p>
                                        </div>
                                    </div>
                                    <HeadingSmall
                                        className="text-xs"
                                        title={`${mitra.address.address} ${mitra.address.districtName}, ${mitra.address.cityName}, ${mitra.address.province} ${mitra.address.postalCode}`}
                                    />
                                    <div
                                        className={cn(
                                            'w-full self-start rounded-2xl py-1.5 text-center text-xs font-[570] text-white',
                                            mitra.statusPengajuan !== 'Mou disetujui'
                                                ? 'bg-[#FFAC31]'
                                                : mitra.isOpen
                                                  ? 'bg-[#1BA536]'
                                                  : 'bg-[#00B4C6]',
                                        )}
                                    >
                                        <p>
                                            {mitra.statusPengajuan !== 'Mou disetujui' ? mitra.statusPengajuan : mitra.isOpen ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <Heading title="Hasil Pencarian Tidak Ditemukan" className="mx-auto w-fit" />
                        )
                    ) : (
                        <Heading title="Loading...." className="mx-auto w-fit" />
                    )}
                </section>
            </main>
        </AdminPageLayout>
    );
}
