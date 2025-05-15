import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Banner() {
    return (
        <div className="min-h-screen w-full bg-[#EBEFFF]">
            <section className="flex min-h-screen w-full flex-col-reverse gap-10 px-5 text-right lg:flex-row lg:px-10">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E] lg:flex-4/7">
                    <h1 className="w-full text-4xl font-semibold">Buka Peluang Baru: Ajukan Kemitraan dan Jadilah Bagian dari Perjalanan Kami!</h1>
                    <p className="w-full text-xl">Pilihan minuman berkualitas untuk hari-harimu yang lebih sehat</p>
                    <Button className="cursor-pointer self-end bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]">
                        Lihat Pengajuan <ArrowRight />
                    </Button>
                </div>
                <div className="grid aspect-square min-h-screen flex-3/7 grid-cols-2 grid-rows-3 gap-5 p-36 px-10 lg:aspect-auto lg:px-0 lg:pt-32 lg:pb-36">
                    <div className="rounded-xl bg-gray-300"></div>
                    <div className="row-span-2 rounded-xl bg-gray-300"></div>
                    <div className="row-span-2 rounded-xl bg-gray-300"></div>
                    <div className="rounded-xl bg-gray-300"></div>
                </div>
            </section>
            <section className="flex min-h-screen w-full gap-20 px-5 text-right lg:px-10">
                <div className="flex-1/2 flex py-48">
                    <div className='bg-gray-300 rounded-2xl flex-1 aspect-square'></div>
                </div>
                <div className="flex flex-1/2 flex-col items-center justify-center gap-5 text-left text-[#3B387E] lg:flex-4/7">
                    <h1 className="w-full text-4xl font-semibold">Bersama Mitra, Kami Tumbuh</h1>
                    <p className="w-full text-xl">
                        Lihat bagaimana para mitra kami berkembang dan meraih sukses bersama. Setiap wajah di sini punya cerita, dan setiap cerita
                        dimulai dari satu keputusan: bergabung sebagai mitra kami.
                    </p>
                    <Button className="cursor-pointer self-start bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]">
                        Lihat Pengajuan <ArrowRight />
                    </Button>
                </div>
            </section>
        </div>
    );
}
