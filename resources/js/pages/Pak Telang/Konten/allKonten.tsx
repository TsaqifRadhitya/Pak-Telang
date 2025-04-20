import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { kontenType } from '@/types/koten';
import { Link, router } from '@inertiajs/react';
import { ArrowRightIcon, Plus } from 'lucide-react';
import { useState } from 'react';

export default function AllKonten({ kontens }: { kontens: kontenType[] }) {
    console.log(kontens);
    const [dialog, setDialog] = useState<boolean>(false);
    const [konten, setKonten] = useState<kontenType>();
    const handleOpenDialog = (param: kontenType) => {
        setKonten(param);
        setDialog(true);
    };

    const handleSubmitDelete = () => {
        router.delete(route('admin.konten.destroy', { konten: konten?.id }), { onFinish: () => setDialog(false) });
    };

    return (
        <>
            {dialog && (
                <section id="alertDelete" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full items-center gap-x-4">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                        </div>
                        <img src={konten?.imageCover} alt="" className="aspect-video w-1/3 object-cover object-center" />
                        <Heading
                            title="Apakah Anda yakin untuk menghapus konten ini ?"
                            className="text-md line mx-auto w-4/5 text-center leading-5 font-medium text-[#8A7300]"
                        />
                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-green-600 ring ring-green-600 hover:bg-green-600 hover:text-white"
                                onClick={() => setDialog(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-red-600 font-semibold text-white hover:bg-red-700"
                                onClick={handleSubmitDelete}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            <AdminPageLayout page="Konten">
                <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Konten</h1>
                    </div>
                    <div className="flex max-h-[82.6vh] flex-1 flex-col overflow-y-aut p-10 lg:relative lg:grid lg:grid-cols-3">
                        {kontens.map((konten) => (
                            <div className="aspect-square w-full rounded-xl bg-white p-5 shadow">
                                <div className="relative flex w-full overflow-hidden rounded-xl">
                                    <img src={konten.imageCover} alt="" className="z-0 aspect-3/2 object-center object-cover" />
                                    <div className="absolute top-0 z-10 flex h-full w-full flex-1 flex-col justify-between bg-black/30 p-5 py-3">
                                        <h1 className="z-10 text-xl font-semibold text-white">{konten.category}</h1>
                                    </div>
                                </div>
                                <Heading className="mt-5" title={konten.slug} />
                                <HeadingSmall
                                    className="text-sm"
                                    title={
                                        'Pak Telang - Jember, ' +
                                        Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))
                                    }
                                />
                                <pre className="lg:text-md line-clamp-5 text-xs break-words whitespace-pre-wrap text-black md:text-sm">
                                    {konten.content}
                                </pre>

                                <div className="mt-5 flex w-full flex-col items-center gap-2 xl:flex-row">
                                    <div className="flex w-full gap-1">
                                        <Link className="cursor-pointer font-semibold" href={route('konten.show', { id: konten.id })}>
                                            ReadMore
                                        </Link>
                                        <ArrowRightIcon />
                                    </div>
                                    <div className="flex w-full flex-col justify-end gap-2 xl:w-fit xl:flex-row">
                                        <Button
                                            onClick={() => router.get(route('admin.konten.edit', { konten: konten.id }))}
                                            className="cursor-pointer bg-[#EC2525] ring ring-[#EC2525] hover:bg-transparent hover:font-semibold hover:text-[#EC2525] xl:w-fit"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleOpenDialog(konten)}
                                            className="cursor-pointer bg-[#FFA114] ring ring-[#FFA114] hover:bg-transparent hover:font-semibold hover:text-[#FFA114] xl:w-fit"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => router.get(route('admin.konten.create'))}
                            className="fixed right-0 bottom-0 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9] lg:absolute"
                        >
                            <Plus size={40} />
                        </button>
                    </div>
                </main>
            </AdminPageLayout>
        </>
    );
}
