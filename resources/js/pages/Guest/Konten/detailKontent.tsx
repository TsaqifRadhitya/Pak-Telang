import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LandingPageLayout from '@/layouts/landingPageLayout';
import { kontenType } from '@/types/koten';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

function extractYouTubeID(url: string): string | null {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
    if (url) {
        const match = url.match(regExp);
        return match ? match[1] : null;
    }
    return null
}

export default function DetailKontent({ konten }: { konten: kontenType }) {
    const videoId = extractYouTubeID(konten.video as string);
    return (
        <LandingPageLayout page="Konten">
            <div className="min-h-screen w-full bg-[#EBEFFF] lg:pt-20">
                <div className="relative w-full">
                    <img className="z-0 aspect-square w-full object-cover object-center brightness-65 md:aspect-2/1" src={konten.imageCover} alt="" />
                </div>
                <div className="w-full px-5 lg:px-10">
                    <div className="flex min-h-screen w-full -translate-y-52 flex-col gap-10 2xl:-translate-y-96">
                        <Heading className="text-white lg:text-4xl" title={konten.slug} />
                        <div className="flex flex-1 flex-col gap-2.5 rounded-t-3xl bg-[#EBEFFF] px-10 pt-5 text-[#3B387E] lg:gap-10 lg:px-20 lg:pt-10">
                            <HeadingSmall
                                title={
                                    'Pak Telang - Jember, ' + Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(konten.created_at))
                                }
                            />
                            <img className="z-0 mx-auto aspect-video object-cover" src={konten.imageCover} alt="" />
                            <div className="">
                                <pre className="lg:text-md text-xs break-words whitespace-pre-wrap text-black md:text-sm">{konten.content}</pre>
                            </div>
                            {konten.imageContent?.length && (
                                <Carousel className="mx-auto aspect-video w-11/12">
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
                            )}
                            <div className="grid w-full grid-cols-3"></div>
                            {konten.video && (
                                <div>
                                    {<iframe className="mx-auto aspect-video w-11/12" src={`https://www.youtube.com/embed/${videoId}`}></iframe>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
