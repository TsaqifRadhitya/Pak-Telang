import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import LandingPageLayout from '@/layouts/landingPageLayout';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { kontenType } from '@/types/koten';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import Heading from '../../../components/heading';

interface props extends SharedData {
    kontens: kontenType[];
    category: string;
    search: string;
}

export default function KontenPage() {
    const [isloading, setIsloading] = useState<boolean>(false);
    const { kontens, category, search } = usePage<props>().props;
    const [data, setData] = useState<{ category: string; search: string }>({
        category: category ?? 'default',
        search: search ?? '',
    });

    const handleFilterSearch = (param?: string) => {
        if (param) {
            setData((prev) => ({ ...prev, category: param }));
            router.reload({
                onStart: () => setIsloading(true),
                onFinish: () => setIsloading(false),
                only: ['kontens', 'search', 'mitra'],
                data: {
                    search: data.search,
                    category: param !== 'default' ? param : null,
                },
            });
            return;
        }
        router.reload({
            onStart: () => setIsloading(true),
            onFinish: () => setIsloading(false),
            only: ['kontens', 'search', 'mitra'],
            data: {
                search: data.search,
                category: data.category !== 'default' ? data.category : null,
            },
        });
    };
    return (
        <LandingPageLayout page="Konten">
            <section className="min-h-screen w-full space-y-2.5 bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] lg:p-10 lg:pt-24">
                <Heading title="Konten Kami" className="text-2xl font-bold" />
                <HeadingSmall
                    className="text-lg font-semibold"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry also the leap into electronic"
                />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFilterSearch();
                    }}
                    className="flex flex-col-reverse gap-2.5 lg:flex-row"
                >
                    <select
                        value={data.category}
                        disabled={isloading}
                        onChange={(e) => handleFilterSearch(e.target.value)}
                        className="w-full flex-1/4 rounded-lg bg-white p-2 ring ring-[#5961BE] focus-visible:ring-3"
                    >
                        <option value={'default'}>Category</option>
                        <option value={'Blog'}>Blog</option>
                        <option value={'Penyaluran Donasi'}>Penyaluran Donasi</option>
                    </select>
                    <Input
                        className="border-0 bg-white ring ring-[#5961BE] placeholder:text-[#5961BE] focus-visible:ring-[#5961BE]"
                        type="text"
                        placeholder="Search"
                        disabled={isloading}
                        value={data.search}
                        onChange={(e) => setData((prev) => ({ ...prev, search: e.target.value }))}
                    />
                </form>
                <article className={cn('mt-5 w-full gap-10 px-2.5 md:grid-cols-2 xl:grid-cols-3', !isloading && kontens.length && 'grid')}>
                    {!isloading ? (
                        kontens.length > 0 ? (
                            kontens.map((konten: kontenType) => (
                                <div className="flex w-full flex-col gap-1.5 rounded-xl bg-white p-10 shadow">
                                    <div className="relative flex w-full overflow-hidden rounded-xl">
                                        <img src={konten.imageCover} alt="" className="z-0 aspect-3/3 object-cover object-center" />
                                        <div className="absolute top-0 z-10 h-full w-full flex-1 bg-black/30 p-5 py-3">
                                            <h1 className="z-10 text-xl font-semibold text-white">{konten.category}</h1>
                                        </div>
                                    </div>
                                    <Heading className="mt-5" title={konten.slug} />
                                    <HeadingSmall
                                        className="text-sm"
                                        title={
                                            'Pak Telang -   ' +
                                            Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))
                                        }
                                    />
                                    <pre className="lg:text-md line-clamp-5 font-sans text-xs break-words whitespace-pre-wrap text-black md:text-sm">
                                        {konten.content}
                                    </pre>
                                    <div className="mt-5 flex gap-2">
                                        <Link className="cursor-pointer font-semibold" href={route('konten.show', { id: konten.id })}>
                                            ReadMore
                                        </Link>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Heading title="Hasil Pencarian Tidak Ditemukan" className="mx-auto w-fit" />
                        )
                    ) : (
                        <Heading title="Loading...." className="mx-auto w-fit" />
                    )}
                </article>
            </section>
        </LandingPageLayout>
    );
}
