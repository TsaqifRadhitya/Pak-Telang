import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LandingPageLayout from '@/layouts/landingPageLayout';
import { kontenType } from '@/types/koten';
import { router } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

function extractYouTubeID(url: string): string | null {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
    if (url) {
        const match = url.match(regExp);
        return match ? match[1] : null;
    }
    return null;
}

export default function DetailKontent({ konten, editAble }: { konten: kontenType; editAble?: boolean }) {
    const [dialog, setDialog] = useState<boolean>(false);
    const handleSubmitDelete = () => {
        router.delete(route('admin.konten.destroy', { konten: konten?.id }), { onFinish: () => setDialog(false) });
    };
    const videoId = extractYouTubeID(konten.video as string);
    return (
        <>
            {dialog && (
                <section id="alertDelete" className="fixed z-[1000] h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full items-center gap-x-4">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                        </div>
                        <DotLottieReact
                            src="https://lottie.host/d3553a30-65fc-40db-8bb4-ee6833b42553/xx35T6hHKB.lottie"
                            className="max-w-xs"
                            autoplay
                        />
                        <Heading
                            title={`Apakah Anda yakin untuk menghapus konten \n ${konten.slug}`}
                            className="text-md line mx-auto text-center leading-5 font-medium whitespace-pre-line text-[#8A7300]"
                        />
                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={() => setDialog(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-[#8A7300] font-semibold text-white ring ring-[#8A7300] hover:bg-[#FFFDF1] hover:text-[#8A7300]"
                                onClick={handleSubmitDelete}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            <LandingPageLayout page="Konten">
                <div className="min-h-screen w-full bg-[#EBEFFF] lg:pt-20">
                    <div className="relative w-full">
                        {editAble && (
                            <div className="absolute top-25 right-10 z-10 flex w-full justify-end gap-2 lg:top-10">
                                <Button
                                    onClick={() => router.get(route('admin.konten.edit', { konten: konten.id }))}
                                    className="w-full max-w-30 cursor-pointer bg-[#FFAC31] text-white ring ring-[#FFAC31] hover:bg-white hover:text-[#FFAC31]"
                                >
                                    Ubah
                                </Button>
                                <Button
                                    onClick={() => setDialog(true)}
                                    className="w-full max-w-30 cursor-pointer bg-[#EC2525] text-white ring ring-[#EC2525] hover:bg-white hover:text-[#EC2525]"
                                >
                                    Hapus
                                </Button>
                            </div>
                        )}
                        <img
                            className="z-0 aspect-square w-full object-cover object-center brightness-65 md:aspect-2/1"
                            src={konten.imageCover}
                            alt=""
                        />
                    </div>
                    <div className="w-full px-5 lg:px-10">
                        <div className="flex min-h-screen w-full -translate-y-52 flex-col gap-10 2xl:-translate-y-96">
                            <Heading className="text-white lg:text-4xl" title={konten.slug} />
                            <div className="flex flex-1 flex-col gap-2.5 rounded-t-3xl bg-[#EBEFFF] px-10 pt-5 text-[#3B387E] lg:gap-10 lg:px-20 lg:pt-10">
                                <HeadingSmall
                                    title={'Pak Telang - ' + Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))}
                                />
                                <img className="z-0 mx-auto aspect-video w-full max-w-4xl object-cover" src={konten.imageCover} alt="" />
                                <div className="">
                                    <pre className="lg:text-md font-sans text-xs break-words whitespace-pre-wrap text-black md:text-sm">
                                        {konten.content}
                                    </pre>
                                </div>
                                {konten.imageContent?.length ? (
                                    konten.imageContent.length > 1 ? (
                                        <Carousel className="mx-auto aspect-video w-full max-w-4xl">
                                            <CarouselContent>
                                                {konten.imageContent?.map((img, key) => (
                                                    <CarouselItem>
                                                        <img key={key} src={img} className="aspect-video w-full object-cover object-center" />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="translate-x-20 border-none bg-white hover:bg-[#bebebe]" />
                                            <CarouselNext className="-translate-x-20 border-none bg-white hover:bg-[#bebebe]" />
                                        </Carousel>
                                    ) : <img src={konten.imageContent[0]} className='w-full max-w-4xl aspect-video mx-auto object-center object-cover'/>
                                ) : null}
                                <div className="grid w-full grid-cols-3"></div>
                                {konten.video && (
                                    <div>
                                        {
                                            <iframe
                                                className="mx-auto aspect-video w-full max-w-4xl"
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                            ></iframe>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </LandingPageLayout>
        </>
    );
}
