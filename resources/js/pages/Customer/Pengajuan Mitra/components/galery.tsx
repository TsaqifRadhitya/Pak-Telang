import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function GaleryMitra({ type }: { type: 'Baru' | 'Sudah Ada' }) {
    return (
        <section className="flex min-h-screen w-full flex-col items-center gap-12 bg-[#EBEFFF] text-[#3B387E] p-5 lg:p-32">
            <header className="w-full text-center">
                <h1 className="text-2xl lg:text-[2.8rem] font-black">Gallery Mitra Kami</h1>
                <p className="text-lg">Lihat bagaimana para mitra kami tumbuh dan sukses bersama</p>
            </header>
            <div className="flex flex-col lg:flex-row w-full items-center gap-12">
                <Carousel className="flex-2/3">
                    <CarouselContent>
                        <CarouselItem>
                            <img
                                className="aspect-video w-full rounded-2xl object-cover"
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Image/Group%2037277.webp"
                                alt=""
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                                className="aspect-video w-full rounded-2xl object-cover"
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Image/Group%2037277.webp"
                                alt=""
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="translate-x-20 border-none bg-white hover:bg-[#bebebe]" />
                    <CarouselNext className="-translate-x-20 border-none bg-white hover:bg-[#bebebe]" />
                </Carousel>
                <div className="flex-1/3 space-y-5 py-2.5">
                    <h1 className="text-2xl lg:text-4xl font-bold">Bersama Mitra, Kami Tumbuh</h1>
                    <p>
                        Lihat bagaimana para mitra kami berkembang dan meraih sukses bersama. Setiap wajah di sini punya cerita, dan setiap cerita
                        dimulai dari satu keputusan: bergabung sebagai mitra kami.
                    </p>
                    <Button
                        onClick={() => router.get(route(type === 'Baru' ? 'customer.pengajuanmitra.create' : 'customer.pengajuanmitra.status'))}
                        className="w-full lg:w-fit cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#4e55a1]"
                    >
                        {type === 'Baru' ? 'Ajukan Mitra Sekarang' : 'Lihat Pengajuan'} <ArrowRight />
                    </Button>
                </div>
            </div>
        </section>
    );
}
