import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import SinglePaginate from '@/components/singlePaginate';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { kontenType } from '@/types/koten';
import { paginateType } from '@/types/paginate';
import { Link, router } from '@inertiajs/react';
import { ArrowRightIcon, Plus } from 'lucide-react';

type paginateKonten = {
    data: kontenType[];
} & paginateType;

export default function AllKonten({ kontens }: { kontens: paginateKonten }) {
    return (
        <AdminPageLayout page="Konten">
            <main className="relative flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Konten</h1>
                </div>
                <div className="flex max-h-[82.6vh] flex-1 flex-col gap-5 overflow-y-auto p-10 md:grid md:grid-cols-2 lg:relative xl:grid-cols-3">
                    {kontens.data.map((konten) => (
                        <div className={cn('h-full w-full rounded-xl bg-white p-5 shadow ring ring-[#AFB3FF] lg:max-h-96 lg:min-h-[475px]')}>
                            <div className="relative flex w-full overflow-hidden rounded-xl">
                                <img src={konten.imageCover} alt="" className="z-0 aspect-3/2 w-full object-cover object-center" />
                                <div className="absolute top-0 z-10 flex h-full w-full flex-1 flex-col justify-between bg-black/30 p-5 py-3">
                                    <h1 className="z-10 text-xl font-semibold text-white">{konten.category}</h1>
                                </div>
                            </div>
                            <Heading className="mt-5" title={konten.slug} />
                            <HeadingSmall
                                className="text-sm"
                                title={'Pak Telang - ' + Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))}
                            />
                            <pre className="lg:text-md line-clamp-5 font-sans text-xs break-words whitespace-pre-wrap text-black md:text-sm">
                                {konten.content}
                            </pre>
                            <div className="mt-auto flex w-full flex-col items-center gap-2 xl:flex-row">
                                <div className="flex w-full gap-1">
                                    <Link className="cursor-pointer font-semibold" href={route('admin.konten.show', { konten: konten.id })}>
                                        ReadMore
                                    </Link>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => router.get(route('admin.konten.create'))}
                    className="fixed right-0 bottom-0 z-50 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9] lg:absolute"
                >
                    <Plus size={40} />
                </button>
                <SinglePaginate data={kontens} className="mb-5" value="kontens" />
            </main>
        </AdminPageLayout>
    );
}
