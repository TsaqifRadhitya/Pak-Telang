import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import LandingPageLayout from '@/layouts/landingPageLayout';
import { SharedData } from '@/types';
import { kontenType } from '@/types/koten';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import { useEffect } from 'react';
import Heading from '../../../components/heading';

interface props extends SharedData {
    kontens: kontenType[];
    category: string;
    search: string;
}

export default function KontenPage() {
    const { kontens, category, search } = usePage<props>().props;
    const { data, setData } = useForm<{ category: string; search: string }>({
        category: category ?? '',
        search: search ?? '',
    });

    const handleFilterSearch = () => {
        if (data.category != '' && data.search != '') {
            router.reload({
                data: {
                    ...data,
                },
            });
        } else if (data.search != '') {
            router.reload({
                data: {
                    search: data.search,
                },
            });
        } else if (data.category != '') {
            router.reload({
                data: {
                    category: data.category,
                },
            });
        } else {
            router.reload({ data: {} });
        }
    };
    useEffect(handleFilterSearch, [data.category]);
    return (
        <LandingPageLayout page="Konten">
            <section className="min-h-screen w-full space-y-2.5 bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] lg:p-10 lg:pt-24">
                <Heading title="Konten Kami" className="text-2xl font-bold" />
                <HeadingSmall
                    className="text-lg font-semibold"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry also the leap into electronic"
                />
                <div className="flex gap-x-2.5">
                    <select
                        value={data.category ?? ''}
                        onChange={(e) => setData('category', e.target.value)}
                        className="w-full flex-1/4 rounded-lg bg-white p-2 ring ring-[#5961BE] focus-visible:ring-3"
                    >
                        <option value={''}>Category</option>
                        <option value={'Blog'}>Blog</option>
                        <option value={'Penyaluran Donasi'}>Penyaluran Donasi</option>
                    </select>
                    <Input
                        className="border-0 bg-white ring ring-[#5961BE] placeholder:text-[#5961BE] focus-visible:ring-[#5961BE]"
                        type="text"
                        placeholder="Search"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFilterSearch()}
                    />
                </div>
                <article className="mt-5 grid w-full gap-10 px-2.5 md:grid-cols-2 xl:grid-cols-3">
                    {kontens.map((konten: kontenType) => (
                        <div className="flex w-full flex-col gap-1.5 rounded-xl bg-white p-10 shadow">
                            <div className="relative flex w-full overflow-hidden rounded-xl">
                                <img src={konten.imageCover} alt="" className="z-0 aspect-3/2 object-center object-cover" />
                                <div className="absolute top-0 z-10 h-full w-full flex-1 bg-black/30 p-5 py-3">
                                    <h1 className="z-10 text-xl font-semibold text-white">{konten.category}</h1>
                                </div>
                            </div>
                            <Heading className="mt-5" title={konten.slug} />
                            <HeadingSmall
                                className="text-sm"
                                title={
                                    'Pak Telang - Jember, ' + Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))
                                }
                            />
                            <pre className="lg:text-md line-clamp-5 text-xs break-words whitespace-pre-wrap text-black md:text-sm">
                                {konten.content}
                            </pre>
                            <div className="mt-5 flex gap-2">
                                <Link className="cursor-pointer font-semibold" href={route('konten.show', { id: konten.id })}>
                                    ReadMore
                                </Link>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    ))}
                </article>
            </section>
        </LandingPageLayout>
    );
}
