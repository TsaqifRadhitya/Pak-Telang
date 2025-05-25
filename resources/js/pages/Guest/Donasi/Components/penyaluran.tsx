import HeadingSmall from '@/components/heading-small';
import { kontenType } from '@/types/koten';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import Heading from '../../../../components/heading';
export default function Penyaluran() {
    const { kontenDonasi } = usePage<{ kontenDonasi: kontenType[] }>().props;
    console.log(kontenDonasi);
    return (
        <section className="flex min-h-screen flex-col bg-[#EBEFFF] px-5 pb-10 text-[#3B387E] lg:px-20">
            <Heading title="Penyaluran Donasi" className="text-4xl text-center" />
            <p className="mt-5 text-xl text-center">Pilihan minuman berkualitas untuk hari-harimu yang lebih sehat</p>
            <div className="w-fu flex-1 grid-cols-2 lg:grid xl:grid-cols-3 mt-10">
                {kontenDonasi.map((konten: kontenType) => (
                    <div className="flex w-full flex-col gap-1.5 aspect-3/4 rounded-xl bg-white p-10 shadow">
                        <div className="relative flex w-full overflow-hidden rounded-xl">
                            <img src={konten.imageCover} alt="" className="z-0 aspect-3/3 object-cover object-center" />
                            <div className="absolute top-0 z-10 h-full w-full flex-1 bg-black/30 p-5 py-3">
                                <h1 className="z-10 text-xl font-semibold text-white">{konten.category}</h1>
                            </div>
                        </div>
                        <Heading className="mt-5" title={konten.slug} />
                        <HeadingSmall
                            className="text-sm"
                            title={'Pak Telang -   ' + Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))}
                        />
                        <pre className="lg:text-md line-clamp-5 font-sans text-xs break-words whitespace-pre-wrap text-black md:text-sm">
                            {konten.content}
                        </pre>
                        <div className="mt-auto flex gap-2">
                            <Link className="cursor-pointer font-semibold" href={route('konten.show', { id: konten.id })}>
                                ReadMore
                            </Link>
                            <ArrowRightIcon />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
